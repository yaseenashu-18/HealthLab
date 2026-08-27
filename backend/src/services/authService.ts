import { User, HealthProfile } from '../models/index.js';
import { isMongoConnected } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { UserResponse, AuthResponse, UserRole } from '../types/index.js';

interface InMemoryUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  passwordHash: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  avatar: string;
  createdAt: Date;
}

const memoryUsers = new Map<string, InMemoryUser>();

// Pre-populate demo accounts for each role
const initDemoUsers = async () => {
  const passwordHash = await hashPassword('HealthLab128');

  memoryUsers.set('demo@healthlab.ai', {
    id: 'mem_user_1',
    name: 'Sarah Jenkins',
    email: 'demo@healthlab.ai',
    phone: '+1 555-019-2834',
    role: 'user',
    passwordHash,
    verificationStatus: 'verified',
    avatar: '',
    createdAt: new Date(),
  });

  memoryUsers.set('doctor@healthlab.ai', {
    id: 'mem_doc_1',
    name: 'Dr. Robert Chen, MD',
    email: 'doctor@healthlab.ai',
    phone: '+1 555-019-2835',
    role: 'doctor',
    passwordHash,
    verificationStatus: 'verified',
    avatar: '',
    createdAt: new Date(),
  });

  memoryUsers.set('lab@healthlab.ai', {
    id: 'mem_lab_1',
    name: 'Apex Diagnostic Labs',
    email: 'lab@healthlab.ai',
    phone: '+1 555-019-2836',
    role: 'lab_technician',
    passwordHash,
    verificationStatus: 'verified',
    avatar: '',
    createdAt: new Date(),
  });

  memoryUsers.set('pharmacy@healthlab.ai', {
    id: 'mem_pharma_1',
    name: 'HealthLab Express Pharmacy',
    email: 'pharmacy@healthlab.ai',
    phone: '+1 555-019-2837',
    role: 'pharmacy',
    passwordHash,
    verificationStatus: 'verified',
    avatar: '',
    createdAt: new Date(),
  });
};
initDemoUsers();

export class AuthService {
  static async signUp(data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    password: string;
  }): Promise<AuthResponse> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const role = data.role || 'user';

    if (isMongoConnected) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        throw new Error('An account with this email address already exists.');
      }

      const passwordHash = await hashPassword(data.password);
      const user = await User.create({
        name: data.name,
        email: normalizedEmail,
        phone: data.phone,
        role,
        passwordHash,
        verificationStatus: 'verified',
      });

      await HealthProfile.create({ userId: user._id });

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
      });

      return {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role as UserRole,
          verificationStatus: user.verificationStatus,
          avatar: user.avatar,
          createdAt: user.createdAt.toISOString(),
        },
      };
    } else {
      if (memoryUsers.has(normalizedEmail)) {
        throw new Error('An account with this email address already exists.');
      }

      const passwordHash = await hashPassword(data.password);
      const newId = `mem_${role}_${Date.now()}`;
      const memoryUser: InMemoryUser = {
        id: newId,
        name: data.name,
        email: normalizedEmail,
        phone: data.phone,
        role,
        passwordHash,
        verificationStatus: 'verified',
        avatar: '',
        createdAt: new Date(),
      };

      memoryUsers.set(normalizedEmail, memoryUser);

      const token = generateToken({
        id: newId,
        email: memoryUser.email,
        name: memoryUser.name,
        role: memoryUser.role,
      });

      return {
        token,
        user: {
          id: memoryUser.id,
          name: memoryUser.name,
          email: memoryUser.email,
          phone: memoryUser.phone,
          role: memoryUser.role,
          verificationStatus: memoryUser.verificationStatus,
          avatar: memoryUser.avatar,
          createdAt: memoryUser.createdAt.toISOString(),
        },
      };
    }
  }

  static async signIn(data: {
    emailOrPhone: string;
    role: UserRole;
    password: string;
  }): Promise<AuthResponse> {
    const input = data.emailOrPhone.toLowerCase().trim();

    if (isMongoConnected) {
      const user = await User.findOne({
        $or: [{ email: input }, { phone: input }],
      });

      if (!user) {
        throw new Error('Invalid email/phone or password.');
      }

      const isMatch = await comparePassword(data.password, user.passwordHash);
      if (!isMatch) {
        throw new Error('Invalid email/phone or password.');
      }

      // Update user role if selected
      if (data.role && user.role !== data.role) {
        user.role = data.role;
        await user.save();
      }

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
      });

      return {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role as UserRole,
          verificationStatus: user.verificationStatus,
          avatar: user.avatar,
          createdAt: user.createdAt.toISOString(),
        },
      };
    } else {
      let user: InMemoryUser | undefined;
      for (const u of memoryUsers.values()) {
        if (u.email.toLowerCase() === input || u.phone === input) {
          user = u;
          break;
        }
      }

      if (!user) {
        throw new Error('Invalid email/phone or password.');
      }

      const isMatch = await comparePassword(data.password, user.passwordHash);
      if (!isMatch) {
        throw new Error('Invalid email/phone or password.');
      }

      if (data.role) {
        user.role = data.role;
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          verificationStatus: user.verificationStatus,
          avatar: user.avatar,
          createdAt: user.createdAt.toISOString(),
        },
      };
    }
  }

  static async getMe(userId: string): Promise<UserResponse> {
    if (isMongoConnected) {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: (user.role as UserRole) || 'user',
        verificationStatus: user.verificationStatus,
        avatar: user.avatar,
        createdAt: user.createdAt.toISOString(),
      };
    } else {
      for (const u of memoryUsers.values()) {
        if (u.id === userId) {
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role,
            verificationStatus: u.verificationStatus,
            avatar: u.avatar,
            createdAt: u.createdAt.toISOString(),
          };
        }
      }
      throw new Error('User not found.');
    }
  }
}

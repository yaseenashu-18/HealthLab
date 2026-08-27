import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthProfile extends Document {
  userId: mongoose.Types.ObjectId;
  dob?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  bloodGroup?: string;
  heightCm?: number;
  weightKg?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  allergies?: string[];
  chronicConditions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HealthProfileSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
    bloodGroup: { type: String, default: '' },
    heightCm: { type: Number },
    weightKg: { type: Number },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relationship: { type: String, default: '' },
    },
    allergies: { type: [String], default: [] },
    chronicConditions: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const HealthProfile = mongoose.model<IHealthProfile>('HealthProfile', HealthProfileSchema);

import React, { useState } from 'react';
import { TopHeader } from '../../components/layout/TopHeader';
import { BottomNavigation } from '../../components/layout/BottomNavigation';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';
import {
  Search,
  ShoppingCart,
  Bell,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Plus,
  Stethoscope,
  Droplet,
  Sun,
  Heart,
  Calendar,
  Clock,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const BookTestPage: React.FC = () => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState('popular');
  const [cartCount, setCartCount] = useState(2);

  const categoryPills = [
    { id: 'popular', label: 'Popular' },
    { id: 'packages', label: 'Health Packages' },
    { id: 'blood', label: 'Blood Tests' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'women', label: "Women's Health" },
    { id: 'men', label: "Men's Health" },
    { id: 'senior', label: 'Senior Care' },
  ];

  const popularTests = [
    {
      id: 'cbc',
      title: 'Complete Blood Count (CBC)',
      params: '35 Parameters',
      turnaround: 'Reports in 12-24 hrs',
      price: '₹299',
      icon: Droplet,
      iconBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-500',
    },
    {
      id: 'lipid',
      title: 'Lipid Profile',
      params: '8 Parameters',
      turnaround: 'Reports in 12-24 hrs',
      price: '₹599',
      icon: Heart,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500',
    },
    {
      id: 'lft',
      title: 'Liver Function Test (LFT)',
      params: '11 Parameters',
      turnaround: 'Reports in 12-24 hrs',
      price: '₹499',
      icon: FileSpreadsheet,
      iconBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-500',
    },
    {
      id: 'kft',
      title: 'Kidney Function Test (KFT)',
      params: '8 Parameters',
      turnaround: 'Reports in 12-24 hrs',
      price: '₹499',
      icon: Droplet,
      iconBg: 'bg-teal-50 dark:bg-teal-950/40 text-teal-500',
    },
  ];

  const addToCart = (title: string) => {
    setCartCount((prev) => prev + 1);
    showToast('Added to Cart', `${title} added to cart.`, 'success');
  };

  return (
    <div className="relative min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-24 md:pb-12">
      <TopHeader />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Book a Test
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Accurate tests, at your doorstep
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => showToast('Cart', `${cartCount} items in cart.`, 'info')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500 transition-all shadow-2xs relative"
            >
              <ShoppingCart className="w-4 h-4 stroke-[1.5] text-emerald-600" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* 2. Search Bar & Location Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[1.5]" />
            <input
              type="text"
              placeholder="Search tests, packages & more"
              className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs self-end sm:self-auto cursor-pointer">
            <MapPin className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
          </div>
        </div>

        {/* 3. Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoryPills.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border select-none ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 4. Certified Labs Hero Promotional Card */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-health-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 z-10">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Trusted by 5M+ Users
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Book Tests from <br className="hidden sm:inline" />
                <span className="text-emerald-600 dark:text-emerald-400">Certified Labs</span>
              </h2>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Home sample collection</p>
                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Accurate reports in 24 hrs</p>
                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> On-time report delivery</p>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  How it Works ▶
                </Button>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center z-10">
              <img
                src="/assets/images/doctor_sample_collection.png"
                alt="Book tests certified labs"
                className="max-h-52 object-contain rounded-2xl drop-shadow-md select-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Recommended for You */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recommended for You</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'fbc', title: 'Full Body Checkup', sub: '80+ Parameters', price: '₹1499', tag: 'Popular', icon: Stethoscope },
              { id: 'tp', title: 'Thyroid Profile (T3, T4, TSH)', sub: 'Assess thyroid function', price: '₹699', tag: null, icon: Heart },
              { id: 'vd', title: 'Vitamin D Test', sub: 'Essential for bone health', price: '₹599', tag: null, icon: Sun },
              { id: 'ds', title: 'Diabetes Screening', sub: 'Early detection is better', price: '₹499', tag: null, icon: Droplet },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} hoverable className="p-4 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      {item.tag && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full uppercase">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed mt-0.5">{item.sub}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(item.title)}
                      className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-colors"
                      aria-label={`Add ${item.title}`}
                    >
                      <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Popular Tests List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Popular Tests</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <div className="space-y-2.5">
            {popularTests.map((test) => {
              const Icon = test.icon;
              return (
                <Card key={test.id} hoverable className="p-4 bg-white dark:bg-slate-900">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-2xl ${test.iconBg}`}>
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{test.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{test.params}</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">🕒 {test.turnaround}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">{test.price}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(test.title)}
                        className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 font-bold hover:bg-emerald-600 hover:text-white"
                        leftIcon={<Plus className="w-3.5 h-3.5" />}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 7. How it Works Timeline */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">How it Works</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            {[
              { step: '1', title: 'Choose a Test', desc: 'Select test or package' },
              { step: '2', title: 'Schedule Date', desc: 'Pick date & time slot' },
              { step: '3', title: 'Home Collection', desc: 'Certified technician visit' },
              { step: '4', title: 'Digital Reports', desc: 'Get reports in 24 hrs' },
            ].map((st) => (
              <div key={st.step} className="flex flex-col items-center text-center space-y-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                  {st.step}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{st.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Upcoming Bookings */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Bookings</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <Card className="p-5 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lipid Profile</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Booking ID: HL123456</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                    <span>28 May 2025 • 10:00 AM - 12:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Confirmed
                </span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </Card>
        </section>

        {/* 9. Bottom Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => showToast('Test Reports', 'All reports loaded.', 'info')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-left hover:border-emerald-400 transition-all shadow-2xs"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Test Reports</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">All your reports at one place</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => showToast('Health Packages', 'Curated packages available.', 'info')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-left hover:border-emerald-400 transition-all shadow-2xs"
          >
            <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Health Packages</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Save more with curated packages</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => showToast('Support', 'Connecting with support team...', 'info')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-left hover:border-emerald-400 transition-all shadow-2xs"
          >
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Need Help?</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Chat with our support team</div>
            </div>
          </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

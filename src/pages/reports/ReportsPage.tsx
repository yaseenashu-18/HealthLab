import React, { useState } from 'react';
import { TopHeader } from '../../components/layout/TopHeader';
import { BottomNavigation } from '../../components/layout/BottomNavigation';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import {
  FileText,
  Search,
  SlidersHorizontal,
  Eye,
  Download,
  ChevronRight,
  UploadCloud,
  Share2,
  BarChart2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Activity,
  Droplet,
  Sun,
  Lock,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'lab' | 'xray' | 'records'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const reportsList = [
    {
      id: 'cbc-1',
      title: 'Complete Blood Count (CBC)',
      lab: 'HealthLab Diagnostics',
      date: '28 May 2025',
      status: 'Completed',
      category: 'lab',
      icon: Droplet,
      iconBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-500',
    },
    {
      id: 'lipid-1',
      title: 'Lipid Profile',
      lab: 'HealthLab Diagnostics',
      date: '20 May 2025',
      status: 'Completed',
      category: 'lab',
      icon: Activity,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500',
    },
    {
      id: 'lft-1',
      title: 'Liver Function Test (LFT)',
      lab: 'HealthLab Diagnostics',
      date: '15 May 2025',
      status: 'Completed',
      category: 'lab',
      icon: FileSpreadsheet,
      iconBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-500',
    },
    {
      id: 'kft-1',
      title: 'Kidney Function Test (KFT)',
      lab: 'HealthLab Diagnostics',
      date: '10 May 2025',
      status: 'Completed',
      category: 'lab',
      icon: Activity,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500',
    },
    {
      id: 'xray-1',
      title: 'Chest X-Ray (PA View)',
      lab: 'City Scan Center',
      date: '05 May 2025',
      status: 'Processing',
      category: 'xray',
      icon: FileText,
      iconBg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-500',
    },
  ];

  const filteredReports = reportsList.filter((item) => {
    if (activeTab === 'lab' && item.category !== 'lab') return false;
    if (activeTab === 'xray' && item.category !== 'xray') return false;
    if (searchQuery) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lab.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-24 md:pb-12">
      <TopHeader />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              All your health reports at one place
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Filter', 'Filter options active', 'info')}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors shadow-2xs"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* 2. Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Reports', icon: FileText },
            { id: 'lab', label: 'Lab Reports', icon: FileSpreadsheet },
            { id: 'xray', label: 'X-Ray / Scan', icon: FileText },
            { id: 'records', label: 'Health Records', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border select-none ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[1.5]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Health Summary Box (3D Green Folder Metric Box) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Health Summary</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your health at a glance</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <FileText className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">28</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Reports Total</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                    <Clock className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">12</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">This Year</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Activity className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">2</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pending</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Secure & Private</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Folder Visual */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-health-md">
                <FileSpreadsheet className="w-16 h-16 stroke-[1.25]" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[1.5]" />
            <input
              type="text"
              placeholder="Search by test name, doctor, hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 py-2 px-3 focus:outline-none focus:border-emerald-600 shadow-2xs"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* 5. Recent Reports List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Reports</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredReports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.id} hoverable className="p-4 bg-white dark:bg-slate-900">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-2xl ${report.iconBg}`}>
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{report.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{report.lab}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">📅 {report.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          report.status === 'Completed'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800'
                        }`}
                      >
                        {report.status}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast('Report Preview', `Viewing ${report.title}`, 'info')}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4 stroke-[1.5]" />
                        </button>

                        {report.status === 'Completed' && (
                          <button
                            type="button"
                            onClick={() => showToast('Downloading Report', `Downloading PDF for ${report.title}`, 'success')}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        )}

                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Quick Actions */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Upload Reports', sub: 'Upload from gallery', icon: UploadCloud },
              { label: 'Share Reports', sub: 'Share with doctors', icon: Share2 },
              { label: 'Compare Reports', sub: 'View changes over time', icon: BarChart2 },
              { label: 'Health Summary', sub: 'AI health insights', icon: Sparkles },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => showToast(action.label, action.sub, 'info')}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400 transition-all text-left group select-none shadow-2xs"
                >
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {action.label}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{action.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 7. Security Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[1.5] shrink-0" />
            <span>Your reports are 100% safe & secure. We never share your data without your permission.</span>
          </div>

          <button
            type="button"
            onClick={() => showToast('Privacy Policy', 'HealthLab AI encryption standard.', 'info')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
          >
            Know More
          </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

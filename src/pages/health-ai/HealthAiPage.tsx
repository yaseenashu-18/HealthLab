import React, { useState } from 'react';
import { TopHeader } from '../../components/layout/TopHeader';
import { BottomNavigation } from '../../components/layout/BottomNavigation';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import {
  Sparkles,
  Send,
  History,
  Stethoscope,
  Pill,
  FileText,
  Apple,
  Footprints,
  Droplet,
  Moon,
  Heart,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Activity,
  Flame,
} from 'lucide-react';

export const HealthAiPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'conversation' | 'trackers'>('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello Yaseen! I am HealthLab AI, your personal health assistant. How can I help you today?',
    },
  ]);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userText = aiQuery;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiQuery('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Thank you for asking about "${userText}". Based on general medical guidelines, ensure adequate hydration, rest, and consult a certified healthcare professional if symptoms persist.`,
        },
      ]);
    }, 800);
  };

  const quickChips = [
    { label: 'Symptoms Checker', icon: Stethoscope },
    { label: 'Medicine Info', icon: Pill },
    { label: 'Lab Reports', icon: FileText },
    { label: 'Nutrition', icon: Apple },
  ];

  const popularQueries = [
    'What are the early signs of viral fever?',
    'Can I take paracetamol on an empty stomach?',
    'What is a healthy breakfast for weight gain?',
    'How can I improve my sleep quality?',
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-24 md:pb-12">
      <TopHeader />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Health AI
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" /> AI Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Your personal health assistant
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Conversation History', 'Past AI consultations loaded.', 'info')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors shadow-2xs"
            >
              <History className="w-4 h-4 stroke-[1.5]" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* 2. Top Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'conversation', label: 'Conversation', icon: FileText },
            { id: 'trackers', label: 'Trackers', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border select-none ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[1.5]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. AI Doctor Greeting Card */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-emerald-100 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
                Good morning, {user?.name?.split(' ')[0] || 'Yaseen'}! <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                Here's your health overview. You're doing great! Keep it up.
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-health-md shrink-0">
              <Stethoscope className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>

          {/* AI Query Input Form */}
          <form onSubmit={handleSendQuery} className="relative flex items-center" noValidate>
            <input
              type="text"
              placeholder="Ask me anything about your health..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="absolute right-2.5 w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
              aria-label="Send Query"
            >
              <Send className="w-4 h-4 stroke-[1.5]" />
            </button>
          </form>

          {/* AI Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {quickChips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAiQuery(`Tell me about ${chip.label}`);
                    setActiveTab('conversation');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-all shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Conversation View Tab Content */}
        {activeTab === 'conversation' && (
          <Card className="p-4 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Live AI Health Consultation
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto p-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm font-medium ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 4. Today's Health Snapshot */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Today's Health Snapshot</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="p-4 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Steps</span>
                <Footprints className="w-4 h-4 text-emerald-500 stroke-[1.5]" />
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">6,842</div>
              <div className="text-[11px] text-slate-400 font-medium">/ 10,000 steps</div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[68%]" />
              </div>
            </Card>

            <Card className="p-4 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Water</span>
                <Droplet className="w-4 h-4 text-sky-500 stroke-[1.5]" />
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">1.8 L</div>
              <div className="text-[11px] text-slate-400 font-medium">/ 2.5 L</div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full w-[72%]" />
              </div>
            </Card>

            <Card className="p-4 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sleep</span>
                <Moon className="w-4 h-4 text-purple-500 stroke-[1.5]" />
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">6h 45m</div>
              <div className="text-[11px] text-slate-400 font-medium">/ 8h</div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full w-[81%]" />
              </div>
            </Card>

            <Card className="p-4 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Heart Rate</span>
                <Heart className="w-4 h-4 text-rose-500 stroke-[1.5]" />
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">72 <span className="text-xs font-normal text-slate-500">bpm</span></div>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Normal</div>
            </Card>
          </div>
        </section>

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
              { title: 'Drink More Water', desc: 'You are a little low on water intake. Drink 700 ml more today.', action: 'Track Water', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900' },
              { title: 'Move More', desc: 'A short 20-min walk can boost your energy and mood.', action: 'Start Activity', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900' },
              { title: 'Manage Stress', desc: 'Try 5 minutes of breathing exercises to relax your mind.', action: 'Start Breathing', bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900' },
              { title: 'Eat Balanced', desc: 'Ensure you are getting enough nutrients today.', action: 'View Nutrition', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900' },
            ].map((rec, i) => (
              <Card key={i} className={`p-4 ${rec.bg} space-y-3 flex flex-col justify-between`}>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">{rec.desc}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-white dark:bg-slate-900 text-xs font-bold">
                  {rec.action}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Popular Health Queries */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Popular Health Queries</h3>
            <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          <Card className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 p-2">
            {popularQueries.map((query, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setAiQuery(query);
                  setActiveTab('conversation');
                }}
                className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[1.5] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {query}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </Card>
        </section>

        {/* 7. Health Tip of the Day */}
        <div className="flex items-center gap-4 p-5 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Health Tip of the Day
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              "Small daily choices lead to big long-term health results."
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

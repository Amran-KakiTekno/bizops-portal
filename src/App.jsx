import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Receipt, 
  MessageSquareText, 
  CalendarClock, 
  Boxes, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Settings, 
  Users, 
  Sparkles,
  Zap,
  Activity,
  DollarSign,
  Pause,
  Play,
  RotateCcw,
  Trash2,
  Building2,
  LayoutGrid,
  Sun,
  Moon,
  Globe,
  Search
} from 'lucide-react';
import SuiteWaffleMenu from './components/SuiteWaffleMenu';
import SettingsModal from './components/SettingsModal';
import SidebarShell from './components/SidebarShell';
import { useSettings } from './utils/useSettings';

// Configurable ecosystem app URLs with sensible production defaults
const MODULE_URLS = {
  invoicing: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
  intake: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
  scheduling: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
  residential: import.meta.env.VITE_JMB_URL || 'https://ezibiz-jmb.pages.dev',
  akaun: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
  crms: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
  hrms: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
  jmb: import.meta.env.VITE_JMB_URL || 'https://ezibiz-jmb.pages.dev'
};

const INITIAL_EVENTS = [
  {
    id: 1,
    module: 'invoicing',
    title: 'Jualan Direkodkan & Stok Ditolak (RM 4,500.00)',
    desc: 'Invois INV-2026-001 lunas via Maybank. Stok Silinder Gas tolak 25 unit.',
    timestamp: '2 mins ago',
    badge: 'Jualan Lunas',
    color: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
  },
  {
    id: 2,
    module: 'intake',
    title: 'DM Quote Converted to Paid Deposit (RM 350.00)',
    desc: 'Threads inquiry from @studio_luxe approved Proposal #PR-89. Card charged on file.',
    timestamp: '14 mins ago',
    badge: 'Zero Ghosting',
    color: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60'
  },
  {
    id: 3,
    module: 'scheduling',
    title: 'Shift Swap Auto-Approved',
    desc: 'Sarah T. swapped Sat Evening with Marcus B. Overtime guardrails verified: 0 hrs penalty.',
    timestamp: '32 mins ago',
    badge: 'Compliance Pass',
    color: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60'
  },
  {
    id: 4,
    module: 'residential',
    title: 'Maintenance DuitNow QR Paid (RM 280.00)',
    desc: 'Unit B-14-02 settled September maintenance & sinking fund. E-Receipt generated.',
    timestamp: '45 mins ago',
    badge: 'Strata 757',
    color: 'text-amber-700 dark:text-amber-400 border-amber-500/30 bg-amber-50 dark:bg-amber-500/10'
  }
];

const DEMO_EVENTS_POOL = [
  {
    module: 'intake',
    title: 'Instagram DM Inquiry Auto-Parsed',
    desc: 'Client asking for catering estimate. Interactive CPQ link dispatched.',
    badge: 'Intake Bot',
    color: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60'
  },
  {
    module: 'invoicing',
    title: 'Belian Stok Masuk Direkodkan (RM 5,550.00)',
    desc: 'Stok Injap Tembaga bertambah 300 pcs. Baki pemiutang auto-dikemaskini.',
    badge: 'Stok Masuk',
    color: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60'
  },
  {
    module: 'invoicing',
    title: 'Jualan POS Kaunter Lunas (RM 820.00)',
    desc: 'Resit QR DuitNow diterima. Baki tunai dan lejar untung rugi dikemaskini.',
    badge: 'Jualan Lunas',
    color: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
  },
  {
    module: 'scheduling',
    title: 'Kehadiran Staf Geo-Checkin Disahkan',
    desc: '4 staf log masuk shift pagi dalam radius geofence sah.',
    badge: 'Geo-Attendance',
    color: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60'
  },
  {
    module: 'residential',
    title: 'Defect Ticket Auto-Escalated: Lift #2',
    desc: 'Contractor OTIS dispatched with SLA countdown active.',
    badge: 'Act 757 Defect',
    color: 'text-amber-700 dark:text-amber-400 border-amber-500/30 bg-amber-50 dark:bg-amber-500/10'
  }
];

export default function App() {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [activeNavTab, setActiveNavTab] = useState('overview');
  const [liveFilter, setLiveFilter] = useState('all');
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [queuedEvents, setQueuedEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState(INITIAL_EVENTS);
  const isPausedRef = useRef(isPaused);

  const [activeModules, setActiveModules] = useState({
    invoicing: true,
    intake: true,
    scheduling: true,
    residential: true
  });

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!showBundleModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowBundleModal(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showBundleModal]);

  useEffect(() => {
    const timer = setInterval(() => {
      const template = DEMO_EVENTS_POOL[Math.floor(Math.random() * DEMO_EVENTS_POOL.length)];
      const newEvent = {
        ...template,
        id: Date.now() + Math.random(),
        timestamp: 'Just now'
      };

      if (isPausedRef.current) {
        setQueuedEvents(prev => [newEvent, ...prev.slice(0, 19)]);
      } else {
        setRecentEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const togglePause = () => setIsPaused(prev => !prev);

  const showQueuedEvents = () => {
    if (queuedEvents.length === 0) return;
    setRecentEvents(prev => [...queuedEvents, ...prev].slice(0, 15));
    setQueuedEvents([]);
  };

  const clearFeed = () => {
    setRecentEvents([]);
    setQueuedEvents([]);
  };

  const resetFeed = () => {
    setRecentEvents(INITIAL_EVENTS);
    setQueuedEvents([]);
  };

  const toggleModule = (key) => {
    setActiveModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateMonthly = () => {
    const activeCount = Object.values(activeModules).filter(Boolean).length;
    if (activeCount >= 3) return { total: 89, discount: t('bundleSavings') };
    return { total: activeCount * 29, discount: t('standardPricing') };
  };

  const filteredEvents = liveFilter === 'all' 
    ? recentEvents 
    : recentEvents.filter(e => e.module === liveFilter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:bg-white/20 dark:selection:text-white transition-colors duration-200">
      
      {/* DESKTOP SIDEBAR (Recent.design Canonical Shell) */}
      <SidebarShell 
        activeNavTab={activeNavTab} 
        onSelectNavTab={setActiveNavTab} 
        onOpenSettings={() => setShowSettingsModal(true)} 
        onOpenBundleModal={() => setShowBundleModal(true)} 
        calculateMonthly={calculateMonthly} 
        t={t} 
      />

      {/* MOBILE TOP BAR (Visible < 768px) */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xs font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">EziBiz</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-white/10">Hub</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBundleModal(true)}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            ${calculateMonthly().total}/mo
          </button>
          <SuiteWaffleMenu currentApp="hub" />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="md:pl-64 flex-1 flex flex-col min-w-0 pb-24 md:pb-8">
        
        {/* TOP FLOATING CONTROL BAR (Recent.design style) */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-8 py-3 hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-500 dark:text-zinc-400 shadow-sm dark:shadow-rim">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              <span className="truncate">Search modules, events, or operations...</span>
              <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200/80 dark:bg-zinc-900 border border-slate-300 dark:border-white/10 rounded text-slate-600 dark:text-zinc-400">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono text-slate-600 dark:text-zinc-400 shadow-sm dark:shadow-rim">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>12ms</span>
              <span className="text-slate-300 dark:text-zinc-600">•</span>
              <span className="text-slate-700 dark:text-zinc-300">Edge Streaming</span>
            </div>

            {/* Stream Pause/Resume Toggle */}
            <button
              type="button"
              onClick={togglePause}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm dark:shadow-rim"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('resume')}</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                  <span>{t('pause')}</span>
                </>
              )}
            </button>

            <SuiteWaffleMenu currentApp="hub" />
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          
          {/* HERO BANNER (Recent.design dual-mode theme) */}
          <div id="overview" className="relative rounded-2xl bg-gradient-to-r from-slate-100 via-white to-indigo-50/50 border border-slate-200 dark:from-slate-900 dark:via-slate-900/95 dark:to-indigo-950/40 dark:border-slate-800 p-6 sm:p-8 overflow-hidden shadow-sm dark:shadow-card-elevated">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.06] border border-slate-300 dark:border-white/10 text-slate-700 dark:text-zinc-200 text-xs font-medium backdrop-blur-sm shadow-sm dark:shadow-rim">
                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>{t('heroBadge')}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{t('metricRevenue')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">RM 84,920</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+18.4%</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">{t('metricRevenueSub')}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{t('metricInventory')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900 dark:text-zinc-100 font-mono tabular-nums">RM 32,850</span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{t('metricInventoryCat')}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">{t('metricInventorySub')}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{t('metricWorkflows')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900 dark:text-zinc-100 font-mono tabular-nums">14 Active</span>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">100% SLA</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">{t('metricWorkflowsSub')}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{t('metricPackaging')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900 dark:text-zinc-100 font-mono tabular-nums">5 Modules</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('metricPackagingStatus')}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">{t('metricPackagingSub')}</p>
              </div>
            </div>
          </div>

          {/* ECOSYSTEM MODULES SECTION */}
          <section id="modules" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {t('modulesHeader')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('modulesSub')}
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                {t('modulesBadge')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Module 1: Akaun */}
              <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                      {t('module1Badge')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {t('module1Name')}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      {t('module1Desc')}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module1Metric1')}</span>
                      <span className="font-mono text-slate-800 dark:text-zinc-200 font-semibold tabular-nums">RM 32,850</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module1Metric2')}</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{t('module1Metric2Val')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <a 
                    href={MODULE_URLS.akaun}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <span>{t('launchApp')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://github.com/Amran-KakiTekno/ezibiz-akaun" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs transition-colors"
                  >
                    {t('githubRepo') || 'GitHub'}
                  </a>
                </div>
              </div>

              {/* Module 2: CRMS */}
              <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">
                      <MessageSquareText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                      {t('module2Badge')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {t('module2Name')}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      {t('module2Desc')}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module2Metric1')}</span>
                      <span className="font-mono text-slate-800 dark:text-zinc-200 font-semibold tabular-nums">{t('module2Metric1Val')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module2Metric2')}</span>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">{t('module2Metric2Val')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <a 
                    href={MODULE_URLS.crms}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>{t('launchApp')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://github.com/Amran-KakiTekno/ezibiz-crms" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs transition-colors"
                  >
                    {t('githubRepo') || 'GitHub'}
                  </a>
                </div>
              </div>

              {/* Module 3: HRMS */}
              <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center">
                      <CalendarClock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                      {t('module3Badge')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {t('module3Name')}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      {t('module3Desc')}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module3Metric1')}</span>
                      <span className="font-mono text-slate-800 dark:text-zinc-200 font-semibold tabular-nums">{t('module3Metric1Val')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module3Metric2')}</span>
                      <span className="font-medium text-cyan-600 dark:text-cyan-400">{t('module3Metric2Val')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <a 
                    href={MODULE_URLS.hrms}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                  >
                    <span>{t('launchApp')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://github.com/Amran-KakiTekno/ezibiz-hrms" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs transition-colors"
                  >
                    {t('githubRepo') || 'GitHub'}
                  </a>
                </div>
              </div>

              {/* Module 4: JMB (Strata) */}
              <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                      {t('module4Badge')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {t('module4Name')}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      {t('module4Desc')}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module4Metric1')}</span>
                      <span className="font-mono text-slate-800 dark:text-zinc-200 font-semibold tabular-nums">{t('module4Metric1Val')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                      <span>{t('module4Metric2')}</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">{t('module4Metric2Val')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <a 
                    href={MODULE_URLS.residential}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <span>{t('launchApp')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://github.com/Amran-KakiTekno/ezibiz-jmb" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 text-xs transition-colors"
                  >
                    {t('githubRepo') || 'GitHub'}
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* CROSS-MODULE EVENT BUS */}
          <section id="events" className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {t('eventBusTitle')}
                  </h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isPaused 
                      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20' 
                      : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20'
                  }`}>
                    {isPaused ? t('paused') : t('streaming')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('eventBusSub')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-black/60 p-1 rounded-full border border-slate-200 dark:border-white/[0.08]">
                  {['all', 'invoicing', 'intake', 'scheduling', 'residential'].map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLiveFilter(key)}
                      className={`text-xs capitalize px-3 py-1 rounded-full transition-all cursor-pointer ${
                        liveFilter === key 
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs' 
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-900/60'
                      }`}
                    >
                      {key === 'all' ? t('filterAll') : (t(`filter${key.charAt(0).toUpperCase() + key.slice(1)}`) || key)}
                    </button>
                  ))}
                </div>

                {/* Stream Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={togglePause}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-all cursor-pointer shadow-xs"
                    title={isPaused ? t('resume') : t('pause')}
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{t('resume')}</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                        <span>{t('pause')}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={clearFeed}
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 hover:bg-slate-200 dark:bg-black/60 text-slate-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 transition-colors cursor-pointer shadow-xs"
                    title={t('clear')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('clear')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetFeed}
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 hover:bg-slate-200 dark:bg-black/60 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer shadow-xs"
                    title={t('reset')}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('reset')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Queued events notice when paused */}
            {queuedEvents.length > 0 && (
              <div className="py-1 flex justify-center">
                <button
                  type="button"
                  onClick={showQueuedEvents}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  <span>{t('newEventsAvailable', { count: queuedEvents.length })}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}

            {/* Activity Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              
              {/* Left 2 Columns: Dynamic Event Feed */}
              <div className="lg:col-span-2 space-y-3">
                {filteredEvents.length === 0 ? (
                  <div className="py-12 text-center space-y-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-black/40 p-8 shadow-xs">
                    <p className="text-xs text-slate-500 dark:text-zinc-500">
                      {recentEvents.length === 0 ? t('feedCleared') : t('noEvents')}
                    </p>
                    {recentEvents.length === 0 && (
                      <button
                        type="button"
                        onClick={resetFeed}
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t('restoreEvents')}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  filteredEvents.map(event => (
                    <a 
                      key={event.id}
                      href={MODULE_URLS[event.module] || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-4 rounded-xl bg-slate-50/70 dark:bg-black/50 border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100/70 dark:hover:bg-zinc-900/40 shadow-xs transition-all duration-200 flex flex-col justify-between space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${event.color}`}>
                            {event.badge}
                          </span>
                          <span className="font-semibold text-xs text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                            {event.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-slate-400 dark:text-zinc-500 font-mono text-[11px] whitespace-nowrap">{event.timestamp}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-600 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pl-0.5">{event.desc}</p>
                    </a>
                  ))
                )}
              </div>

              {/* Right 1 Column: Embedded In-Feed Widgets */}
              <div className="space-y-4">
                {/* Widget 1: Suite Financial Runway */}
                <div className="rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-zinc-200">
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Suite Cashflow & Runway</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                      LHDN e-Invoice
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>Monthly Inflow</span>
                      <span className="font-mono text-slate-900 dark:text-zinc-200 font-bold tabular-nums">RM 84,920.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>Operating Margin</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">+34.2%</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>Reserve Runway</span>
                      <span className="font-mono text-slate-900 dark:text-zinc-200 font-semibold">4.2 Months</span>
                    </div>
                  </div>
                  <a
                    href={MODULE_URLS.akaun}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors shadow-xs"
                  >
                    <span>View Financial Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>

                {/* Widget 2: Live Geofence Shifts */}
                <div className="rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-zinc-200">
                      <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Downtown Flagship Roster</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                      4 Active
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-zinc-300">Siti Sarah (Head Barista)</span>
                      <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">06:54 AM ●</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-zinc-300">Ahmad Danial (Kitchen)</span>
                      <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">06:58 AM ●</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-zinc-400">Nurul Izzah (Cashier)</span>
                      <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500">15:00 Shift</span>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                    <span>GPS Radius: 12m verified</span>
                  </div>
                  <a
                    href={MODULE_URLS.hrms}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors shadow-xs"
                  >
                    <span>View Roster Radar</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-6 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>{t('footerCopy')}</p>
            <div className="flex items-center gap-4">
              <span>React 18 + Vite + Tailwind</span>
              <span>•</span>
              <span>5 Isolated Repos</span>
              <span>•</span>
              <span>Cloudflare Pages</span>
            </div>
          </div>
        </footer>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible < 768px) */}
      <nav 
        aria-label="Mobile Bottom Navigation" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 h-16 pb-[env(safe-area-inset-bottom)] flex items-center justify-around px-2"
      >
        {[
          { id: 'overview', label: t('navOverview'), icon: Layers },
          { id: 'modules', label: t('navModules'), icon: Boxes },
          { id: 'events', label: t('navEvents'), icon: Activity },
          { id: 'pricing', label: t('navEntitlements'), icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeNavTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveNavTab(tab.id);
                if (tab.id === 'pricing') setShowBundleModal(true);
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-colors ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] mt-1 truncate max-w-[60px]">{tab.label}</span>
            </button>
          );
        })}

        {/* 5th Button: Settings Trigger */}
        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          className="flex flex-col items-center justify-center flex-1 h-full min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title={t('settings')}
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="text-[10px] mt-1 truncate max-w-[60px]">{t('settings')}</span>
        </button>
      </nav>

      {/* BUNDLE SUBSCRIPTION MODAL */}
      {showBundleModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bundle-modal-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 id="bundle-modal-title" className="font-bold text-lg">
                  {t('bundleModalTitle')}
                </h3>
              </div>
              <button 
                onClick={() => setShowBundleModal(false)}
                aria-label={t('close')}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('bundleModalDesc')}
            </p>

            <div className="space-y-2.5">
              {[
                { key: 'invoicing', name: 'Ezi-Akaun & Inventori', price: '$29/mo' },
                { key: 'intake', name: 'Conversational CRMS & Quotes', price: '$29/mo' },
                { key: 'scheduling', name: 'HRMS & Workforce Ops', price: '$29/mo' },
                { key: 'residential', name: 'EziBiz JMB (Strata 757)', price: '$29/mo' }
              ].map(item => (
                <button 
                  type="button"
                  key={item.key} 
                  role="checkbox"
                  aria-checked={activeModules[item.key]}
                  onClick={() => toggleModule(item.key)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    activeModules[item.key] 
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-500/50 dark:border-indigo-500/40 text-slate-900 dark:text-white' 
                      : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                      activeModules[item.key] ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {activeModules[item.key] && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{item.name}</p>
                      <p className="text-[11px] text-slate-400">{item.price}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono">
                    {activeModules[item.key] ? t('licensed') : t('inactive')}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('totalMonthlyCost')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    ${calculateMonthly().total}
                  </span>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">{calculateMonthly().discount}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowBundleModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
              >
                {t('saveSubscription')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIFIED SETTINGS MODAL */}
      <SettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

    </div>
  );
}

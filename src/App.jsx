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
  Building2,
} from 'lucide-react';
import SuiteWaffleMenu from './components/SuiteWaffleMenu';

// Configurable ecosystem app URLs with sensible production defaults
const MODULE_URLS = {
  invoicing: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
  intake: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
  scheduling: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
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
    // Reserved Emerald strictly for positive financial metric
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
  },
  {
    id: 2,
    module: 'intake',
    title: 'DM Quote Converted to Paid Deposit (RM 350.00)',
    desc: 'Threads inquiry from @studio_luxe approved Proposal #PR-89. Card charged on file.',
    timestamp: '14 mins ago',
    badge: 'Zero Ghosting',
    // Neutral slate for general operational badges
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  },
  {
    id: 3,
    module: 'scheduling',
    title: 'Shift Swap Auto-Approved',
    desc: 'Sarah T. swapped Sat Evening with Marcus B. Overtime guardrails verified: 0 hrs penalty.',
    timestamp: '32 mins ago',
    badge: 'Compliance Pass',
    // Neutral slate for general operational badges
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  },
  {
    id: 4,
    module: 'invoicing',
    title: 'Baucar Bayaran PV-2026-001 Dijana',
    desc: 'Bayaran Sewa Premis RM 3,200 dijana dan dimasukkan ke dalam Penyata Untung Rugi.',
    timestamp: '1 hour ago',
    badge: 'Baucar Bayaran',
    // Neutral slate for general operational badges
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  }
];

const DEMO_EVENTS_POOL = [
  {
    module: 'intake',
    title: 'Instagram DM Inquiry Auto-Parsed',
    desc: 'Client asking for 3-tier catering estimate. Interactive CPQ link dispatched.',
    badge: 'Intake Bot',
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  },
  {
    module: 'invoicing',
    title: 'Belian Stok Masuk Direkodkan (RM 5,550.00)',
    desc: 'Stok Injap Tembaga bertambah 300 pcs. Baki pemiutang auto-dikemaskini.',
    badge: 'Stok Masuk',
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  },
  {
    module: 'invoicing',
    title: 'Jualan POS Kaunter Lunas (RM 820.00)',
    desc: 'Resit QR DuitNow diterima. Baki tunai dan lejar untung rugi dikemaskini serta merta.',
    badge: 'Jualan Lunas',
    // Reserved Emerald strictly for positive financial metric
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
  },
  {
    module: 'scheduling',
    title: 'Kehadiran Staf Geo-Checkin Disahkan',
    desc: '4 staf premis log masuk shift pagi dalam radius geofence sah.',
    badge: 'Geo-Attendance',
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  },
  {
    module: 'intake',
    title: 'WhatsApp Dynamic Quote Diterima Pelanggan',
    desc: 'Pelanggan meluluskan sebut harga perkhidmatan melalui pautan interaktif.',
    badge: 'Quote Dilulus',
    color: 'text-slate-300 border-slate-700/80 bg-slate-800/60'
  }
];

export default function App() {
  const [liveFilter, setLiveFilter] = useState('all');
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [queuedEvents, setQueuedEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState(INITIAL_EVENTS);
  const isPausedRef = useRef(isPaused);

  const [activeModules, setActiveModules] = useState({
    invoicing: true,
    intake: true,
    scheduling: true,
    jmb: true,
    inventory: false
  });

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!showBundleModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowBundleModal(false);
      }
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
        // When paused, buffer incoming events to prevent layout jumps
        setQueuedEvents(prev => [newEvent, ...prev.slice(0, 19)]);
      } else {
        setRecentEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

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
    if (activeCount >= 3) return { total: 69, discount: '25% Bundle Savings' };
    return { total: activeCount * 29, discount: 'Standard A La Carte' };
  };

  const filteredEvents = liveFilter === 'all' 
    ? recentEvents 
    : recentEvents.filter(e => e.module === liveFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-white">EziBiz</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Hub</span>
                </div>
                <p className="text-xs text-slate-400">Autonomous Business Operations</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 motion-safe:animate-pulse"></span>
              <span>Workspace:</span>
              <span className="font-medium text-white">KakiTekno Global Inc.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setShowBundleModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium px-2.5 sm:px-3.5 py-2 rounded-lg bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/25 transition-all cursor-pointer min-h-[40px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="hidden sm:inline">Suite Entitlements (${calculateMonthly().total}/mo)</span>
              <span className="sm:hidden font-mono text-[11px]">${calculateMonthly().total}/mo</span>
            </button>

            <a 
              href="https://github.com/Amran-KakiTekno/ezibiz-hub" 
              target="_blank" 
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="hidden sm:flex p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>

            <div className="hidden sm:block h-4 w-px bg-slate-800"></div>

            <SuiteWaffleMenu currentApp="hub" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Banner / Mission */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Modular Micro-SaaS • Autonomous EziBiz Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Sistem Operasi & Perakaunan SME Bersepadu
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Kini dilengkapi modul <strong>Ezi-Akaun & Inventori</strong> (Jualan, Belian, Perbelanjaan, Baucar Bayaran, Kawalan Stok, P&L Bulanan & Kunci Kira-Kira).
            </p>
          </div>

          {/* Quick Metrics Bar - Emerald strictly reserved for revenue */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">Hasil Jualan (Gross)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-emerald-400 font-mono">RM 84,920</span>
                <span className="text-xs text-emerald-500 font-medium">+18.4%</span>
              </div>
              <p className="text-[11px] text-slate-500">Auto-update Penyata Untung Rugi</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">Nilaian Stok Semasa</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white font-mono">RM 32,850</span>
                <span className="text-xs text-slate-400 font-medium">4 Kategori</span>
              </div>
              <p className="text-[11px] text-slate-500">Auto-deduct daripada Jualan</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">Autonomous Workflows</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white font-mono">14 Active</span>
                <span className="text-xs text-slate-400 font-medium">100% SLA</span>
              </div>
              <p className="text-[11px] text-slate-500">DMs parsed & baucar bayaran</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">Suite Packaging</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-indigo-300 font-mono">3 / 4 Live</span>
                <span className="text-xs text-indigo-400 font-medium">25% Bundle</span>
              </div>
              <p className="text-[11px] text-slate-500">Composable micro-services</p>
            </div>
          </div>
        </div>

        {/* The Independent Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white tracking-tight">Ecosystem Modules</h2>
              <p className="text-xs text-slate-400">Deploy each module standalone or manage them collectively from this portal.</p>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">Isolated Repos • Cloudflare Edge</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Module 1: Ezi-Akaun */}
            <div className="group relative rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 p-5 flex flex-col justify-between space-y-5 focus-within:ring-2 focus-within:ring-indigo-500/60 focus-within:border-transparent cursor-pointer">
              {/* Primary surface link overlay */}
              <a 
                href={MODULE_URLS.akaun} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-0 rounded-xl focus:outline-none"
                aria-label="Buka Ezi-Akaun & Inventori App"
              />

              <div className="relative z-10 space-y-3 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
                    Live • Module 1
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    Ezi-Akaun & Inventori
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sistem perakaunan & kawalan stok SME lengkap: Rekod Jualan, Belian, Perbelanjaan, Baucar Bayaran, Penghutang/Pemiutang, P&L & Kunci Kira-Kira.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Nilaian Stok Semasa:</span>
                    <span className="font-mono text-slate-200 font-medium">RM 32,850.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status Kunci Kira-Kira:</span>
                    <span className="text-slate-300 font-medium">Imbang Tepat</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Buka Ezi-Akaun App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-akaun" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pointer-events-auto text-slate-500 hover:text-slate-300 text-xs transition-colors p-1 -m-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Module 2: CRMS / Intake */}
            <div className="group relative rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 p-5 flex flex-col justify-between space-y-5 focus-within:ring-2 focus-within:ring-indigo-500/60 focus-within:border-transparent cursor-pointer">
              {/* Primary surface link overlay */}
              <a 
                href={MODULE_URLS.crms} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-0 rounded-xl focus:outline-none"
                aria-label="Launch Conversational CRMS & Quotes App"
              />

              <div className="relative z-10 space-y-3 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 flex items-center justify-center">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
                    Live • Module 2
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    Conversational CRMS & Quotes
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Turns messy Instagram/Threads DMs and WhatsApp inquiries into dynamic quotes with card-on-file deposit gating. Zero ghosting.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Inquiries Ingested:</span>
                    <span className="font-mono text-slate-200 font-medium">38 conversations</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Quotes Auto-Generated:</span>
                    <span className="text-slate-300 font-medium">RM 14,250 locked</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Launch CRMS App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-crms" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pointer-events-auto text-slate-500 hover:text-slate-300 text-xs transition-colors p-1 -m-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Module 3: HRMS / Scheduling */}
            <div className="group relative rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 p-5 flex flex-col justify-between space-y-5 focus-within:ring-2 focus-within:ring-indigo-500/60 focus-within:border-transparent cursor-pointer">
              {/* Primary surface link overlay */}
              <a 
                href={MODULE_URLS.hrms} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-0 rounded-xl focus:outline-none"
                aria-label="Launch Workforce & HRMS Operations App"
              />

              <div className="relative z-10 space-y-3 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 flex items-center justify-center">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
                    Live • Module 3
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    Workforce & HRMS Operations
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    All-in-one team ops: smart shift rosters, peer swaps, mobile geo-attendance, leave/MC approval, employee credentials, and automated payroll runs.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Active Enrolled Staff:</span>
                    <span className="font-mono text-slate-200 font-medium">16 team members</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Overtime Violations:</span>
                    <span className="text-slate-300 font-medium">0 hrs blocked</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Launch HRMS App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-hrms" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pointer-events-auto text-slate-500 hover:text-slate-300 text-xs transition-colors p-1 -m-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Module 4: EziBiz JMB (Komuniti) */}
            <div className="group relative rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200 p-5 flex flex-col justify-between space-y-5 focus-within:ring-2 focus-within:ring-amber-500/60 focus-within:border-transparent cursor-pointer">
              {/* Primary surface link overlay */}
              <a 
                href={MODULE_URLS.jmb} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-0 rounded-xl focus:outline-none"
                aria-label="Launch EziBiz JMB Strata Management App"
              />

              <div className="relative z-10 space-y-3 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                    Live • Module 4
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    EziBiz JMB (Komuniti)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sistem strata perumahan lengkap: Kutipan yuran, lejar telus Sinking Fund, notis statutori Borang 28, palang RFID, dan Pasar Komuniti.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Kadar Kutipan Semasa:</span>
                    <span className="font-mono text-emerald-400 font-medium">91.4% Lunas</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Rizab Sinking Fund:</span>
                    <span className="font-mono text-amber-400 font-medium">RM 184,500</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                  <span>Launch JMB App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-jmb" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="pointer-events-auto text-slate-500 hover:text-slate-300 text-xs transition-colors p-1 -m-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub Repo
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Global Cross-Module Activity Event Stream */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-semibold text-white">Cross-Module Real-Time Event Bus</h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isPaused 
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' 
                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                }`}>
                  {isPaused ? 'Paused' : 'Streaming'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulating the central event stream connecting isolated repositories asynchronously.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filters */}
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
                {['all', 'invoicing', 'intake', 'scheduling', 'jmb'].map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLiveFilter(key)}
                    className={`text-xs capitalize px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      liveFilter === key 
                        ? 'bg-slate-800 text-white font-medium shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Stream Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePause}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isPaused
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                  title={isPaused ? 'Resume live ticker' : 'Pause live ticker'}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pause</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearFeed}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-rose-400 hover:border-rose-900/40 transition-colors cursor-pointer"
                  title="Clear all events from display"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>

                <button
                  type="button"
                  onClick={resetFeed}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
                  title="Reset feed to default events"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Subtle New Events Available Badge when Paused */}
          {queuedEvents.length > 0 && (
            <div className="py-1 flex justify-center">
              <button
                type="button"
                onClick={showQueuedEvents}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all shadow-sm cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 motion-safe:animate-pulse" />
                <span>
                  {queuedEvents.length === 1 
                    ? '1 new event available (Click to show)' 
                    : `${queuedEvents.length} new events available (Click to show)`}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}

          <div className="divide-y divide-slate-800/80">
            {filteredEvents.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-xs text-slate-500">
                  {recentEvents.length === 0 
                    ? 'Feed has been cleared. No events to display.' 
                    : `No events found for module "${liveFilter}".`}
                </p>
                {recentEvents.length === 0 && (
                  <button
                    type="button"
                    onClick={resetFeed}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Sample Events</span>
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
                  className="group py-3.5 px-3 -mx-3 rounded-lg flex items-start justify-between gap-4 text-xs transition-colors hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${event.color}`}>
                        {event.badge}
                      </span>
                      <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-slate-400">{event.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <span className="text-slate-500 font-mono whitespace-nowrap">{event.timestamp}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </a>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Bundle Manager Modal */}
      {showBundleModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bundle-modal-title"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 id="bundle-modal-title" className="font-bold text-lg text-white">Module Entitlements & Pricing</h3>
              </div>
              <button 
                onClick={() => setShowBundleModal(false)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Customers can pick and choose individual micro-products for $29/mo each, or unlock the unified EziBiz Suite bundle at a 25% discount.
            </p>

            <div className="space-y-3">
              {[
                { key: 'invoicing', name: 'Ezi-Akaun & Inventori', price: '$29/mo' },
                { key: 'intake', name: 'Conversational CRMS & Quotes', price: '$29/mo' },
                { key: 'scheduling', name: 'HRMS & Workforce Ops', price: '$29/mo' },
                { key: 'jmb', name: 'EziBiz JMB & Komuniti', price: '$29/mo' },
                { key: 'inventory', name: 'Multi-Channel Inventory (Beta)', price: '$29/mo' }
              ].map(item => (
                <button 
                  type="button"
                  key={item.key} 
                  role="checkbox"
                  aria-checked={activeModules[item.key]}
                  onClick={() => toggleModule(item.key)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    activeModules[item.key] 
                      ? 'bg-indigo-950/20 border-indigo-500/40 text-white' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                      activeModules[item.key] ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                    }`}>
                      {activeModules[item.key] && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-[11px] text-slate-500">{item.price}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono">
                    {activeModules[item.key] ? 'Licensed' : 'Inactive'}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Monthly Cost:</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-white">${calculateMonthly().total}</span>
                  <span className="text-xs text-indigo-400">{calculateMonthly().discount}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowBundleModal(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 transition-colors"
              >
                Save Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EziBiz Platform • Built for @Amran-KakiTekno • Zero Cost Cloudflare Edge Deployment</p>
          <div className="flex items-center gap-4">
            <span>React 18 + Vite + Tailwind</span>
            <span>•</span>
            <span>Cloudflare Pages</span>
            <span>•</span>
            <span>Multi-Repo Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

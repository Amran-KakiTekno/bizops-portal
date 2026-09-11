import React, { useState, useEffect } from 'react';
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
  DollarSign
} from 'lucide-react';

export default function App() {
  const [liveFilter, setLiveFilter] = useState('all');
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [activeModules, setActiveModules] = useState({
    invoicing: true,
    intake: true,
    scheduling: true,
    inventory: false
  });

  const [recentEvents, setRecentEvents] = useState([
    {
      id: 1,
      module: 'invoicing',
      title: 'Jualan Direkodkan & Stok Ditolak (RM 4,500.00)',
      desc: 'Invois INV-2026-001 lunas via Maybank. Stok Silinder Gas tolak 25 unit.',
      timestamp: '2 mins ago',
      badge: 'Jualan Lunas',
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
    },
    {
      id: 2,
      module: 'intake',
      title: 'DM Quote Converted to Paid Deposit (RM 350.00)',
      desc: 'Threads inquiry from @studio_luxe approved Proposal #PR-89. Card charged on file.',
      timestamp: '14 mins ago',
      badge: 'Zero Ghosting',
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10'
    },
    {
      id: 3,
      module: 'scheduling',
      title: 'Shift Swap Auto-Approved',
      desc: 'Sarah T. swapped Sat Evening with Marcus B. Overtime guardrails verified: 0 hrs penalty.',
      timestamp: '32 mins ago',
      badge: 'Compliance Pass',
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10'
    },
    {
      id: 4,
      module: 'invoicing',
      title: 'Baucar Bayaran PV-2026-001 Dijana',
      desc: 'Bayaran Sewa Premis RM 3,200 dijana dan dimasukkan ke dalam Penyata Untung Rugi.',
      timestamp: '1 hour ago',
      badge: 'Baucar Bayaran',
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/10'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const demoEvents = [
        {
          id: Date.now(),
          module: 'intake',
          title: 'Instagram DM Inquiry Auto-Parsed',
          desc: 'Client asking for 3-tier catering estimate. Interactive CPQ link dispatched.',
          timestamp: 'Just now',
          badge: 'Intake Bot',
          color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10'
        },
        {
          id: Date.now() + 1,
          module: 'invoicing',
          title: 'Belian Stok Masuk Direkodkan (RM 5,550.00)',
          desc: 'Stok Injap Tembaga bertambah 300 pcs. Baki pemiutang auto-dikemaskini.',
          timestamp: 'Just now',
          badge: 'Stok Masuk',
          color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10'
        }
      ];
      const randomEvent = demoEvents[Math.floor(Math.random() * demoEvents.length)];
      setRecentEvents(prev => [randomEvent, ...prev.slice(0, 7)]);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Workspace:</span>
              <span className="font-medium text-white">KakiTekno Global Inc.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowBundleModal(true)}
              className="flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/25 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Suite Entitlements (${calculateMonthly().total}/mo)</span>
            </button>

            <a 
              href="https://github.com/Amran-KakiTekno/ezibiz-hub" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
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

          {/* Quick Metrics Bar */}
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
                <span className="text-xl font-bold text-cyan-300 font-mono">RM 32,850</span>
                <span className="text-xs text-cyan-400 font-medium">4 Kategori</span>
              </div>
              <p className="text-[11px] text-slate-500">Auto-deduct daripada Jualan</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">Autonomous Workflows</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white font-mono">14 Active</span>
                <span className="text-xs text-emerald-400 font-medium">100% SLA</span>
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
            <span className="text-xs text-slate-500 font-mono">Isolated Repos • Cloudflare Edge</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Module 1: Ezi-Akaun */}
            <div className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live • Module 1
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    Ezi-Akaun & Inventori
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sistem perakaunan & kawalan stok SME lengkap: Rekod Jualan, Belian, Perbelanjaan, Baucar Bayaran, Penghutang/Pemiutang, P&L & Kunci Kira-Kira.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Nilaian Stok Semasa:</span>
                    <span className="font-mono text-cyan-300 font-medium">RM 32,850.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status Kunci Kira-Kira:</span>
                    <span className="text-emerald-400 font-medium">Imbang Tepat</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <a 
                  href="https://ezibiz-akaun.pages.dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Buka Ezi-Akaun App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-akaun" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-500 hover:text-slate-300 text-xs"
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Module 2: Intake */}
            <div className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Live • Module 2
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Conversational CRMS & Quotes
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Turns messy Instagram/Threads DMs and WhatsApp inquiries into dynamic quotes with card-on-file deposit gating. Zero ghosting.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Inquiries Ingested:</span>
                    <span className="font-mono text-white font-medium">38 conversations</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Quotes Auto-Generated:</span>
                    <span className="text-indigo-400 font-medium">RM 14,250 locked</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <a 
                  href="https://ezibiz-crms.pages.dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Launch CRMS App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-crms" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-500 hover:text-slate-300 text-xs"
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Module 3: Scheduling */}
            <div className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Live • Module 3
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Workforce & HRMS Operations
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    All-in-one team ops: smart shift rosters, peer swaps, mobile geo-attendance, leave/MC approval, employee credentials, and automated payroll runs.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Active Enrolled Staff:</span>
                    <span className="font-mono text-white font-medium">16 team members</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Overtime Violations:</span>
                    <span className="text-cyan-400 font-medium">0 hrs blocked</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <a 
                  href="https://ezibiz-hrms.pages.dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Launch HRMS App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com/Amran-KakiTekno/ezibiz-hrms" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-500 hover:text-slate-300 text-xs"
                >
                  GitHub Repo
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Global Cross-Module Activity Event Stream */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-semibold text-white">Cross-Module Real-Time Event Bus</h3>
              </div>
              <p className="text-xs text-slate-400">Simulating the central event stream connecting isolated repositories asynchronously.</p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'invoicing', 'intake', 'scheduling'].map(key => (
                <button
                  key={key}
                  onClick={() => setLiveFilter(key)}
                  className={`text-xs capitalize px-3 py-1.5 rounded-lg border transition-all ${
                    liveFilter === key 
                      ? 'bg-slate-800 text-white border-slate-700 font-medium' 
                      : 'text-slate-400 border-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredEvents.map(event => (
              <div key={event.id} className="py-3.5 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${event.color}`}>
                      {event.badge}
                    </span>
                    <span className="font-semibold text-white">{event.title}</span>
                  </div>
                  <p className="text-slate-400">{event.desc}</p>
                </div>
                <span className="text-slate-500 font-mono whitespace-nowrap">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Bundle Manager Modal */}
      {showBundleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">Module Entitlements & Pricing</h3>
              </div>
              <button 
                onClick={() => setShowBundleModal(false)}
                className="text-slate-400 hover:text-white text-sm"
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
                { key: 'inventory', name: 'Multi-Channel Inventory (Beta)', price: '$29/mo' }
              ].map(item => (
                <div 
                  key={item.key} 
                  onClick={() => toggleModule(item.key)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    activeModules[item.key] 
                      ? 'bg-indigo-950/20 border-indigo-500/40 text-white' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-400'
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
                </div>
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

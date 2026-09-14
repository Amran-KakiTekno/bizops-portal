import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Receipt, 
  MessageSquareText, 
  Users, 
  Building2, 
  ExternalLink, 
  Check, 
  Settings, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import ProductDetailPage from './components/ProductDetailPage';
import AkaunVisualPreview from './components/previews/AkaunVisualPreview';
import CrmsVisualPreview from './components/previews/CrmsVisualPreview';
import HrmsVisualPreview from './components/previews/HrmsVisualPreview';
import JmbVisualPreview from './components/previews/JmbVisualPreview';
import { useSettings } from './utils/useSettings';

const MODULE_URLS = {
  akaun: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
  crms: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
  hrms: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
  jmb: import.meta.env.VITE_JMB_URL || 'https://ezibiz-jmb.pages.dev'
};

export default function App() {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('product');
      if (param && ['akaun', 'crms', 'hrms', 'jmb'].includes(param)) {
        return param;
      }
    }
    return 'directory';
  });

  const navigateTo = (view) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (view === 'directory') {
        url.searchParams.delete('product');
      } else {
        url.searchParams.set('product', view);
      }
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const param = new URLSearchParams(window.location.search).get('product');
      if (param && ['akaun', 'crms', 'hrms', 'jmb'].includes(param)) {
        setActiveView(param);
      } else {
        setActiveView('directory');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const products = [
    {
      id: 'akaun',
      category: 'finance',
      name: t('akaunName'),
      tagline: t('akaunTagline'),
      audience: t('akaunAudience'),
      summary: t('akaunSummary'),
      icon: Receipt,
      accentColor: 'emerald',
      badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
      preview: <AkaunVisualPreview isCompact={true} />,
      points: [t('akaunPoint1Title'), t('akaunPoint2Title'), t('akaunPoint3Title')]
    },
    {
      id: 'crms',
      category: 'sales',
      name: t('crmsName'),
      tagline: t('crmsTagline'),
      audience: t('crmsAudience'),
      summary: t('crmsSummary'),
      icon: MessageSquareText,
      accentColor: 'indigo',
      badgeClass: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
      preview: <CrmsVisualPreview isCompact={true} />,
      points: [t('crmsPoint1Title'), t('crmsPoint2Title'), t('crmsPoint3Title')]
    },
    {
      id: 'hrms',
      category: 'hr',
      name: t('hrmsName'),
      tagline: t('hrmsTagline'),
      audience: t('hrmsAudience'),
      summary: t('hrmsSummary'),
      icon: Users,
      accentColor: 'cyan',
      badgeClass: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
      preview: <HrmsVisualPreview isCompact={true} />,
      points: [t('hrmsPoint1Title'), t('hrmsPoint2Title'), t('hrmsPoint3Title')]
    },
    {
      id: 'jmb',
      category: 'property',
      name: t('jmbName'),
      tagline: t('jmbTagline'),
      audience: t('jmbAudience'),
      summary: t('jmbSummary'),
      icon: Building2,
      accentColor: 'amber',
      badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
      preview: <JmbVisualPreview isCompact={true} />,
      points: [t('jmbPoint1Title'), t('jmbPoint2Title'), t('jmbPoint3Title')]
    }
  ];

  const filteredProducts = products.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-indigo-500/20">
      {/* STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigateTo('directory')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight block">
                  {t('brandName')}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                  {t('directoryTitle')}
                </span>
              </div>
            </button>

            {/* Quick Product Tabs (Visible on large screens) */}
            <nav className="hidden lg:flex items-center gap-1 pl-4 border-l border-slate-200 dark:border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => navigateTo('directory')}
                aria-current={activeView === 'directory' ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeView === 'directory'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('allProducts')}
              </button>
              {products.map(prod => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => navigateTo(prod.id)}
                  aria-current={activeView === prod.id ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeView === prod.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {prod.name.split(' ')[1]}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('independentBadge')}</span>
            </span>

            {/* Language quick switcher */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'ms' ? 'en' : 'ms')}
              className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer min-h-[36px]"
              title="Tukar Bahasa / Switch Language"
            >
              {language === 'ms' ? 'EN' : 'BM'}
            </button>

            {/* Settings Trigger */}
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label={t('settings')}
              title={t('settings')}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeView !== 'directory' ? (
          /* DEDICATED PRODUCT SHOWCASE PAGE */
          <ProductDetailPage 
            productId={activeView} 
            onBack={() => navigateTo('directory')} 
            t={t} 
            url={MODULE_URLS[activeView]} 
          />
        ) : (
          /* MASTER DIRECTORY VIEW */
          <div className="space-y-12">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-2 pb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t('heroTitle')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>

              {/* Category Filter Chips */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'all', label: t('catAll') },
                  { id: 'finance', label: t('catFinance') },
                  { id: 'sales', label: t('catSales') },
                  { id: 'hr', label: t('catHr') },
                  { id: 'property', label: t('catProperty') }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    aria-pressed={categoryFilter === cat.id}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT CARDS SHOWCASE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProducts.map(prod => {
                const Icon = prod.icon;
                return (
                  <div 
                    key={prod.id}
                    className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Visual Interface Preview Banner */}
                    <div className="p-3 sm:p-4 bg-slate-100/60 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80">
                      {prod.preview}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${prod.badgeClass}`}>
                            {prod.audience}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            Sistem Berasingan
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${prod.badgeClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                              {prod.name}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {prod.tagline}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {prod.summary}
                        </p>

                        {/* 3 Core Points */}
                        <div className="space-y-1.5 pt-2">
                          {prod.points.map((pt, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => navigateTo(prod.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer py-2"
                        >
                          <span>{t('quickTour')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={MODULE_URLS[prod.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer ${prod.buttonBg}`}
                        >
                          <span>{t('launchStandaloneApp')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WHY STANDALONE SECTION */}
            <div className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 space-y-8">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  {t('independentBadge')}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {t('whyStandaloneTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {t('whyStandaloneSub')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t('adv1Title')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('adv1Desc')}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t('adv2Title')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('adv2Desc')}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t('adv3Title')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('adv3Desc')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>{t('footerCopyright')}</p>
      </footer>

      {/* SETTINGS MODAL */}
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

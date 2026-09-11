import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Layers, Receipt, MessageSquareText, Users, Check, ExternalLink, Building2 } from 'lucide-react';

const APPS = [
  {
    id: 'hub',
    name: 'EziBiz Hub',
    tagline: 'Central Operations Portal',
    url: import.meta.env.VITE_HUB_URL || 'https://ezibiz-hub.pages.dev',
    icon: Layers,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40'
  },
  {
    id: 'akaun',
    name: 'EziBiz Akaun',
    tagline: 'SME Accounting & Inventory',
    url: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
    icon: Receipt,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40'
  },
  {
    id: 'crms',
    name: 'EziBiz CRMS',
    tagline: 'Conversational Intake & CPQ',
    url: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
    icon: MessageSquareText,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40'
  },
  {
    id: 'hrms',
    name: 'EziBiz HRMS',
    tagline: 'Workforce & Mobile ESS',
    url: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
    icon: Users,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40'
  },
  {
    id: 'jmb',
    name: 'EziBiz JMB',
    tagline: 'Strata & Resident Komuniti',
    url: import.meta.env.VITE_JMB_URL || 'https://ezibiz-jmb.pages.dev',
    icon: Building2,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40'
  }
];

export default function SuiteWaffleMenu({ currentApp = 'hub' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Suite App Switcher"
        title="Suite App Switcher"
        className={`min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          isOpen ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-slate-800/80 mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              EziBiz Suite Apps
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              4 Modules
            </span>
          </div>

          <div className="space-y-1">
            {APPS.map(app => {
              const isCurrent = app.id === currentApp;
              const Icon = app.icon;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  className={`flex items-center justify-between p-2.5 min-h-[48px] rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-800/90 border-slate-700 shadow-sm'
                      : 'border-transparent hover:bg-slate-800/50 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${app.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{app.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{app.tagline}</p>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium shrink-0 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Current
                    </span>
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

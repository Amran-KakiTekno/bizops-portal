import React from 'react';
import { 
  Layers, 
  Boxes, 
  Activity, 
  Sparkles, 
  Settings, 
  Receipt, 
  MessageSquare, 
  Users, 
  Building2, 
  ChevronDown,
  ShieldCheck,
  ExternalLink,
  Code2
} from 'lucide-react';
import SuiteWaffleMenu from './SuiteWaffleMenu';

export default function SidebarShell({
  activeNavTab,
  onSelectNavTab,
  onOpenSettings,
  onOpenBundleModal,
  calculateMonthly,
  t
}) {
  const externalApps = [
    {
      id: 'akaun',
      name: 'EziBiz Akaun',
      tag: 'Finance (RM)',
      url: import.meta.env.VITE_AKAUN_URL || 'https://ezibiz-akaun.pages.dev',
      dotColor: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
      icon: Receipt
    },
    {
      id: 'crms',
      name: 'EziBiz CRMS',
      tag: 'Sales & CPQ',
      url: import.meta.env.VITE_CRMS_URL || 'https://ezibiz-crms.pages.dev',
      dotColor: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]',
      icon: MessageSquare
    },
    {
      id: 'hrms',
      name: 'EziBiz HRMS',
      tag: 'Workforce',
      url: import.meta.env.VITE_HRMS_URL || 'https://ezibiz-hrms.pages.dev',
      dotColor: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]',
      icon: Users
    },
    {
      id: 'jmb',
      name: 'EziBiz JMB',
      tag: 'Strata 757',
      url: import.meta.env.VITE_JMB_URL || 'https://ezibiz-jmb.pages.dev',
      dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
      icon: Building2
    }
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-black/90 backdrop-blur-xl border-r border-white/[0.08] text-zinc-300 select-none">
      <div className="flex flex-col h-full justify-between p-4 space-y-4">
        
        {/* Top: Logo & Workspace */}
        <div className="space-y-5">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-1.5 pt-1">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md shadow-white/10 text-black shrink-0 font-black">
              <Layers className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">
                  {t('suiteTitle') || 'EziBiz'}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                  {t('hubTitle') || 'Hub'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate">
                {t('tagline') || 'Unified Operations'}
              </p>
            </div>
          </div>

          {/* Workspace Switcher / Badge */}
          <div className="px-3 py-2.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim flex items-center justify-between group hover:border-white/20 transition-colors cursor-pointer">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t('workspace') || 'Workspace'}</span>
              </div>
              <p className="text-xs font-medium text-zinc-200 truncate mt-0.5">
                KakiTekno Global Inc.
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          </div>

          {/* Group 1: BROWSE */}
          <div className="space-y-1">
            <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Browse
            </div>
            {[
              { id: 'overview', label: t('navOverview') || 'Dashboard', icon: Layers },
              { id: 'modules', label: t('navModules') || 'App Ecosystem', icon: Boxes },
              { id: 'events', label: t('navEvents') || 'Real-Time Feed', icon: Activity }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectNavTab(item.id);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold border border-white/10 shadow-rim'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="sidebar-active-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Group 2: APPS & ECOSYSTEM */}
          <div className="space-y-1 pt-2 border-t border-white/[0.06]">
            <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Apps & Micro-Frontends
            </div>
            {externalApps.map(app => {
              const Icon = app.icon;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all group"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
                    <span className="truncate">{app.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${app.dotColor}`} />
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="space-y-2 pt-3 border-t border-white/[0.06]">
          {/* Entitlements Button */}
          <button
            onClick={onOpenBundleModal}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim hover:border-white/20 text-xs transition-colors cursor-pointer text-zinc-200"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t('suiteEntitlements') || 'Suite Pro'}</span>
            </span>
            <span className="font-mono text-zinc-300 font-semibold">${calculateMonthly().total}/mo</span>
          </button>

          {/* Quick Actions Row */}
          <div className="flex items-center justify-between px-1 pt-1">
            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors cursor-pointer"
              title={t('settings') || 'Settings'}
            >
              <Settings className="w-4 h-4 text-zinc-500" />
              <span>{t('settings') || 'Settings'}</span>
            </button>

            <div className="flex items-center gap-1">
              <SuiteWaffleMenu currentApp="hub" />
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

import React from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MessageCircle, 
  Building2, 
  Receipt, 
  Users, 
  MessageSquareText, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import AkaunVisualPreview from './previews/AkaunVisualPreview';
import CrmsVisualPreview from './previews/CrmsVisualPreview';
import HrmsVisualPreview from './previews/HrmsVisualPreview';
import JmbVisualPreview from './previews/JmbVisualPreview';

export default function ProductDetailPage({ productId, onBack, t, url }) {
  const config = {
    akaun: {
      name: t('akaunName'),
      tagline: t('akaunTagline'),
      audience: t('akaunAudience'),
      summary: t('akaunSummary'),
      quote: t('akaunQuote'),
      quoteSource: t('akaunQuoteSource'),
      caseTitle: t('akaunCaseTitle'),
      caseBefore: t('akaunCaseBefore'),
      caseAfter: t('akaunCaseAfter'),
      points: [
        { title: t('akaunPoint1Title'), desc: t('akaunPoint1Desc') },
        { title: t('akaunPoint2Title'), desc: t('akaunPoint2Desc') },
        { title: t('akaunPoint3Title'), desc: t('akaunPoint3Desc') },
        { title: t('akaunPoint4Title'), desc: t('akaunPoint4Desc') }
      ],
      icon: Receipt,
      accentColor: 'emerald',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
      preview: <AkaunVisualPreview t={t} />
    },
    crms: {
      name: t('crmsName'),
      tagline: t('crmsTagline'),
      audience: t('crmsAudience'),
      summary: t('crmsSummary'),
      quote: t('crmsQuote'),
      quoteSource: t('crmsQuoteSource'),
      caseTitle: t('crmsCaseTitle'),
      caseBefore: t('crmsCaseBefore'),
      caseAfter: t('crmsCaseAfter'),
      points: [
        { title: t('crmsPoint1Title'), desc: t('crmsPoint1Desc') },
        { title: t('crmsPoint2Title'), desc: t('crmsPoint2Desc') },
        { title: t('crmsPoint3Title'), desc: t('crmsPoint3Desc') },
        { title: t('crmsPoint4Title'), desc: t('crmsPoint4Desc') }
      ],
      icon: MessageSquareText,
      accentColor: 'indigo',
      accentBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
      preview: <CrmsVisualPreview />
    },
    hrms: {
      name: t('hrmsName'),
      tagline: t('hrmsTagline'),
      audience: t('hrmsAudience'),
      summary: t('hrmsSummary'),
      quote: t('hrmsQuote'),
      quoteSource: t('hrmsQuoteSource'),
      caseTitle: t('hrmsCaseTitle'),
      caseBefore: t('hrmsCaseBefore'),
      caseAfter: t('hrmsCaseAfter'),
      points: [
        { title: t('hrmsPoint1Title'), desc: t('hrmsPoint1Desc') },
        { title: t('hrmsPoint2Title'), desc: t('hrmsPoint2Desc') },
        { title: t('hrmsPoint3Title'), desc: t('hrmsPoint3Desc') },
        { title: t('hrmsPoint4Title'), desc: t('hrmsPoint4Desc') }
      ],
      icon: Users,
      accentColor: 'cyan',
      accentBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
      preview: <HrmsVisualPreview />
    },
    jmb: {
      name: t('jmbName'),
      tagline: t('jmbTagline'),
      audience: t('jmbAudience'),
      summary: t('jmbSummary'),
      quote: t('jmbQuote'),
      quoteSource: t('jmbQuoteSource'),
      caseTitle: t('jmbCaseTitle'),
      caseBefore: t('jmbCaseBefore'),
      caseAfter: t('jmbCaseAfter'),
      points: [
        { title: t('jmbPoint1Title'), desc: t('jmbPoint1Desc') },
        { title: t('jmbPoint2Title'), desc: t('jmbPoint2Desc') },
        { title: t('jmbPoint3Title'), desc: t('jmbPoint3Desc') },
        { title: t('jmbPoint4Title'), desc: t('jmbPoint4Desc') }
      ],
      icon: Building2,
      accentColor: 'amber',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
      preview: <JmbVisualPreview />
    }
  };

  const item = config[productId] || config.akaun;
  const Icon = item.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('backToDirectory')}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{item.audience}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${item.accentBg}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {item.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400">
                {item.tagline}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {item.summary}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer ${item.buttonBg}`}
            >
              <span>{t('launchStandaloneApp')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t('noCreditCard')}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Interface Preview Showcase */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('directoryTitle')} • Visual Preview
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> {t('independentBadge')}
          </span>
        </div>
        {item.preview}
      </div>

      {/* Social Media Pain Point Card */}
      <div className="rounded-2xl p-6 sm:p-7 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-slate-900 dark:text-slate-100 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                {t('thePainPoint')}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {item.quoteSource}
              </span>
            </div>
            <blockquote className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 italic leading-snug">
              {item.quote}
            </blockquote>
          </div>
        </div>
      </div>

      {/* Real-World Case Study: Before & After */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            {t('realWorldStory')}
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {item.caseTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              <span>{t('beforeEziBiz')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {item.caseBefore}
            </p>
          </div>

          {/* After */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('afterEziBiz')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {item.caseAfter}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Practical Value Points */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white px-1">
          {t('howItWorks')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.points.map((pt, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {pt.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-8 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-950 border border-slate-800 text-center text-white space-y-4 shadow-xl">
        <h3 className="text-xl font-bold">{t('readyToTry')}</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {item.summary}
        </p>
        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg cursor-pointer ${item.buttonBg}`}
          >
            <span>{t('launchAppNow')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

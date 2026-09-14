import React from 'react';
import { Receipt, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, Printer, ArrowUpRight } from 'lucide-react';

export default function AkaunVisualPreview({ isCompact = false, t = (k) => k }) {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/20 text-slate-100 p-4 sm:p-5 shadow-2xl relative overflow-hidden font-sans select-none">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">EziBiz Akaun & Stok</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {t('previewLiveOverview')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">{t('previewAkaunDesc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Stok Terkawal</span>
        </div>
      </div>

      {/* Mini KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Jumlah Jualan</span>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">RM 45,280.00</div>
          <span className="text-[9px] text-emerald-500 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> +18.4% bulan ini
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Nilai Stok Stor</span>
          <div className="text-sm sm:text-base font-bold text-slate-200 font-mono mt-0.5">RM 18,450.00</div>
          <span className="text-[9px] text-slate-400">142 Barangan Aktif</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Baki Hutang Pelanggan</span>
          <div className="text-sm sm:text-base font-bold text-amber-400 font-mono mt-0.5">RM 2,150.00</div>
          <span className="text-[9px] text-amber-400/90">3 Pelanggan Lewat</span>
        </div>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Real-Time Stock Depletion Table */}
          <div className="sm:col-span-7 rounded-xl bg-slate-900/70 border border-slate-800/80 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Borang Jualan & Penolakan Stok Automatik</span>
              <span className="text-[10px] text-slate-400 font-mono">Pencegah Stok Negatif</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <span className="font-semibold text-slate-200 block">Silinder Gas Industri 14kg</span>
                  <span className="text-[10px] text-slate-400 font-mono">Baki: 55 unit (Harga: RM 180.00)</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Stok Cukup
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <span className="font-semibold text-slate-200 block">Injap Tembaga Heavy Duty</span>
                  <span className="text-[10px] text-slate-400 font-mono">Baki: 8 unit (Kritikal &lt; 20)</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <AlertTriangle className="w-3 h-3" /> Perlu Tambah
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Official A4 Voucher / Invoice Snapshot */}
          <div className="sm:col-span-5 rounded-xl bg-slate-950 border border-emerald-500/30 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="font-mono text-emerald-400 font-bold">INV-2026-042</span>
                <span className="text-[10px] text-slate-400">Resit Rasmi Lunas</span>
              </div>
              <div className="py-2.5 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Pelanggan:</span>
                  <span className="font-semibold text-white">Bengkel Maju Jaya</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Kaedah Bayaran:</span>
                  <span className="text-emerald-400 font-mono">DuitNow QR / Instant</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800/60">
                  <span>Jumlah Bersih:</span>
                  <span className="font-mono text-emerald-400">RM 1,260.00</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Printer className="w-3 h-3 text-emerald-400" /> Format Cetak A4 Kemas
              </span>
              <span className="font-mono text-emerald-400">1-Klik PDF</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating feature pills footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Tiada lagi isu terlebih jual stok (overselling)
        </span>
        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">
          Sesuai untuk Kedai Runcit, Borong & SME
        </span>
      </div>
    </div>
  );
}

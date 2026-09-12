import React from 'react';
import { Building2, QrCode, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Wallet } from 'lucide-react';

export default function JmbVisualPreview({ isCompact = false }) {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/20 text-slate-100 p-4 sm:p-5 shadow-2xl relative overflow-hidden font-sans select-none">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">EziBiz JMB & Komuniti Strata</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Akta 757
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Kutipan Yuran Penyelenggaraan, DuitNow QR & Ketelusan Wang Tabung</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Wang Tabung Telus</span>
        </div>
      </div>

      {/* Mini Unit Collection Status Grid */}
      <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 mb-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-2">
          <span>Status Pembayaran Unit (Blok A, Tingkat 14)</span>
          <span className="text-amber-400 font-mono">94% Lunas Bulan Ini</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 text-center font-mono text-[10px]">
          <div className="p-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            A-14-01<br/><span className="text-[9px] text-emerald-400">Lunas</span>
          </div>
          <div className="p-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            A-14-02<br/><span className="text-[9px] text-emerald-400">Lunas</span>
          </div>
          <div className="p-1.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
            A-14-03<br/><span className="text-[9px] text-amber-400">Terkini</span>
          </div>
          <div className="p-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            A-14-04<br/><span className="text-[9px] text-emerald-400">Lunas</span>
          </div>
          <div className="p-1.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300">
            A-14-05<br/><span className="text-[9px] text-rose-400">Lewat</span>
          </div>
          <div className="p-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            A-14-06<br/><span className="text-[9px] text-emerald-400">Lunas</span>
          </div>
        </div>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Instant DuitNow QR Digital Bill */}
          <div className="sm:col-span-6 rounded-xl bg-slate-900/70 border border-slate-800/80 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px]">
                <span className="font-semibold text-slate-300">Invois Bulanan Unit: A-14-03</span>
                <span className="text-amber-400 font-mono font-bold">RM 280.00</span>
              </div>
              <div className="py-2 flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[11px] space-y-1">
                  <div className="font-bold text-white">DuitNow QR Rasmi JMB</div>
                  <p className="text-[10px] text-slate-400">
                    Penduduk hanya imbas dan bayar. Resit digital terus dikeluarkan secara automatik.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800/60 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Resit Sah Diemelkan
              </span>
              <span className="font-mono">Tiada Slip Kertas Hilang</span>
            </div>
          </div>

          {/* Transparent Sinking Fund Card */}
          <div className="sm:col-span-6 rounded-xl bg-slate-950 border border-amber-500/30 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-amber-400" /> Wang Tabung & Penyelenggaraan
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Audit Bersih</span>
              </div>
              <div className="py-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Baki Tabung Sinking Fund:</span>
                  <span className="font-mono text-amber-300 font-bold">RM 148,250.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Servis Lif Bulanan (Kontrak):</span>
                  <span className="font-mono text-slate-300">- RM 4,200.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Kutipan Semasa September:</span>
                  <span className="font-mono text-emerald-400">+ RM 38,400.00</span>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] text-center font-semibold">
              Semua pemilik boleh lihat ke mana duit mereka dibelanjakan.
            </div>
          </div>
        </div>
      )}

      {/* Floating feature pills footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Tiada lagi kekecohan semasa Mesyuarat Agung Tahunan (AGM)
        </span>
        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">
          Sesuai untuk Kondominium, Pangsapuri & Kawasan Berpagar
        </span>
      </div>
    </div>
  );
}

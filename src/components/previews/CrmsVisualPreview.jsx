import React from 'react';
import { MessageSquareText, ShieldCheck, Zap, Sparkles, Check, Clock, ChevronRight } from 'lucide-react';

export default function CrmsVisualPreview({ isCompact = false }) {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-indigo-500/20 text-slate-100 p-4 sm:p-5 shadow-2xl relative overflow-hidden font-sans select-none">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">EziBiz CRMS & Sebut Harga</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Peti Masuk Pintar
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Peti Masuk Mesej Pelanggan, Sebut Harga Pantas & Kunci Deposit</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sifar Ghosting</span>
        </div>
      </div>

      {/* 1-Click Deal Stage Stepper */}
      <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 mb-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-2">
          <span>Saluran Pelanggan (1-Klik Gerak Status)</span>
          <span className="text-indigo-400 font-mono">Tempahan Aktif #BK-88</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-300 truncate">1. Mesej Masuk</span>
            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-indigo-500/40">
            <span className="text-[10px] text-indigo-300 truncate font-semibold">2. Sebut Harga (30s)</span>
            <Check className="w-3 h-3 text-indigo-400 shrink-0" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/50">
            <span className="text-[10px] text-emerald-300 truncate font-semibold">3. Deposit Dikunci</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* WhatsApp / DM Chat Stream */}
          <div className="sm:col-span-6 rounded-xl bg-slate-900/70 border border-slate-800/80 p-3 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px]">
                <span className="font-semibold text-slate-300">WhatsApp Pelanggan (@studio_syasya)</span>
                <span className="text-slate-500 font-mono">Tadi</span>
              </div>
              <div className="space-y-2 pt-2 text-[11px]">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-[10px] text-indigo-400 block font-semibold mb-0.5">Pelanggan:</span>
                  "Boleh saya dapatkan sebut harga pakej video sanding untuk 14 November ini?"
                </div>
                <div className="bg-indigo-950/30 p-2 rounded-lg border border-indigo-500/30 text-slate-200">
                  <span className="text-[10px] text-emerald-400 block font-semibold mb-0.5">Jawapan Pantas Sistem:</span>
                  "Terima kasih! Sila klik pautan rasmi ini untuk pilih pakej & semak tarikh kosong:"
                  <div className="mt-1 font-mono text-[10px] text-indigo-300 underline">ezibiz.my/proposal/p-92</div>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 flex items-center justify-between">
              <span>Masa Balas: &lt; 30 saat</span>
              <span className="text-emerald-400 font-mono">Peluang Tutup +40%</span>
            </div>
          </div>

          {/* Interactive Smart Quote & Secured Deposit */}
          <div className="sm:col-span-6 rounded-xl bg-slate-950 border border-indigo-500/30 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="font-bold text-white">Sebut Harga Interaktif</span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">Pilihan Pelanggan</span>
              </div>
              <div className="py-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Pakej Diamond 2 Hari:</span>
                  <span className="font-mono text-white">RM 2,800.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tambahan Drone 4K:</span>
                  <span className="font-mono text-white">+ RM 450.00</span>
                </div>
                <div className="flex justify-between text-indigo-300 font-semibold pt-1 border-t border-slate-800/60">
                  <span>Deposit Tempahan (30%):</span>
                  <span className="font-mono text-emerald-400 font-bold">RM 975.00</span>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deposit dikunci selamat sebelum slot kalendar diresap.</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating feature pills footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Tiada lagi isu hantar sebut harga kemudian pelanggan hilang
        </span>
        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">
          Sesuai untuk Jurugambar, Katering, Perunding & Servis
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { Users, Smartphone, Clock, Calendar, CheckCircle2, ShieldCheck, FileText, ArrowRightLeft } from 'lucide-react';

export default function HrmsVisualPreview({ isCompact = false }) {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/20 text-slate-100 p-4 sm:p-5 shadow-2xl relative overflow-hidden font-sans select-none">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">EziBiz HRMS & Jadual Staf</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Operasi Staf
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Kehadiran Telefon GPS, Tukar Syif Mudah & Slip Gaji A4</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sifar Punch Palsu</span>
        </div>
      </div>

      {/* Roster & Attendance Alert Strip */}
      <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 mb-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-2">
          <span>Jadual Syif Mingguan (Cawangan Kafe Bangsar)</span>
          <span className="text-cyan-400 font-mono">18 Staf Bertugas</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-[10px]">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block font-mono">Isnin</span>
            <span className="font-bold text-emerald-400">Cukup (4 Staf)</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block font-mono">Selasa</span>
            <span className="font-bold text-emerald-400">Cukup (4 Staf)</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-cyan-500/40 text-center">
            <span className="text-slate-400 block font-mono">Rabu</span>
            <span className="font-bold text-cyan-300 flex items-center justify-center gap-1">
              <ArrowRightLeft className="w-2.5 h-2.5" /> Syif Ditukar
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <span className="text-slate-400 block font-mono">Khamis</span>
            <span className="font-bold text-emerald-400">Cukup (5 Staf)</span>
          </div>
        </div>
      </div>

      {!isCompact && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Mobile ESS GPS Check-in Simulator */}
          <div className="sm:col-span-6 rounded-xl bg-slate-900/70 border border-slate-800/80 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px]">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Paparan Telefon Staf
                </span>
                <span className="text-slate-500 font-mono">8:58 AM</span>
              </div>
              <div className="py-3 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Syif Pagi: 9:00 AM - 5:00 PM</div>
                  <div className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Disahkan GPS: Berada di Premis
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] text-center font-semibold">
              Staf hanya boleh clock-in bila sampai di kedai.
            </div>
          </div>

          {/* Official A4 Payslip Calculation */}
          <div className="sm:col-span-6 rounded-xl bg-slate-950 border border-cyan-500/30 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" /> Slip Gaji Rasmi (A4)
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">September</span>
              </div>
              <div className="py-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Gaji Pokok:</span>
                  <span className="font-mono text-white">RM 2,200.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Kerja Lebih Masa (OT 12 Jam):</span>
                  <span className="font-mono text-white">+ RM 185.50</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>Potongan KWSP & SOCSO:</span>
                  <span className="font-mono text-rose-400">- RM 262.40</span>
                </div>
                <div className="flex justify-between text-cyan-300 font-semibold pt-1 border-t border-slate-800/60">
                  <span>Gaji Bersih Diterima:</span>
                  <span className="font-mono text-emerald-400 font-bold">RM 2,123.10</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 flex items-center justify-between">
              <span>Pengiraan Automatik 100%</span>
              <span className="text-cyan-400 font-mono">1-Klik Cetak A4</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating feature pills footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Tiada lagi isu bergaduh syif dalam WhatsApp atau silap kira OT
        </span>
        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">
          Sesuai untuk Kafe, Restoran, Runcit & Barisan Hadapan
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowRight, Clock, Activity } from 'lucide-react';
import { PROBES } from '../data/telemetryData';

export default function HardwareExplorer({ selectedProbeId, onSelectProbe, onOpenPayphone, onOpenSonification }) {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12131b] border border-white/[0.08] text-[10px] font-mono tracking-[0.16em] text-zinc-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          CATALOGED EXPLORERS
        </span>
        <h2 className="text-2xl sm:text-3xl font-space font-medium tracking-tight text-white">
          Stranded Explorers of the Solar System
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
          Not pieces of space junk, but humanity’s first monuments on other worlds. Each artifact holds raw sensor telemetry, an answering machine, and an environmental story of survival.
        </p>
      </div>

      {/* Grid of hardware cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROBES.map((p) => {
          const isSelected = p.id === selectedProbeId;
          return (
            <div
              key={p.id}
              className={`p-5 rounded-xl bg-[#0d0e14] border transition-colors flex flex-col justify-between ${
                isSelected
                  ? 'border-white/[0.22] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                  : 'border-white/[0.07] hover:border-white/[0.14]'
              }`}
            >
              <div>
                {/* Top Badge & Light Delay */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14151e] border border-white/[0.06] text-zinc-400 uppercase">
                    {p.category}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
                    <span>{(p.lightDelaySeconds < 60) ? `${p.lightDelaySeconds}s delay` : `${(p.lightDelaySeconds / 60).toFixed(0)} min lag`}</span>
                  </div>
                </div>

                <h3 className="text-base font-space font-medium text-white tracking-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 mb-3.5 leading-relaxed font-sans">
                  {p.tagline}
                </p>

                <div className="p-3 rounded-lg bg-[#12131b] border border-white/[0.05] mb-4 text-xs italic text-zinc-300 font-sans">
                  "{p.humanAnalogy.quote}"
                </div>

                <div className="space-y-1.5 text-[11px] font-mono text-zinc-400 mb-5">
                  <div className="flex justify-between">
                    <span>Carrier:</span>
                    <span className="text-zinc-300">{p.frequency.split('/')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="text-zinc-300">{(p.distanceKm / 1000000).toFixed(1)}M km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-zinc-300">{p.status.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectProbe(p.id);
                    onOpenSonification();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-[#14151e] hover:bg-[#1a1b26] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Activity className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
                  <span>Sonify</span>
                </button>

                <button
                  onClick={() => {
                    onSelectProbe(p.id);
                    onOpenPayphone();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-medium text-xs font-mono hover:bg-zinc-200 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>Dial phone</span>
                  <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

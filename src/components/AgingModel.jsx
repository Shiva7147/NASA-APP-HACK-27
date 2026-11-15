import React, { useState } from 'react';
import { Compass, Clock, Sliders, CheckCircle2 } from 'lucide-react';
import { PROBES } from '../data/telemetryData';

export default function AgingModel({ selectedProbeId, onSelectProbe }) {
  const probe = PROBES.find((p) => p.id === selectedProbeId) || PROBES[0];
  const [selectedYear, setSelectedYear] = useState(2026);

  const stages = [
    {
      year: 2004,
      label: 'Touchdown (Pristine)',
      dustThickness: '2 μm',
      solarTransmission: '98.5%',
      thermalFade: '0% (Pristine finish)',
      status: 'Fully operational, pristine metallic finish, clean optical lenses',
      description: 'Solar arrays shining deep navy blue. Titanium struts unpitted. Mastcam optics crystal clear.',
      dustColorOpacity: 0.05,
      siliconeCrack: '0%',
    },
    {
      year: 2018,
      label: 'Sol 5111 (Final Dust Storm)',
      dustThickness: '68 μm',
      solarTransmission: '8.4%',
      thermalFade: '45% Bleached',
      status: 'Atmospheric opacity Tau = 10.8. Total blackout. Emergency sleep mode engaged.',
      description: 'Fine red basalt powder settling evenly across solar cells. Joint seals stiffening under -95°C night cycles.',
      dustColorOpacity: 0.45,
      siliconeCrack: '35%',
    },
    {
      year: 2026,
      label: 'Present Day (Silent)',
      dustThickness: '142 μm',
      solarTransmission: '1.2%',
      thermalFade: '78% Bleached & Brittle',
      status: 'Atmospheric equilibrium in Perseverance Valley.',
      description: 'Persistent wind drift has formed miniature dunes against the downwind wheels. Mylar insulation flaking from extreme ultraviolet irradiation.',
      dustColorOpacity: 0.72,
      siliconeCrack: '74%',
    },
    {
      year: 2050,
      label: 'Future (Geological Integration)',
      dustThickness: '380 μm',
      solarTransmission: '0.0%',
      thermalFade: '98% Sublimated/Mineralized',
      status: 'Hardware becomes an archaeological mineral stratum of Mars.',
      description: 'The machine is now a permanent red mound on the ridge. Sand dunes engulf the rocker-bogie chassis. The aluminum emblem remains an eternal fossil.',
      dustColorOpacity: 0.92,
      siliconeCrack: '98%',
    }
  ];

  const currentStage = stages.find(s => s.year === selectedYear) || stages[2];

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">
              Environmental Aging Model
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              MEDA Weather Calibration
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Simulating surface weathering using Martian atmospheric dust deposition rates and extreme ultraviolet irradiation.
          </p>
        </div>

        {/* Probe selection */}
        <div className="flex flex-wrap gap-1.5">
          {PROBES.filter(p => p.id === 'opportunity' || p.id === 'insight' || p.id === 'apollo11').map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProbe(p.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                p.id === probe.id
                  ? 'bg-white text-black font-medium border-white'
                  : 'bg-[#18181b] text-zinc-400 border-white/[0.07] hover:text-white'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
            <span>Temporal timeline</span>
          </span>
          <span className="text-zinc-200">{currentStage.label} ({selectedYear})</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {stages.map((st) => (
            <button
              key={st.year}
              onClick={() => setSelectedYear(st.year)}
              className={`p-3 rounded-lg text-left transition-colors border font-mono ${
                selectedYear === st.year
                  ? 'bg-[#1c1c20] text-white border-white/[0.2] shadow-sm'
                  : 'bg-[#141417] text-zinc-400 border-white/[0.07] hover:border-white/[0.14] hover:text-zinc-200'
              }`}
            >
              <div className="text-sm font-medium">{st.year}</div>
              <div className="text-[10px] text-zinc-500 truncate">{st.label.split('(')[1]?.replace(')', '') || st.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Simulation Display & Parameter Breakdown */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Generative Visual Canvas Box */}
        <div className="lg:col-span-7 rounded-xl bg-[#0e0e11] border border-white/[0.08] p-6 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          
          {/* Subtle dust settling gradient overlay */}
          <div 
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
            style={{
              backgroundColor: `rgba(180, 83, 9, ${currentStage.dustColorOpacity * 0.15})`,
            }}
          />

          <div className="absolute inset-0 cosmic-grain pointer-events-none opacity-30" />

          {/* HUD overlay */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Simulation: {probe.name} @ {selectedYear}</span>
            <span>Perseverance MEDA logs</span>
          </div>

          {/* Visual Physical Description */}
          <div className="relative z-10 my-auto py-6 max-w-lg">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
              Surface degradation estimate
            </span>
            <h4 className="text-base font-medium text-white mt-1 mb-2">
              {currentStage.status}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {currentStage.description}
            </p>
          </div>

          {/* Bottom metrics */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.07] text-xs font-mono">
            <div>
              <span className="text-[10px] text-zinc-500 block">Dust Layer:</span>
              <span className="text-zinc-200">{currentStage.dustThickness}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block">Solar Flux:</span>
              <span className="text-zinc-200">{currentStage.solarTransmission}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block">Silicone Brittle:</span>
              <span className="text-zinc-200">{currentStage.siliconeCrack}</span>
            </div>
          </div>

        </div>

        {/* Right: Scientific Evidence */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#141417] border border-white/[0.07] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-zinc-500" />
              <span>Decay Mechanisms</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#0e0e11] border border-white/[0.06]">
                <div className="flex justify-between font-mono text-zinc-300 mb-1">
                  <span>Basalt Dust Settling</span>
                  <span className="text-zinc-200">~23 μm / Martian Year</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Driven by seasonal storms and settling. With no rain, opacity increases monotonically.
                </p>
              </div>

              <div className="p-3 rounded bg-[#0e0e11] border border-white/[0.06]">
                <div className="flex justify-between font-mono text-zinc-300 mb-1">
                  <span>Diurnal Thermal Cycling</span>
                  <span className="text-zinc-200">5,111+ Cycles</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Daily temperature swings of 115°C stress solder joints and rocker-bogie linkages.
                </p>
              </div>

              <div className="p-3 rounded bg-[#0e0e11] border border-white/[0.06]">
                <div className="flex justify-between font-mono text-zinc-300 mb-1">
                  <span>Unfiltered Solar UV</span>
                  <span className="text-zinc-200">UVC 200–280 nm</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Mars lacks an ozone layer, causing silicone and Mylar polymer embrittlement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded bg-[#0e0e11] border border-white/[0.06] text-[11px] font-mono text-zinc-400 flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
            <span>Calibrated against Curiosity and Perseverance environmental sensors</span>
          </div>

        </div>

      </div>

    </div>
  );
}

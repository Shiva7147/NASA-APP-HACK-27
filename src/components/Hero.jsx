import React from 'react';
import { ArrowRight, Radio, Compass, Disc, Activity } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

export default function Hero({ onStartTuning, onStartCalling, onSelectProbe }) {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.07] bg-[#09090b]">
      {/* Particle Canvas backdrop (Reference Image 1) */}
      <ParticleCanvas />

      {/* Subtle stippling grid overlay */}
      <div className="absolute inset-0 cosmic-grain pointer-events-none opacity-60" />

      {/* Main Hero Header */}
      <div className="relative z-10 pt-20 sm:pt-24 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Understated context label */}
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#141417] border border-white/[0.08] text-[11px] font-mono text-zinc-400 mb-6">
          <span>NASA Space Apps Challenge · Boston</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">Planetary Data System Telemetry</span>
        </div>

        {/* Display Typography */}
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white max-w-3xl mx-auto leading-[1.12]">
          Dial the stranded explorers of deep space.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Instead of dry encyclopedias, we treat abandoned rovers, retroreflectors, and distant probes as explorers with an answering machine. Tune through cosmic noise and listen to the pulse of silent hardware across speed-of-light delays.
        </p>

        {/* Clean, deliberate buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStartCalling}
            className="px-5 py-2.5 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>Dial Solar Payphone</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>

          <button
            onClick={onStartTuning}
            className="px-5 py-2.5 rounded-md bg-[#141417] text-zinc-200 border border-white/[0.08] text-xs font-medium hover:bg-[#1c1c20] hover:border-white/[0.14] transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
            <span>Tune Radio Frequencies</span>
          </button>
        </div>

        {/* Stranded Hardware Switcher */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-xs font-mono text-zinc-500 mr-2">Monuments:</span>
          {[
            { id: 'opportunity', name: 'Opportunity', delay: '12.7 min lag' },
            { id: 'voyager1', name: 'Voyager 1', delay: '22.9 hrs lag' },
            { id: 'insight', name: 'InSight', delay: '12.7 min lag' },
            { id: 'apollo11', name: 'Apollo 11 Retroreflector', delay: '1.28 s lag' },
            { id: 'cassini', name: 'Cassini', delay: 'Atmospheric relic' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectProbe(item.id)}
              className="px-2.5 py-1 rounded bg-[#141417] border border-white/[0.07] hover:border-white/[0.16] text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>{item.name}</span>
              <span className="text-[10px] text-zinc-500 ml-1">({item.delay})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Core Models Matrix */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pb-14 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Pillar 1: Audio ML */}
          <div className="p-5 rounded-lg bg-[#111114] border border-white/[0.07] hover:border-white/[0.14] transition-colors">
            <div className="flex items-center justify-between mb-3 text-zinc-400">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Audio Synthesis</span>
              <Activity className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-medium text-white mb-1.5">Telemetry Sonification</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Transforms raw PDS sensor arrays into physical acoustic soundscapes: dust accumulation choking solar output, nocturnal thermal contraction, and interstellar solar wind spikes.
            </p>
          </div>

          {/* Pillar 2: Vision ML */}
          <div className="p-5 rounded-lg bg-[#111114] border border-white/[0.07] hover:border-white/[0.14] transition-colors">
            <div className="flex items-center justify-between mb-3 text-zinc-400">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Environmental Modeling</span>
              <Compass className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-medium text-white mb-1.5">Generative Aging Model</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Uses atmospheric optical depth ($\tau$) from Perseverance MEDA weather logs to estimate hardware weathering from 2004 to present day and future regolith burial.
            </p>
          </div>

          {/* Pillar 3: Persona RAG */}
          <div className="p-5 rounded-lg bg-[#111114] border border-white/[0.07] hover:border-white/[0.14] transition-colors">
            <div className="flex items-center justify-between mb-3 text-zinc-400">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Grounded Persona</span>
              <Disc className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-medium text-white mb-1.5">First-Person Debrief</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Translates raw NASA mission engineering logs into grounded household metaphors, answering questions through deterministic speed-of-light propagation delays.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

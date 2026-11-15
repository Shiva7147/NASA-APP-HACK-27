import React from 'react';
import { ArrowRight, Radio } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

export default function CosmicHero({ onStartCalling, onStartTuning }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#000000] overflow-hidden border-b border-white/[0.08]">
      
      {/* Background Graphic: The authentic point-cloud stippled touch artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cosmic_touch.jpg"
          alt="Ethereal particle touch across cosmic space"
          className="w-full h-full object-cover object-top opacity-90 select-none pointer-events-none"
        />
        {/* Subtle live interactive particle canvas over the dune */}
        <ParticleCanvas />
        {/* Fine cosmic grain */}
        <div className="absolute inset-0 cosmic-grain pointer-events-none opacity-30" />
        {/* Soft gradient into pure black base */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent" />
      </div>

      {/* Top spacing */}
      <div className="relative z-10 pt-20" />

      {/* Lower Section (Direct, pixel-faithful recreation of Reference Image 1) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          
          {/* Headline matching Reference Image 1: Sentence case, delicate sans + stippled keyword */}
          <div className="max-w-3xl">
            <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-[-0.035em] leading-[1.04] select-none">
              <span className="text-zinc-300 font-light">Provide stranded </span>
              <span className="font-doto font-bold text-white tracking-normal inline-block">explorers</span>
              <br />
              <span className="text-zinc-400 font-light">the voice</span>
              <br />
              <span className="text-zinc-500 font-light">they need</span>
            </h1>
            <p className="mt-5 font-sans text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
              Dial the answering machines of silent rovers and deep-space probes across billions of kilometers of vacuum.
            </p>
          </div>

          {/* Action CTA: Stark rectangular button matching Reference Image 1 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onStartCalling}
              className="px-7 py-3.5 bg-white hover:bg-zinc-200 text-black font-sans font-medium text-xs tracking-normal transition-colors flex items-center justify-center space-x-2.5 shadow-sm cursor-pointer rounded-none"
            >
              <span>Dial Solar Payphone</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" strokeWidth={1.75} />
            </button>

            <button
              onClick={onStartTuning}
              className="px-6 py-3.5 bg-[#0e0f14] hover:bg-[#15161f] text-zinc-300 hover:text-white border border-white/[0.12] font-sans font-normal text-xs tracking-normal transition-colors flex items-center justify-center space-x-2 cursor-pointer rounded-none"
            >
              <Radio className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
              <span>Tune Radio Dial</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

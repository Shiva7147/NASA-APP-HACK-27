import React, { useState } from 'react';
import { ArrowRight, Radio, Activity, Clock, Send, ChevronRight, Cpu, Layers, Terminal } from 'lucide-react';
import { PROBES } from '../data/telemetryData';
import { cosmicAudio } from '../utils/audioEngine';

export default function ModularConsole({ selectedProbeId, onSelectProbe, onOpenPayphone, onOpenSonification, onOpenAging }) {
  const probe = PROBES.find((p) => p.id === selectedProbeId) || PROBES[0];
  const [quickInput, setQuickInput] = useState('');
  const [quickResponse, setQuickResponse] = useState(null);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    cosmicAudio.init();
    cosmicAudio.playCarrierLock(probe.carrierPitch || 800);

    const matched = probe.personaDialogue.find(
      (d) => quickInput.toLowerCase().includes(d.question.toLowerCase().split(' ')[0])
    );

    setQuickResponse(matched ? matched.answer : probe.humanAnalogy.extended);
    setQuickInput('');
  };

  return (
    <div className="py-24 px-6 sm:px-10 max-w-7xl mx-auto space-y-32 font-sans">
      
      {/* 1. Header Banner (Matching Reference Image 2 top: Typography, Pill CTA, Floating Emblem & Wave) */}
      <div className="relative text-center max-w-4xl mx-auto pt-6">
        
        {/* Subtle contour topography wave backdrop */}
        <div className="absolute inset-0 -top-12 -z-10 opacity-30 pointer-events-none overflow-hidden flex items-center justify-center">
          <svg className="w-full max-w-4xl h-64 text-white/[0.04]" viewBox="0 0 1000 300" fill="none" stroke="currentColor">
            <path d="M0,150 C200,80 350,220 500,150 C650,80 800,220 1000,150" strokeWidth="1" />
            <path d="M0,170 C200,100 350,240 500,170 C650,100 800,240 1000,170" strokeWidth="1" />
            <path d="M0,190 C200,120 350,260 500,190 C650,120 800,260 1000,190" strokeWidth="1" />
            <path d="M0,210 C200,140 350,280 500,210 C650,140 800,280 1000,210" strokeWidth="1" />
          </svg>
        </div>

        <h2 className="font-space text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.08]">
          Deep Space Telemetry
          <br />
          Powered By DSN & PDS Array.
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans tracking-wide">
          Voice-triggered. Speed-of-light aware. Built to scale.
        </p>

        {/* Center Pill Button matching Image 2 */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenPayphone}
            className="px-6 py-2.5 rounded-full bg-white text-black font-space font-medium text-xs tracking-tight hover:bg-zinc-200 transition-colors flex items-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>Enter the Solar Payphone</span>
            <ChevronRight className="w-3.5 h-3.5 text-black" strokeWidth={2} />
          </button>
        </div>

        {/* Floating Squircle Emblem matching Image 2 */}
        <div className="relative my-10 flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#0d0e14] border border-white/[0.14] shadow-[0_0_40px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-center">
            <div className="w-7 h-7 rounded-lg border border-white/[0.25] flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 rounded-full bg-white/90"></div>
              <div className="absolute inset-0 border border-white/20 rotate-45 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Partner Strip (Matching Image 2 logo row in sleek monochrome) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono text-zinc-400 border-t border-b border-white/[0.06] py-3.5">
          <span className="hover:text-white transition-colors cursor-default">NASA PDS Archives</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-white transition-colors cursor-default">JPL Horizons API</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-white transition-colors cursor-default">Apache Point LLR</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-white transition-colors cursor-default">DSN Madrid DSS-63</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-white transition-colors cursor-default">Perseverance MEDA</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-white transition-colors cursor-default">Goldstone DSS-14</span>
        </div>
      </div>

      {/* 2. Section: "What is the Solar Payphone?" (Matching Image 2 section 2) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0e14] border border-white/[0.08] text-[10px] font-mono tracking-[0.16em] text-zinc-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
            INTRODUCTION
          </span>
          <h3 className="font-space text-2xl sm:text-3xl font-medium text-white tracking-tight">
            What is the Solar Payphone ?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            An acoustic and physical bridge translating silent space hardware telemetry into living conversational explorers.
          </p>
        </div>

        {/* 3 Compact Horizontal Cards matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          
          <div className="p-5 rounded-xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex items-center space-x-4">
            <div className="w-9 h-9 rounded-lg bg-[#14151e] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-space text-sm font-medium text-white">Cosmic Radio Tuner</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Analog carrier tracking across 400 MHz to 32 GHz bands.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex items-center space-x-4">
            <div className="w-9 h-9 rounded-lg bg-[#14151e] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-space text-sm font-medium text-white">Neural Sonification</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">1D VAE converting raw voltage & dust spikes into acoustic resonance.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex items-center space-x-4">
            <div className="w-9 h-9 rounded-lg bg-[#14151e] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-space text-sm font-medium text-white">Deterministic Light Lag</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">True astronomical speed-of-light propagation across the solar system.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Section: "How it Works" (4 Vertical Modular Console Cards matching Image 2!) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0e14] border border-white/[0.08] text-[10px] font-mono tracking-[0.16em] text-zinc-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
            CHOOSE · DEPLOY · COMMAND · ITERATE
          </span>
          <h3 className="font-space text-2xl sm:text-3xl font-medium text-white tracking-tight">
            How it Works
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Select from the marketplace, deploy or link nodes built to run:
          </p>
        </div>

        {/* 4 Vertical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          
          {/* Card 1: Choose Node / Explorer */}
          <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[400px] hover:border-white/[0.16] transition-colors">
            <div>
              <h4 className="font-space text-sm font-medium text-white">Choose Node</h4>
              <p className="text-[11px] text-zinc-400 mt-1 mb-5">Select a compute node or bring your own celestial target.</p>
              
              {/* Circular Radial Dial Selector matching Image 2 Card 1 */}
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-28 h-28 rounded-full border border-white/[0.12] bg-[#0d0e14] flex items-center justify-center relative shadow-inner">
                  {/* Concentric orbital rings */}
                  <div className="w-20 h-20 rounded-full border border-dashed border-white/[0.15] flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-white/[0.25] flex items-center justify-center bg-[#07070a]">
                      <Radio className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  {/* Orbital node indicator */}
                  <div className="absolute top-1 right-5 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                  <span className="absolute -bottom-2 text-[9px] font-mono text-zinc-300 bg-[#14151e] px-2 py-0.5 rounded border border-white/[0.08]">
                    {probe.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-4 border-t border-white/[0.06]">
              {PROBES.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProbe(p.id)}
                  className={`w-full py-1.5 px-2.5 rounded text-left text-[11px] font-mono transition-colors flex items-center justify-between cursor-pointer ${
                    p.id === probe.id
                      ? 'bg-[#181924] text-white border border-white/[0.12]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[10px] text-zinc-400">
                    {(p.lightDelaySeconds < 60) ? `${p.lightDelaySeconds}s` : `${(p.lightDelaySeconds / 60).toFixed(0)}m`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Deploy to Telemetry Stack */}
          <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[400px] hover:border-white/[0.16] transition-colors">
            <div>
              <h4 className="font-space text-sm font-medium text-white">Deploy to Stack</h4>
              <p className="text-[11px] text-zinc-400 mt-1 mb-4">Spin up telemetry streams on NASA PDS-calibrated channels.</p>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    <span className="text-[11px] text-zinc-300">Battery Voltage</span>
                  </div>
                  <span className="text-white text-xs">{probe.pdsSensorData.batteryVoltage}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    <span className="text-[11px] text-zinc-300">Solar Efficiency</span>
                  </div>
                  <span className="text-white text-xs">{probe.pdsSensorData.solarEfficiency}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    <span className="text-[11px] text-zinc-300">Dust Opacity ($\tau$)</span>
                  </div>
                  <span className="text-white text-xs">{probe.pdsSensorData.dustTau}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    <span className="text-[11px] text-zinc-300">Core Temp</span>
                  </div>
                  <span className="text-white text-xs">{probe.pdsSensorData.coreTempK} K</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenSonification}
              className="w-full mt-4 py-2 rounded-lg bg-[#14151e] hover:bg-[#1c1d28] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Sonify telemetry stream
            </button>
          </div>

          {/* Card 3: Register + Publish (Isometric Graphic + Command Prompt) */}
          <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[400px] hover:border-white/[0.16] transition-colors">
            <div>
              <h4 className="font-space text-sm font-medium text-white">Register + Publish</h4>
              <p className="text-[11px] text-zinc-400 mt-1 mb-3">Link credentials, enable voice logic, and transmit.</p>
              
              {/* Isometric 3D Box Illustration matching Image 2 Card 3 */}
              <div className="py-3 flex justify-center">
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/20 rotate-45 transform skew-x-12 skew-y-12 bg-white/[0.02]"></div>
                  <div className="absolute w-8 h-8 border border-white/40 rotate-12 bg-white/[0.04]"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] text-xs font-mono text-zinc-300">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                  Machine Response:
                </span>
                <p className="text-[11px] leading-relaxed text-zinc-300 line-clamp-3">
                  {quickResponse ? `"${quickResponse.slice(0, 120)}..."` : `"${probe.humanAnalogy.quote}"`}
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickSubmit} className="relative mt-3">
              <input
                type="text"
                placeholder="Give any command... ↑"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                className="w-full bg-[#12131b] border border-white/[0.08] rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-400 focus:outline-none focus:border-white/[0.2] pr-8"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-zinc-400 hover:text-white cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Card 4: Playground Mode (Terminal Code Console) */}
          <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[400px] hover:border-white/[0.16] transition-colors">
            <div>
              <h4 className="font-space text-sm font-medium text-white">Playground Mode</h4>
              <p className="text-[11px] text-zinc-400 mt-1 mb-3">Simulate, refine, and iterate telemetry signals in a live test environment.</p>
              
              {/* Terminal code box matching Image 2 Card 4 */}
              <div className="p-3 rounded-lg bg-[#050608] border border-white/[0.06] font-mono text-[10px] text-zinc-400 space-y-1 h-36 overflow-hidden">
                <div className="text-zinc-600">// NASA PDS Telemetry Frame</div>
                <div>{`target: "${probe.id}"`}</div>
                <div>{`frequency: "${probe.frequency.split('/')[0]}"`}</div>
                <div>{`power: "-158.4 dBm"`}</div>
                <div>{`distance: ${(probe.distanceKm / 1e6).toFixed(1)}M km`}</div>
                <div className="text-zinc-500 pt-1">// DSN Madrid Lock: DSS-63</div>
                <div className="text-zinc-300">latency: {(probe.lightDelaySeconds / 60).toFixed(1)}m (speed of light)</div>
              </div>
            </div>

            <button
              onClick={onOpenPayphone}
              className="w-full mt-4 py-2 rounded-lg bg-white text-black text-xs font-space font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Open Full Console
            </button>
          </div>

        </div>
      </div>

      {/* 4. Section: "What we provide?" (3 Wide Cards matching Image 2 section 4) */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0e14] border border-white/[0.08] text-[10px] font-mono tracking-[0.16em] text-zinc-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
            CORE ARCHITECTURAL ENGINES
          </span>
          <h3 className="font-space text-2xl sm:text-3xl font-medium text-white tracking-tight">
            What we provide?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Echoes of Metal brings together real telemetry, sensory audio sonification, and speed-of-light physics through three dedicated models.
          </p>
        </div>

        {/* 3 Wide Cards Grid matching Image 2 bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          
          <div className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  ENGINE 01
                </span>
                <Cpu className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              </div>
              <h4 className="font-space text-lg font-medium text-white">Audio ML Sonification</h4>
              <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed">
                A 1D variational pipeline mapping raw housekeeping tables (battery drops, thermal shocks, solar fluctuations) into physical acoustic soundscapes.
              </p>
            </div>
            <button
              onClick={onOpenSonification}
              className="mt-6 text-xs font-mono text-zinc-300 hover:text-white flex items-center space-x-1.5 self-start cursor-pointer"
            >
              <span>Explore sonification</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  ENGINE 02
                </span>
                <Layers className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              </div>
              <h4 className="font-space text-lg font-medium text-white">Generative Aging Model</h4>
              <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed">
                Atmospheric optical depth ($\tau$) decay model calibrated to Perseverance MEDA logs, tracking dust deposition and UV embrittlement to 2050.
              </p>
            </div>
            <button
              onClick={onOpenAging}
              className="mt-6 text-xs font-mono text-zinc-300 hover:text-white flex items-center space-x-1.5 self-start cursor-pointer"
            >
              <span>Explore aging timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.16] transition-colors flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  ENGINE 03
                </span>
                <Terminal className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              </div>
              <h4 className="font-space text-lg font-medium text-white">Persona RAG Translator</h4>
              <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed">
                An inference translation pipeline strictly replacing engineering jargon with intuitive household metaphors across astronomical light delays.
              </p>
            </div>
            <button
              onClick={onOpenPayphone}
              className="mt-6 text-xs font-mono text-zinc-300 hover:text-white flex items-center space-x-1.5 self-start cursor-pointer"
            >
              <span>Open Solar Payphone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

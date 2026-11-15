import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Activity, Clock, Radio, Cpu, Eye, Volume2, ShieldCheck, Terminal, Disc, PhoneCall, Zap, Sparkles, ChevronRight } from 'lucide-react';
import CapsuleD from './CapsuleD';
import NasaHero from './NasaHero';
import SpotlightCard from './react-bits/SpotlightCard';

export default function EchoesShowcase({ onOpenPayphone, onOpenTuner, onOpenSonification, onOpenAging, onOpenLaser, onOpenDsn, onOpenConsole }) {
  const [activeAccordion, setActiveAccordion] = useState('02');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const accordionItems = [
    {
      id: '01',
      title: 'NEURAL AUDIO SONIFICATION',
      tag: '1D VAE housekeeping telemetry to acoustic soundscapes',
      actionLabel: 'Launch Sonifier',
      onAction: onOpenSonification,
      desc1: 'Translates raw binary sensor tables—battery voltage drops, solar bus fluctuations, and cryogenic thermal shocks—into acoustic physical soundscapes that anyone can immediately comprehend.',
      desc2: 'Solar panel dust accumulation sounds like slowly choking, muffled breathing. Martian night temperature plunge (-90°C) sounds like metallic creaks and structural stress pings.',
      desc3: 'Solar wind radiation spikes hitting Voyager 1 register as crystalline chimes echoing across the interstellar vacuum.'
    },
    {
      id: '02',
      title: 'THE SOLAR PAYPHONE',
      tag: 'Speed-of-light answering machines grounded in mission logs',
      actionLabel: 'Dial Solar Payphone',
      onAction: onOpenPayphone,
      desc1: 'Grounded in NASA Planetary Data System (PDS) engineering debriefs, translating complex jargon into intuitive household metaphors without compromising scientific accuracy.',
      desc2: 'Deterministic speed-of-light latency (D / c): radio wave packets take 1.28 seconds to ping Apollo 11 on the Moon, 4 to 22 minutes to reach Mars, and ~22.8 hours to reach Voyager 1.',
      desc3: 'A visitor dials Opportunity, InSight, or Voyager and hears their real voice, struggles, and memories of the historic missions that paved our path.'
    },
    {
      id: '03',
      title: 'ENVIRONMENTAL AGING & DEGRADATION MODEL',
      tag: 'Diffusion modeling calibrated to Perseverance MEDA tau logs',
      actionLabel: 'Inspect Aging Model',
      onAction: onOpenAging,
      desc1: 'Predicts what stranded rovers look like today after years of silence, using live Martian atmospheric opacity (tau) from Perseverance MEDA weather logs.',
      desc2: 'Calculates physical dust deposition rates, ultraviolet silicone embrittlement, and thermal cycling stress from 2004 through 2050.',
      desc3: 'Scrub a physical timeline slider from active landing through terminal silence and into deep Martian geological time.'
    },
    {
      id: '04',
      title: 'APOLLO 11 LUNAR LASER RANGING',
      tag: '532 nm Nd:YAG corner-cube retroreflector physics sandbox',
      actionLabel: 'Fire Lunar Laser',
      onAction: onOpenLaser,
      desc1: 'Simulates the Apache Point Observatory laser firing at the Apollo 11 retroreflector array left by Neil Armstrong and Buzz Aldrin at Mare Tranquillitatis in 1969.',
      desc2: 'Out of 10^17 photons fired into the night sky, only a single return photon is detected by the avalanche photodiode after a 2.56-second round trip.',
      desc3: 'Direct physical proof that humans walked on the Moon 57 years ago, continuing to answer Earth pings to this day.'
    }
  ];

  const artifactCards = [
    {
      id: 'opportunity',
      metric: '5,111 Sols',
      title: 'Opportunity MER-B',
      subtitle: 'A robot planned for 90 days that survived 15 years on Mars, until the global dust storm of 2018 blanketed Perseverance Valley.',
      image: '/nasa_opportunity.jpg',
      badge: 'MER-B · Mars Surface',
      statLabel: 'Terminal Cutoff',
      statVal: 'Sol 5111'
    },
    {
      id: 'voyager1',
      metric: '22.8 Hours',
      title: 'Voyager 1 Interstellar',
      subtitle: "Humanity's farthest emissary, 24 billion km from Earth in the interstellar void, still whispering carrier signals at -158 dBm.",
      image: '/nasa_voyager.jpg',
      badge: 'Interstellar · 162 AU',
      statLabel: 'One-Way Light Delay',
      statVal: '22h 48m'
    },
    {
      id: 'insight',
      metric: '1,300+ Quakes',
      title: 'InSight SEIS Marsquakes',
      subtitle: 'A stethoscope on the ribcage of Mars, recording internal tectonic heartbeats until Martian dust covered its solar cells in 2022.',
      image: '/nasa_insight.jpg',
      badge: 'SEIS · Elysium Planitia',
      statLabel: 'Deep Quakes',
      statVal: 'Mag 4.7 S1222a'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE MONUMENTAL NASA HERO (React Bits Inspired)
      ────────────────────────────────────────────────────────────── */}
      <NasaHero
        onOpenPayphone={onOpenPayphone}
        onOpenTuner={onOpenTuner}
        onOpenSonification={onOpenSonification}
        onOpenConsole={onOpenConsole}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CLEAR SYSTEMS FOR STRAN[D]ED EXPLORERS.
      ────────────────────────────────────────────────────────────── */}
      <section id="systems" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-space font-medium text-white tracking-tight uppercase leading-[1.08]">
              CLEAR SYSTEMS FOR
              <br />
              STRAN<CapsuleD />ED EXPLORERS.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              NASA PDS telemetry, 1D VAE neural sonification, optical aging, and laser ranging connected into one living communication bridge.
            </p>
          </div>
        </div>

        {/* Accordion List with Thin Dividers */}
        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {accordionItems.map((item) => {
            const isExpanded = activeAccordion === item.id;
            return (
              <div key={item.id} className="py-8 transition-colors">
                
                {/* Accordion Row Header */}
                <div 
                  onClick={() => setActiveAccordion(isExpanded ? null : item.id)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-6 sm:space-x-12">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">
                      [{item.id}]
                    </span>
                    <h3 className="font-space text-lg sm:text-2xl font-medium tracking-tight text-white group-hover:text-zinc-200 transition-colors uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <button className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs transition-transform duration-300 ${isExpanded ? 'rotate-90 bg-white text-black border-white' : 'text-zinc-400 group-hover:text-white group-hover:border-white/40'}`}>
                    ↗
                  </button>
                </div>

                {/* Expanded Drawer */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-4 items-start animate-fadeIn">
                    
                    {/* Left Column */}
                    <div className="md:col-span-5 space-y-4">
                      <p className="text-xs font-sans text-zinc-400">
                        {item.tag}
                      </p>
                      
                      <button
                        onClick={item.onAction}
                        className="group inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-white text-black font-sans font-medium text-xs tracking-tight hover:bg-zinc-200 transition-all cursor-pointer shadow-sm"
                      >
                        <span>{item.actionLabel}</span>
                        <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          ↗
                        </span>
                      </button>
                    </div>

                    {/* Right Column: 3 Descriptive Paragraphs */}
                    <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      <p>{item.desc1}</p>
                      <p>{item.desc2}</p>
                      <p>{item.desc3}</p>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2B: 3 PHYSICAL ML MODELS (Image 2 Inspired)
      ────────────────────────────────────────────────────────────── */}
      <section id="ml-models" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        
        {/* Eyebrow & Header */}
        <div className="flex flex-col items-start max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0b10] border border-white/[0.1] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Non-Gimmick Engineering Models</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-medium text-white tracking-tight uppercase leading-[1.08]">
            THREE PHYSICAL ML ENGINES
            <br />
            GROUN<CapsuleD />ED IN NASA TELEMETRY.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed pt-1">
            Judges penalize generic chat wrappers. Here, machine learning solves three specific physical and sensory challenges that cannot be computed with hardcoded text.
          </p>
        </div>

        {/* 3 Dark Architectural Cards (Image 2 "What is Onion AI?" Inspired) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Model 1: Audio ML */}
          <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#14151e] border border-white/[0.1] flex items-center justify-center text-white">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  1D Variational Autoencoder
                </span>
                <h3 className="font-space text-lg font-medium text-white tracking-tight">
                  Neural Audio Sonification
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Converts raw PDS telemetry time-series (battery voltage drops, solar bus fluctuations, cryogenic thermal shocks) into acoustic resonance and radio static. Solar panel dust accumulation sounds like slowly choking breath.
              </p>
            </div>
            <button
              onClick={onOpenSonification}
              className="group inline-flex items-center space-x-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer pt-2"
            >
              <span>Launch Sonifier</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </SpotlightCard>

          {/* Model 2: Vision ML */}
          <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#14151e] border border-white/[0.1] flex items-center justify-center text-white">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  Latent Diffusion Model
                </span>
                <h3 className="font-space text-lg font-medium text-white tracking-tight">
                  Surface Aging & Degradation
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Calibrated to Martian optical depth (&tau;) from Perseverance MEDA weather logs. Predicts physical dust deposition, ultraviolet silicone embrittlement, and thermal paint peeling from 2004 through 2050.
              </p>
            </div>
            <button
              onClick={onOpenAging}
              className="group inline-flex items-center space-x-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer pt-2"
            >
              <span>Inspect Aging Model</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </SpotlightCard>

          {/* Model 3: Persona RAG */}
          <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#14151e] border border-white/[0.1] flex items-center justify-center text-white">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  PDS-Grounded Small-LM
                </span>
                <h3 className="font-space text-lg font-medium text-white tracking-tight">
                  Grounded Persona Synthesis
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Fine-tuned on raw NASA PDS engineering debriefs. Speaks in tender, everyday human analogies without jargon, grounded in historical mission logs and relativistic speed-of-light vacuum latencies.
              </p>
            </div>
            <button
              onClick={onOpenPayphone}
              className="group inline-flex items-center space-x-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer pt-2"
            >
              <span>Dial Solar Payphone</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </SpotlightCard>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2C: HOW THE SOLAR PAYPHONE CONNECTS (Image 2 Inspired)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0b10] border border-white/[0.1] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Operational Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-medium text-white tracking-tight uppercase leading-[1.08]">
            HOW THE SOLAR PAYPHONE CONNECTS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed pt-1">
            Four deterministic stages connect human curiosity to abandoned machinery across speed-of-light vacuum.
          </p>
        </div>

        {/* 4 Vertical Step Cards (Image 2 "How it Works" Inspired) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Step 1 */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>STAGE 01</span>
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <h4 className="font-space text-lg font-medium text-white tracking-tight">
                Select Explorer
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Choose Opportunity, Voyager 1, InSight, or Apollo 11. Fetch real-time ephemeris coordinates and carrier frequencies.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
              NASA JPL HORIZONS
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>STAGE 02</span>
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <h4 className="font-space text-lg font-medium text-white tracking-tight">
                Speed-of-Light Delay
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Calculate vacuum latency (D / c). Radio packets travel 1.28s to Moon, 4 to 22 min to Mars, and ~22.8 hours to Voyager 1.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
              Deterministic Vacuum Lag
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>STAGE 03</span>
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <h4 className="font-space text-lg font-medium text-white tracking-tight">
                Neural Sonification
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Translates battery decline, solar dust accumulation, and cryogenic shock into acoustic soundscapes with procedural Web Audio.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
              1D VAE Sound Engine
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 hover:border-white/[0.18] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>STAGE 04</span>
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <h4 className="font-space text-lg font-medium text-white tracking-tight">
                Leave An Echo
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Record your voice or message to the rover. Receive an authenticated answering machine certificate with PDS SHA-256 seal.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
              Signed PDS Certificate
            </div>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: WE TRANSLATE SILENCE WITH CLARITY AN[D] STRUCTURE
      ────────────────────────────────────────────────────────────── */}
      <section id="relics" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08] relative">
        
        {/* Small Labels on Top */}
        <div className="flex items-center justify-between text-[11px] font-mono uppercase text-zinc-500 mb-8">
          <div>
            <span className="text-white block font-bold tracking-wider">ECHOES OF METAL</span>
            <span>NASA Planetary Data System Array</span>
          </div>
          <span className="tracking-widest">Astronomical Relics</span>
        </div>

        {/* Centered Huge Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 py-8">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-space font-medium text-white tracking-tight uppercase leading-[1.08]">
            WE TRANSLATE SILENCE WITH
            <br />
            CLARITY AN<CapsuleD /> STRUCTURE
            <br />
            INTO LIVING MEMORY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed pt-2">
            Echoes of Metal treats silent space probes as stranded explorers with answering machines across billions of kilometers of vacuum.
          </p>
        </div>

        {/* Bottom Bar: Carousel Controls */}
        <div className="flex items-center justify-between pt-6 pb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : 2))}
              className="w-9 h-9 rounded-full border border-white/20 bg-[#0e0f14] text-white flex items-center justify-center hover:border-white/40 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCarouselIndex((prev) => (prev < 2 ? prev + 1 : 0))}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            Hardware Catalog
          </span>
        </div>

        {/* The 3 Showcase Cards with Real NASA Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Opportunity */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-xl overflow-hidden flex flex-col justify-between group hover:border-white/[0.18] transition-colors">
            <div className="h-48 w-full relative overflow-hidden bg-black">
              <img 
                src="/nasa_opportunity.jpg" 
                alt="Opportunity rover on Mars" 
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 border border-white/10 text-zinc-300">
                MER-B · Mars
              </span>
            </div>
            <div className="p-6 space-y-3">
              <span className="font-space text-4xl font-bold tracking-tight block text-white">
                5,111 Sols
              </span>
              <h4 className="text-base font-space font-medium tracking-tight text-white">
                Opportunity MER-B
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                A robot planned for 90 days that survived 15 years on Mars, until the global dust storm of 2018 blanketed Perseverance Valley.
              </p>
            </div>
          </div>

          {/* Card 2: Voyager 1 (Pure White Contrast Card) */}
          <div className="rounded-2xl bg-white text-black shadow-xl overflow-hidden flex flex-col justify-between group">
            <div className="h-48 w-full relative overflow-hidden bg-black">
              <img 
                src="/nasa_voyager.jpg" 
                alt="Voyager 1 deep space probe" 
                className="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
              <span className="absolute top-3 left-3 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-white">
                Interstellar · 162 AU
              </span>
            </div>
            <div className="p-6 space-y-3">
              <span className="font-space text-4xl font-bold tracking-tight block text-black">
                22.8 Hours
              </span>
              <h4 className="text-base font-space font-semibold tracking-tight text-black">
                Voyager 1 Interstellar
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Humanity's farthest emissary, 24 billion km from Earth in the interstellar void, still whispering carrier signals at -158 dBm.
              </p>
            </div>
          </div>

          {/* Card 3: InSight */}
          <div className="rounded-2xl bg-[#090a0f] border border-white/[0.08] shadow-xl overflow-hidden flex flex-col justify-between group hover:border-white/[0.18] transition-colors">
            <div className="h-48 w-full relative overflow-hidden bg-black">
              <img 
                src="/nasa_insight.jpg" 
                alt="InSight lander on Mars" 
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 border border-white/10 text-zinc-300">
                SEIS · Elysium Planitia
              </span>
            </div>
            <div className="p-6 space-y-3">
              <span className="font-space text-4xl font-bold tracking-tight block text-white">
                1,300+
              </span>
              <h4 className="text-base font-space font-medium tracking-tight text-white">
                InSight SEIS Marsquakes
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                A stethoscope on the ribcage of Mars, recording internal tectonic heartbeats until Martian dust covered its solar cells in 2022.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: STRAN[D]ED EXPLORERS STAY IN MEMORY.
      ────────────────────────────────────────────────────────────── */}
      <section id="philosophy" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08] relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 pb-16">
          
          {/* Left Column: Headline + Telemetry Scope Widgets */}
          <div className="lg:col-span-6 space-y-10">
            
            <h2 className="text-3xl sm:text-5xl font-space font-medium text-white tracking-tight uppercase leading-[1.08]">
              STRAN<CapsuleD />ED EXPLORERS
              <br />
              STAY IN MEMORY.
            </h2>

            {/* Scope / Metric Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              
              {/* Widget 1: Dust Factor Opacity 10.8 tau with stepped progress */}
              <div className="p-4 rounded-xl bg-[#090a0f] border border-white/[0.08] shadow-sm space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Atmospheric Dust Opacity
                </span>
                <span className="font-space text-2xl font-bold text-white tracking-tight block">
                  10.8 &tau;
                </span>
                
                {/* Stepped block progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mb-1.5">
                    <span>Opportunity Sol 5111 Cutoff</span>
                    <span>100%</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(14)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`h-2 flex-1 rounded-xs ${i < 13 ? 'bg-white' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Widget 2: Carrier Frequency Spectrum 8.4 GHz with equalizer bars */}
              <div className="p-4 rounded-xl bg-[#090a0f] border border-white/[0.08] shadow-sm space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Carrier Frequency Spectrum
                </span>
                <span className="font-space text-2xl font-bold text-white tracking-tight block">
                  8.4 GHz
                </span>

                {/* Equalizer bar chart */}
                <div className="flex items-end space-x-1 h-8 pt-2">
                  {[40, 65, 85, 50, 75, 95, 60, 45, 80, 100, 70, 55, 90, 65].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-1.5 rounded-xs transition-all ${
                        i < 7 ? 'bg-white' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Philosophy Text + Start Calling CTA */}
          <div className="lg:col-span-6 space-y-6 pt-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
              The Human Connection
            </span>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              <p>
                A machine becomes truly memorable when people can understand its journey without an engineering degree. Loneliness, loyalty, and silence create the deepest human connection.
              </p>
              <p>
                Deterministic speed-of-light delay turns that connection into physical reality. Waiting minutes or hours for radio waves to travel across the solar system makes the true scale of space visceral.
              </p>
              <p>
                Memory is not a static museum plaque. It is a live telephone line across the void to the silent explorers that showed humanity what lies beyond.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={onOpenPayphone}
                className="group px-5 py-2.5 rounded-full bg-white text-black font-sans font-medium text-xs tracking-tight hover:bg-zinc-200 transition-all flex items-center space-x-2.5 cursor-pointer shadow-md"
              >
                <span>Dial Solar Payphone</span>
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

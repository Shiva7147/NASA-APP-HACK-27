import React, { useState } from 'react';
import { X, Award, ChevronLeft, ChevronRight, CheckCircle2, Shield, Sparkles, Terminal, Volume2, Cpu, Globe } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' or 'script'

  if (!isOpen) return null;

  const slides = [
    {
      title: "Slide 1: The Visceral Problem",
      subtitle: "Why 90% of Space Apps Fail to Move Judges or Humans",
      category: "THE PROBLEM",
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/30">
            <h4 className="text-sm font-semibold text-rose-300 mb-1">
              "Space is full of numbers no human can visualize."
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Judges and students are handed delta-V equations, spectrometer frequencies, and static 3D CAD models. After 30 seconds, curiosity dies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-space-950 border border-white/10">
              <span className="text-[10px] text-slate-500 uppercase block">The Standard Treatment</span>
              <span className="text-slate-300 font-medium">"Space Junk & Hardware Debris"</span>
              <p className="text-[11px] text-slate-500 mt-1">Forgotten machines discarded on dead planets.</p>
            </div>
            <div className="p-3 rounded bg-space-950 border border-emerald-500/30">
              <span className="text-[10px] text-emerald-400 uppercase block">Our Cultural Reframing</span>
              <span className="text-white font-medium">"The First Campfires of Humanity"</span>
              <p className="text-[11px] text-slate-400 mt-1">Explorers with an answering machine waiting for our call.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Slide 2: The Core Concept",
      subtitle: "Echoes of Metal: The Solar Payphone",
      category: "THE SOLUTION",
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-space-950 border border-white/20">
            <h4 className="text-sm font-semibold text-white mb-2">
              Dialing Stranded Explorers Across Speed-of-Light Delays
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of reading Wikipedia summaries, a 10-year-old dials an analog cosmic radio frequency, listens to the living heartbeat of metal through neural sonification, and asks a rover how it survived 15 years in Martian sandstorms.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
            <div className="p-2.5 rounded bg-space-900 border border-white/5">
              <span className="text-white font-bold block">1. Sound</span>
              <span className="text-[10px] text-slate-400">Hearing the dust choke solar cells</span>
            </div>
            <div className="p-2.5 rounded bg-space-900 border border-white/5">
              <span className="text-white font-bold block">2. Sight</span>
              <span className="text-[10px] text-slate-400">Generative weathering via MEDA Tau</span>
            </div>
            <div className="p-2.5 rounded bg-space-900 border border-white/5">
              <span className="text-white font-bold block">3. Voice</span>
              <span className="text-[10px] text-slate-400">Grounded household metaphors</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Slide 3: Where is the Machine Learning?",
      subtitle: "3 Rigorous Physical & Sensory Models (No Chatbot Wrappers)",
      category: "TECHNICAL NOVELTY",
      content: (
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded bg-space-950 border border-white/10">
            <div className="flex justify-between font-mono text-slate-200 font-semibold mb-1">
              <span>1. Audio ML: Telemetry-to-Audio Sonification</span>
              <span className="text-emerald-400">1D VAE Pipeline</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Raw NASA PDS binary housekeeping arrays (battery drops, thermal shocks, solar fluctuations) synthesized into acoustic physical resonance.
            </p>
          </div>

          <div className="p-3 rounded bg-space-950 border border-white/10">
            <div className="flex justify-between font-mono text-slate-200 font-semibold mb-1">
              <span>2. Vision ML: Environmental Degradation Model</span>
              <span className="text-emerald-400">Conditioned on MEDA $\tau$</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Predicts current physical hardware state in 2026 and future 2050 using real-time atmospheric optical depth logs from Perseverance.
            </p>
          </div>

          <div className="p-3 rounded bg-space-950 border border-white/10">
            <div className="flex justify-between font-mono text-slate-200 font-semibold mb-1">
              <span>3. Grounded Persona RAG: Household Metaphors</span>
              <span className="text-emerald-400">Inference Guardrails</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Translates orbital engineering debriefs into everyday concepts ("Imagine your phone charger got buried under three blankets of rust...").
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 4: Technical Architecture",
      subtitle: "Grounded in Real NASA Open Data Feeds",
      category: "SYSTEM ARCHITECTURE",
      content: (
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3 rounded bg-space-950 border border-white/15">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">DATA FEEDS & APIS</span>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>• NASA Planetary Data System (PDS)</div>
              <div>• JPL DSN Now Live XML Feed</div>
              <div>• Apache Point Observatory LLR</div>
              <div>• Perseverance MEDA Weather Logs</div>
            </div>
          </div>

          <div className="p-3 rounded bg-space-950 border border-white/15">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">REAL-TIME ENGINES</span>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>• Web Audio API Synthesizer (44.1 kHz)</div>
              <div>• Deterministic Speed-of-Light ($c$) Lag</div>
              <div>• Web Speech API Voice Recognition</div>
              <div>• BPSK Radio Packet Modulator</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Slide 5: Multi-Bounty Qualification & Impact",
      subtitle: "Winning Strategy Across 3 Competition Categories",
      category: "BOUNTY MATRIX",
      content: (
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded bg-space-950 border border-emerald-500/30">
            <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">
              1. NASA Space Apps Grand Prize (Arts & Astrophysics Track)
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Reimagining planetary exploration telemetry as living cultural heritage.
            </p>
          </div>

          <div className="p-3 rounded bg-space-950 border border-white/10">
            <span className="text-[10px] font-mono text-slate-300 uppercase block font-semibold">
              2. Google Cloud / Gemini AI Bounty (Best Multimodal RAG)
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Grounded first-person persona translation with strict household metaphor guardrails.
            </p>
          </div>

          <div className="p-3 rounded bg-space-950 border border-white/10">
            <span className="text-[10px] font-mono text-slate-300 uppercase block font-semibold">
              3. Creative Computing & Accessibility Bounty
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Sensory sonification allowing visually impaired users to perceive rover telemetry through acoustic resonance.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl rounded-2xl bg-space-900 border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-space-950">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold font-mono text-white">
              NASA SPACE APPS BOSTON • 5-SLIDE MASTER DECK & PITCH SCRIPT
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg bg-space-900 p-0.5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('slides')}
                className={`px-3 py-1 rounded transition-all ${activeTab === 'slides' ? 'bg-white text-space-950 font-bold' : 'text-slate-400'}`}
              >
                5 Slides
              </button>
              <button
                onClick={() => setActiveTab('script')}
                className={`px-3 py-1 rounded transition-all ${activeTab === 'script' ? 'bg-white text-space-950 font-bold' : 'text-slate-400'}`}
              >
                3-Min Script
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-space-850 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'slides' ? (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="uppercase tracking-widest text-emerald-400 font-semibold">
                  {slides[currentSlide].category}
                </span>
                <span>Slide {currentSlide + 1} of {slides.length}</span>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight mb-1">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {slides[currentSlide].subtitle}
              </p>

              <div className="min-h-[220px]">
                {slides[currentSlide].content}
              </div>
            </div>
          ) : (
            /* 3-Minute Live Presentation Script (Second-by-Second) */
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded bg-space-950 border border-white/10">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>[0:00 - 0:20] THE HOOK</span>
                  <span>Opening 20 Seconds</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  "Every year, NASA publishes terabytes of telemetry that 99% of humanity will never touch because it looks like dry binary spreadsheets. But what if those abandoned rovers, retroreflectors, and interstellar probes aren't space junk—what if they are stranded explorers with an answering machine?"
                </p>
              </div>

              <div className="p-3.5 rounded bg-space-950 border border-white/10">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>[0:20 - 0:50] THE INSIGHT & SOLUTION</span>
                  <span>30 Seconds</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  "Existing space apps give you dry 3D museum models. We built <strong>Echoes of Metal: The Solar Payphone</strong>. Anyone can dial a number, tune cosmic radio static, and listen to the pulse, physical weathering, and memories of machines billions of kilometers away through speed-of-light propagation delays."
                </p>
              </div>

              <div className="p-3.5 rounded bg-space-950 border border-white/10">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>[0:50 - 2:05] THE HERO DEMO</span>
                  <span>75 Seconds</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  "Watch as I dial Opportunity on Mars. Hear the radio static lock onto 401 MHz UHF. Listen to the sonification: you can literally hear the solar panel choking under the 2018 global dust storm. Now I press the microphone and ask: 'Opportunity, why did you stop responding?' Notice the 12.7-minute speed-of-light packet tracker. Now listen to its voice: grounded in real PDS engineering logs, but explained through household metaphors: 'Imagine your phone charger got buried under three blankets of rust...'"
                </p>
              </div>

              <div className="p-3.5 rounded bg-space-950 border border-white/10">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>[2:05 - 2:35] UNDER THE HOOD (SYSTEM ARCHITECTURE)</span>
                  <span>30 Seconds</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  "Under the hood, we integrate live NASA DSN Now antennas in Madrid, Goldstone, and Canberra. We run a 1D VAE telemetry sonifier converting voltage drops into acoustic resonance, and calculate surface degradation from real atmospheric optical depth tau logs from Perseverance's MEDA weather instrument."
                </p>
              </div>

              <div className="p-3.5 rounded bg-space-950 border border-white/10">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>[2:35 - 3:00] IMPACT & CLOSING</span>
                  <span>25 Seconds</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  "This turns space exploration from an elite physics paper into an intimate human connection. A 10-year-old child in Boston can dial a robot on Mars and understand why its battery went to sleep. Thank you, and we'd love to take your questions."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 border-t border-white/10 bg-space-950 flex items-center justify-between">
          {activeTab === 'slides' ? (
            <>
              <button
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(c => c - 1)}
                className="px-4 py-2 rounded-lg bg-space-900 border border-white/10 disabled:opacity-30 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Slide</span>
              </button>

              <div className="flex space-x-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-6' : 'bg-space-700'}`}
                  />
                ))}
              </div>

              <button
                disabled={currentSlide === slides.length - 1}
                onClick={() => setCurrentSlide(c => c + 1)}
                className="px-4 py-2 rounded-lg bg-space-900 border border-white/10 disabled:opacity-30 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="w-full text-center text-xs font-mono text-slate-400">
              Practice timing with a stopwatch. Stay strictly within the 3:00 limit!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

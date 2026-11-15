import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CapsuleD from './CapsuleD';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#000000] border-t border-white/[0.08] pt-16 pb-12 text-zinc-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Callout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-white/[0.08] gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-space font-medium text-white tracking-tight uppercase leading-snug">
              Provide stran<CapsuleD />ed explorers the voice they need.
            </h3>
            <p className="mt-2 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Echoes of Metal: The Solar Payphone connects human curiosity with planetary telemetry across speed-of-light delays.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('payphone');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group px-5 py-2.5 rounded-full bg-white text-black font-sans font-medium text-xs tracking-tight hover:bg-zinc-200 transition-all flex items-center space-x-2.5 self-start md:self-auto cursor-pointer shadow-md"
          >
            <span>Enter Solar Payphone</span>
            <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>

        {/* Tabular Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 font-mono text-[11px]">
          
          <div>
            <span className="text-zinc-200 font-medium uppercase tracking-wider block mb-4">
              System Modules
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => setActiveTab('tuner')} className="hover:text-white transition-colors">
                  Cosmic Radio Dial
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sonification')} className="hover:text-white transition-colors">
                  Telemetry Sonification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('degradation')} className="hover:text-white transition-colors">
                  Environmental Aging Model
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('payphone')} className="hover:text-white transition-colors">
                  Solar Payphone
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('laser')} className="hover:text-white transition-colors">
                  Apollo 11 Lunar Laser
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dsn')} className="hover:text-white transition-colors">
                  DSN Ground Stations
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-medium uppercase tracking-wider block mb-4">
              NASA Data Feeds
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="https://pds.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>Planetary Data System (PDS)</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://eyes.nasa.gov/dsn/dsn.html" target="_blank" rel="noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>JPL DSN Now Feed</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>JPL Horizons Ephemerides</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://mars.nasa.gov/msl/weather/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center space-x-1">
                  <span>Perseverance MEDA Logs</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-medium uppercase tracking-wider block mb-4">
              Architecture
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>Time-Series Telemetry Sonification</li>
              <li>Atmospheric $\tau$ Opacity Decay</li>
              <li>Deterministic Light Latency</li>
              <li>Grounded Household Metaphors</li>
              <li>BPSK Digital Radio Modulation</li>
              <li>Corner-Cube Laser Ranging</li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-200 font-medium uppercase tracking-wider block mb-4">
              Challenge Info
            </span>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-3">
              NASA International Space Apps Challenge · Boston. Open source telemetry and public education project.
            </p>
            <div className="p-2.5 rounded bg-[#141417] border border-white/[0.05] font-mono text-[10px] text-zinc-500">
              Project: Echoes of Metal
              <br />
              Open Data Protocol
            </div>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div>
            Echoes of Metal · NASA Space Apps Challenge Boston
          </div>
          <div className="flex items-center space-x-4">
            <span>NASA Open Data License</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

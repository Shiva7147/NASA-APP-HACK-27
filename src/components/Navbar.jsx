import React, { useState } from 'react';
import { Radio, Volume2, VolumeX } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const toggleMasterAudio = () => {
    if (!isAudioEnabled) {
      cosmicAudio.init();
      cosmicAudio.startRadioStatic(0.04);
      setIsAudioEnabled(true);
    } else {
      cosmicAudio.stopRadioStatic();
      cosmicAudio.stopTelemetrySonification();
      cosmicAudio.stopMartianWind();
      setIsAudioEnabled(false);
    }
  };

  const navItems = [
    { id: 'showcase', label: 'Overview' },
    { id: 'console', label: 'Console' },
    { id: 'payphone', label: 'Solar Payphone' },
    { id: 'tuner', label: 'Radio Dial' },
    { id: 'sonification', label: 'Telemetry Sonification' },
    { id: 'degradation', label: 'Aging Model' },
    { id: 'laser', label: 'Lunar Laser' },
    { id: 'dsn', label: 'DSN Tracking' },
    { id: 'voicemail', label: 'Transmission Record' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none" 
          onClick={() => setActiveTab('showcase')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#0e0f14] border border-white/[0.12] flex items-center justify-center text-white">
            <Radio className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold tracking-tight text-white font-space">
                ECHOES OF METAL
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                / NASA Space Apps
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors font-sans cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>DSS-63 Madrid</span>
          </div>

          <button
            onClick={toggleMasterAudio}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border cursor-pointer ${
              isAudioEnabled
                ? 'bg-white text-black border-white font-medium'
                : 'bg-[#0e0f14] text-zinc-300 border-white/[0.1] hover:border-white/[0.2]'
            }`}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                <span className="hidden sm:inline">Audio Muted</span>
              </>
            )}
          </button>

          {/* Stark white pill button with nested black circle arrow disc */}
          <button
            onClick={() => setActiveTab('payphone')}
            className="group hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white text-black font-sans font-medium text-xs tracking-tight hover:bg-zinc-200 transition-all cursor-pointer shadow-sm"
          >
            <span>Dial Payphone</span>
            <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 space-x-1.5 border-t border-white/[0.06] bg-[#000000] text-xs no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-sans ${
              activeTab === item.id
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

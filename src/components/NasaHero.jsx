import React, { useState, useEffect, useRef } from 'react';
import { Radio, Volume2, VolumeX, Phone, Activity, ChevronRight, Clock, Shield, Sparkles } from 'lucide-react';
import DecryptedText from './react-bits/DecryptedText';
import SpotlightCard from './react-bits/SpotlightCard';
import CosmicStarfield from './react-bits/CosmicStarfield';
import StarBorder from './react-bits/StarBorder';
import { cosmicAudio } from '../utils/audioEngine';
import { PROBES } from '../data/telemetryData';

export default function NasaHero({ onOpenPayphone, onOpenTuner, onOpenSonification, onOpenConsole }) {
  const [selectedProbeId, setSelectedProbeId] = useState('opportunity');
  const [isAudioLive, setIsAudioLive] = useState(false);
  const [metSeconds, setMetSeconds] = useState(5111 * 86400 + 4820);
  const canvasRef = useRef(null);

  const currentProbe = PROBES.find((p) => p.id === selectedProbeId) || PROBES[0];

  // MET (Mission Elapsed Time) ticking counter
  useEffect(() => {
    const timer = setInterval(() => {
      setMetSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMET = (totalSec) => {
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `+${days}d ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleSound = () => {
    if (!isAudioLive) {
      cosmicAudio.init();
      cosmicAudio.startRadioStatic(0.04);
      cosmicAudio.playCarrierLock(currentProbe.carrierPitch || 800);
      setIsAudioLive(true);
    } else {
      cosmicAudio.stopRadioStatic();
      cosmicAudio.stopTelemetrySonification();
      cosmicAudio.stopMartianWind();
      setIsAudioLive(false);
    }
  };

  const handleSwitchProbe = (id) => {
    setSelectedProbeId(id);
    const target = PROBES.find((p) => p.id === id);
    if (isAudioLive && target) {
      cosmicAudio.playCarrierLock(target.carrierPitch || 800);
    }
  };

  // Real-time Oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      phase += 0.08;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#050609';
      ctx.fillRect(0, 0, w, h);

      // NASA HUD Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center crosshair line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Live waveform
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      const centerY = h / 2;
      const amp = isAudioLive ? 24 : 12;

      for (let x = 0; x < w; x++) {
        const noise = (Math.random() - 0.5) * (isAudioLive ? 5 : 2);
        const y = centerY + Math.sin(x * 0.06 + phase) * amp + Math.cos(x * 0.02 - phase * 0.5) * (amp * 0.4) + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isAudioLive, selectedProbeId]);

  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          REACT BITS: COSMIC STARFIELD & NASA HUD RETICLE
      ────────────────────────────────────────────────────────────── */}
      <CosmicStarfield quantity={280} />

      {/* NASA Corner Reticle Markers */}
      <div className="absolute top-4 left-6 text-zinc-600 font-mono text-[10px] select-none pointer-events-none hidden sm:block">
        + NASA_DSN_ARRAY // LAT: 40.427°N LON: 4.250°W
      </div>
      <div className="absolute top-4 right-6 text-zinc-600 font-mono text-[10px] select-none pointer-events-none hidden sm:block">
        ECHOES_OF_METAL_v2.4 // NASA_SPACE_APPS +
      </div>

      <div className="relative z-10 flex flex-col items-start max-w-5xl space-y-7 pt-4">
        
        {/* Eyebrow Pill with React Bits DecryptedText */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#08090e]/90 border border-white/[0.12] text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <DecryptedText
            text="NASA DEEP SPACE NETWORK // MADRID DSS-63 // 70M ARRAY"
            speed={35}
            maxIterations={12}
            className="text-zinc-200"
          />
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="text-zinc-400 hidden sm:inline">CARRIER: 401.585 MHz UHF</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-medium tracking-[-0.04em] text-white leading-[0.98] select-none">
          Silence first.
          <br />
          <span className="text-zinc-400 font-light">Then the signal.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light">
          We turned humanity’s abandoned rovers, retroreflectors, and deep-space probes into living explorers with an answering machine. Dial a number across speed-of-light vacuum.
        </p>

        {/* Action Group */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          
          {/* Primary Action Button: Stark white pill with nested black circular arrow disc */}
          <button
            onClick={onOpenPayphone}
            className="group px-6 py-3 rounded-full bg-white text-black font-sans font-medium text-xs tracking-tight hover:bg-zinc-200 transition-all flex items-center space-x-2.5 cursor-pointer shadow-lg shadow-white/5"
          >
            <span>Dial Solar Payphone</span>
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>

          {/* Procedural Audio Toggle */}
          <button
            onClick={toggleSound}
            className={`px-5 py-3 rounded-full border text-xs font-mono transition-colors flex items-center space-x-2 cursor-pointer ${
              isAudioLive
                ? 'bg-white text-black border-white font-medium shadow-sm'
                : 'bg-[#0e0f14] text-zinc-300 border-white/[0.12] hover:border-white/[0.25]'
            }`}
          >
            {isAudioLive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span>{isAudioLive ? 'Carrier Audio: Live' : 'Enable Radio Noise'}</span>
          </button>

          <button
            onClick={onOpenTuner}
            className="px-5 py-3 rounded-full bg-[#0e0f14] border border-white/[0.12] hover:border-white/[0.25] text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            Radio Tuner (400 MHz – 32 GHz)
          </button>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            AUTHENTIC DSN TRACKING NETWORK STRIP (Image 2 Inspired)
        ────────────────────────────────────────────────────────────── */}
        <div className="pt-4 pb-1 w-full max-w-4xl border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-[10px] font-mono tracking-widest uppercase text-zinc-500 select-none">
          <div className="flex items-center space-x-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span>NASA JPL · DSN NOW</span>
          </div>
          <span className="hover:text-zinc-300 transition-colors">GOLDSTONE DSS-14 // 70M</span>
          <span className="text-white font-medium hover:text-zinc-200 transition-colors">MADRID DSS-63 // 70M (LOCKED)</span>
          <span className="hover:text-zinc-300 transition-colors">CANBERRA DSS-43 // 70M</span>
          <span className="hover:text-zinc-300 transition-colors">PDS GEOSCIENCES</span>
          <span className="hover:text-zinc-300 transition-colors">ESA ESTRACK</span>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          REACT BITS SPOTLIGHTCARD: NASA TELEMETRY FLIGHT-DECK CONSOLE
      ────────────────────────────────────────────────────────────── */}
      <div className="mt-14 relative z-20">
        <SpotlightCard className="shadow-[0_25px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
          
          {/* Flight-Deck Header Bar */}
          <div className="px-5 py-3.5 bg-[#0e0f15]/90 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="ml-3 text-[11px] text-zinc-300">
                DSN FLIGHT TERMINAL // TARGET: {currentProbe.name.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[11px]">
              <span className="hidden sm:inline text-zinc-400">
                MET {formatMET(metSeconds)}
              </span>
              <span className="hidden sm:inline text-zinc-500">Power: -158.4 dBm</span>
              <span className="px-2.5 py-0.5 rounded bg-[#181922] border border-white/[0.1] text-white">
                {(currentProbe.lightDelaySeconds < 60) ? `${currentProbe.lightDelaySeconds}s lag` : `${(currentProbe.lightDelaySeconds / 60).toFixed(1)} min lag`}
              </span>
            </div>
          </div>

          {/* Terminal Body: 3 Interactive Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            
            {/* Column 1: Live Oscilloscope & Spectrum Monitor */}
            <div className="lg:col-span-4 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Carrier Waveform Monitor
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {currentProbe.frequency.split('/')[0]}
                  </span>
                </div>
                
                {/* Canvas Oscilloscope */}
                <div className="w-full h-36 rounded-lg overflow-hidden border border-white/[0.08] relative">
                  <canvas ref={canvasRef} width={380} height={144} className="w-full h-full block" />
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-300 bg-black/60 px-1.5 py-0.5 rounded">
                    SNR: 14.2 dB
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-500">
                    Bandpass 1.2 kHz
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
                <div className="flex justify-between">
                  <span>Downlink:</span>
                  <span className="text-zinc-200">{currentProbe.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="text-zinc-200">{(currentProbe.distanceKm / 1e6).toFixed(1)}M km from Earth</span>
                </div>
                <div className="flex justify-between">
                  <span>Modulation:</span>
                  <span className="text-zinc-200">BPSK Telemetry</span>
                </div>
              </div>
            </div>

            {/* Column 2: The Answering Machine Receiver */}
            <div className="lg:col-span-5 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Select Stranded Explorer
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    4 Cataloged
                  </span>
                </div>

                {/* Probe Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3.5">
                  {PROBES.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSwitchProbe(p.id)}
                      className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono transition-colors text-center cursor-pointer border ${
                        p.id === currentProbe.id
                          ? 'bg-white text-black font-semibold border-white shadow-sm'
                          : 'bg-[#101117] text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/[0.18]'
                      }`}
                    >
                      {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Grounded Message Box */}
                <div className="p-3.5 rounded-lg bg-[#0e0f16] border border-white/[0.08] text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-zinc-400 uppercase tracking-wider">
                    <span>Last Mission Transmission</span>
                    <span>{currentProbe.status.split('(')[0]}</span>
                  </div>
                  <p className="text-zinc-200 text-xs leading-relaxed italic">
                    "{currentProbe.humanAnalogy.quote}"
                  </p>
                  <div className="pt-2 border-t border-white/[0.06] text-[11px] text-zinc-400 font-sans leading-normal">
                    <span className="text-zinc-500 font-mono text-[10px] block mb-0.5">Physical Translation:</span>
                    {currentProbe.humanAnalogy.extended}
                  </div>
                </div>
              </div>

              {/* Call to Action Inside Terminal */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={onOpenPayphone}
                  className="flex-1 py-2 px-3 rounded-lg bg-white text-black font-space font-medium text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Dial {currentProbe.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onOpenSonification}
                  className="py-2 px-3 rounded-lg bg-[#141520] hover:bg-[#1a1b2a] border border-white/[0.1] text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Sonify</span>
                </button>
              </div>
            </div>

            {/* Column 3: NASA PDS Live Housekeeping Logs */}
            <div className="lg:col-span-3 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    NASA PDS Sensor Frame
                  </span>
                  <span className="text-[9px] font-mono text-zinc-300">
                    Calibrated
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Bus Voltage</span>
                    <span className="text-white font-medium">{currentProbe.pdsSensorData.batteryVoltage}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Solar Yield</span>
                    <span className="text-white font-medium">{currentProbe.pdsSensorData.solarEfficiency}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Dust Opacity</span>
                    <span className="text-white font-medium">&tau; = {currentProbe.pdsSensorData.dustTau}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0e0f16] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Core Temp</span>
                    <span className="text-white font-medium">{currentProbe.pdsSensorData.coreTempK} K</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenConsole}
                className="w-full py-2 rounded-lg bg-[#10111a] hover:bg-[#161824] border border-white/[0.08] text-[11px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Full Telemetry Array</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </SpotlightCard>
      </div>

    </section>
  );
}

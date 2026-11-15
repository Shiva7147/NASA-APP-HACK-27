import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Square, Layers } from 'lucide-react';
import { PROBES } from '../data/telemetryData';
import { cosmicAudio } from '../utils/audioEngine';

export default function AudioSonification({ selectedProbeId, onSelectProbe }) {
  const probe = PROBES.find((p) => p.id === selectedProbeId) || PROBES[0];

  const [dustTau, setDustTau] = useState(probe.pdsSensorData.dustTau || 1.2);
  const [coreTempK, setCoreTempK] = useState(probe.pdsSensorData.coreTempK || 180);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setDustTau(probe.pdsSensorData.dustTau || 1.2);
    setCoreTempK(probe.pdsSensorData.coreTempK || 180);
    if (isPlaying) {
      cosmicAudio.startTelemetrySonification(probe.id, {
        dustTau: probe.pdsSensorData.dustTau || 1.2,
        tempK: probe.pdsSensorData.coreTempK || 180,
      });
    }
  }, [probe.id]);

  const togglePlay = () => {
    if (!isPlaying) {
      cosmicAudio.startTelemetrySonification(probe.id, { dustTau, tempK: coreTempK });
      setIsPlaying(true);
    } else {
      cosmicAudio.stopTelemetrySonification();
      setIsPlaying(false);
    }
  };

  const handleUpdateTau = (newTau) => {
    setDustTau(newTau);
    if (isPlaying) {
      cosmicAudio.startTelemetrySonification(probe.id, { dustTau: newTau, tempK: coreTempK });
    }
  };

  const handleUpdateTemp = (newTemp) => {
    setCoreTempK(newTemp);
    if (isPlaying) {
      cosmicAudio.startTelemetrySonification(probe.id, { dustTau, tempK: newTemp });
    }
  };

  // FFT frequency visualizer (Monochrome matte silver)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#0e0e11';
      ctx.fillRect(0, 0, w, h);

      // Clean grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 28) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }

      if (cosmicAudio.analyser && isPlaying) {
        const bufferLength = cosmicAudio.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        cosmicAudio.analyser.getByteFrequencyData(dataArray);

        const barWidth = (w / bufferLength) * 2.2;
        let barX = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * h;
          // Quiet silver/bone gradient
          ctx.fillStyle = i % 2 === 0 ? 'rgba(244, 244, 245, 0.85)' : 'rgba(161, 161, 170, 0.45)';
          ctx.fillRect(barX, h - barHeight, barWidth - 1, barHeight);
          barX += barWidth;
        }
      } else {
        // Idle line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Title & Hardware Picker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">
              Telemetry Sonification Engine
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              NASA PDS Time-Series Mapping
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Converts raw binary sensor logs into acoustic physical soundscapes, allowing observers to hear the machine's mechanical condition.
          </p>
        </div>

        {/* Hardware Switcher */}
        <div className="flex flex-wrap gap-1.5">
          {PROBES.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProbe(p.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                p.id === probe.id
                  ? 'bg-white text-black font-medium border-white'
                  : 'bg-[#18181b] text-zinc-400 border-white/[0.07] hover:border-white/[0.14] hover:text-white'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sonification Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: FFT Spectrogram & Audio Player */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-lg bg-[#0e0e11] border border-white/[0.08]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-zinc-200' : 'bg-zinc-600'}`} />
                <span className="text-xs font-mono text-zinc-300">
                  {isPlaying ? 'Synthesizing resonance' : 'Synthesizer idle'}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                44.1 kHz · FFT: 256
              </span>
            </div>

            {/* FFT Visualizer Canvas */}
            <canvas
              ref={canvasRef}
              width={600}
              height={140}
              className="w-full h-36 rounded border border-white/[0.05] object-cover"
            />
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-md text-xs font-medium font-mono flex items-center space-x-2 transition-colors cursor-pointer ${
                isPlaying
                  ? 'bg-[#27272b] text-white border border-white/[0.15]'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Halt sonification</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Sonify {probe.name.split(' ')[0]}</span>
                </>
              )}
            </button>

            <button
              onClick={() => cosmicAudio.playThermalPing()}
              className="px-3 py-2 rounded-md bg-[#18181b] hover:bg-[#1c1c20] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              Trigger thermal ping (-90°C)
            </button>

            {probe.id === 'voyager1' && (
              <button
                onClick={() => cosmicAudio.playCarrierLock(1200)}
                className="px-3 py-2 rounded-md bg-[#18181b] hover:bg-[#1c1c20] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                Solar wind chime burst
              </button>
            )}
          </div>
        </div>

        {/* Right: Telemetry Sliders & Parameters */}
        <div className="lg:col-span-5 p-5 rounded-lg bg-[#141417] border border-white/[0.07] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              <span>Telemetry Parameters</span>
            </h3>

            {/* Parameter 1: Dust Tau */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-zinc-400">Dust Opacity ($\tau$):</span>
                <span className="text-zinc-200 tabular-nums">{dustTau.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="12.0"
                step="0.1"
                value={dustTau}
                onChange={(e) => handleUpdateTau(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1c1c20] rounded appearance-none cursor-pointer accent-zinc-200"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>0.1 (Clear sky)</span>
                <span>5.0 (Moderate)</span>
                <span>12.0 (Sol 5111 storm)</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Higher dust values progressively dampen higher frequencies into a choked acoustic rhythm.
              </p>
            </div>

            {/* Parameter 2: Core Temp */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-zinc-400">Core Hardware Temp:</span>
                <span className="text-zinc-200 tabular-nums">
                  {coreTempK} K ({(coreTempK - 273.15).toFixed(1)}°C)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="310"
                step="5"
                value={coreTempK}
                onChange={(e) => handleUpdateTemp(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#1c1c20] rounded appearance-none cursor-pointer accent-zinc-200"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>20 K (Interstellar)</span>
                <span>180 K (Night)</span>
                <span>300 K (Sunlit)</span>
              </div>
            </div>
          </div>

          {/* NASA PDS telemetry ground truth box */}
          <div className="mt-4 p-3 rounded bg-[#0e0e11] border border-white/[0.06] text-xs font-mono">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              NASA PDS Archive Status
            </div>
            <div className="grid grid-cols-2 gap-2 text-zinc-300 text-[11px]">
              <div>Battery: {probe.pdsSensorData.batteryVoltage}</div>
              <div>Solar: {probe.pdsSensorData.solarEfficiency}</div>
              <div>Radiation: {probe.pdsSensorData.radiationCount}</div>
              <div>Odometer: {probe.pdsSensorData.wheelOdometer}</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

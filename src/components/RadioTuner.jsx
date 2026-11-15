import React, { useState, useEffect, useRef } from 'react';
import { Radio, Lock, ArrowRight } from 'lucide-react';
import { RADIO_FREQUENCIES, PROBES } from '../data/telemetryData';
import { cosmicAudio } from '../utils/audioEngine';

export default function RadioTuner({ onSelectProbe, onOpenPayphone }) {
  const [dialPos, setDialPos] = useState(55); // 0 to 100
  const [lockedTarget, setLockedTarget] = useState(null);
  const [isAudioLive, setIsAudioLive] = useState(false);
  const canvasRef = useRef(null);

  const calculateFreq = (pos) => {
    const minLog = Math.log(0.4);
    const maxLog = Math.log(35.0);
    return Math.exp(minLog + (pos / 100) * (maxLog - minLog));
  };

  const currentFreqGHz = calculateFreq(dialPos);

  useEffect(() => {
    let matched = null;
    if (Math.abs(dialPos - 12) < 4) {
      matched = { ...PROBES.find(p => p.id === 'opportunity'), band: '401.585 MHz (UHF Proximity Link)', nominalPos: 12 };
    } else if (Math.abs(dialPos - 38) < 3) {
      matched = { id: 'cmb', name: 'Hydrogen 21cm Line (1.420 GHz)', tagline: 'Cosmic Microwave Background noise floor', band: '1.420 GHz Hydrogen', nominalPos: 38 };
    } else if (Math.abs(dialPos - 52) < 3.5) {
      matched = { ...PROBES.find(p => p.id === 'apollo11'), band: '2.296 GHz S-Band Carrier', nominalPos: 52 };
    } else if (Math.abs(dialPos - 78) < 3) {
      matched = { ...PROBES.find(p => p.id === 'voyager1'), band: '8.415 GHz X-Band Deep Space', nominalPos: 78 };
    } else if (Math.abs(dialPos - 94) < 3) {
      matched = { id: 'deepka', name: 'Deep Space Ka-Band Survey', tagline: 'Planetary Science downlink channel', band: '32.050 GHz Ka-Band', nominalPos: 94 };
    }

    if (matched && (!lockedTarget || lockedTarget.id !== matched.id)) {
      setLockedTarget(matched);
      if (isAudioLive) {
        cosmicAudio.playCarrierLock(matched.carrierPitch || 800);
      }
    } else if (!matched && lockedTarget) {
      setLockedTarget(null);
    }

    if (isAudioLive) {
      cosmicAudio.setTunerFrequency(dialPos / 100);
      cosmicAudio.setStaticVolume(matched ? 0.02 : 0.05);
    }
  }, [dialPos, isAudioLive]);

  // Clean, matte monochrome oscilloscope
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
      ctx.clearRect(0, 0, w, h);

      // Matte dark background
      ctx.fillStyle = '#0e0e11';
      ctx.fillRect(0, 0, w, h);

      // Clean, quiet grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Waveform: quiet silver when locked, subtle grey noise when unlocked
      ctx.beginPath();
      const isLocked = !!lockedTarget;
      ctx.strokeStyle = isLocked ? '#f4f4f5' : '#71717a';
      ctx.lineWidth = isLocked ? 1.5 : 1;

      for (let x = 0; x < w; x++) {
        const normX = x / w;
        let y = h / 2;

        if (isLocked) {
          const carrier = Math.sin(normX * 24 + phase * 2) * (h * 0.28);
          const sub = Math.sin(normX * 48 - phase) * (h * 0.08);
          y += carrier + sub + (Math.random() - 0.5) * 2;
        } else {
          const noise = (Math.random() - 0.5) * (h * 0.35);
          y += noise;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [lockedTarget]);

  const handleTuneTo = (pos) => {
    setDialPos(pos);
    if (!isAudioLive) {
      cosmicAudio.startRadioStatic(0.04);
      setIsAudioLive(true);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">Cosmic Radio Tuner</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              Analog Dial
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Drag the tuner across radio frequency bands from 400 MHz to 35 GHz. Listen to cosmic static or lock onto deep space carriers.
          </p>
        </div>

        {/* Live Frequency readout */}
        <div className="flex items-center space-x-2.5">
          <div className="px-3 py-1 rounded bg-[#18181b] border border-white/[0.08] font-mono text-xs flex items-center space-x-2">
            <span className="text-zinc-500">Center:</span>
            <span className="text-zinc-200 tabular-nums">
              {currentFreqGHz < 1 ? `${(currentFreqGHz * 1000).toFixed(1)} MHz` : `${currentFreqGHz.toFixed(3)} GHz`}
            </span>
          </div>

          <button
            onClick={() => {
              if (!isAudioLive) {
                cosmicAudio.startRadioStatic(0.04);
                setIsAudioLive(true);
              } else {
                cosmicAudio.stopRadioStatic();
                setIsAudioLive(false);
              }
            }}
            className={`px-3 py-1 rounded font-mono text-xs border transition-colors ${
              isAudioLive
                ? 'bg-white text-black border-white font-medium'
                : 'bg-[#18181b] text-zinc-400 border-white/[0.08] hover:text-white'
            }`}
          >
            {isAudioLive ? 'Static active' : 'Enable audio'}
          </button>
        </div>
      </div>

      {/* Oscilloscope Display */}
      <div className="mt-6 relative rounded-lg overflow-hidden border border-white/[0.08] bg-[#0e0e11]">
        <canvas
          ref={canvasRef}
          width={700}
          height={150}
          className="w-full h-36 object-cover"
        />

        {/* HUD Labels */}
        <div className="absolute top-3 left-4 flex items-center space-x-3 pointer-events-none">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            RF Spectrogram
          </span>
          {lockedTarget ? (
            <span className="px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.12] text-[10px] font-mono text-zinc-200 flex items-center space-x-1">
              <Lock className="w-2.5 h-2.5 text-zinc-400" />
              <span>Carrier lock: {lockedTarget.name}</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-[#141417] border border-white/[0.06] text-[10px] font-mono text-zinc-500">
              Noise floor (-164 dBm)
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-500 pointer-events-none">
          Filter: Bandpass 1.2 kHz
        </div>
      </div>

      {/* Interactive Tuner Slider */}
      <div className="mt-6">
        <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-2">
          <span>400 MHz</span>
          <span>1.42 GHz</span>
          <span>2.3 GHz</span>
          <span>8.4 GHz</span>
          <span>32 GHz</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="0.2"
          value={dialPos}
          onChange={(e) => handleTuneTo(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[#1c1c20] rounded appearance-none cursor-ew-resize accent-zinc-200"
        />

        {/* Quick jump presets */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-zinc-500 mr-1">Presets:</span>
          {[
            { label: 'Opportunity (401 MHz)', pos: 12 },
            { label: 'Cosmic Noise (1.42 GHz)', pos: 38 },
            { label: 'Apollo 11 (2.29 GHz)', pos: 52 },
            { label: 'Voyager 1 (8.41 GHz)', pos: 78 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleTuneTo(preset.pos)}
              className="px-2.5 py-1 rounded bg-[#18181b] border border-white/[0.07] hover:border-white/[0.15] text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Details Card */}
      {lockedTarget && lockedTarget.id !== 'cmb' && lockedTarget.id !== 'deepka' && (
        <div className="mt-6 p-4 rounded-lg bg-[#141417] border border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-white">{lockedTarget.name}</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] text-zinc-300 border border-white/[0.08]">
                {lockedTarget.band}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">{lockedTarget.tagline}</p>
          </div>

          <button
            onClick={() => {
              onSelectProbe(lockedTarget.id);
              onOpenPayphone();
            }}
            className="px-3.5 py-2 rounded bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0"
          >
            <span>Dial explorer</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      )}

    </div>
  );
}

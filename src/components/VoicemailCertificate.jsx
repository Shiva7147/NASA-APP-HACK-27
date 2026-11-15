import React, { useState, useRef } from 'react';
import { Send, Download, Award, Radio } from 'lucide-react';
import { cosmicAudio } from '../utils/audioEngine';

export default function VoicemailCertificate() {
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [targetDestination, setTargetDestination] = useState('Voyager 1 Trajectory (Heliosphere Boundary)');
  const [certificateData, setCertificateData] = useState(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const certRef = useRef(null);

  const destinations = [
    { name: 'Voyager 1 Trajectory (Heliosphere Boundary)', ra: '17h 14m 24s', dec: '+12° 02′ 31″', distAu: '165.4 AU', jupiterPass: '38 minutes', plutoPass: '5.2 hours', interstellarExit: '22.9 hours' },
    { name: 'Opportunity Relic (Mars, Perseverance Valley)', ra: '04h 22m 11s', dec: '-14° 28′ 12″', distAu: '1.52 AU', jupiterPass: 'N/A (Mars Landing)', plutoPass: 'N/A', interstellarExit: '12.7 minutes' },
    { name: 'Apollo 11 Retroreflector (Moon, Tranquillity)', ra: '12h 45m 02s', dec: '+08° 12′ 00″', distAu: '0.0025 AU', jupiterPass: 'N/A (Lunar Mirror)', plutoPass: 'N/A', interstellarExit: '1.28 seconds' },
    { name: 'Kepler-186f (Habitable Zone Survey)', ra: '19h 54m 36s', dec: '+44° 01′ 40″', distAu: '3.67 × 10⁷ AU', jupiterPass: '42 minutes', plutoPass: '5.5 hours', interstellarExit: '582 light-years' }
  ];

  const currentDest = destinations.find(d => d.name === targetDestination) || destinations[0];

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !authorName.trim()) return;

    setIsTransmitting(true);
    cosmicAudio.init();
    cosmicAudio.playCarrierLock(841);

    setTimeout(() => {
      const hash = 'DSN-TX-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);
      const timestamp = new Date().toUTCString();

      const cert = {
        id: hash,
        author: authorName,
        message: messageText,
        destination: currentDest.name,
        ra: currentDest.ra,
        dec: currentDest.dec,
        frequency: '8.415 GHz X-Band Uplink',
        power: '20 kW Equivalent Isotropic Radiated Power',
        timestamp: timestamp,
        lightSpeed: '299,792.458 km/s',
        jupiterPass: currentDest.jupiterPass,
        plutoPass: currentDest.plutoPass,
        interstellarExit: currentDest.interstellarExit,
      };

      setCertificateData(cert);
      setIsTransmitting(false);
    }, 1200);
  };

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">
              Interplanetary Transmission Record
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              BPSK Carrier Modulation
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Encode a text message into simulated digital radio packets, calculate celestial transit times, and generate an archival record.
          </p>
        </div>
      </div>

      {/* Grid: Composer & Archival Certificate */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#0e0e11] border border-white/[0.08] flex flex-col justify-between">
          <form onSubmit={handleTransmit}>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center space-x-2">
              <Send className="w-3.5 h-3.5 text-zinc-500" />
              <span>Compose Transmission</span>
            </h3>

            {/* Author */}
            <div className="mb-4">
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Transmitter Call Sign / Name:
              </label>
              <input
                type="text"
                placeholder="e.g. Ground Observer"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="w-full bg-[#141417] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2]"
              />
            </div>

            {/* Target */}
            <div className="mb-4">
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Target Vector:
              </label>
              <select
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="w-full bg-[#141417] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white/[0.2]"
              >
                {destinations.map((d) => (
                  <option key={d.name} value={d.name} className="bg-[#0e0e11] text-white">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Message Payload:
              </label>
              <textarea
                rows={4}
                placeholder="Record your message for deep space..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
                className="w-full bg-[#141417] border border-white/[0.08] rounded-md p-3 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] leading-relaxed"
              />
            </div>

            {/* Trajectory */}
            <div className="p-3 rounded bg-[#141417] border border-white/[0.06] text-xs font-mono mb-5 space-y-1 text-zinc-400">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                Celestial Coordinates
              </div>
              <div>Right Ascension (RA): {currentDest.ra}</div>
              <div>Declination (Dec): {currentDest.dec}</div>
              <div>Crosses Pluto Orbit: in {currentDest.plutoPass}</div>
              <div>Leaves Heliosphere: in {currentDest.interstellarExit}</div>
            </div>

            <button
              type="submit"
              disabled={isTransmitting}
              className="w-full py-2.5 rounded-md bg-white hover:bg-zinc-200 text-black font-medium text-xs font-mono flex items-center justify-center space-x-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isTransmitting ? 'Synthesizing packet...' : 'Transmit radio packet'}</span>
            </button>
          </form>
        </div>

        {/* Right: Archival Certificate */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {certificateData ? (
            <div className="w-full">
              <div
                ref={certRef}
                className="p-7 rounded-xl bg-[#0e0e11] border border-white/[0.1] shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-medium font-mono text-white uppercase tracking-wider">
                        Deep Space Transmission Record
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500">
                        NASA Space Apps Challenge · Archival Registry
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-white/[0.08] text-zinc-300">
                    Status: In flight @ c
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono text-zinc-300">
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded bg-[#141417] border border-white/[0.06] text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Record ID:</span>
                      <span className="text-zinc-200">{certificateData.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Operator:</span>
                      <span className="text-zinc-200">{certificateData.author}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Carrier Band:</span>
                      <span className="text-zinc-300">{certificateData.frequency}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">UTC Timestamp:</span>
                      <span className="text-zinc-300">{certificateData.timestamp}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-zinc-500 block">Target Vector:</span>
                      <span className="text-zinc-200">
                        {certificateData.destination}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#141417] border border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                      Payload:
                    </span>
                    <blockquote className="italic text-zinc-200 text-xs leading-relaxed font-sans">
                      "{certificateData.message}"
                    </blockquote>
                  </div>

                  <div className="pt-2 text-[11px] text-zinc-500 leading-normal flex items-center justify-between border-t border-white/[0.06]">
                    <span>Velocity: <strong>299,792 km/s (c)</strong></span>
                    <span>Pluto crossing: in <strong>{certificateData.plutoPass}</strong></span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Echoes of Metal Registry</span>
                  <span>Open Space Telemetry</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button
                  onClick={handlePrintOrSave}
                  className="px-3.5 py-1.5 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Print archival record</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-72 rounded-xl bg-[#0e0e11] border border-dashed border-white/[0.07] flex flex-col items-center justify-center p-6 text-center text-xs font-mono text-zinc-500">
              <Radio className="w-6 h-6 text-zinc-600 mb-2" strokeWidth={1.5} />
              <p>Compose your transmission on the left to generate an archival deed.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

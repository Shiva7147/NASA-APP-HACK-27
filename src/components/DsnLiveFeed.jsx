import React, { useState } from 'react';
import { Satellite, RefreshCw, Volume2, Globe, ArrowUpRight } from 'lucide-react';
import { DSN_STATIONS } from '../data/telemetryData';
import { cosmicAudio } from '../utils/audioEngine';

export default function DsnLiveFeed() {
  const [selectedStation, setSelectedStation] = useState('madrid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveStations, setLiveStations] = useState(DSN_STATIONS);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  const currentStation = liveStations.find((s) => s.id === selectedStation) || liveStations[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLiveStations((prev) =>
        prev.map((st) => ({
          ...st,
          antennas: st.antennas.map((ant) => ({
            ...ant,
            power: (parseFloat(ant.power) + (Math.random() - 0.5) * 0.4).toFixed(1) + ' dBm',
            azimuth: (parseFloat(ant.azimuth) + (Math.random() - 0.5) * 0.2).toFixed(1) + '°',
          })),
        }))
      );
      setLastSync(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 500);
  };

  const handleMonitorDish = (ant) => {
    cosmicAudio.init();
    cosmicAudio.playCarrierLock(840);
  };

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Satellite className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">
              Deep Space Network (DSN) Antennas
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              JPL DSN Now XML Stream
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time downlinks from Earth's three 70-meter ground stations in Madrid, Goldstone, and Canberra.
          </p>
        </div>

        {/* Refresh & status */}
        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono text-zinc-500">
            Last sync: <span className="text-zinc-300 tabular-nums">{lastSync}</span>
          </span>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded bg-[#18181b] hover:bg-[#222227] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh DSN Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Ground Station Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {liveStations.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStation(st.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors border text-left ${
              selectedStation === st.id
                ? 'bg-[#1c1c20] text-white border-white/[0.18] shadow-sm'
                : 'bg-[#141417] text-zinc-400 border-white/[0.06] hover:border-white/[0.12] hover:text-zinc-200'
            }`}
          >
            <div className="font-medium text-white flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span>{st.code} ({st.id.toUpperCase()})</span>
            </div>
            <div className="text-[10px] text-zinc-500">{st.country}</div>
          </button>
        ))}
      </div>

      {/* Antenna Dishes Matrix */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentStation.antennas.map((ant) => (
          <div
            key={ant.name}
            className="p-5 rounded-xl bg-[#0e0e11] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.16] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <span className="text-sm font-medium font-mono text-white">{ant.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181b] border border-white/[0.06] text-zinc-500">
                    {ant.size}
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-white/[0.07] text-zinc-300">
                  {ant.status}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Tracking Target
                </span>
                <div className="text-sm font-medium text-white mt-0.5">
                  {ant.target}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                <div className="p-2.5 rounded bg-[#141417] border border-white/[0.05]">
                  <span className="text-[10px] text-zinc-500 block">Received Carrier:</span>
                  <span className="text-zinc-200">{ant.freq}</span>
                </div>
                <div className="p-2.5 rounded bg-[#141417] border border-white/[0.05]">
                  <span className="text-[10px] text-zinc-500 block">Signal Strength:</span>
                  <span className="text-zinc-200 tabular-nums">{ant.power}</span>
                </div>
                <div className="p-2.5 rounded bg-[#141417] border border-white/[0.05]">
                  <span className="text-[10px] text-zinc-500 block">Round-Trip Light:</span>
                  <span className="text-zinc-300 tabular-nums">{ant.rtlt}</span>
                </div>
                <div className="p-2.5 rounded bg-[#141417] border border-white/[0.05]">
                  <span className="text-[10px] text-zinc-500 block">Dish Orientation:</span>
                  <span className="text-zinc-300 tabular-nums">Az {ant.azimuth} · El {ant.elevation}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleMonitorDish(ant)}
              className="w-full py-2 rounded bg-[#18181b] hover:bg-[#202025] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
              <span>Listen to carrier pulse ({ant.target})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Madrid Notice */}
      <div className="mt-6 p-4 rounded-lg bg-[#141417] border border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <p className="text-zinc-400 font-sans">
          Antenna DSS-63 in Madrid is currently tracking Voyager 1’s downlink carrier from 24.8 billion kilometers away at -158.4 dBm.
        </p>
        <a
          href="https://eyes.nasa.gov/dsn/dsn.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 hover:text-white flex items-center space-x-1 font-mono text-[11px] underline shrink-0"
        >
          <span>NASA DSN Now Portal</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-500" />
        </a>
      </div>

    </div>
  );
}

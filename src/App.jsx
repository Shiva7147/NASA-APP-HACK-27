import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EchoesShowcase from './components/EchoesShowcase';
import CosmicHero from './components/CosmicHero';
import ModularConsole from './components/ModularConsole';
import RadioTuner from './components/RadioTuner';
import HardwareExplorer from './components/HardwareExplorer';
import AudioSonification from './components/AudioSonification';
import AgingModel from './components/AgingModel';
import SolarPayphone from './components/SolarPayphone';
import LaserRanging from './components/LaserRanging';
import DsnLiveFeed from './components/DsnLiveFeed';
import VoicemailCertificate from './components/VoicemailCertificate';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('showcase');
  const [selectedProbeId, setSelectedProbeId] = useState('opportunity');

  const handleSelectProbe = (id) => {
    setSelectedProbeId(id);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f4f4f8] flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* TAB: SHOWCASE (Echoes of Metal in the requested aesthetic: Capsule D, exact font pairing, deep-space telemetry theme) */}
        {activeTab === 'showcase' && (
          <EchoesShowcase
            onOpenPayphone={() => setActiveTab('payphone')}
            onOpenTuner={() => setActiveTab('tuner')}
            onOpenSonification={() => setActiveTab('sonification')}
            onOpenAging={() => setActiveTab('degradation')}
            onOpenLaser={() => setActiveTab('laser')}
            onOpenDsn={() => setActiveTab('dsn')}
            onOpenConsole={() => setActiveTab('console')}
          />
        )}

        {/* TAB: MODULAR CONSOLE (Hero from Image 1 + Modular Console from Image 2) */}
        {activeTab === 'console' && (
          <div>
            {/* 1. Exact recreate of Reference Image 1 */}
            <CosmicHero
              onStartCalling={() => setActiveTab('payphone')}
              onStartTuning={() => setActiveTab('tuner')}
            />

            {/* 2. Exact recreate of Reference Image 2 Modular Console Architecture */}
            <ModularConsole
              selectedProbeId={selectedProbeId}
              onSelectProbe={handleSelectProbe}
              onOpenPayphone={() => setActiveTab('payphone')}
              onOpenSonification={() => setActiveTab('sonification')}
              onOpenAging={() => setActiveTab('degradation')}
            />

            {/* 3. Deep Hardware Catalog Grid */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20">
              <HardwareExplorer
                selectedProbeId={selectedProbeId}
                onSelectProbe={handleSelectProbe}
                onOpenPayphone={() => setActiveTab('payphone')}
                onOpenSonification={() => setActiveTab('sonification')}
              />
            </div>
          </div>
        )}

        {/* TAB: RADIO DIAL */}
        {activeTab === 'tuner' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <RadioTuner
              onSelectProbe={handleSelectProbe}
              onOpenPayphone={() => setActiveTab('payphone')}
            />
          </div>
        )}

        {/* TAB: TELEMETRY SONIFICATION */}
        {activeTab === 'sonification' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <AudioSonification
              selectedProbeId={selectedProbeId}
              onSelectProbe={handleSelectProbe}
            />
          </div>
        )}

        {/* TAB: AGING MODEL */}
        {activeTab === 'degradation' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <AgingModel
              selectedProbeId={selectedProbeId}
              onSelectProbe={handleSelectProbe}
            />
          </div>
        )}

        {/* TAB: SOLAR PAYPHONE */}
        {activeTab === 'payphone' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <SolarPayphone
              selectedProbeId={selectedProbeId}
              onSelectProbe={handleSelectProbe}
            />
          </div>
        )}

        {/* TAB: LUNAR LASER */}
        {activeTab === 'laser' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <LaserRanging />
          </div>
        )}

        {/* TAB: DSN GROUND STATIONS */}
        {activeTab === 'dsn' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <DsnLiveFeed />
          </div>
        )}

        {/* TAB: TRANSMISSION RECORD */}
        {activeTab === 'voicemail' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
            <VoicemailCertificate />
          </div>
        )}

      </main>

      {/* Clean 4-Column Footer directly matching Reference Image 1 */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneCall, PhoneOff, Send, Clock, Mic, MicOff, Wind } from 'lucide-react';
import { PROBES } from '../data/telemetryData';
import { cosmicAudio } from '../utils/audioEngine';

export default function SolarPayphone({ selectedProbeId, onSelectProbe }) {
  const probe = PROBES.find((p) => p.id === selectedProbeId) || PROBES[0];

  const [callState, setCallState] = useState('idle'); // 'idle', 'in_flight', 'connected', 'ended'
  const [latencyProgress, setLatencyProgress] = useState(0);
  const [lightSpeedMode, setLightSpeedMode] = useState('accelerated');
  const [conversation, setConversation] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMartianWindActive, setIsMartianWindActive] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setCallState('idle');
    setLatencyProgress(0);
    setConversation([
      {
        sender: 'probe',
        text: `[AUTOMATED INTERPLANETARY ANSWERING MACHINE]\n"You've reached ${probe.name}. I am resting at ${probe.location}. ${probe.humanAnalogy.quote}"`,
        analogy: probe.humanAnalogy.nutshell
      }
    ]);
  }, [probe.id]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserQuery(transcript);
        setIsRecordingMic(false);
        handleAskQuestion(transcript);
      };

      recognition.onerror = () => setIsRecordingMic(false);
      recognition.onend = () => setIsRecordingMic(false);
      recognitionRef.current = recognition;
    }
  }, [probe.id, lightSpeedMode]);

  const toggleMicInput = () => {
    if (!recognitionRef.current) {
      alert("Microphone recognition is not supported in this browser. You can type directly in the field.");
      return;
    }

    if (!isRecordingMic) {
      try {
        recognitionRef.current.start();
        setIsRecordingMic(true);
      } catch (e) {
        setIsRecordingMic(false);
      }
    } else {
      recognitionRef.current.stop();
      setIsRecordingMic(false);
    }
  };

  const toggleMartianWind = () => {
    if (!isMartianWindActive) {
      cosmicAudio.startMartianWind(0.05);
      setIsMartianWindActive(true);
    } else {
      cosmicAudio.stopMartianWind();
      setIsMartianWindActive(false);
    }
  };

  const handleDial = () => {
    cosmicAudio.init();
    cosmicAudio.playCarrierLock(probe.carrierPitch || 800);
    setCallState('in_flight');
    setLatencyProgress(0);

    const duration = lightSpeedMode === 'accelerated' ? 3500 : Math.min(probe.lightDelaySeconds * 1000, 30000);
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setLatencyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setCallState('connected');
          cosmicAudio.playCarrierLock(probe.carrierPitch || 800);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);
  };

  const handleKeypadPress = (key) => {
    cosmicAudio.playDtmfTone(key);
  };

  const handleHangup = () => {
    setCallState('idle');
    setLatencyProgress(0);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleAskQuestion = (customText = null) => {
    const qText = customText || userQuery;
    if (!qText.trim()) return;

    const newHistory = [
      ...conversation,
      { sender: 'user', text: qText }
    ];
    setConversation(newHistory);
    setUserQuery('');

    setCallState('in_flight');
    setLatencyProgress(0);

    const duration = lightSpeedMode === 'accelerated' ? 2800 : 10000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setLatencyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setCallState('connected');

          const matched = probe.personaDialogue.find(
            (d) => qText.toLowerCase().includes(d.question.toLowerCase().split(' ')[0]) ||
                   d.question.toLowerCase().includes(qText.toLowerCase().slice(0, 8))
          );

          let reply = matched ? matched.answer : null;
          if (!reply) {
            reply = `Imagine waiting on an empty planetary plain where nobody has walked in millions of years. Every instruction from Earth takes ${(probe.lightDelaySeconds / 60).toFixed(1)} minutes to touch my antenna. Even though my battery stopped charging during Sol 5111, my memory chips hold every photograph of the red sky we took together.`;
          }

          setConversation((curr) => [
            ...curr,
            { sender: 'probe', text: reply, analogy: probe.humanAnalogy.nutshell }
          ]);

          speakResponse(reply);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 240));
      utterance.pitch = probe.id === 'voyager1' ? 0.75 : 0.88;
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-xl bg-[#111114] border border-white/[0.07] shadow-sm">
      
      {/* Header & Probe Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.07] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white tracking-tight">
              Solar Payphone
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c20] border border-white/[0.08] text-zinc-400">
              Speed-of-Light Link
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Pick up the receiver, speak or type your question, and observe real astronomical signal delays.
          </p>
        </div>

        {/* Explorer Selector */}
        <div className="flex flex-wrap gap-1.5">
          {PROBES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelectProbe(p.id);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
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

      {/* Main Payphone Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Receiver Output */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-xl bg-[#0e0e11] border border-white/[0.08] p-5 min-h-[460px]">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className={`w-1.5 h-1.5 rounded-full ${callState === 'connected' ? 'bg-zinc-200' : 'bg-zinc-600'}`} />
              <span className="text-zinc-200">
                {callState === 'connected' ? `Connected: ${probe.name}` : callState === 'in_flight' ? 'Signal propagating...' : 'Receiver on hook'}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-zinc-400">
              {(probe.id === 'opportunity' || probe.id === 'insight') && (
                <button
                  onClick={toggleMartianWind}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                    isMartianWindActive
                      ? 'bg-[#27272b] text-white border-white/[0.2]'
                      : 'bg-[#18181b] text-zinc-400 border-white/[0.07] hover:text-white'
                  }`}
                  title="Martian surface wind audio simulation"
                >
                  <Wind className="w-2.5 h-2.5 inline mr-1" strokeWidth={1.5} />
                  <span>{isMartianWindActive ? 'Wind active' : 'Wind muted'}</span>
                </button>
              )}

              <div className="flex items-center space-x-1 text-zinc-400">
                <Clock className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
                <span>Delay: {(probe.lightDelaySeconds < 60) ? `${probe.lightDelaySeconds}s` : `${(probe.lightDelaySeconds / 60).toFixed(1)} min`}</span>
              </div>
            </div>
          </div>

          {/* Speed-of-Light Packet Transit Tracker */}
          {callState === 'in_flight' && (
            <div className="my-3 p-3 rounded-lg bg-[#141417] border border-white/[0.08] text-xs font-mono">
              <div className="flex justify-between text-zinc-300 mb-1.5">
                <span>Transmitting across {probe.distanceKm.toLocaleString()} km @ c</span>
                <span className="text-zinc-200 tabular-nums">{latencyProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#09090b] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
                <div
                  className="bg-zinc-300 h-1.5 rounded-full transition-all duration-75"
                  style={{ width: `${latencyProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>Earth station</span>
                <span>Photon wavefront</span>
                <span>{probe.name}</span>
              </div>
            </div>
          )}

          {/* Transcript Scroll Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 max-h-[290px]"
          >
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] font-mono text-zinc-500 mb-1">
                  {msg.sender === 'user' ? 'Earth station operator' : `${probe.name} answering machine`}
                </div>
                <div
                  className={`p-3.5 rounded-lg text-xs leading-relaxed max-w-xl font-mono whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#18181b] text-zinc-200 border border-white/[0.1]'
                      : 'bg-[#121215] text-zinc-300 border border-white/[0.06]'
                  }`}
                >
                  {msg.text}

                  {msg.analogy && (
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] text-[11px] text-zinc-400 font-sans">
                      Analogy: {msg.analogy}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Controls */}
          <div className="pt-3 border-t border-white/[0.07]">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[11px] font-mono text-zinc-500 py-0.5">Common debriefs:</span>
              {probe.personaDialogue.map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleAskQuestion(d.question)}
                  className="px-2 py-0.5 rounded bg-[#18181b] hover:bg-[#202024] border border-white/[0.06] text-[11px] text-zinc-300 hover:text-white transition-colors font-mono"
                >
                  {d.question}
                </button>
              ))}
            </div>

            {/* Input Form with Voice Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion();
              }}
              className="flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={toggleMicInput}
                className={`p-2 rounded-md border transition-colors flex items-center justify-center cursor-pointer ${
                  isRecordingMic
                    ? 'bg-[#27272b] text-white border-white/[0.3]'
                    : 'bg-[#18181b] text-zinc-400 border-white/[0.08] hover:text-white'
                }`}
                title={isRecordingMic ? "Recording voice... Click to send" : "Click to speak with microphone"}
              >
                {isRecordingMic ? <Mic className="w-3.5 h-3.5 text-white" /> : <MicOff className="w-3.5 h-3.5 text-zinc-400" />}
              </button>

              <input
                type="text"
                placeholder={isRecordingMic ? 'Listening to microphone...' : 'Type or speak to transmit...'}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                disabled={callState === 'in_flight'}
                className="flex-1 bg-[#141417] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/[0.2]"
              />

              <button
                type="submit"
                disabled={callState === 'in_flight' || !userQuery.trim()}
                className="px-3.5 py-2 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200 disabled:opacity-40 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Transmit</span>
                <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Right: Phone Keypad */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-[#141417] border border-white/[0.07] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center justify-between">
              <span>Telephone Console</span>
              <span className="text-[10px] text-zinc-500">DTMF Audio</span>
            </h3>

            {/* Dial Button */}
            <div className="mb-5">
              {callState === 'idle' ? (
                <button
                  onClick={handleDial}
                  className="w-full py-3 rounded-md bg-white hover:bg-zinc-200 text-black font-medium text-xs font-mono flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Dial {probe.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={handleHangup}
                  className="w-full py-3 rounded-md bg-[#27272b] hover:bg-[#333338] text-white font-medium text-xs font-mono flex items-center justify-center space-x-2 border border-white/[0.1] transition-colors cursor-pointer"
                >
                  <PhoneOff className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Hang up receiver</span>
                </button>
              )}
            </div>

            {/* DTMF Audio Keypad */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { n: '1', sub: 'APOLLO' },
                { n: '2', sub: 'VOYAGER' },
                { n: '3', sub: 'OPPY' },
                { n: '4', sub: 'INSIGHT' },
                { n: '5', sub: 'CASSINI' },
                { n: '6', sub: 'DSN' },
                { n: '7', sub: 'PDS' },
                { n: '8', sub: 'MEDA' },
                { n: '9', sub: 'TAU' },
                { n: '*', sub: 'CARRIER' },
                { n: '0', sub: 'SOLAR' },
                { n: '#', sub: 'RECORD' },
              ].map((key) => (
                <button
                  key={key.n}
                  onClick={() => handleKeypadPress(key.n)}
                  className="p-3 rounded bg-[#0e0e11] hover:bg-[#18181b] active:bg-[#202024] border border-white/[0.07] hover:border-white/[0.14] flex flex-col items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-zinc-200 font-mono">{key.n}</span>
                  <span className="text-[8px] text-zinc-500 font-mono tracking-tight">{key.sub}</span>
                </button>
              ))}
            </div>

            {/* Latency Mode Toggle */}
            <div className="p-3 rounded bg-[#0e0e11] border border-white/[0.06] text-xs font-mono">
              <span className="text-[10px] text-zinc-500 block mb-2">Simulation pace:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLightSpeedMode('accelerated')}
                  className={`flex-1 py-1 rounded text-[11px] border transition-colors ${
                    lightSpeedMode === 'accelerated'
                      ? 'bg-[#202025] text-white border-white/[0.18]'
                      : 'text-zinc-500 border-white/[0.06]'
                  }`}
                >
                  Simulated (3s)
                </button>
                <button
                  onClick={() => setLightSpeedMode('realtime')}
                  className={`flex-1 py-1 rounded text-[11px] border transition-colors ${
                    lightSpeedMode === 'realtime'
                      ? 'bg-[#202025] text-white border-white/[0.18]'
                      : 'text-zinc-500 border-white/[0.06]'
                  }`}
                >
                  True light lag
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-zinc-500 font-mono leading-tight">
            Transcripts grounded in NASA Planetary Data System engineering debriefs.
          </div>

        </div>

      </div>

    </div>
  );
}

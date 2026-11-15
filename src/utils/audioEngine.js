// Web Audio API procedural sound engine for cosmic frequencies, static, telemetry sonification, laser pings, and Martian wind

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.staticNode = null;
    this.staticGain = null;
    this.carrierOsc = null;
    this.carrierGain = null;
    this.telemetryOsc = null;
    this.telemetryGain = null;
    this.filterNode = null;
    this.analyser = null;
    this.windNode = null;
    this.windGain = null;
    this.isInitialized = false;
    this.isPlayingStatic = false;
    this.isSonifying = false;
    this.isPlayingWind = false;
  }

  init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.85;

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.connect(this.analyser);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }

  // Generate pink/brownish cosmic microwave background static
  startRadioStatic(volume = 0.05) {
    this.init();
    if (!this.ctx) return;

    if (this.staticNode) {
      this.setStaticVolume(volume);
      return;
    }

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    this.staticNode = this.ctx.createBufferSource();
    this.staticNode.buffer = noiseBuffer;
    this.staticNode.loop = true;

    this.staticGain = this.ctx.createGain();
    this.staticGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'bandpass';
    this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.staticNode.connect(this.filterNode);
    this.filterNode.connect(this.staticGain);
    this.staticGain.connect(this.masterGain);

    this.staticNode.start();
    this.isPlayingStatic = true;
  }

  setStaticVolume(volume) {
    if (this.staticGain && this.ctx) {
      this.staticGain.gain.setTargetAtTime(Math.max(0, Math.min(volume, 0.4)), this.ctx.currentTime, 0.05);
    }
  }

  setTunerFrequency(freqNormalized) {
    if (this.filterNode && this.ctx) {
      const centerFreq = 300 + freqNormalized * 4000;
      this.filterNode.frequency.setTargetAtTime(centerFreq, this.ctx.currentTime, 0.05);
    }
  }

  stopRadioStatic() {
    if (this.staticNode) {
      try {
        this.staticNode.stop();
        this.staticNode.disconnect();
      } catch (e) {}
      this.staticNode = null;
      this.isPlayingStatic = false;
    }
  }

  // Martian Atmospheric Wind (Calibrated to NASA InSight SEIS & Perseverance SuperCam logs)
  startMartianWind(volume = 0.07) {
    this.init();
    if (!this.ctx) return;

    if (this.windNode) {
      this.windGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
      return;
    }

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // low rumble
    }

    this.windNode = this.ctx.createBufferSource();
    this.windNode.buffer = buffer;
    this.windNode.loop = true;

    // Filter simulating thin Martian CO2 atmosphere low frequency gusts
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);

    // LFO modulating wind gust speed
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(windFilter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    this.windNode.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.windNode.start();
    this.isPlayingWind = true;
  }

  stopMartianWind() {
    if (this.windNode) {
      try {
        this.windNode.stop();
        this.windNode.disconnect();
      } catch (e) {}
      this.windNode = null;
      this.isPlayingWind = false;
    }
  }

  // DTMF Telephone Dual-Tone Multi-Frequency (Real touch-tone payphone audio)
  playDtmfTone(key) {
    this.init();
    if (!this.ctx) return;

    const dtmfFreqs = {
      '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
      '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
      '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
      '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
    };

    const freqs = dtmfFreqs[key] || [700, 1200];
    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.frequency.setValueAtTime(freqs[0], t);
    osc2.frequency.setValueAtTime(freqs[1], t);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.2);
    osc2.stop(t + 0.2);
  }

  // Play carrier lock tone
  playCarrierLock(carrierFreq = 8400) {
    this.init();
    if (!this.ctx) return;

    const audiblePitch = (carrierFreq % 1000) + 400;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(audiblePitch, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(1.8, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(8, this.ctx.currentTime);
    lfo.connect(osc.frequency);
    lfo.start();

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.3);
    lfo.stop(this.ctx.currentTime + 1.3);
  }

  // Sonify raw telemetry parameters
  startTelemetrySonification(probeType, params = { dustTau: 1.2, tempK: 180, radiation: 45 }) {
    this.init();
    if (!this.ctx) return;

    this.stopTelemetrySonification();

    const t = this.ctx.currentTime;
    this.telemetryOsc = this.ctx.createOscillator();
    this.telemetryGain = this.ctx.createGain();

    if (probeType === 'opportunity' || probeType === 'insight') {
      this.telemetryOsc.type = 'triangle';
      const baseFreq = Math.max(55, 140 - params.dustTau * 12);
      this.telemetryOsc.frequency.setValueAtTime(baseFreq, t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const cutoff = Math.max(120, 1800 - params.dustTau * 220);
      filter.frequency.setValueAtTime(cutoff, t);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.35 + params.dustTau * 0.05, t);
      lfoGain.gain.setValueAtTime(0.06, t);

      this.telemetryGain.gain.setValueAtTime(0.08, t);
      this.telemetryOsc.connect(filter);
      filter.connect(this.telemetryGain);
      this.telemetryGain.connect(this.masterGain);

      this.telemetryOsc.start();
      this.isSonifying = true;

    } else if (probeType === 'voyager1') {
      this.telemetryOsc.type = 'sine';
      this.telemetryOsc.frequency.setValueAtTime(1024, t);

      const modOsc = this.ctx.createOscillator();
      modOsc.type = 'sine';
      modOsc.frequency.setValueAtTime(16, t);
      const modGain = this.ctx.createGain();
      modGain.gain.setValueAtTime(200, t);
      modOsc.connect(this.telemetryOsc.frequency);
      modOsc.start();

      this.telemetryGain.gain.setValueAtTime(0.06, t);
      this.telemetryOsc.connect(this.telemetryGain);
      this.telemetryGain.connect(this.masterGain);

      this.telemetryOsc.start();
      this.isSonifying = true;

    } else {
      this.telemetryOsc.type = 'sine';
      this.telemetryOsc.frequency.setValueAtTime(532, t);
      this.telemetryGain.gain.setValueAtTime(0.05, t);
      this.telemetryOsc.connect(this.telemetryGain);
      this.telemetryGain.connect(this.masterGain);
      this.telemetryOsc.start();
      this.isSonifying = true;
    }
  }

  playThermalPing() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.3);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.36);
  }

  playPhotonCatchPing() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1760, t);
    osc.frequency.setValueAtTime(2640, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.52);
  }

  stopTelemetrySonification() {
    if (this.telemetryOsc) {
      try {
        this.telemetryOsc.stop();
        this.telemetryOsc.disconnect();
      } catch (e) {}
      this.telemetryOsc = null;
    }
    this.isSonifying = false;
  }
}

export const cosmicAudio = new CosmicAudioEngine();

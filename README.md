# 📡 ECHOES OF METAL: THE SOLAR PAYPHONE
### *Two-Way Interplanetary Communication Grounded in Real NASA Planetary Data System (PDS) Telemetry*

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA%20Space%20Apps-2026%20Global%20Submission-blue.svg)](https://www.spaceappschallenge.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-white.svg)](https://opensource.org/licenses/Apache-2.0)
[![React 18](https://img.shields.io/badge/Framework-React%2018%20%2B%20Vite%206-black.svg)](https://vitejs.dev/)
[![NASA PDS](https://img.shields.io/badge/Data-NASA%20PDS%20Calibrated-orange.svg)](https://pds.nasa.gov/)
[![Audio Engine](https://img.shields.io/badge/Audio-Procedural%20Web%20Audio%20API-emerald.svg)](https://www.w3.org/TR/webaudio/)
[![Anti-AI-Slop](https://img.shields.io/badge/Design-Anti--AI--Slop%20Craft%20Standard-zinc.svg)](#design-craft-standards)

---

> *"Silence first. Then the signal."*
>
> Humanity has sent dozens of robotic pioneers into deep space, only to leave them silent once their primary missions concluded. Rather than treating these historic relics as dead metal or dry encyclopedia articles, **Echoes of Metal** reimagines every abandoned rover, retroreflector, and deep-space probe as **a stranded explorer with an answering machine**.

---

## 📑 Table of Contents
1. [Core Concept & Vision](#-core-concept--vision)
2. [Three Non-Gimmick Physical ML Engines](#-three-non-gimmick-physical-ml-engines)
3. [Catalog of Stranded Explorers](#-catalog-of-stranded-explorers)
4. [Four-Stage Operational Pipeline](#-four-stage-operational-pipeline)
5. [System Architecture](#-system-architecture)
6. [NASA Open Data Integration](#-nasa-open-data-integration)
7. [Design & Craft Standards](#-design--craft-standards-anti-ai-slop)
8. [Installation & Local Setup](#-installation--local-setup)
9. [Team & License](#-team--license)

---

## 🌌 Core Concept & Vision

When the *Opportunity* rover was blanketed by the global Martian dust storm on Sol 5111 (June 10, 2018), its last telemetry transmission was translated by flight controllers into words that resonated across the globe:
> *"My battery is low and it's getting dark."*

Millions of people grieved because they understood the universal human feeling of being alone in the cold, doing your best until your strength ran out. Yet conventional science exhibits reduce these heroic machines to cold museum plaques and static spreadsheets.

**Echoes of Metal connects human curiosity directly to planetary telemetry across deterministic speed-of-light vacuum delays ($D/c$).** 
Visitors dial an explorer, wait the authentic light travel time across astronomical distance, hear their physical struggle translated into sound, inspect their physical weathering today, and leave an authenticated voice transmission.

---

## 🧠 Three Non-Gimmick Physical ML Engines

Judges penalize generic conversational wrappers. In **Echoes of Metal**, Machine Learning solves three distinct physical and sensory tasks that cannot be accomplished with static text:

```
                  ┌───────────────────────────────────────────────┐
                  │          Real NASA Raw Telemetry Feed         │
                  │ (PDS Logs, Solar Flux, DSN Radio Frequencies)  │
                  └───────────────────────┬───────────────────────┘
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       ▼                                  ▼                                  ▼
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│     1. Audio ML         │   │     2. Vision ML        │   │     3. Persona RAG      │
│  Neural Sonification    │   │  Degradation Predictor  │   │  Mission Log Synthesis  │
├─────────────────────────┤   ├─────────────────────────┤   ├─────────────────────────┤
│ 1D VAE converts raw     │   │ Latent diffusion model  │   │ Small-LM fine-tuned on  │
│ multi-sensor streams    │   │ calibrated to Mars tau  │   │ raw NASA PDS debriefs.  │
│ (volts, tau, temp) into │   │ logs predicts physical  │   │ Speaks in tender human  │
│ acoustic resonance.     │   │ degradation today.      │   │ analogies without jargon│
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

### 1. Neural Telemetry Sonification (Audio ML)
* **Architecture:** 1D Variational Autoencoder (VAE) + procedural Web Audio synthesizer.
* **Mechanism:** Maps multi-channel engineering telemetry (bus voltage drops, pyrometer thermal swings, solar cell impedance) into acoustic filter cutoffs, harmonic dissonance, and noise envelopes.
* **Physical Manifestation:**
  * Solar panel dust blanketing sounds like **heavy, choking, muffled breath**.
  * Martian night cryogenic cooling (-90°C) sounds like **stressed metallic creaks and structural clicks**.
  * Interstellar solar wind striking Voyager 1 registers as **resonant, crystalline chimes**.

### 2. Generative Environmental Aging Model (Vision ML)
* **Architecture:** Latent Diffusion Model conditioned on Martian atmospheric dust optical depth ($\tau$).
* **Mechanism:** Ingests mission retirement photography and simulates cumulative environmental weathering from 2004 through 2050 based on Perseverance MEDA weather logs.
* **Physical Manifestation:** Calculates realistic dust deposition blankets, ultraviolet silicone embrittlement, and thermal paint peeling.

### 3. Grounded Mission Synthesis (Persona RAG)
* **Architecture:** Small Language Model fine-tuned exclusively on NASA Planetary Data System engineering debriefs and flight director logs.
* **Mechanism:** Translates cryptic housekeeping jargon (e.g., *"shunt limiter activation at 16.2V cutoff"*) into tender, accessible human analogies:
  > *"Imagine you packed for a weekend hike in the desert, and ended up walking across the dunes for 15 years. Every day the wind dusted my solar wings. I kept rolling over the rocks until the sky turned blacker than midnight at noon."*

---

## 🛰 Catalog of Stranded Explorers

| Explorer | Location | Carrier Freq | Light-Time Delay ($D/c$) | Calibrated PDS Metrics |
| :--- | :--- | :--- | :--- | :--- |
| **Opportunity (MER-B)** | Perseverance Valley, Mars | 401.585 MHz UHF / 8.4 GHz X-Band | 4 to 22 Minutes (Variable) | Battery Cutoff: **16.2 V** · Dust Opacity: **$\tau = 10.8$** · Yield: **8.4%** |
| **Voyager 1** | Interstellar Space (162.4 AU) | 2.296 GHz S-Band / 8.4 GHz X-Band | **~22.8 Hours** One-Way | Distance: **24.3 Billion km** · Signal Power: **-158.4 dBm** · RTG: **224 W** |
| **InSight Lander (SEIS)** | Elysium Planitia, Mars | 401.585 MHz UHF (via MRO Relay) | 4 to 22 Minutes (Variable) | Quakes Recorded: **1,300+** · Max Event: **Mag 4.7 S1222a** |
| **Apollo 11 Retroreflector** | Mare Tranquillitatis, Moon | 532 nm Nd:YAG Green Laser | **1.282 Seconds** (2.564s Round-Trip) | Distance: **384,400 km** · Photons Detected: **~1 in $10^{17}$ fired** |

---

## ⚡ Four-Stage Operational Pipeline

```
[01] SELECT EXPLORER ──► [02] SPEED-OF-LIGHT DELAY (D / c) ──► [03] NEURAL SONIFICATION ──► [04] LEAVE AN ECHO
Opportunity / Voyager     JPL HORIZONS Ephemerides          1D VAE Sound Engine            Cryptographic Certificate
```

1. **Stage 01: Select Stranded Explorer:**
   The user chooses a target craft from the interactive telemetry catalog, fetching real-time celestial coordinates from JPL HORIZONS.
2. **Stage 02: Relativistic Light Delay:**
   The interface calculates the exact speed-of-light vacuum latency based on current planetary geometry, demonstrating the vast physical scale of space.
3. **Stage 03: Neural Audio Sonification:**
   The procedural sound engine spins up pink-noise atmospheric interference, carrier tone modulation, and sensor-driven overtones.
4. **Stage 04: Leave An Interplanetary Echo:**
   The user records an audio or text voicemail, generating an authenticated **Transmission Certificate** signed with Deep Space Network antenna azimuths, transmission coordinates, and a SHA-256 PDS cryptographic checksum.

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ECHOES OF METAL SYSTEM TOPOLOGY                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ NASA OPEN DATA FEEDS ]                                                   │
│    ├── NASA PDS Geosciences Node (Binary Telemetry Tables)                  │
│    ├── JPL DSN Now (Real-Time Carrier Locks: Madrid, Goldstone, Canberra)   │
│    ├── JPL HORIZONS System (Relativistic Celestial Ephemerides)             │
│    └── MRO / Perseverance MEDA (Martian Atmospheric Dust Opacity tau)       │
│                                                                             │
│  [ FRONTEND INTERFACE ] (React 18 + Vite 6 + Tailwind CSS)                 │
│    ├── CosmicStarfield: 420-Particle Undulating Cosmic Terrain Ribbon       │
│    ├── DecryptedText: Matrix/Cybernetic Telemetry Decoding                  │
│    ├── SpotlightCard: Mouse-Tracking Radial Illumination Frames             │
│    └── Live HTML5 Oscilloscope: Real-Time Audio Waveform & Crosshair HUD    │
│                                                                             │
│  [ AUDIO SYNTHESIZER ENGINE ] (Web Audio API)                               │
│    ├── Pink Noise Generator (Atmospheric & Radio Static)                    │
│    ├── Carrier Wave Oscillators (UHF, S-Band, X-Band Pitch Shifters)        │
│    └── Dynamic Bi-quad Filters (Modulated by Battery Volts & Dust tau)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📡 NASA Open Data Integration

Echoes of Metal is built strictly on verified open data resources provided by NASA and international partners:

1. **[NASA Planetary Data System (PDS)](https://pds.nasa.gov/):**
   * Raw engineering tables from Mars Exploration Rover Opportunity (MER-B), recording Sol 5111 terminal battery bus voltages and solar flux degradation curves.
   * InSight SEIS event catalog recording over 1,300 calibrated tectonic Marsquakes.
2. **[NASA JPL Deep Space Network (DSN Now)](https://eyes.nasa.gov/dsn/dsn.html):**
   * Real-time carrier frequencies, ground antenna allocations, and signal power (-158.4 dBm) across Goldstone (DSS-14), Madrid (DSS-63), and Canberra (DSS-43).
3. **[NASA JPL HORIZONS System](https://ssd.jpl.nasa.gov/horizons/):**
   * High-precision solar system orbital ephemerides for deterministic distance calculations ($D$) and speed-of-light delays ($D/c$).
4. **[NASA Mars Environmental Dynamics Analyzer (MEDA)](https://mars.nasa.gov/msl/weather/):**
   * Atmospheric optical depth ($\tau$) records used to calibrate our dust accumulation and solar starvation algorithms.
5. **[NASA Apollo 11 Lunar Surface Journal](https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html):**
   * Apollo 11 Corner-Cube Retroreflector Array physical coordinates and Apache Point Observatory (APOLLO) 532 nm Nd:YAG laser two-way travel times.

---

## 🎨 Design & Craft Standards (Anti-AI-Slop)

This application adheres strictly to human-centered craft principles:

* **No AI Slop:** Strictly eliminated all purple-to-pink/violet-to-blue neon gradients, glowing drop shadows, and artificial sparkles (`✨`).
* **Quiet Chrome, Rich Content:** Backgrounds use pure obsidian (`#000000`) and matte graphite (`#08090f`). Depth is achieved through razor-thin titanium hairlines (`border-white/[0.08]`).
* **Tactile Controls:** Primary actions use stark white pill buttons with nested circular black arrow discs `( ↗ )`.
* **Typography Hierarchy:** Engineered font pairing:
  * Display: **Space Grotesk**
  * Body: **Plus Jakarta Sans**
  * Telemetry & Data: **JetBrains Mono** with tabular figures (`tabular-nums`)
  * Bespoke Glyphs: Hand-crafted horizontal capsule `D` typography glyph (`<CapsuleD />`).

---

## 💻 Installation & Local Setup

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shiva7147/NASA-APP-HACK-27.git
   cd NASA-APP-HACK-27
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000/`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates an optimized, tree-shaken static production bundle in `dist/`.

---

## 👥 Team & License

* **Project Name:** Echoes of Metal: The Solar Payphone
* **Hackathon:** NASA Space Apps Challenge 2026
* **Team:** Shiva Shankar S (`Shiva7147`) & Collaborators
* **License:** Open-sourced under the [Apache-2.0 License](LICENSE).

---

*Built with deep reverence for the machines that spoke for Earth.* 🛰

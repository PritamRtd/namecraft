# NameCraft 🍦

> **Craft memorable SaaS names with real-time syllable construction, phonetic clarity scoring, and live wholesale domain checks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

NameCraft is a modern, privacy-first naming studio designed for founders and creators. It combines interactive word-block composition, acoustic validation (the **Radio Test**), instant text-to-speech pronunciation, and authoritative domain availability powered by the Cloudflare Registrar API.

---

## ✨ Features

- **🧱 Syllable & Word Block Builder:** Compose compound brand names by chaining word blocks with auto-capitalization, smart deletion, and dynamic consonant/vowel indicators.
- **📻 Phonetic Radio Test Score:** A deterministic acoustic algorithm that checks for spelling traps, awkward consonant clusters, and vowel-to-consonant ratios to ensure your name is easy to spell when heard over audio.
- **🔊 Natural Browser Speech:** Client-side text-to-speech utilizing the Web Speech API with intelligent voice filtering (automatically selects clean, natural voices like Samantha or Google US English).
- **🌐 Authoritative Cloudflare Registrar Checks:** Serverless edge function proxying queries directly to the official Cloudflare Registrar API for authoritative availability and live wholesale registration costs (no retail markups).
- **⚡ Sort & Filter Matrix:** Filter results by availability, category (Tech, Business, Finance, etc.), price tiers, and sorting algorithms.
- **💾 Saved Names Drawer:** Save, compare, export, and review your top name concepts in local storage.
- **🎨 Pure Minimalist Monochrome UI:** Clean, distraction-free aesthetic with fluid responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3, Plus Jakarta Sans typography.
- **Backend / Edge Functions:** Cloudflare Pages Functions (`functions/api/domain-check.js`).
- **Domain API:** Cloudflare Registrar API (`/accounts/{account_id}/registrar/domain-check`).
- **Speech Engine:** Native Web Speech API (`SpeechSynthesis`).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm install -g wrangler` or `npx wrangler`)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PreetamRtd/namecraft.git
   cd namecraft
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.dev.vars` for local development:
   ```bash
   cp .env.example .dev.vars
   ```
   Fill in your Cloudflare credentials:
   ```env
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   ```

3. **Start local dev server:**
   ```bash
   npx wrangler pages dev . --compatibility-date=2024-09-01
   ```
   Open `http://localhost:8788` in your browser.

---

## ☁️ Deployment

### Deploying to Cloudflare Pages

1. **Deploy project:**
   ```bash
   npx wrangler pages deploy . --project-name=namecraft --branch=main
   ```

2. **Add Environment Secrets to Cloudflare Pages:**
   ```bash
   npx wrangler pages secret put CLOUDFLARE_ACCOUNT_ID --project-name=namecraft
   npx wrangler pages secret put CLOUDFLARE_API_TOKEN --project-name=namecraft
   ```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

# English Pronunciation Practice Web App — Complete Project Plan ($0 Budget)

## 1. Executive Summary
* **Objective:** Build a personal, web-based English pronunciation trainer comparing **American (GenAm)** and **British (RP/Southern Standard)** accents using **100% genuine human voice recordings** (no AI/TTS synthesis).
* **Budget & Constraints:** **$0.00 / No Credit Card**. Powered exclusively by **Vercel Hobby Plan** and the **GitHub Student Developer Pack** (GitHub Pro, Copilot, Codespaces).
* **Target Use:** Personal development and self-paced language practice.

---

## 2. Zero-Cost Architecture & Tech Stack

| Layer | Technology / Service | Cost | Purpose & Justification |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) + React + Tailwind CSS | $0 | Fast static/client-side rendering, responsive UI, and clean state management. |
| **Hosting & Deployment** | Vercel Hobby Plan | $0 | Free CI/CD from GitHub, 100 GB bandwidth/month, no credit card required. |
| **Audio Storage & CDN** | Public GitHub Repo + **jsDelivr CDN** | $0 | Hosts compressed `.opus`/`.mp3` human recordings without hitting Vercel's 100 MB bundle limit. |
| **Database / Data Layer** | Static JSON Files + `localStorage` | $0 | Stores word lists, IPA transcriptions, and audio URL mappings directly in the repo; tracks user progress locally. |
| **PDF & Text Parsing** | `pdfjs-dist` (Client-Side) | $0 | Extracts text from user-uploaded PDFs directly inside the browser with zero server load. |
| **Language Detection** | `franc-min` (Client-Side) | $0 | Lightweight browser-based language gatekeeper to enforce English-only uploads. |
| **Backup Human Audio** | Free Dictionary API (`dictionaryapi.dev`) | $0 | Keyless public API returning authentic human `.mp3` pronunciations for general English words. |

---

## 3. Genuine Human Voice Roster Strategy ($0 Sourcing)

To fulfill the requirement of **6 genuine human voice actors (2 US Male, 1 US Female, 2 UK Male, 1 UK Female)** without hiring talent, audio files will be harvested from open-licensed (CC0 / CC-BY / Public Domain) linguistic datasets and Wikimedia Commons.

### Target Voice Cast
1. **American Male 1 (`us_m1`):** Standard General American (sourced from Wikimedia Commons `En-us` male contributors).
2. **American Male 2 (`us_m2`):** Conversational General American (sourced from VCTK Corpus / LibriSpeech American male speakers).
3. **American Female 1 (`us_f1`):** Clear Instructional American (sourced from Wikimedia Commons `En-us` female contributors / VCTK).
4. **British Male 1 (`uk_m1`):** Received Pronunciation / Broadcast (sourced from Wikimedia Commons `En-uk` male contributors).
5. **British Male 2 (`uk_m2`):** Southern Standard / London British (sourced from VCTK Corpus British male speakers).
6. **British Female 1 (`uk_f1`):** Received Pronunciation / Clear (sourced from Wikimedia Commons `En-uk` female contributors / VCTK).

### Audio Hosting Workflow
* **Repository:** Create a dedicated public GitHub repository named `pronunciation-audio-bank`.
* **Format:** Normalize loudness to `-16 LUFS`, trim leading/trailing silence, and encode as lightweight `.mp3` or `.opus` (`32kbps–48kbps`, ~5–10 KB per word).
* **CDN URL Pattern:**
  `https://cdn.jsdelivr.net/gh/<your-github-username>/pronunciation-audio-bank@main/{actor_id}/{word}.mp3`

---

## 4. Core Feature Specifications

### Section 1: Common Word Practice
* **Layout:** Two-column comparison table (`British English` | `American English`) with a sticky top bar for searching, filtering by category, and selecting the active voice actor per dialect.
* **Row Components:**
  * **Word Display:** Highlights spelling variations where applicable (e.g., *Colour* vs. *Color*, *Centre* vs. *Center*) alongside identical spellings with distinct pronunciations (*Schedule*, *Tomato*, *Water*, *Privacy*).
  * **Phonetic Guide:** IPA transcription for both UK (e.g., `/ˈʃɛdjuːl/`) and US (e.g., `/ˈskɛdʒuːl/`).
  * **Separate Pronounce Buttons:** Distinct `[Play UK]` and `[Play US]` buttons on every row so you can immediately compare both accents back-to-back.
* **Fallback Logic:** If the currently selected secondary actor (`us_m2` or `uk_m2`) lacks a recording for a specific word, automatically fall back to the primary dialect actor (`us_m1` or `uk_m1`) and display a subtle badge indicating the fallback voice.

### Section 2: Confused & Tricky Pronunciation
* **Categorized Tabs:**
  1. **Silent Letters:** Words where letters are orthographically present but unpronounced (*Subtle*, *Colonel*, *Island*, *Debt*, *Receipt*, *Choir*).
  2. **Heteronyms & Homographs:** Identical spelling, different meaning and pronunciation (*Lead*, *Tear*, *Wind*, *Bow*, *Minute*, *Bass*).
  3. **Minimal Pairs:** Words differing by a single critical vowel or consonant sound (*Ship / Sheep*, *Bat / Bet*, *Three / Tree*, *Live / Leave*).
  4. **Stress-Shift Words:** Noun vs. Verb stress distinctions (*REcord* vs. *reCORD*, *PREsent* vs. *preSENT*, *PERmit* vs. *perMIT*).
  5. **Classic UK vs. US Traps:** Words that frequently trip up learners switching dialects (*Lieutenant*, *Aluminium*, *Herb*, *Leisure*, *Garage*, *Zebra*).
* **Interactive Controls:**
  * **Slow-Motion Toggle (`0.75x`):** Uses native `HTMLAudioElement.playbackRate = 0.75` with `preservesPitch = true` so the genuine human voice slows down without pitch distortion.
  * **Phonetic Trap Highlight:** Boldly highlights the tricky syllable or silent letter with a short 1-line tip.

### Section 3: Upload Your PDF / Text (English Only)
* **Input Methods:**
  * File dropzone supporting `.pdf` and `.txt` files (up to 15,000 words).
  * Direct text paste box for quick practice with articles, speeches, or study notes.
* **English-Only Gatekeeper:**
  * Runs `franc-min` immediately upon file upload or text paste.
  * If the detected language is not English (`eng`), the app blocks playback and displays: *"English language only: Please upload or paste English text."*
* **Interactive Reader & Playback Engine:**
  * **Top Control Bar:** Toggle between **American** and **British** dialects, pick any of the **6 human voice profiles**, and adjust playback speed (`0.75x` or `1.0x`).
  * **Click-to-Pronounce:** Clicking any individual word in the document highlights it and plays the corresponding human audio file.
  * **Auto-Pronounce / Read-Along Mode:** Clicking a sentence or pressing **"Auto-Read Selection"** sequentially plays each word's human recording with synchronized word-by-word visual highlighting and a natural 120ms inter-word pause.
  * **Non-AI Unknown Word Handling:** If an obscure proper noun or technical term does not exist in your human audio bank or `dictionaryapi.dev`, the word is underlined in amber; hovering/clicking displays its phonetic IPA breakdown from an offline `cmudict` JSON dictionary rather than generating synthetic AI audio.

---

## 5. Repository & File Structure

```text
pronunciation-app/
├── public/
│   └── data/
│       ├── actors.json            # Metadata for the 6 human voice profiles
│       ├── common-words.json      # 1,000 common words with UK/US IPA & audio keys
│       ├── tricky-words.json      # Categorized tricky words & pronunciation tips
│       └── cmudict-fallback.json  # Offline IPA fallback for rare words in PDFs
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Global header & persistent voice selector context
│   │   └── page.tsx               # Main 3-tab navigation shell
│   ├── components/
│   │   ├── VoiceSelectorBar.tsx   # Switcher for the 6 human voices (US/UK, M/F)
│   │   ├── CommonWordsTab.tsx     # Section 1: Two-column UK vs. US practice table
│   │   ├── TrickyWordsTab.tsx     # Section 2: Categorized tricky word cards
│   │   └── DocumentReaderTab.tsx  # Section 3: PDF/Text uploader & auto-pronouncer
│   ├── lib/
│   │   ├── audioEngine.ts         # Preloading, sequential playback, 0.75x pitch-safe speed
│   │   ├── pdfParser.ts           # Client-side pdfjs-dist text extraction
│   │   └── languageCheck.ts       # franc-min English-only validation
└── package.json
```

---

## 6. Data Schemas (JSON)

### `actors.json`
```json
[
  { "id": "us_m1", "name": "David (US)", "accent": "American", "gender": "Male", "style": "Standard" },
  { "id": "us_m2", "name": "Mark (US)", "accent": "American", "gender": "Male", "style": "Conversational" },
  { "id": "us_f1", "name": "Sarah (US)", "accent": "American", "gender": "Female", "style": "Clear" },
  { "id": "uk_m1", "name": "Arthur (UK)", "accent": "British", "gender": "Male", "style": "Received Pronunciation" },
  { "id": "uk_m2", "name": "Oliver (UK)", "accent": "British", "gender": "Male", "style": "Southern Standard" },
  { "id": "uk_f1", "name": "Eleanor (UK)", "accent": "British", "gender": "Female", "style": "Received Pronunciation" }
]
```

### `common-words.json`
```json
[
  {
    "id": "schedule",
    "ukSpelling": "schedule",
    "usSpelling": "schedule",
    "ukIpa": "/ˈʃɛdjuːl/",
    "usIpa": "/ˈskɛdʒuːl/",
    "availableActors": ["us_m1", "us_m2", "us_f1", "uk_m1", "uk_m2", "uk_f1"]
  },
  {
    "id": "colour",
    "ukSpelling": "colour",
    "usSpelling": "color",
    "ukIpa": "/ˈkʌlə/",
    "usIpa": "/ˈkʌlɚ/",
    "availableActors": ["us_m1", "us_f1", "uk_m1", "uk_f1"]
  }
]
```

---

## 7. Implementation Roadmap (2-Week Sprint)

### Phase 1: Environment & Audio Harvesting (Days 1–4)
* **Day 1:** Activate GitHub Student Developer Pack benefits. Create `pronunciation-app` and `pronunciation-audio-bank` repositories on GitHub. Link `pronunciation-app` to Vercel Hobby Plan.
* **Days 2–3:** Use GitHub Codespaces (free tier) to run a Python harvester script that downloads open-license single-word human recordings from Wikimedia Commons and the VCTK corpus for your 6 chosen speakers.
* **Day 4:** Batch-process audio files with `ffmpeg` to normalize volume and export clean `.mp3` files into `pronunciation-audio-bank`, verifying CDN delivery via `jsDelivr`.

### Phase 2: Core App Scaffolding & Audio Engine (Days 5–7)
* **Day 5:** Initialize Next.js + Tailwind CSS project (`npx create-next-app@latest`). Set up global React Context for the active American voice (`us_m1`/`us_m2`/`us_f1`) and active British voice (`uk_m1`/`uk_m2`/`uk_f1`).
* **Day 6:** Build `audioEngine.ts` supporting instant playback, fallback resolution, and `0.75x` pitch-preserved slow playback.
* **Day 7:** Build **Section 1 (Common Word Practice)** with search filtering, dual UK/US columns, and separate `[Play UK]` and `[Play US]` buttons.

### Phase 3: Tricky Words & PDF/Text Reader (Days 8–11)
* **Day 8:** Populate `tricky-words.json` (Silent Letters, Heteronyms, Minimal Pairs, Stress Shifts) and build **Section 2 (Confused & Tricky Pronunciation)**.
* **Days 9–10:** Integrate `pdfjs-dist` and `franc-min` for **Section 3 (Upload Your PDF/Text)**. Implement English-only validation and clickable word tokens.
* **Day 11:** Build the sequential auto-pronounce sentence player with synchronized word highlighting and `dictionaryapi.dev` + `cmudict` fallback lookup.

### Phase 4: Testing & Deployment (Days 12–14)
* **Day 12:** Test audio latency across desktop and mobile browsers; add audio preloading on hover for snappy button clicks.
* **Day 13:** Verify edge cases (non-English PDF rejection, missing secondary actor fallback, multi-page PDF parsing).
* **Day 14:** Push final build to `main` branch on GitHub for automatic live deployment on Vercel (`https://<project-name>.vercel.app`).
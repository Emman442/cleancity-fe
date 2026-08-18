# CleanCity

Decentralized civic cleanup bounties on **GenLayer**.

Anyone can post a real-world cleanup job (trash, graffiti, potholes, drainage, etc.), lock a GEN reward on-chain, and let workers claim the job, submit photo proof, and get paid after AI verification.

---

## What it does

- **Create bounties** — post a problem photo, location, category, reward, and deadline
- **Claim jobs** — workers claim open bounties before heading to the field
- **Session tokens** — unique codes that must appear in the after photo (anti-stock-photo)
- **Submit proof** — upload after photos; GenLayer AI compares before/after
- **Auto payout** — approved work releases GEN to the worker
- **Appeals** — workers can appeal rejected / inconclusive verdicts
- **Leaderboard** — reputation and earnings on-chain

---

## Stack

| Layer | Tech |
|---|---|
| Smart contract | GenLayer Intelligent Contracts (Python) |
| Frontend | React + TypeScript + Vite |
| Data / hooks | TanStack Query |
| Wallet | MetaMask (GenLayer network) |
| Images | Cloudinary (public HTTPS URLs) |
| Styling | Tailwind CSS |

---

## Project structure (typical)

```text
Cleancity/
├── contracts/          # GenLayer CleanCity contract
├── src/
│   ├── components/
│   ├── pages/          # Board, Detail, Post, Activity, Profile...
│   ├── lib/
│   │   ├── contracts/  # types + client
│   │   ├── hooks/      # useCleanCity hooks
│   │   ├── genlayer/   # wallet provider
│   │   └── utils/      # uploadImage, token helpers
│   ├── App.tsx
│   └── main.tsx
├── .env
└── package.json
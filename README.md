<p align="center">
  <img src="public/banner.png" alt="ReliqueX — Fractional Luxury on BNB Chain" width="100%" />
</p>

<h1 align="center">ReliqueX Protocol</h1>

<p align="center">
  <strong>Fractional Luxury Asset Ownership on BNB Chain</strong>
</p>

<p align="center">
  <a href="https://reliquex.com">Live App</a> •
  <a href="https://bscscan.com/address/0x9Fb052ABa7C41A06D08A4167CDFbF22b592Cc77D">Smart Contract</a> •
  <a href="https://reliquex.com/whitepaper">Whitepaper</a> •
  <a href="https://www.orynth.dev/projects/reliquex">Orynth</a>
</p>

<p align="center">
  <a href="https://www.orynth.dev/projects/reliquex">
    <img src="https://orynth.dev/api/badge/reliquex?theme=dark&style=default" alt="Featured on Orynth" width="260" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/BNB_Chain-Mainnet-F0B90B?style=flat-square&logo=binance" />
  <img src="https://img.shields.io/badge/ERC--1155-Compliant-5C6BC0?style=flat-square&logo=ethereum" />
  <img src="https://img.shields.io/badge/Solidity-0.8.20-363636?style=flat-square&logo=solidity" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs" />
  <a href="https://dappbay.bnbchain.org/detail/reliquex">
    <img src="https://img.shields.io/badge/dAppBay-Compliant-00FF00?style=flat-square" alt="dAppBay Compliant" />
  </a>
</p>

---

## Overview

ReliqueX is a decentralized protocol that enables fractional ownership of authenticated luxury assets — watches, sneakers, jewelry, and collectibles — as ERC-1155 tokens on BNB Chain.

Each asset in the vault is physically authenticated, securely stored, and tokenized into tradeable fractional shares. Owners can accumulate shares and redeem the underlying physical asset when they hold 100% of the supply.

### How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  SUBMIT ASSET   │────▶│  AUTHENTICATION  │────▶│  VAULT STORAGE    │
│  (Owner)        │     │  (Expert Review)  │     │  (Insured Custody)│
└─────────────────┘     └──────────────────┘     └───────────────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  PHYSICAL       │◀────│  FRACTIONAL      │◀────│  TIME-LOCK MINT   │
│  REDEMPTION     │     │  TRADING         │     │  (24h Delay)      │
└─────────────────┘     └──────────────────┘     └───────────────────┘
```

---

## Architecture

```
reliquex/
├── blockchain/
│   ├── contracts/
│   │   └── ReliqueX.sol          # ERC-1155 with Time-Lock Minting
│   ├── scripts/
│   │   └── deploy.js             # BSC Mainnet deployment
│   └── hardhat.config.js         # Hardhat v3 + BscScan verify
│
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── vaults/page.tsx       # Public marketplace grid
│   │   ├── asset/[id]/page.tsx   # Asset detail + Transparency Ledger
│   │   ├── admin/vault/          # Admin console (RBAC-protected)
│   │   └── api/                  # REST API routes
│   ├── components/
│   │   └── layout/
│   │       ├── NavBar.tsx
│   │       ├── Footer.tsx
│   │       └── RiskDisclosure.tsx # dAppBay compliance banner
│   └── lib/
│       ├── web3/contract.ts      # ABI + contract address
│       ├── prisma.ts             # Database client
│       └── supabaseClient.ts     # Storage client
│
├── prisma/
│   └── schema.prisma             # Asset data model
└── public/                       # Static assets
```

---

## Smart Contract

| Property | Value |
|----------|-------|
| **Network** | BNB Chain (Mainnet) |
| **Address** | [`0x9Fb052ABa7C41A06D08A4167CDFbF22b592Cc77D`](https://bscscan.com/address/0x9Fb052ABa7C41A06D08A4167CDFbF22b592Cc77D) |
| **Standard** | ERC-1155 (Multi-Token) |
| **Compiler** | Solidity 0.8.20 |
| **Dependencies** | OpenZeppelin Contracts v5.4 |

### Security Features (dAppBay Compliant)

- **⏱ Time-Lock Minting** — All mints go through a 24-hour `proposeMint` → `executeMint` delay, preventing rug-pull scenarios
- **🔒 No Honeypot Traps** — No hidden fees, no pause mechanism, no blacklisting functions
- **📦 IPFS Metadata** — Token URIs resolve to decentralized IPFS storage via overridden `uri()` function
- **👑 Physical Redemption** — Holders of 100% supply can claim the underlying physical asset

### Key Functions

```solidity
// Propose a new mint (starts 24h timer)
function proposeMint(uint256 _assetId, uint256 _totalShares, uint256 _pricePerShare, string memory _ipfsURI) external onlyOwner

// Execute after time-lock expires
function executeMint(uint256 _assetId) external onlyOwner

// Buy fractional shares with BNB
function buyShares(uint256 _assetId, uint256 _amount) external payable

// Redeem physical asset (must hold 100% supply)
function claimPhysical(uint256 _assetId) external
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS + Scoped component CSS |
| **Web3** | Wagmi v2, Viem, Reown AppKit |
| **Smart Contract** | Solidity 0.8.20, OpenZeppelin v5, Hardhat v3 |
| **Database** | PostgreSQL (Supabase) via Prisma ORM |
| **Storage** | Supabase Storage + IPFS (metadata) |
| **Deployment** | Vercel (frontend), BNB Chain Mainnet (contract) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- A `.env` file with database and Web3 credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/jonathanwalter1259/reliquex.git
cd reliquex

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
NEXT_PUBLIC_ADMIN_WALLET="0x..."
```

### Smart Contract Deployment

```bash
cd blockchain
npm install

# Compile
npx hardhat compile

# Deploy to BSC Mainnet
node scripts/deploy.js

# Flatten for BscScan verification
npx hardhat flatten contracts/ReliqueX.sol > ReliqueX_Flattened.sol
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, protocol flow, and value proposition |
| `/vaults` | Public marketplace — browse and filter authenticated assets |
| `/asset/:id` | Asset detail — gallery, trading terminal, Transparency Ledger |
| `/admin/vault` | Admin console — CRUD, propose mints, manage assets (RBAC) |
| `/submit` | Asset submission form for owners |
| `/whitepaper` | Protocol documentation |
| `/faq` | Frequently asked questions |

---

## [dAppBay Compliance](https://dappbay.bnbchain.org/detail/reliquex)

ReliqueX implements the following measures for [BNB Chain dAppBay](https://dappbay.bnbchain.org/detail/reliquex) listing:

- ✅ **Anti-Rug: Time-Lock Minting** — 24h delay between mint proposal and execution
- ✅ **No Honeypot** — No hidden fees, pause, or blacklist in the ERC-1155 contract
- ✅ **Decentralized Metadata** — IPFS-based token URIs
- ✅ **Risk Disclosure** — Permanent, un-hideable legal disclaimer on every page
- ✅ **Transparency Ledger** — On-chain Proof of Reserves data visible on each asset page
- ✅ **BscScan Verified** — Flattened source code ready for public verification

---

## 🚀 Featured on Orynth

ReliqueX is officially listed and featured on **[Orynth](https://www.orynth.dev/projects/reliquex)** — a curated directory for innovative Web3 products and protocols.

<p align="center">
  <a href="https://www.orynth.dev/projects/reliquex">
    <img src="https://orynth.dev/api/badge/reliquex?theme=dark&style=default" alt="Featured on Orynth" width="260" />
  </a>
</p>

| | |
|---|---|
| **Profile** | [orynth.dev/projects/reliquex](https://www.orynth.dev/projects/reliquex) |
| **Category** | Web3 / DeFi / Real-World Assets |
| **Status** | ✅ Live & Verified |

Orynth provides independent visibility and community-driven discovery for blockchain projects. Our listing helps users discover ReliqueX through a trusted, neutral platform.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built on BNB Chain · Powered by ReliqueX Protocol<br/>
  <sub>Not financial advice. Fractional ownership of luxury assets carries inherent risk.</sub>
</p>

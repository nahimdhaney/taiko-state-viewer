# Rollup State Viewer

A real-time dashboard for monitoring rollup cross-chain checkpoint state, helping developers understand when cross-chain proofs can be generated and verified.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Supported Chains

- **Taiko** - Testnet & Mainnet
- **Arbitrum** - Sepolia & One
- **Linea** - Sepolia & Mainnet

## Features

- **Multi-Chain Support** - Monitor multiple L2 networks from a single dashboard
- **Network Toggle** - Switch between testnet and mainnet environments
- **Real-time Chain Status** - Monitor current block numbers on L1 and L2 with auto-refresh
- **Checkpoint Monitoring** - View latest checkpointed blocks in each direction (L1→L2 and L2→L1)
- **Time Behind Display** - See human-readable time delay (e.g., "6d 14h", "5h 25m") based on chain block times
- **Proof Readiness Checker** - Check if a specific block is ready for proof generation
- **Storage Proof Generator** - Generate Merkle proofs for cross-chain verification
- **Recent Checkpoints Table** - Browse historical checkpoint data with timestamps
- **URL Deep Linking** - Share direct links to specific chain/direction views (e.g., `#linea-l2tol1`)

## URL Deep Linking

Share direct links to specific views using URL hash:

```
https://your-domain.com/rollup-state-viewer#chain-direction
```

**Examples:**
- `#linea-l2tol1` - Opens Linea with L2→L1 direction
- `#arbitrum-l1tol2` - Opens Arbitrum with L1→L2 direction
- `#taiko-l2tol1` - Opens Taiko with L2→L1 direction

The URL updates automatically when switching tabs, and browser back/forward navigation is supported.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Blockchain**: viem
- **Proofs**: openintents-storage-proof-generator

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nahimdhaney/rollup-state-viewer.git
cd rollup-state-viewer

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Environment Variables

Configure these in `.env.local`:

```bash
# Taiko Testnet
TAIKO_TESTNET_L1_RPC=https://l1rpc.internal.taiko.xyz
TAIKO_TESTNET_L2_RPC=https://rpc.internal.taiko.xyz
TAIKO_TESTNET_L1_BROADCASTER=0x6BdBb69660E6849b98e8C524d266a0005D3655F7
TAIKO_TESTNET_L2_BROADCASTER=0x6BdBb69660E6849b98e8C524d266a0005D3655F7

# Taiko Mainnet
TAIKO_MAINNET_L1_RPC=https://eth.llamarpc.com
TAIKO_MAINNET_L2_RPC=https://rpc.mainnet.taiko.xyz

# Arbitrum Sepolia
ARBITRUM_SEPOLIA_L1_RPC=https://sepolia.drpc.org
ARBITRUM_SEPOLIA_L2_RPC=https://sepolia-rollup.arbitrum.io/rpc

# Arbitrum Mainnet
ARBITRUM_L1_RPC=https://eth.llamarpc.com
ARBITRUM_L2_RPC=https://arb1.arbitrum.io/rpc

# Linea Sepolia
LINEA_SEPOLIA_L1_RPC=https://sepolia.drpc.org
LINEA_SEPOLIA_L1_ROLLUP=0xB218f8A4Bc926cF1cA7b3423c154a0D627Bdb7E5
LINEA_SEPOLIA_L1_BROADCASTER=0x20728d202A12f8306d01D0E54aE99885AfA31d83
LINEA_SEPOLIA_L2_RPC=https://rpc.sepolia.linea.build

# Linea Mainnet
LINEA_MAINNET_L1_RPC=https://eth.llamarpc.com
LINEA_MAINNET_L1_ROLLUP=0xd19d4B5d358258f05D7B411E21A1460D11B0876F
LINEA_MAINNET_L2_RPC=https://rpc.linea.build
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chains/[chain]/status` | GET | Returns current chain status (query: `direction`, `network`) |
| `/api/chains/[chain]/checkpoints` | GET | Returns recent checkpoints (query: `direction`, `limit`, `network`) |
| `/api/chains/[chain]/check-proof` | GET | Check if a block is ready for proof generation |
| `/api/generate-proof` | POST | Generate a storage proof for cross-chain verification |

### Status Response

```json
{
  "chainName": "Linea (Sepolia)",
  "direction": "l2ToL1",
  "isConnected": true,
  "latestCheckpoint": {
    "blockNumber": 21815069,
    "blockHash": "0xc545...",
    "stateRoot": "0x00ae...",
    "timestamp": 1765316664000
  },
  "currentBlock": 21824364,
  "blocksBehind": 9295,
  "timeBehind": "5h 9m"
}
```

## Project Structure

```
rollup-state-viewer/
├── app/
│   ├── api/
│   │   ├── chains/[chain]/
│   │   │   ├── status/route.ts
│   │   │   ├── checkpoints/route.ts
│   │   │   └── check-proof/route.ts
│   │   └── generate-proof/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── chain-panel.tsx
│   ├── chain-tabs.tsx
│   ├── multi-chain-proof-checker.tsx
│   ├── proof-generator.tsx
│   ├── network-toggle.tsx
│   ├── providers.tsx
│   └── ui/
├── lib/
│   ├── utils.ts
│   └── chains/
│       ├── index.ts
│       ├── registry.ts
│       ├── types.ts
│       ├── network-context.tsx
│       ├── taiko-adapter.ts
│       ├── arbitrum-adapter.ts
│       └── linea-adapter.ts
└── ...
```

## Adding New Chains

1. Create a new adapter in `lib/chains/` implementing `ChainAdapter`
2. Add chain config to `lib/chains/registry.ts` for both testnet and mainnet (include `blockTime` for time delay calculation)
3. Register the adapter in `lib/chains/index.ts`

## Block Time Configuration

Each chain has configured block times for calculating human-readable time delays:

| Chain | L1 Block Time | L2 Block Time |
|-------|---------------|---------------|
| Taiko (Testnet) | 12s | 3s |
| Taiko (Mainnet) | 12s | 12s |
| Arbitrum | 12s | 250ms |
| Linea | 12s | 2s |

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

## How It Works

The dashboard monitors checkpoint/finalization events from L2 rollup contracts:

- **Taiko**: Monitors `CheckpointSaved` events from SignalService contracts
- **Arbitrum**: Monitors `SendRootUpdated` events from Outbox contract
- **Linea**: Monitors `DataFinalizedV3` / `BlocksVerificationDone` events from LineaRollup contract (storage slot 282 for `stateRootHashes`)

These checkpoints indicate which blocks can be used for generating cross-chain storage proofs.

## License

MIT

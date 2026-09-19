# Online Voting System Using Blockchain

A blockchain-based online voting system built using **Solidity, Hardhat, React, Ethers.js, and MetaMask**.

## 🚀 Features

- Blockchain-based voting
- Solidity smart contract
- MetaMask wallet integration
- React frontend
- Ethers.js Web3 integration
- Candidate vote counting
- Real-time voting results
- Decentralized vote storage

## 🛠️ Technologies Used

- **Frontend:** React.js
- **Smart Contract:** Solidity
- **Blockchain:** Ethereum / EVM
- **Development Framework:** Hardhat
- **Web3 Library:** Ethers.js
- **Wallet:** MetaMask
- **Version Control:** Git & GitHub

## 🏗️ System Architecture

The following diagram illustrates the architecture and flow of the blockchain-based online voting system.

```mermaid
flowchart TD

subgraph group_experience["User Experience"]
  node_homepage["Welcome Page<br/>[Homepage.jsx]"]
  node_router["Route Shell<br/>[main.jsx]"]
  node_voting_ui["Voting Screen<br/>[App.jsx]"]
  node_presentation["Theme Effects<br/>[App.jsx]"]
end

subgraph group_web3["Web3 Client"]
  node_ethers_client["Ethers Client<br/>[App.jsx]"]
  node_contract_abi["Contract ABI<br/>[Voting.json]"]
  node_candidate_state["Candidate State<br/>[App.jsx]"]
end

subgraph group_voting["Voting Domain"]
  node_voting_contract{{"Voting Contract<br/>[Voting.sol]"}}
  node_candidate_queries["Candidate Queries<br/>[Voting.sol]"]
  node_vote_processing["Vote Processing<br/>[Voting.sol]"]
end

subgraph group_chain["Blockchain Runtime"]
  node_evm_ledger[("EVM Ledger")]
  node_network_provider["Network Provider"]
end

node_voter(("Voter"))
node_wallet["MetaMask Wallet"]

node_voter -->|"opens app"| node_homepage
node_homepage -->|"navigates"| node_router
node_router -->|"routes /app"| node_voting_ui

node_voting_ui -->|"requests accounts"| node_wallet
node_voting_ui -->|"creates provider"| node_ethers_client
node_voting_ui -->|"loads ABI"| node_contract_abi
node_voting_ui -->|"reads candidates"| node_voting_contract
node_voting_ui -->|"submits vote"| node_voting_contract
node_voting_ui -->|"sets results"| node_candidate_state

node_candidate_state -->|"renders totals"| node_voting_ui

node_voting_ui -.->|"toggles theme"| node_presentation
node_presentation -.->|"animates background"| node_homepage

node_ethers_client -->|"uses wallet provider"| node_wallet
node_ethers_client -->|"sends RPC"| node_network_provider

node_voting_contract -->|"serves reads"| node_candidate_queries
node_voting_contract -->|"processes votes"| node_vote_processing

node_candidate_queries -->|"reads state"| node_evm_ledger
node_vote_processing -->|"writes vote"| node_evm_ledger
node_network_provider -->|"connects chain"| node_evm_ledger

node_voting_contract -->|"returns candidates"| node_voting_ui

click node_homepage "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/Homepage.jsx"
click node_router "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/main.jsx"
click node_voting_ui "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/App.jsx"
click node_presentation "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/App.jsx"
click node_ethers_client "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/App.jsx"
click node_contract_abi "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/artifacts/contracts/Voting.sol/Voting.json"
click node_candidate_state "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/client/src/App.jsx"
click node_voting_contract "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/contracts/Voting.sol"
click node_candidate_queries "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/contracts/Voting.sol"
click node_vote_processing "https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain/blob/main/contracts/Voting.sol"

classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81

class node_homepage,node_router,node_voting_ui,node_presentation toneBlue
class node_ethers_client,node_contract_abi,node_candidate_state toneAmber
class node_voting_contract,node_candidate_queries,node_vote_processing toneMint
class node_evm_ledger,node_network_provider toneRose
class node_voter,node_wallet toneIndigo
```

## 📁 Project Structure

```text
online-voting-system-using-blockchain/
│
├── client/
│   └── src/
│       ├── App.jsx
│       ├── Homepage.jsx
│       ├── main.jsx
│       └── artifacts/
│           └── contracts/
│               └── Voting.sol/
│                   └── Voting.json
│
├── contracts/
│   └── Voting.sol
│
├── ignition/
│   └── modules/
│
├── test/
│
├── hardhat.config.js
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/shaikyasirahmed07/online-voting-system-using-blockchain.git
```

Navigate to the project:

```bash
cd online-voting-system-using-blockchain
```

Install dependencies:

```bash
npm install
```

## 🧪 Hardhat Commands

### Compile the Smart Contract

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Run Tests with Gas Report

```bash
REPORT_GAS=true npx hardhat test
```

### Start Local Blockchain

```bash
npx hardhat node
```

### Deploy Smart Contract

```bash
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## 🔄 Application Workflow

```text
Voter
  │
  ▼
Homepage
  │
  ▼
Voting Screen
  │
  ▼
MetaMask Wallet
  │
  ▼
Ethers.js
  │
  ▼
Voting Smart Contract
  │
  ▼
EVM Blockchain
  │
  ▼
Vote Stored
  │
  ▼
Updated Candidate Results
  │
  ▼
Voting Screen
```

## 🔐 Smart Contract

The main voting smart contract is located at:

```text
contracts/Voting.sol
```

The smart contract handles:

- Candidate management
- Candidate information retrieval
- Vote processing
- Vote counting
- Blockchain state updates

## 🌐 Frontend

The frontend is developed using React.js.

Important files:

```text
client/src/App.jsx
client/src/Homepage.jsx
client/src/main.jsx
```

The frontend communicates with the blockchain through **Ethers.js** and the user's **MetaMask wallet**.

## 🦊 MetaMask

MetaMask is used as the user's blockchain wallet.

The basic interaction flow is:

```text
React Application
       │
       ▼
   MetaMask
       │
       ▼
   Ethers.js
       │
       ▼
Voting Smart Contract
       │
       ▼
 Ethereum / EVM Network
```

## 📊 Voting Process

1. The voter opens the application.
2. The voter navigates to the voting screen.
3. MetaMask is connected.
4. The application creates an Ethers.js provider.
5. Candidate information is retrieved from the smart contract.
6. The voter selects a candidate.
7. MetaMask requests transaction confirmation.
8. The vote is submitted to the smart contract.
9. The smart contract updates the vote count.
10. The updated results are displayed in the frontend.

## 📜 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

**Shaik Yasir Ahmed**

GitHub: https://github.com/shaikyasirahmed07

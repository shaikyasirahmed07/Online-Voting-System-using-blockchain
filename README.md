## System Architecture

The following diagram illustrates the architecture and flow of the blockchain-based online voting system:

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

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a

class node_homepage,node_router,node_voting_ui,node_presentation toneBlue
class node_ethers_client,node_contract_abi,node_candidate_state toneAmber
class node_voting_contract,node_candidate_queries,node_vote_processing toneMint
class node_evm_ledger,node_network_provider toneRose
class node_voter,node_wallet toneIndigo


### 2. Important: remove the outer code fence

When putting it into your actual `README.md`, you need **exactly one** opening and closing fence around the Mermaid diagram:

```markdown
```mermaid
flowchart TD
...




Don't put the Mermaid block inside another ` ```markdown ` block in the actual README.

### 3. GitHub will render it automatically

Because GitHub supports Mermaid diagrams in Markdown, after you commit and push the README, GitHub should render the flowchart rather than showing the Mermaid source.

You can also put a nice heading above it:

```markdown
## 🏗️ System Architecture

This diagram illustrates how the voter interacts with the frontend, MetaMask, the Web3 client, the Solidity voting contract, and the blockchain network.

```mermaid
...

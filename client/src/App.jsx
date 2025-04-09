import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
import "./App.css";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [transactionPending, setTransactionPending] = useState(false);
  const [theme, setTheme] = useState("light");

  const contractAddress = "0x952eF00340D615e06500D1ca4763EC073e950D4F";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask is not installed");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Voting.abi, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(accounts[0]);

        window.ethereum.on("accountsChanged", () => window.location.reload());
        await loadCandidates(contract);
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    };

    connectWallet();
  }, []);

  const loadCandidates = async (contract) => {
    try {
      const candidatesList = await contract.getCandidates();
      setCandidates(
        candidatesList.map((c, index) => ({
          id: index,
          name: c.name,
          votes: Number(c.voteCount),
        }))
      );
    } catch (err) {
      console.error("Error loading candidates:", err);
    }
  };

  const voteForCandidate = async (candidateIndex) => {
    setTransactionPending(true);
    try {
      const tx = await contract.vote(candidateIndex);
      await tx.wait();
      await loadCandidates(contract);
    } catch (err) {
      console.error("Error voting:", err);
    }
    setTransactionPending(false);
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="container">
        <h1>Blockchain Voting DApp</h1>
        <p>Connected Account: {account}</p>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <span>
                {candidate.name} - {candidate.votes} votes
              </span>
              <button disabled={transactionPending} onClick={() => voteForCandidate(candidate.id)}>
                {transactionPending ? "Voting..." : "Vote"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

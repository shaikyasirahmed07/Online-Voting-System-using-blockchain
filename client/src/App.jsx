import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [transactionPending, setTransactionPending] = useState(false);
  const [theme, setTheme] = useState("light");
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  const contractAddress = "0x81686cD4fBAC14F6F4b0bF4ab952072817C17CA1"; // <-- Replace this

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (!vantaEffectRef.current && window.VANTA && window.VANTA.NET && vantaRef.current) {
      vantaEffectRef.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3fff47,
        backgroundColor: 0x0,
        points: 14.0,
        maxDistance: 28.0,
      });
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask is not installed");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Voting.abi, signer);

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
    <div ref={vantaRef} className="vanta-bg">
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="container">
        <h1>Blockchain Voting DApp</h1>
        <p>Connected Account: {account}</p>
        <ul>
          {candidates.map((candidate, index) => (
            <li
              key={candidate.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span>
                {candidate.name} - {candidate.votes} votes
              </span>
              <button
                disabled={transactionPending}
                onClick={() => voteForCandidate(candidate.id)}
              >
                {transactionPending ? "Voting..." : "Vote"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

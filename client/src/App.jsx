import { useState, useEffect, useRef } from "react";
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

  const contractAddress = "0xDEB2ec2B957101065B848731C04C984Fcd5146cA";

  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

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
    <div ref={vantaRef} className="vanta-bg">
      <div className="container">
        <h1>Blockchain Voting DApp</h1>
        <p>Connected Account: {account}</p>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.votes} votes
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

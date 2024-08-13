import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const AddressFetcher = () => {
  const [address, setAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  const [chainId, setChainId] = useState(null);

  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT contract address on Ethereum mainnet
  const usdtAbi = ["function balanceOf(address owner) view returns (uint256)"];

  useEffect(() => {
    const fetchChainId = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          console.log("Provider created:", provider);

          const network = await provider.getNetwork();
          console.log("Network fetched:", network);

          const chainId = network.chainId.toString(); // Convert bigint to string
          console.log("Chain ID fetched:", chainId);

          setChainId(chainId);
        } else {
          console.error("Ethereum provider not found");
        }
      } catch (error) {
        console.error("Error fetching Chain ID:", error);
      }
    };

    fetchChainId();
  }, []);

  const fetchEthBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setEthBalance(ethers.formatEther(balance)); // ETH balance
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
      alert("Error fetching ETH balance. Please check the address.");
    }
  };

  const fetchUsdtBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
      const balance = await usdtContract.balanceOf(address);
      setUsdtBalance(ethers.formatUnits(balance, 6)); // USDT balance (6 decimals)
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
      alert("Error fetching USDT balance. Please check the address.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchEthBalance();
    fetchUsdtBalance();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Fetch Balances by Address</h2>
      <p>
        <strong>Chain ID:</strong> {chainId ? chainId : "Fetching..."}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="addressInput">Ethereum Address</label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            placeholder="Enter Ethereum address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Fetch Balances
        </button>
      </form>
      {ethBalance && (
        <p className="mt-4">
          <strong>ETH Balance:</strong> {ethBalance} ETH
        </p>
      )}
      {usdtBalance && (
        <p>
          <strong>USDT Balance:</strong> {usdtBalance} USDT
        </p>
      )}
    </div>
  );
};

export default AddressFetcher;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const EthereumWallet = () => {
  const [account, setAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);

  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT contract address on Ethereum mainnet
  const usdtAbi = ["function balanceOf(address owner) view returns (uint256)"];

  // Handle account and network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchEthBalance(accounts[0]);
      fetchUsdtBalance(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Fetch ETH balance
  const fetchEthBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setEthBalance(ethers.formatEther(balance)); // ETH balance
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
    }
  };

  // Fetch USDT balance
  const fetchUsdtBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
      const balance = await usdtContract.balanceOf(address);
      setUsdtBalance(ethers.formatUnits(balance, 6)); // USDT balance (6 decimals)
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ethereum Wallet & Token Balance Fetcher</h2>
      {!account ? (
        <button className="btn btn-primary" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>
            <strong>Connected Account:</strong> {account}
          </p>
          <p>
            <strong>ETH Balance:</strong> {ethBalance} ETH
          </p>
          <button
            className="btn btn-success"
            onClick={() => fetchUsdtBalance(account)}
          >
            Refresh USDT Balance
          </button>
          {usdtBalance && (
            <p className="mt-3">
              <strong>USDT Balance:</strong> {usdtBalance} USDT
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EthereumWallet;

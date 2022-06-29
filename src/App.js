import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from './utils/MyToken'

function App(props) {

  const tokenContract = '0x51C239698Dc333327353BD36b56F111Da4Aa8995'

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get metamask! 🦊");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }


  const mint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const mytokenContract = new ethers.Contract(tokenContract, abi, signer);

        await mytokenContract.mint(100);
        console.log("Minted tokens");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const burn = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const mytokenContract = new ethers.Contract(tokenContract, abi, signer);

        await mytokenContract.burn(100);
        console.log("Burned tokens");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app-container">
      <h1>Token app</h1>
      <p>$EXP contract ({tokenContract})</p>
      <button onClick={connectWallet}>{currentAccount.length ? 'Wallet connected' : 'Connect wallet'}</button>
      <button onClick={mint}>Mint tokens</button>
      <button onClick={burn}>Burn tokens</button>
    </div>
  );
}

export default App;
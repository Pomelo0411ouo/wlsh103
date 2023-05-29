import './App.css';

import { ethers } from 'ethers';
import contractABI from './GiveForeverABI.json';

const contractAddress = '0xAc241E664D7B7bD780f549b46345fcE584E789C1'; // Goerli
let provider = new ethers.providers.Web3Provider(window.ethereum);
let contract = new ethers.Contract(contractAddress, contractABI, provider);
let signer;

const connect = async () => {
  await provider.send("eth_requestAccounts",[]);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);
  const userAddress = await signer.getAddress();
  console.log(userAddress);
}

const deposit = async () => {
  let userAmount = document.getElementById('deposit-amount').value;
  const weiAmount = ethers.utils.parseEther(userAmount);
  const tx = await contract.deposit({ value: weiAmount});
  const receipt = await tx.wait();
}

const withdraw = async () => {
  await contract.withdraw();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><span className="blue">Give</span>forever</h1>
        <p>
          A perpetual vault for charity donation :D
        </p>
        <div className="App-body">
          <div className="App-body">
            <button onClick={connect}>CONNECT</button>
          </div>
          <div className="App-body">
            <input type="text" id="deposit-amount" 
            placeholder="ETH" /><br />
            <button onClick={deposit}>DEPOSIT</button>
          </div>
          <div className="App-body">
            <button onClick={withdraw}>WITHDRAW</button>
          </div>
      </div>
      </header>
    </div>
  );
}

export default App;
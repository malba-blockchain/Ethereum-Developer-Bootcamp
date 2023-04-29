import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockWithTransactions, setBlockWithTransactions] = useState();
  const [arrayWithTransactions, setArrayWithTransactions] = useState();

  useEffect(() => {
    async function getBlockData() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setBlockWithTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));
      setArrayWithTransactions((await alchemy.core.getBlockWithTransactions(blockNumber)).transactions);
    }

    getBlockData();
  }, [blockNumber]);

  return (
    <div className="App">
      <p>Block Number: {blockNumber}</p>
            
      <p>Block Hash Number: {blockWithTransactions.hash}</p>
      <p>Parent Hash: {blockWithTransactions.parentHash}</p> 
      <p>Block timestamp: {blockWithTransactions.timestamp}</p> 
      <p>Block Nonce: {blockWithTransactions.nonce}</p> 
      <p>Block Difficulty: {blockWithTransactions.difficulty}</p> 
      <p>Block Transactions:</p>
      <ul>
        {arrayWithTransactions && arrayWithTransactions.map((tx, index) => (
          <li key={index}>
            <p>Transaction Hash: {tx.hash}</p>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Value: {tx.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

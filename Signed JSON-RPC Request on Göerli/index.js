// Import necessary modules


const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

// Get API key and private key from .env file
const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

// Configure Alchemy and wallet settings
const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);
let wallet = new Wallet(TEST_PRIVATE_KEY);

// Define async function main() for transaction
async function main() {

  // Get the nonce for the wallet's address
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  );

  // Create the transaction object
  let transaction = {
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    value: Utils.parseEther('0.01'), // 0.01 worth of ETH being sent
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('15', 'gwei'),
    maxFeePerGas: Utils.parseUnits('60', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 11155111, // sepolia transaction
  };

  // Sign the transaction with the wallet's private key
  let rawTransaction = await wallet.signTransaction(transaction);
  console.log('Raw tx: ', rawTransaction);

  // Send the signed transaction to the Alchemy API
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

// Call the main() function to initiate the transaction
main();
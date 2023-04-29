const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    
    //Create object where you will recieve the list of transactions
    let addresses = [];

    const blockNumber = await provider.getBlockNumber();

    for(let i = 0; i<=blockNumber; i++)
    {
        const block = await provider.getBlockWithTransactions(i);

        block.transactions.forEach((transaction) => {
            if(transaction.from==address)
                addresses.push(transaction.to);
        });
    }

    return addresses;
}

module.exports = findEther;
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {

    let transactions = [];

    for(let i =0; i<MAX_TRANSACTIONS; i++)
    {
        if(mempool.length>0)
            transactions.push(mempool.pop());
    }

    const block = {
        id:blocks.length,
        nonce:0
    };
    
    block.transactions = transactions;

    let stringObject = JSON.stringify(block);
    let hashValue = SHA256(stringObject);


    while (BigInt(`0x${hashValue}`) > TARGET_DIFFICULTY) {
        block.nonce ++;
        hashValue = SHA256(JSON.stringify(block));
    }

    block.hash = hashValue;
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};
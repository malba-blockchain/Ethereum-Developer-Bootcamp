require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    const batch = [
        // TODO: fill in with several JSON RPC requests
    ];

    let totalBalance = 0;

    for (let i = 0; i<addresses.length;i++)
    {
        
        let tempRequest = {
            jsonrpc: "2.0",
            id: i,
            method: "eth_getBalance",
            params: [addresses[i], "latest"]
        }
        
        batch.push(tempRequest);
    }
    console.log(batch);
    const response = await axios.post(url, batch);
    
  
    // return the total balance of all the addresses 

    return response.data.reduce((p,c) => p + parseInt(c.result), 0);
}

module.exports = getTotalBalance;
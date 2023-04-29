const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);

    let receipts = [];
    for (const charity of charities) {
        let success = await wallet.sendTransaction({
            value: utils.parseUnits('1', 'ether'),
            to: charity,
            gasLimit: 0x5208,
            gasPrice: 0x3b9aca00
        });

        receipts.push(success);
    }

    return receipts;
}

module.exports = donate;
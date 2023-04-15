const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    let firstSlice = publicKey.slice(1);
    let hashedSlice = keccak256(firstSlice);
    return hashedSlice.slice(-20);
}

module.exports = getAddress;
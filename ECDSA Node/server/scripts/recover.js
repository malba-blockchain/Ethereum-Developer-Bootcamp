const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex} = require("ethereum-cryptography/utils");

const signature = "304402207cd81ac1bd8e33251edafc50e9b4bcd17ec0c53301234a4f31f507b2f1699035022013d0bd81fe1fb1639438aa6e9a4c1b81bf72d4e054e9fa646d31f5b32b38d3c0";
const recoveryBit = 1;
const hashedMessage = "6bd2dd6bd408cbee33429358bf24fdc64612fbf8b1b4db604518f40ffd34b607";

async function recoverKey(hashedMessage, signature, recoveryBit) {
    return secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
}

recoverKey(hashedMessage, signature, recoveryBit).then(function(result) {
    const recovered = toHex(result);
    
    console.log("Recovered public key:", recovered);
});


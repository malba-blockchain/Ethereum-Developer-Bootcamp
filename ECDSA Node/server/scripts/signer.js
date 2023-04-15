const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex} = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "fb82e08a1cf71fad459a30c303fbb1da825873e8ebc97e77328c7e0c299b88c7";

async function signMessage(msg) {
    let concat = msg;
    let message = new Uint8Array(concat);
    let hashedMessage = keccak256(message);
    console.log("Hashed message", toHex(hashedMessage));
    const signed = await secp.sign(hashedMessage, PRIVATE_KEY, {recovered:true} );

    return signed;
}

signMessage(10).then(function(result) {
    const [signature, recoveryBit] = result;
    
    console.log("Signed message:", toHex(signature));
    console.log("Recovery bit:", recoveryBit);
});


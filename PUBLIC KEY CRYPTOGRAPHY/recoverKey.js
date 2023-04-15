const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    let hashedMessage = hashMessage(message);

    return secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
}

module.exports = recoverKey;
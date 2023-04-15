import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance, signatureFull, setSignature}) { //Here goes the signature
  async function onChange(evt) {
    const signatureFull = evt.target.value;
    const signature = signatureFull.slice(0,-1);
    setSignature(signature);
    const recoveryBit = Number(signatureFull.slice(-1));
    const hashedMessage = "6bd2dd6bd408cbee33429358bf24fdc64612fbf8b1b4db604518f40ffd34b607";
    
    const address = toHex(secp.recoverPublicKey(hashedMessage, signature, recoveryBit)); 
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Signature</h1>

      <label>
        Signature
        <input placeholder="Type a signature" value={signatureFull} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0,200)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

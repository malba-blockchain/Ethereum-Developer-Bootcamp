import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';



export default async function deploy(signer, arbiter, beneficiary, value1) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  
  const value = ethers.utils.parseUnits(String(value1), "ether");

  console.log(value);
  return factory.deploy(arbiter, beneficiary, { value });
}

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');



describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const { ethers } = require("hardhat");
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();
    
    let prov = ethers.getDefaultProvider();

    const [owner, addr1, addr2] = await ethers.getSigners();

    let withdrawAmount = ethers.utils.parseUnits("1", "ether");

    let ownerBalance = await prov.getBalance(owner.address);

    let contractBalance = await prov.getBalance(faucet.address);

    console.log('Signer owner address: ', owner.address);
    return { faucet, owner,  withdrawAmount, addr1, addr2, ownerBalance, contractBalance, prov, ethers};
  }
  //TESTING CASE #1
  it('should deploy and set the owner correctly', async function () {

    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  //TESTING CASE #2
  it('should withdraw only .1 ETH at a time', async function () {

    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  //TESTING CASE #3
  it('should withdraw all the balance only by the owner', async function () {

    const { faucet, addr1 } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.connect(addr1).withdrawAll()).to.be.reverted;
  });


  //TESTING CASE #4
  it('should be self destroyed only by the owner', async function () {

    const { faucet, addr1 } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.connect(addr1).destroyFaucet()).to.be.reverted;
  });


  //TESTING CASE #5
  it('should withdraw all the balance to the address of the owner', async function () {

    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    
    const tx = await faucet.connect(owner).withdrawAll();
    await tx.wait();
  
  });

});
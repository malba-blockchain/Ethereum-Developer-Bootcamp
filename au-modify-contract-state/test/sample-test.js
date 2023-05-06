// import testing libraries: https://www.chaijs.com/guide/styles/ 
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {
  it("should change x to 1337", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "realG");

    // wait for contract to be deployed and validated!
    await contract.deployed();

    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    const newY = await contract.y();
    assert.equal(newX.toNumber(), 1337);
    assert.equal(newY.toString(), "realG");
  }),

  it("should change y to TopG", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "realG");

    // wait for contract to be deployed and validated!
    await contract.deployed();

    // modify y from realG to TopG
    await contract.modifyString();
    // getter for state variable y
    const newY = await contract.y();
    assert.equal(newY.toString(), "TopG");
  });
});


const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;
const { time } = require("@openzeppelin/test-helpers");

async function main() {

  const [owner] = await ethers.getSigners();

  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );


  //TODO 1: Delegate the votes to yourself
  await token.delegate(owner.address);

  const balance = await token.balanceOf(owner.address);

  console.log(
    `The tokens were delegated to the owner and now his balance is:  ${balance}`
  );

  //TODO 2: Create a proposal
  const tx = await governor.propose(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    "Give the owner more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find(x => x.event === 'ProposalCreated');
  const { proposalId } = event.args;

  console.log(
    `The proposal was created with ID:  ${proposalId}`
  );

  //TODO 3: Vote on the proposal
  await time.duration.seconds(3);
  const tx2 = await governor.castVote(proposalId, 1);
  
  const receipt2 = await tx2.wait();
  const voteCastEvent = receipt2.events.find(y => y.event === 'VoteCast');
  await time.duration.seconds(3);

  console.log(
    `The proposal was voted for the voter with address:  ${voteCastEvent.args.voter}`
  );

  await time.duration.seconds(3);
  //TODO 4: Execute the proposal
  await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );

  await time.duration.seconds(3);
  //await token.delegate(owner.address);
  let balance2 = await token.balanceOf(owner.address);

  console.log(
    `Previous balance:  ${balance2}`
  );

  setTimeout( 
    
    async() => { balance2 = await token.balanceOf(owner.address);

    console.log(
      `The proposal was executed now the balance of the owner is:  ${balance2}`
    );
  
  }, 10000);
  
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

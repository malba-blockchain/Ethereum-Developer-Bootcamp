const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { utils } = require('ethers');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const owner = await ethers.getSigner(0);
    
    // no variables need to be set for this challenge

    return { game , owner};
  }

  it('should be a winner', async function () {
    const { game , owner } = await loadFixture(deployContractAndSetVariables);

      // Generate a random wallet using the `generateRandomWallet` function.
    const finalWallet = generateRandomWallet();

    // Send 100 ether to the `finalWallet` from the `owner` account.
    await owner.sendTransaction({
      to: finalWallet.address,
      value: ethers.utils.parseEther("100")
    });

    // Call the `win` function of the `game` contract instance using the `finalWallet`.
    await game.connect(finalWallet).win();

    // Check that the `isWon` variable of the `game` contract instance has been set to `true`.
    assert(await game.isWon(), 'You did not win the game');
  });
});


// Define a function named `generateRandomWallet`.
function generateRandomWallet() {
  // Create a random `ethers.Wallet` instance and connect it to the provider.
  const wallet = ethers.Wallet.createRandom().connect(ethers.provider);

  // Get the address of the `wallet`.
  const address = wallet.address;

  // Define a threshold value as a hexadecimal string.
  const threshold = ethers.utils.hexZeroPad('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf', 20);

  // If the address of the `wallet` is less than the `threshold` value, return the `wallet`.
  // Otherwise, recursively call the `generateRandomWallet` function until a suitable wallet is found.
  if (ethers.utils.hexDataSlice(address, 0, 20) < ethers.utils.hexDataSlice(threshold, 0, 20)) {
    return wallet;
  } else {
    return generateRandomWallet();
  }
}
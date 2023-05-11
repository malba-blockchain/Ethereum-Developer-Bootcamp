const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [addr1] = await ethers.getSigners();

    const address1 = await addr1.getAddress();

    return { game , addr1, address1 };
  }
  it('should be a winner', async function () {
    const { game , addr1, address1  } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(address1);


    await game.win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

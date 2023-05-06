require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_TESTNET_RPC_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY]
    },
  }
};
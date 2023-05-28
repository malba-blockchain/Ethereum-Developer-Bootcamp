const { ethers, upgrades } = require('hardhat');

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');  // Get the contract factory for the 'VendingMachineV1' contract.
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);  // Deploy a proxy contract using the 'VendingMachineV1' contract as the initial implementation, passing [100] as the constructor arguments.
  await proxy.deployed();  // Wait for the deployment of the proxy contract to complete.

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxy.address
  );  // Retrieve the address of the implementation contract associated with the deployed proxy contract.

  console.log('Proxy contract address: ' + proxy.address);  // Print the address of the deployed proxy contract.

  console.log('Implementation contract address: ' + implementationAddress);  // Print the address of the implementation contract.
}

main();  // Call the 'main' function to deploy the proxy contract and retrieve information about the contract.

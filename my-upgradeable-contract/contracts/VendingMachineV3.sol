// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV3 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;  // A public state variable to store the number of sodas available in the vending machine.
  address public owner;  // A public state variable to store the address of the owner of the vending machine.
  mapping (address => uint) public sodasPerUser;

  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;  // Initialize the 'numSodas' state variable with the provided '_numSodas' value.
    owner = msg.sender;  // Initialize the 'owner' state variable with the address of the message sender (the person deploying the contract).
  }

  function purchaseSoda() public payable {
    require(numSodas > 0, "There are no sodas left in the machine");
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");  // Check if the amount of Wei sent with the transaction is greater than or equal to 1000. If not, revert the transaction with the given error message.
    numSodas--;  // Decrement the value of 'numSodas' by 1 to represent the purchase of a soda.
    sodasPerUser[msg.sender] ++; // challenge: add a mapping to keep track of user soda purchases!
  }

  function addSodas(uint _sodasToAdd) public onlyOwner {
    numSodas = numSodas+_sodasToAdd;  // Increment the value of 'numSodas' with the _sodas to add parameter
  }

  function withdrawProfits() public onlyOwner {
    require(address(this).balance > 0, "Profits must be greater than 0 in order to withdraw!");  // Check if the contract has any balance (profits) available to withdraw. If not, revert the transaction with the given error message.
    (bool sent, ) = owner.call{value: address(this).balance}("");  // Attempt to transfer the contract's balance (profits) to the owner's address.
    require(sent, "Failed to send ether");  // Check if the transfer was successful. If not, revert the transaction with the given error message.
  }

  function setNewOwner(address _newOwner) public onlyOwner {
    owner = _newOwner;  // Change the owner of the vending machine to the provided '_newOwner' address.
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");  // Modifier to restrict access to the function to only the owner of the vending machine. If the condition is not met, revert the transaction with the given error message.
    _;  // Continue executing the function.
  }
}

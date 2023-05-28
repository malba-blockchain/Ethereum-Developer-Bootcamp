// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV1 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;  // A public state variable to store the number of sodas available in the vending machine.
  address public owner;  // A public state variable to store the address of the owner of the vending machine.

  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;  // Initialize the 'numSodas' state variable with the provided '_numSodas' value.
    owner = msg.sender;  // Initialize the 'owner' state variable with the address of the message sender (the person deploying the contract).
  }

  function purchaseSoda() public payable {
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");  // Check if the amount of Wei sent with the transaction is greater than or equal to 1000. If not, revert the transaction with the given error message.
    numSodas--;  // Decrement the value of 'numSodas' by 1 to represent the purchase of a soda.
  }
}

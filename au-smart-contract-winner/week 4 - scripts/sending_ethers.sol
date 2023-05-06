// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Contract {
    address public owner;
    address public charityAddress;

    constructor (address _charityAddress){
        owner = msg.sender;
        charityAddress = _charityAddress;

    }

    receive() external payable {
        console.log(msg.value);
    }

    function tip() external payable {
        (bool s, ) = owner.call{value: msg.value}("");
        require(s);
    }

    function donate() external payable {
        //uint valueToTransfer = address(this).balance;
        //(bool s, ) = charityAddress.call{value:valueToTransfer}("");
        //require(s);
        selfdestruct(payable(charityAddress));
    }
}
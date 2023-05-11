// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {

    address public depositor; //Signer that deploys the contract
    address public arbiter;
    address public beneficiary;
	
    bool public isApproved;

    uint public nonce;


    constructor ( address _arbiter, address _beneficiary) payable{
        
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        isApproved = false;
    }

	event Approved(uint balaceSentToBeneficiary);

    function approve () external {
        require(msg.sender == arbiter);

        uint _balaceSentToBeneficiary = address(this).balance;

        (bool sent,) = beneficiary.call{value: _balaceSentToBeneficiary}("");
        require(sent, "Failed to send ether");

        isApproved = true;

        emit Approved(_balaceSentToBeneficiary);
    }


}
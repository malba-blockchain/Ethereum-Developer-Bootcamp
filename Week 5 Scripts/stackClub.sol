// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    
    address [] public members;

    constructor() {
        members.push(msg.sender);
    }

    modifier onlyMembers () {
        require(isMember(msg.sender));
        _;
    }

    function addMember(address _newMember) external onlyMembers {
        members.push(_newMember);
    }

    function isMember (address _addressToFind) public view returns(bool) {
        
        for(uint i =0; i< members.length;i++) {
            if( _addressToFind == members[i]) {
                return true;
            }
        }

        return false;
    }

    function removeLastMember() external onlyMembers {
        
        members.pop();
    }

}
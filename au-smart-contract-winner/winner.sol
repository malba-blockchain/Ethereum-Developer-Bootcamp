// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Rewriter {

    address public target = address(0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502);
    
    constructor() {
        
    }

    function execute() external {
        (bool success, ) = target.call(abi.encodeWithSignature("attempt()"));
        require(success);
    }

}
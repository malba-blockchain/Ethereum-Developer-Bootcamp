//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Atlas is ERC20 {

    uint constant _initial_supply = 10000000 * (10**18);
    constructor() ERC20("Atlas", "ATL") {
        _mint(msg.sender, _initial_supply);
    }
}
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract MyToken is ERC20 {
    address public admin;

    constructor() ERC20("Example Tokken", "EXP") {
        _mint(msg.sender, 1000 * 10**uint256(decimals()));
        admin = msg.sender;
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
        console.log("Tokens minted");
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        console.log("Tokens burned");
    }
}

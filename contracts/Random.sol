// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Random {
    // @title A contract for demonstrating random number generation in specific range
    // @author Jitendra Kumar
    // @notice For now, this contract just show how to generate a random number in specific range using keccak256

    // Initializing the state variable
    uint randNonce = 0;

    // Defining a function to generate
    // a random number
    function randMod() external returns (uint) {
        // increase nonce
        randNonce++;
        return
            uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            );
    }
}

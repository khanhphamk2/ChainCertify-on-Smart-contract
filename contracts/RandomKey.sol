// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Random.sol";

contract RandomKey {
    uint256 private privateKey;
    uint256 private modulus;

    constructor() payable {
        Random rand = new Random();
        privateKey = rand.randMod();
        modulus = rand.randMod();
    }

    function generatePublicKey() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        ecrecover(
                            bytes32(0),
                            uint8(27),
                            bytes32(privateKey),
                            bytes32(0)
                        )
                    )
                )
            );
    }

    function getPrivateKey() public view returns (uint256) {
        return privateKey;
    }

    function getModolus() public view returns (uint256) {
        return modulus;
    }
}

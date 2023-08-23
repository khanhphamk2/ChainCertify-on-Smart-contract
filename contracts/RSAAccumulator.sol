// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/HelpFunctions.sol";

contract RSAAccumulator {
    uint256 constant RSA_KEY_SIZE = 3072;
    uint256 constant RSA_PRIME_SIZE = RSA_KEY_SIZE / 2;
    uint256 constant ACCUMULATED_PRIME_SIZE = 128;
    HelpFunctions hf = new HelpFunctions();

    struct Element {
        bool exists;
        uint256 nonce;
    }

    address public owner;
    uint256 public n;
    uint256 public A0;
    mapping(uint256 => Element) public S;

    constructor() {
        owner = msg.sender;
        (uint256 p, uint256 q) = hf.generateTwoLargeDistinctPrimes(
            RSA_PRIME_SIZE
        );
        n = p * q;
        A0 =
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) %
            n;
    }

    function add(uint256 x) public {
        require(!S[x].exists, "Element already added");
        (uint256 hashPrime, uint256 nonce) = hf.hashToPrime(
            x,
            ACCUMULATED_PRIME_SIZE,
            0
        );
        A0 = (A0 ** hashPrime) % n;
        S[x] = Element(true, nonce);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is Ownable {
    struct CertificateData {
        string name;
        string course;
        string date;
        string signature;
    }

    mapping(address => CertificateData) public certificates;
    uint count = 0;

    function setCertificate(
        string memory _name,
        string memory _course,
        string memory _date,
        string memory _signature
    ) public {
        certificates[msg.sender] = CertificateData(
            _name,
            _course,
            _date,
            _signature
        );
        count++;
    }

    function getCertifficate(address _cert) private returns (memory _CertificateData) {
        return certificates[_cert];
    }
}

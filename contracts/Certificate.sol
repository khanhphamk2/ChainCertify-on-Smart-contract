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

    function verifyCertificate(address _cert) public view returns (bool) {
        if (bytes(certificates[_cert].name).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function getCertificateData(
        address _cert
    )
        public
        view
        returns (string memory, string memory, string memory, string memory)
    {
        return (
            certificates[_cert].name,
            certificates[_cert].course,
            certificates[_cert].date,
            certificates[_cert].signature
        );
    }

    function revokeCerti(address _cert) public onlyOwner {
        delete certificates[_cert];
        count--;
    }
}

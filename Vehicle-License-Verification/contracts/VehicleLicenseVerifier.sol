pragma solidity ^0.8.0;

contract VehicleLicenseVerifier {
    address public admin;
    //define datafields
    struct Official{
        string name;
        string Dzongkhag;
    }
    address[] addressOfOfficials;
    mapping(address=>Official) public Officials;
    constructor() {
        admin = msg.sender;
    }

    function isAdmin(address adminAddress) public view returns (bool) {
        if (adminAddress == admin) {
            return true;
        } else {
            return false;
        }
    }

    function addOfficial(address adminAddress,address officialAddress,string memory name,string memory dzongkhag) public{
        require( adminAddress == admin,"user is not admin");
        Officials[officialAddress]=Official(name,dzongkhag); 
        addressOfOfficials.push(officialAddress);

    }
    function viewOfficial() public view returns(Official[] memory) {
    Official[] memory officials = new Official[](addressOfOfficials.length);
    for (uint i = 0; i < addressOfOfficials.length; i++) {
        officials[i] = Officials[addressOfOfficials[i]];
    }
    return officials;
}
}


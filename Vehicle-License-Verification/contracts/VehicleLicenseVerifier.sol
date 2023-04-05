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
    

    function verifyOfficial(address officialAddress) public view returns (bool) {
    for (uint i = 0; i < addressOfOfficials.length; i++) {
        if (addressOfOfficials[i] == officialAddress) {
            return true;
        }
    }
    return false;
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







struct licenseDetail{
        string Name;
        string Village;
        string Dzongkhag;
        string LicenseNo;
        string IssuedDate;
        string Validity;
        uint Barcode;
    }

    //to add the licensedeatils to the blockchain
    uint[] barcodeNumbers;
    mapping(uint=>licenseDetail) licenseInfos;

    function addLicenseInfo(uint _barcodeNumber,string memory _name,string memory _village,string memory _dzongkhag,string memory _licenseNo,string memory _issuedDate,string memory _validity) public{
        licenseInfos[_barcodeNumber]=licenseDetail(_name,_village,_dzongkhag,_licenseNo,_issuedDate,_validity,_barcodeNumber); 
        barcodeNumbers.push(_barcodeNumber);
    }

    //to view the license details after adding
    function viewLicenseInfos() public view returns (licenseDetail[] memory) {
    licenseDetail[] memory license = new licenseDetail[](barcodeNumbers.length);
    for (uint i = 0; i < barcodeNumbers.length; i++) {
        license[i] = licenseInfos[barcodeNumbers[i]];
    }
    return license;
}


function editLicenseInfo(uint _barcodeNumber, string memory _name, string memory _village, string memory _dzongkhag, string memory _licenseNo, string memory _issuedDate, string memory _validity) public {
    
    licenseInfos[_barcodeNumber] = licenseDetail(_name, _village, _dzongkhag, _licenseNo, _issuedDate, _validity, _barcodeNumber);
}


    


}


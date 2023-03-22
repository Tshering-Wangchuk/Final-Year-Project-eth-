var DLicenseVerifier = artifacts.require("./VehicleLicenseVerifier.sol");

module.exports = function (deployer) {
  deployer.deploy(DLicenseVerifier);
};

import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";

const Official = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [contract, setContract] = useState();
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    connectToMetaMask();
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.eth_requestAccounts;
        const web3 = new Web3(window.ethereum);
        // setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setCurrentAddress(accounts[0]);

        // console.log(web3);
        const networkId = await web3.eth.net.getId();
        //console.log(networkId);
        const deployedNetwork = DLicenseVerifier.networks[networkId];
        //console.log(deployedNetwork.address);

        const contract = new web3.eth.Contract(
          DLicenseVerifier.abi,
          deployedNetwork.address
        );

        setContract(contract);
        console.log(contract);
        console.log(currentAddress);

        //        const data = await contract.methods.isAdmin(accounts[0]).call();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("metamask is not installed");
    }
  };

  const [licenseData, setLicenseData] = useState({
    name: "",
    village: "",
    dzongkhag: "",
    licenseNo: "",
    issuedDate: "",
    validity: "",
    barcodeNo:"",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Form submitted:",
      licenseData.name,
      licenseData.village,
      licenseData.dzongkhag,
      licenseData.licenseNo,
      licenseData.issuedDate,
      licenseData.validity
    );

    await contract.methods.addLicenseInfo(licenseData.barcodeNo, licenseData.name, licenseData.village, licenseData.dzongkhag, licenseData.licenseNo, licenseData.issuedDate, licenseData.validity)
    .send({ from: currentAddress }, function (error, transactionHash) {
      if (error) {
        console.log(error);
      } else {
        console.log("Transaction hash: ", transactionHash);
      }
    });

    setLicenseData({
    name: "",
    village: "",
    dzongkhag: "",
    licenseNo: "",
    issuedDate: "",
    validity: "",
    barcodeNo:"",
    });

  };

  const handleInputChange = (event) => {
    setLicenseData({
      ...licenseData,
      [event.target.name]: event.target.value,
    });
  };


  const viewOfficials = async () => {
   

    const officialss = await contract.methods.viewLicenseInfos().call();
    setLicenses(officialss);
    console.log(licenses);

    // console.log(officialss)
    //setViewOff(viewOfficial);
  };

  

  return (
    <div>
      <h1>Admin</h1>
      <h2> hello </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={licenseData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="dzongkhag">Village:</label>
          <input
            type="text"
            id="village"
            name="village"
            value={licenseData.village}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="address">Dzongkhag:</label>
          <input
            type="text"
            id="dzongkhag"
            name="dzongkhag"
            value={licenseData.dzongkhag}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="LicenseNo">LicenseNo:</label>
          <input
            type="text"
            id="licenseNo"
            name="licenseNo"
            value={licenseData.licenseNo}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="issuedDate">IssuedDate:</label>
          <input
            type="text"
            id="issuedDate"
            name="issuedDate"
            value={licenseData.issuedDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="address">Validity:</label>
          <input
            type="text"
            id="validity"
            name="validity"
            value={licenseData.validity}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="address">Barcode No:</label>
          <input
            type="text"
            id="barcodeNo"
            name="barcodeNo"
            value={licenseData.barcodeNo}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <button onClick={viewOfficials}>View license</button>

      <div>
      {licenses.map((license) => (
        <div key={license.Name}>
          <p>Name: {license.Name}</p>
          <p>Village: {license.Village}</p>
          <p>Dzongkhag: {license.Dzongkhag}</p>
          <p>Dzongkhag: {license.LicenseNo}</p>
          <p>Name: {license.IssuedDate}</p>
          <p>Dzongkhag: {license.Validity}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Official;

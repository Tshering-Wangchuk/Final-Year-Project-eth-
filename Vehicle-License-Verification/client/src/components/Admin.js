import React, { useEffect } from "react";
import { useState } from "react";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";
import Web3 from "web3";
import Button from "react-bootstrap/esm/Button";

const Admin = (props) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [contract, setContract] = useState();
  const [officials, setOfficials] = useState([]);

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

  const [officialData, setOfficialData] = useState({
    name: "",
    dzongkhag: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Form submitted:",
      officialData.name,
      officialData.dzongkhag,
      officialData.address
    );

    await contract.methods
      .addOfficial(
        currentAddress,
        officialData.address,
        officialData.name,
        officialData.dzongkhag
      )
      .send({ from: currentAddress }, function (error, transactionHash) {
        if (error) {
          console.log(error);
        } else {
          console.log("Transaction hash: ", transactionHash);
        }
      });

    setOfficialData({
      name: "",
      dzongkhag: "",
      address: "",
    });

    // console.log(contract);
    //console.log("the addre", currentAddress);
  };

  const viewOfficials = async () => {
    const officialss = await contract.methods.viewOfficial().call();
    setOfficials(officialss);
    console.log(officials);

    // console.log(officialss)
    //setViewOff(viewOfficial);
  };

  const handleInputChange = (event) => {
    setOfficialData({
      ...officialData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Admin</h1>
      <h2> hello {currentAddress}</h2>

      <div className="container background">
        <div className="row ">
          <div className="col-md-6 ">
            <div className="adminAddForm">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 ">
                <label htmlFor="name" class="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  name="name"
                  value={officialData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dzongkhag" class="form-label">
                  Dzongkhag:
                </label>
                <input
                  type="text"
                  id="dzongkhag"
                  name="dzongkhag"
                  class="form-control"
                  value={officialData.dzongkhag}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3" class="form-label">
                <label htmlFor="address">Wallet Address:</label>
                <input
                  type="text"
                  id="address"
                  class="form-control"
                  name="address"
                  value={officialData.address}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
            </div>
          </div>
          <div className="col-md-6">
            <Button onClick={viewOfficials}>View users</Button>

            <div className="adminView">
              {officials.map((official) => (
                <div key={official.name}>
                  <p>Name: {official.name}</p>
                  <p>Dzongkhag: {official.Dzongkhag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

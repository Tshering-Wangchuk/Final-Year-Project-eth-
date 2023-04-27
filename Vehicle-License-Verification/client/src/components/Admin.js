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
          window.alert("Users entered Successfullly");
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
      <label className="font-weight-bold display-2 purple">Admin</label><br></br>
      <label className="walletAddress display-6 purple">Admin Wallet Address : </label>
      <label className="walletAddressValue text-xl currentAddress text-white">{currentAddress} </label>

      <div className="container background">
        <div className="row ">
          <div className="col-md-6 ">
            <div className="adminAddForm">
              <form onSubmit={handleSubmit} class="form-floating fs-5">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    name="name"
                    value={officialData.name}
                    onChange={handleInputChange}
                  />
                  <label for="name" class="form-label">
                    Name:
                  </label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    id="dzongkhag"
                    name="dzongkhag"
                    class="form-control"
                    value={officialData.dzongkhag}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="dzongkhag" class="form-label">
                    Dzongkhag:
                  </label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    id="address"
                    class="form-control"
                    name="address"
                    value={officialData.address}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="address">Wallet Address:</label>
                </div>

                <Button className="btn btn-primary p-2" type="submit">Submit</Button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <Button className="btn btn-primary p-2" onClick={viewOfficials}>View users</Button>
            <div>
              <table className="table table-striped-columns table-hover" bgcolor="#ffffff">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Dzongkhag</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider">
                  {officials.map((official) => (
                    <tr key={official.name}>
                      <td> {official.name}</td>

                      <td>{official.Dzongkhag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

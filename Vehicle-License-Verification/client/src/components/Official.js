import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";
import Button from "react-bootstrap/esm/Button";

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
    barcodeNo: "",
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

    await contract.methods
      .addLicenseInfo(
        licenseData.barcodeNo,
        licenseData.name,
        licenseData.village,
        licenseData.dzongkhag,
        licenseData.licenseNo,
        licenseData.issuedDate,
        licenseData.validity
      )
      .send({ from: currentAddress }, function (error, transactionHash) {
        if (error) {
          console.log(error);
        } else {
          console.log("Transaction hash: ", transactionHash);
          window.alert("Data entered Successfully!");
        }
      });

    setLicenseData({
      name: "",
      village: "",
      dzongkhag: "",
      licenseNo: "",
      issuedDate: "",
      validity: "",
      barcodeNo: "",
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


  const editOfficials = (license) => {
      console.log(license.Barcode)
  }

  return (
    <div>
      <h1>Official</h1>
      <h2> current official Address: {currentAddress}</h2>

      <div className="container background">
        <div className="row ">
          <div className="col-md-6">
            <div className="adminAddForm">
              <form onSubmit={handleSubmit} className="form-floating fs-5">
                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    name="name"
                    value={licenseData.name}
                    onChange={handleInputChange}
                  />
                  <label for="name">Name:</label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="village"
                    class="form-control"
                    name="village"
                    value={licenseData.village}
                    onChange={handleInputChange}
                  />
                  <label for="dzongkhag" class="form-label">
                    Village:
                  </label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="dzongkhag"
                    class="form-control"
                    name="dzongkhag"
                    value={licenseData.dzongkhag}
                    onChange={handleInputChange}
                  />
                  <label for="address" class="form-label">
                    Dzongkhag:
                  </label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="licenseNo"
                    class="form-control"
                    name="licenseNo"
                    value={licenseData.licenseNo}
                    onChange={handleInputChange}
                  />

                  <label for="LicenseNo" class="form-label">
                    LicenseNo:
                  </label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="issuedDate"
                    class="form-control"
                    name="issuedDate"
                    value={licenseData.issuedDate}
                    onChange={handleInputChange}
                  />

                  <label for="issuedDate" class="form-label">
                    IssuedDate:
                  </label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="validity"
                    class="form-control"
                    name="validity"
                    value={licenseData.validity}
                    onChange={handleInputChange}
                  />

                  <label for="address" class="form-label">
                    Validity:
                  </label>
                </div>

                <div className="mb-3 form-floating ">
                  <input
                    type="text"
                    id="barcodeNo"
                    class="form-control"
                    name="barcodeNo"
                    value={licenseData.barcodeNo}
                    onChange={handleInputChange}
                  />

                  <label for="address" class="form-label">
                    Barcode No:
                  </label>
                </div>

                <button className="btn btn-primary p-2" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 ">
            <button className="btn btn-primary p-2" onClick={viewOfficials}>
              View license
            </button>

            <div>
              <table className="table table-striped-columns table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Village</th>
                    <th scope="col">Dzongkhag</th>
                    <th scope="col">License No</th>
                    <th scope="col">IssuedDate</th>
                    <th scope="col">Validity</th>
                    <th scope="col">Barcode No</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider">
                  {licenses.map((license) => (
                    <tr key={license.Name}>
                      <td>{license.Name}</td>
                      <td>{license.Village}</td>
                      <td>{license.Dzongkhag}</td>
                      <td>{license.LicenseNo}</td>
                      <td>{license.IssuedDate}</td>
                      <td>{license.Validity}</td>
                      <td>{license.Barcode}</td>
                      <td>
                        <Button className="btn btn-warning" onClick={() => editOfficials(license)}>Edit</Button>
                      </td>
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

export default Official;

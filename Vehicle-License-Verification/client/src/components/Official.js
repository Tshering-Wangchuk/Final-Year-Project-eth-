import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';



const Official = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [contract, setContract] = useState();
  const [licenses, setLicenses] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState({
    Name: "",
    Village: "",
    Dzongkhag: "",
    LicenseNo: "",
    IssuedDate: "",
    Validity: "",
    Barcode: "",
  });
  

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

  const handleInputChangeEdit = (event) => {
    setSelectedLicense({
      ...selectedLicense,
      [event.target.name]: event.target.value,
    });
  };

  const viewOfficials = async () => {
    const officialss = await contract.methods.viewLicenseInfos().call();
    setLicenses(officialss);
   // console.log(licenses);

    // console.log(officialss)
    //setViewOff(viewOfficial);
  };



  const handleEdit = (license) => {
    setSelectedLicense(license);
    setShowModal(true);
  };

  const handleSave = async (newLicenseValues) => {
    // Update the licenses array with the new values
    // ...
    console.log(selectedLicense.Name);
    await contract.methods
      .editLicenseInfo(
        selectedLicense.Barcode,
        selectedLicense.Name,
        selectedLicense.Village,
        selectedLicense.Dzongkhag,
        selectedLicense.LicenseNo,
        selectedLicense.IssuedDate,
        selectedLicense.Validity
      )
      .send({ from: currentAddress }, function (error, transactionHash) {
        if (error) {
          console.log(error);
        } else {
          console.log("Transaction hash: ", transactionHash);
          window.alert("Data entered Successfully!");
        }
      });
    setShowModal(false);
  };

  
 

 

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
            <div className="viewOfficial">
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
                  <tr key={license.LicenseNo}>
                    <td>{license.Name}</td>
                    <td>{license.Village}</td>
                    <td>{license.Dzongkhag}</td>
                    <td>{license.LicenseNo}</td>
                    <td>{license.IssuedDate}</td>
                    <td>{license.Validity}</td>
                    <td>{license.Barcode}</td>
                    <td>
                      <Button onClick={() => handleEdit(license)}>Edit</Button>
                    </td>
                  </tr>
                ))}
                  
                </tbody>
              </table>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit License</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Render a form with the selectedLicense object */}
                {/* Bind form inputs to state variables */}



                <div className="adminAddForm">
                <form onSubmit={handleSubmit} className="form-floating fs-5">
                  <div className="mb-3 form-floating ">
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      name="Name"
                      value={selectedLicense.Name}
                      onChange={handleInputChangeEdit}
                    />
                    <label for="name">Name:</label>
                  </div>
  
                  <div className="mb-3 form-floating ">
                    <input
                      type="text"
                      id="village"
                      class="form-control"
                      name="Village"
                      value={selectedLicense.Village}
                      onChange={handleInputChangeEdit}
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
                      name="Dzongkhag"
                      value={selectedLicense.Dzongkhag}
                      onChange={handleInputChangeEdit}
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
                      name="LicenseNo"
                      value={selectedLicense.LicenseNo}
                      onChange={handleInputChangeEdit}
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
                      name="IssuedDate"
                      value={selectedLicense.IssuedDate}
                      onChange={handleInputChangeEdit}
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
                      name="Validity"
                      value={selectedLicense.Validity}
                      onChange={handleInputChangeEdit}
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
                      name="Barcode"
                      value={selectedLicense.Barcode}
                      onChange={handleInputChangeEdit}
                    />
  
                    <label for="address" class="form-label">
                      Barcode No:
                    </label>
                  </div>
  
                 
                </form>
              </div>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => handleSave()}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Official;

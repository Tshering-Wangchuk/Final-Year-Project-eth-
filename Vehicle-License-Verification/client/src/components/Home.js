import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";

export const Home = (props) => {
  const [web3, setWeb3] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isHeAdmin, setIsHeAdmin] = useState(false);
  const navigate = useNavigate();


  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
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

       

        const data = await contract.methods.isAdmin(accounts[0]).call();

        //

        if (data) {
          //window.open("/admin");
          navigate("/admin");
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("metamask is not installed");
    }
  };

 

  return (
    <div>
      <div>Please Login with metamask</div>
      <div className="loginButtons">
        <button onClick={connectToMetaMask}>Admin</button>
        <p>Current Address: {currentAddress}</p>
        <button>Official</button>
      </div>
    </div>
  );
};

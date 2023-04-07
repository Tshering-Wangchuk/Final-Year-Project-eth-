import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "../App.css";
import { useNavigate } from "react-router-dom";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";
import metamask from "../Images/metamask.png";
import Safety from "../Images/safety.png";
import liability from "../Images/liability.png";
import fraud from "../Images/fraud.png";

import Button from "react-bootstrap/Button";

export const Home = (props) => {
  const [web3, setWeb3] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isHeAdmin, setIsHeAdmin] = useState(false);
  const navigate = useNavigate();
  const [contract, setContract] = useState();

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
        } else {
          window.alert("Error: User is not verified.");
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("metamask is not installed");
    }
  };

  const connectToMetaMaskforOfficial = async () => {
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

        const data = await contract.methods.verifyOfficial(accounts[0]).call();

        //

        if (data) {
          //window.open("/admin");
          navigate("/official");
        } else {
          window.alert("Error: User is not verified.");
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
    <div className="container background">
      <div className="row ">
        <div className="col-md-9 websitenamerow">
          <p className="fw-bolder websitename">
            Driving License Verification System
          </p>
          
        </div>

        <div className="col-md-3 websitenamerow">
          <div className="loginMaterials">
            <div className="text-info-emphasis fs-4">
              <p>Please Login with</p>

              <img
                className="metamask img-fluid"
                alt="MetaMask"
                src={metamask}
              />
            </div>

            <div className="grid gap-3">
              <Button
                className=" btn btn-primary p-2 m-2"
                onClick={connectToMetaMask}
              >
                Admin
              </Button>
              <Button
                className="btn btn-primary p-2"
                onClick={connectToMetaMaskforOfficial}
              >
                Official
              </Button>
            </div>
          </div>
        </div>

        

        <div className="row ">
          <div className="col-md-4 ">
            <p className="paraHead">Safety</p>
            <p>
              Driving license verification helps ensure that drivers have the
              necessary skills and knowledge to operate a vehicle safely on
              public roads.
            </p>
          </div>
          <div className="col-md-4 ">
            <p className="paraHead">Liability</p>
            <p>
              Employers who hire drivers, such as ride-sharing companies or
              delivery services, have a legal responsibility to ensure that
              their drivers are properly licensed.
            </p>
          </div>
          <div className="col-md-4 ">
            <p className="paraHead">Fraud prevention</p>
            <p>
              Verification of a driver's license helps prevent fraud and ensures
              that the person driving the vehicle is who they claim to be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

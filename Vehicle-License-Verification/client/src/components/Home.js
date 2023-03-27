import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "../App.css";
import { useNavigate } from "react-router-dom";
import DLicenseVerifier from "../contracts/VehicleLicenseVerifier.json";
import metamask from "../Images/metamask.png";

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
        <div className="col-md-6 fs-5">
          <nav class="nav nav-pills flex-column flex-sm-row">
            <a
              class="flex-sm-fill text-sm-center nav-link active"
              aria-current="page"
              href="#"
            >
              Active
            </a>
            <a class="flex-sm-fill text-sm-center nav-link" href="#">
              Longer nav link
            </a>
            <a class="flex-sm-fill text-sm-center nav-link" href="#">
              Link
            </a>
            <a class="flex-sm-fill text-sm-center nav-link disabled">
              Disabled
            </a>
          </nav>
        </div>

        <div className="col-md-6 "></div>
      </div>
      <div className="row ">
        <div className="col-md-9">
          <p className="fw-bolder websitename">
            Driving License Verification System
          </p>
          <div className="fs-3">- Using Blockchain Technology </div>
        </div>

        <div className="col-md-3 ">
          <div className="loginMaterials">
            <div className="text-info-emphasis fs-4">
              <p>Please Login with</p>

              <img className="metamask" alt="MetaMask" src={metamask} />
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
      </div>
    </div>
  );
};

const express = require('express');
const Web3 = require('web3');





const web3 = new Web3('http://127.0.0.1:7545');

const mycontractABI = require('./VehicleLicenseVerifier.json');
const contractABI = mycontractABI.abi;
const contractAddress = '0x9854983fA5c2136e4456Bd68502726239a2A51B1';
const myContract = new web3.eth.Contract(contractABI, contractAddress);


  
const app = express();

app.use(express.json());


app.post('/verificationapi', async (req, res) => {

    let barcodes;

    await myContract.methods.getAllBarcodeNumbers().call((err, result) => {
        if (err) {
          console.error(err);
        } else {
          barcodes = result
        }
    });

    const {code}  = req.body; 
    console.log(code)

    let verified = false; // Initialize verification status as false

    for(i=0; i<barcodes.length;i++){
        if (barcodes[i] == code){
            verified = true; // Update verification status to true if barcode is found
            break; // Exit loop if barcode is found
        }
    }

    if (verified) {
      res.status(200).json({message: 'True'}); // Send positive response if verified
    } 
    else {
      res.status(404).json({message: 'False'}); // Send negative response if not verified
    }
});


  const port = 3001;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
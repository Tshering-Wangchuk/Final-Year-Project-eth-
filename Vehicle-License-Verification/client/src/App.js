import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import { Home } from './components/Home';
import Official from './components/Official';
import Error from './components/Error';
import logo from "./Images/logo.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  

  const [Contract, setContracts] = useState();
 // console.log(Contract)

  

  return (
    <div className="App">
        <div className="row ">
        <div className="col-md-12 fs-5 Navbar">
        <nav class="navbar bg-body-tertiary ">
        <div class="container-fluid">
          
          
              <a class="navbar-brand" href="#">
              <img class="logo" src={logo} alt="Logo" width="60" height="60"/>
            </a>
          
          <div class="d-flex">
          <a class="navbar-brand">Contact us</a>
          <a class="navbar-brand">About us</a>
      
          </div>
        </div>
      </nav>
        </div>

       
      </div>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home contract={setContracts} address={setCurrentAddress}/>}/>
        <Route path="/admin" element={<Admin contract={Contract} address={currentAddress}/>}/>
        <Route path="/official" element={<Official/>}/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

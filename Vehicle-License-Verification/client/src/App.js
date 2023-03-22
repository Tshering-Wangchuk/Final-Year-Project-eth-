import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import { Home } from './components/Home';
import Official from './components/Official';
import Error from './components/Error';

function App() {

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  

  const [Contract, setContracts] = useState();
 // console.log(Contract)

  

  return (
    <div className="App">
     <h1>Vehicle License Verification System</h1>
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

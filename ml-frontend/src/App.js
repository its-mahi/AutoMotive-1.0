import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import NumberPlateDetection from "./components/NumberPlateDetection";
import CarCounting from "./components/CarCounting";
import ParkingSpace from "./components/ParkingSpace";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>


      <Router>
      <header>
        <div className='navbar'>
          <div className="nav-wrapper">
            <div className="logo-container">
              <Link to=""><img className="logo" src="logo.png" alt="Logo"/></Link>
            </div>
            <nav>
            

            
              <div className="nav-container">
                <ul className="nav-tabs">
                  <li className="nav-tab"><Link className="text-link" to="/number-plate-detection">Number Plate Detection</Link></li>
                  <li className="nav-tab"><Link className="text-link" to="/count-vehicle">Count Vehicle</Link></li>
                  <li className="nav-tab"><Link className="text-link" to="/parking-space">Parking Space Detection</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/number-plate-detection" element={<NumberPlateDetection />} />
        <Route path="/count-vehicle" element={<CarCounting />} />
        <Route path="/parking-space" element={<ParkingSpace />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

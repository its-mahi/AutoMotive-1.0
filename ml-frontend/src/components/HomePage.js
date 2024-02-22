import React from 'react'
import './HomePage.css'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import NumberPlateDetection from "./NumberPlateDetection";
import CarCounting from "./CarCounting";
import ParkingSpace from "./ParkingSpace";

function HomePage() {
  return (
    // <Router>
      <div>
      <section className="text-center hero">


      <Link className="text-link" to="/number-plate-detection">
        <div className="container">
            <div className="card">
                <h1>Number Plate Detection</h1>
                <p className='card-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, explicabo!</p>
                <p className='card-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsum nemo, at accusantium deleniti esse animi quae atque ipsam eveniet?1</p>
            </div>
        </div>
      </Link>

      <Link className="text-link" to="/count-vehicle">
        <div className="container">
            <div className="card">
                <h1>Counting Vehicles</h1>
                <p className='card-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, explicabo!</p>
                <p className='card-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsum nemo, at accusantium deleniti esse animi quae atque ipsam eveniet?1</p>
            </div>
        </div>
      </Link>

        
      <Link className='text-link' to="/parking-space">
        <div className="container">
            <div className="card">
                <h1>Detect Parking Space</h1>
                <p className='card-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, explicabo!</p>
                <p className='card-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsum nemo, at accusantium deleniti esse animi quae atque ipsam eveniet?1</p>
            </div>
        </div>
        </Link>
        
      </section>
      </div>
  )
}

export default HomePage

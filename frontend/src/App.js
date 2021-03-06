import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Home} from './components/Home';
import {ProductPage} from './components/ProductPage';
import {Profile} from './components/Profile';
import {SignIn} from './components/SignIn';
import {SignUp} from './components/SignUp';
import {UserDashboard} from './components/UserDashboard/UserDashboard';
import { ShipperDashboard } from './components/UserDashboard/ShipperDashboard';
import { ProductProfile } from './components/ProductProfile';
import {Checkout} from './components/Checkout';

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])
  const [token, setToken] = useState()
  const [updateToken, setUpdateToken] = useState()

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  // const fetchVals = () => {
  //   axios.get(`http://${url}:8000/values`).then(
  //     res => {
  //       const values = res.data.data;
  //       console.log(values);
  //       setValues(values)
  //   }).catch(err => {
  //     console.log(err)
  //   });
  // }

  // // handle input form submission to backend via POST request
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let prod = number * number;
  //   axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
  //     console.log(res);
  //     fetchVals();
  //   }).catch(err => {
  //     console.log(err)
  //   });;
  //   setNumber("");
  // }

  // // handle intialization and setup of database table, can reinitialize to wipe db
  // const reset = () => {
  //   axios.post(`http://${url}:8000/reset`).then(res => {
  //     console.log(res);
  //     fetchVals();
  //   }).catch(err => {
  //     console.log(err)
  //   });;
  // }

  // tell app to fetch values from db on first load (if initialized)
  // the comment below silences an error that doesn't matter.=
  useEffect(() => {
    const token = localStorage.getItem('token');;
    setToken(localStorage.token);
    setUpdateToken(token);
  }, [token])

  return (
      <div className="App">
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<SignIn setToken={setToken}/>}/>
            <Route exact path="/SignIn" element={<SignIn setToken={setToken}/>}/>
            <Route exact path="/UserDashboard" element={<UserDashboard token={token}/>}/>
            <Route exact path="/ShipperDashboard" element={<ShipperDashboard token={token}/>}/>
            <Route exact path="/ProductPage" element={<ProductProfile token={token}/>}/>
            <Route exact path="/Profile" element={<Profile token={token}/>}/>
            <Route exact path="/SignUp" element={<SignUp setToken={setToken}/>}/>
            <Route exact path="/Home" element={<Home token={token}/>}/>
            <Route exact path="/Checkout" element={<Checkout token={token}/>}/>
            <Route exact path="/ProductProfile" element={<ProductProfile token={token}/>}/>
          </Routes>
        </div>
      </div>      
  );
}

export default App;

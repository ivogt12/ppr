import './App.css';
import Navbar from "../../components/Navbar/Navbar";

import { useState } from 'react';

//Routes: Will match a set of child routes from the current location(client-side routing)
//Route: renders the element assigned to its element prop when its path prop matches the current URL
//Navigate: changes current location when it is rendered
import { Routes, Route, Navigate } from 'react-router-dom';


//Pages
import Home from "../Home/Home";

import AuthPage from '../AuthPage/AuthPage';

import About from "../About/About";

import List from "../List/List";

import Buy from "../Buy/Buy";

export default function App() {

  //retrieve current user credentials
  const [user, setUser] = useState(null);

  return (
    <main className="App">
     { 
      user ?
      <>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/list" element={<List />} />
        <Route path="/buy" element={<Buy />} />

        <Route path="/*" element={<Navigate to="/home" />} />
      
      </Routes>
      
      </>
      
      :
      
      <>
        <AuthPage></AuthPage>
     
      </>
    }
    </main>
  );
}

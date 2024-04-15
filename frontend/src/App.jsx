import React from "react";
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";

const routes = (
  <Router>
    <Routes>
      <Route path="/home" exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<SignUp/>}/>
      <Route path="/navbar" exact element={<Navbar/>}/>
    </Routes>
  </Router>
)



function App() {
  return (
    <>{routes}</>
  )
}

export default App

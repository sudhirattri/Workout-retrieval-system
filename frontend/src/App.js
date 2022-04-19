import logo from './logo.svg';
import './App.css';
import { data } from "./data/data";
import HomeLayout from './components/HomeLayout';
import React, { Component }  from 'react';
function App() {
  return (
    <div className="App">
      <HomeLayout/>
    </div>
  );
}

export default App;

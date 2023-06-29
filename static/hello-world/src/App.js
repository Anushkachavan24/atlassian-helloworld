import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';
import Integrate from './components/Integrate';



function App() {
  return (
    <>
        <Navbar/>
        <div className="container">
          <Sidemenu/>
          <Integrate/>
        </div>
    </>
  );
}

export default App;

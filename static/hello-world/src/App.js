import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';
import Integrate from './components/Integrate';
import Thirdform from './components/thirdform'
import Page1 from "./components/page1";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlestart = async () => {
    // event.preventDefault()
    const result = await invoke('getStart')
    if (result === 1) {
      setIsSubmitted(true)
    }
  }
  handlestart()

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidemenu />
        {
          // !isSubmitted ? (<Integrate />) : (<Thirdform />)
          !isSubmitted ? (<Integrate />) : (<Page1 />)
          
        }

      </div>
    </>
  );
}

export default App;

import React from 'react'
import { useState } from 'react'
import Firstform from './firstform.js'
import Secondform from './secondform.js'

const Radiobuttons = () => {
  const [selectedOption, setSelectedOption] = useState('')
  return (
    <div>
      <div className='container2'>
        <div>
          <h1>Connect Confluence with Azure AD or Sharepoint</h1>
        </div>
        <div className='options'>
          <div>
            <input
              type="radio"
              value="firstoption"
              checked={selectedOption === 'firstoption'}
              onClick={() => setSelectedOption("firstoption")}
              id='first'
            />Create Azure AD Application
          </div>
          <br />
          <div>
            <input
              type="radio"
              value="secondoption"
              checked={selectedOption === 'secondoption'}
              onClick={() => setSelectedOption("secondoption")}
              id='second'
            />Auto-create Azure AD Application
          </div>

          {selectedOption === 'firstoption' && <Firstform />}

          {selectedOption === "secondoption" && <Secondform />}

        </div>
      </div>
    </div>
  )
}

export default Radiobuttons
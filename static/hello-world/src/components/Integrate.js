import React from 'react'




export default function Integrate() {
    function myfunction1() {
    document.getElementById('firstform').style.display = 'block'
    document.getElementById('firstform').style.visibility = 'visible'
    document.getElementById('second').checked = false
    document.getElementById('secondform').style.display = 'none'
  }

  function myfunction2() {
    document.getElementById('secondform').style.display = 'block'
    document.getElementById('secondform').style.visibility = 'visible'
    document.getElementById('first').checked = false
    document.getElementById('firstform').style.display = 'none'
  }
  return (
    <div><div className='container2'>
    <div>
      <h1>Connect Confluence with Azure AD or Sharepoint</h1>
    </div>
    <div className='options'>
      <div>
        <input type="radio" value="firstoption" id='first' onClick={myfunction1} />Create Azure AD Application
      </div>
      <br />
      <div>
        <input type="radio" value="secondoption" id='second' onClick={myfunction2} />Auto-create Azure AD Application
      </div>
    </div>

    <div id='firstform' className="firstform">
      <form action="#">
        <div id='inputfields' className='inputfields'>
          <div className='field'>
            <input type="text" id="FID" name="FID" placeholder="Application ID (Client ID)" />
          </div>
          <div className='field'>
            <input type="text" id="SID" name="SID" placeholder="Client Secret" />
          </div>
          <div className='field'>
            <input type="text" id="TID" name="TID" placeholder  ="Tenant ID" />
          </div>
          <div>
            <button id='firstbutton' className="button">Proceed</button>
          </div>
        </div>
      </form>
    </div>

    <div id='secondform' className='secondform'>
      <button id='secondbutton' className="button">Login with Azure AD</button>
    </div>

    <div id='thirdform' className='thirdform'>
      <button id='thirdbutton' className="button">Test your connection</button>
    </div>
  </div></div>
  )
}

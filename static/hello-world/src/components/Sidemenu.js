import React from 'react'
import settings from '../images/settings.png';
import embedfiles from '../images/embedfiles.png';
import pr from '../images/pr.png';
import logo from '../images/logo1.png'

export default function Sidemenu() {
  return (
    <div><div className="container1">
      <div className="image">
        <img style={{ alignContent:'center', width: "170px", height: "45px"}} src={logo} alt='logo' />
      </div>

      <div className="info">
        <div className="image">
          <img src={settings} alt='settings' />
        </div>
        <div className="text">
          Integrate Plugin
        </div>
      </div>

      <div className='info'>
        <div className="image">
          <img src={embedfiles} alt='embedfiles' />
        </div>
        <div className="text">
          Embed Documents
        </div>
      </div>

      <div className='info'>
        <div className="image">
          <img src={pr} alt='Preview Documents' />
        </div>
        <div className="text">
          Plugin Resources
        </div>
      </div>

      <div style={{textAlign:'center'}} className='sidemenu-footer'>
        <h5>Sharepoint-Confluence Connect</h5>
        <h5>Support Learn more</h5>
      </div>
    </div>
    </div>
  )
}

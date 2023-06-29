import React from 'react'
import settings from '../images/settings.png';
import embedfiles from '../images/embedfiles.png';
import sync from '../images/sync.png';
import up from '../images/up.png';
import vd from '../images/vd.png';
import pr from '../images/pr.png';

export default function Sidemenu() {
  return (
    <div><div className="container1">
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
        Preview Documents
      </div>
    </div>

    <div className='info'>
      <div className="image">
        <img src={up} alt='Upload' />
      </div>
      <div className="text">
        Upload
      </div>
    </div>

    <div className='info'>
      <div className="image">
        <img src={sync} alt='Sync Media' />
      </div>
      <div className="text">
        Sync Media
      </div>
    </div>

    <div className='info'>
      <div className="image">
        <img src={vd} alt='Upload' />
      </div>
      <div className="text">
        Upload Videos
      </div>
    </div>
    </div>
  </div>
  )
}

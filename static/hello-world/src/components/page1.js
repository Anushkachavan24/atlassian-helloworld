import React, { useState, useEffect } from "react";
import { invoke } from '@forge/bridge';
import Allsites from "./allsites";
import Drive from "./drive";

export default function Page1() {
  const [rootsite, setrootsite] = useState('')
  const [subsites, setSubsites] = useState([])
  const [sites, setSites] = useState(false)
  const [drives, setDrives] = useState([])
  const [lists, setLists] = useState([])
  const [Errormessage, setErrorMessage] = useState('')
  const [info, setInfo] = useState(false)
  const [driveid, setDriveId] = useState('')

  useEffect(() => {
    const getroot = async () => {
      const data = await invoke('getRoot')
      setrootsite(data)
      console.log(data)
    }
    getroot();
  }, []);

  useEffect(() => {
    const getrootdrive = async (siteId) => {
      const data = await invoke('getdrive', { data: siteId })
      console.log(data)
      if (Array.isArray(data)) {
        setDrives(data)
      }
      else {
        setErrorMessage(data)
      }
    }

    const getrootsubsite = async (siteId) => {
      const data = await invoke('getsubsites', { data: siteId })

      if (Array.isArray(data)) {
        setSubsites(data)
        if (data === []) {
          setErrorMessage("No Subsite Found")
        }
      }
      else {
        setErrorMessage(data)
      }
    }

    const getrootlist = async (siteId) => {
      const data = await invoke('getlist', { data: siteId })
      if (Array.isArray(data)) {
        setLists(data)
        if (data === []) {
          setErrorMessage("No Subsite Found")
        }
      }
      else {
        setErrorMessage(data)
      }
    }

    if (rootsite) {
      getrootdrive(rootsite.id.split(',')[1])
      getrootsubsite(rootsite.id.split(',')[1])
      getrootlist(rootsite.id.split(',')[1])
    }
  }, [rootsite])

  const getsite = () => {
    setSites(true)
  }

  const getdriveinfo = async (driveId) => {
    setDriveId(driveId)
    setInfo(true)
  }

  return (
    <div style={{ overflow: 'auto' }}>

      {

        info ? <Drive driveId={driveid} siteId="root" /> :
          sites ? (<Allsites />) :
            (!sites && rootsite) && (
              <div>
                <button onClick={getsite}>All Sites</button>
                <div>
                  <h3>{rootsite.displayName}</h3>
                  <h4>Discription: {rootsite.description}</h4>
                  <h4>Created At: {rootsite.createdDateTime}</h4>
                  <h4>Last Modified At: {rootsite.lastModifiedDateTime}</h4>
                </div>
                <br /><br />
                <div>
                ({subsites === []}) ? (<div>"NO result"</div>):(
                  <h2>Sub-sites</h2>
                  
                  <div style={{ display: 'flex' }}>
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Last Modified At</th>
                      </tr>
                      {subsites.map((subsite) => (

                        <tr>
                          <th>{<button onClick={() => getsite(subsite.id.split(',')[1])} value={subsite.id.split(',')[1]}> {subsite.name}</button>}</th>
                          <th>{subsite.createdDateTime}</th>
                          <th>{subsite.lastModifiedDateTime}</th>
                        </tr>

                        // <button onClick={() => getsite(subsite.id)} value={subsite.id}>{subsite.name}</button>
                      ))}
                    </table>
                  </div>
                  <br />
                </div>
                )
                <br /><br />
                <div>
                  <h2>Drives</h2>
                  <div style={{ display: 'flex' }}>
                    <table class="styled-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Created At</th>
                          <th>Last Modified At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drives.map((drive) => (

                          <tr>
                            <th>{<button onClick={() => getdriveinfo(drive.id)} value={drive.id}> {drive.name}</button>}</th>
                            <th>{drive.createdDateTime}</th>
                            <th>{drive.lastModifiedDateTime}</th>
                          </tr>

                          // <button onClick={() => getsite(drive.id)} value={drive.id}>{drive.name}</button>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <br />
                </div>
                <div>
                  <h2>Lists</h2>
                  <div style={{ display: 'flex' }}>
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Last Modified At</th>
                      </tr>
                      {lists.map((list) => (
                        <tr>
                          <th>{<button onClick={() => getsite(list.id)} value={list.id}> {list.name}</button>}</th>
                          <th>{list.createdDateTime}</th>
                          <th>{list.lastModifiedDateTime}</th>
                        </tr>
                        // <button onClick={() => getsite(list.id)} value={list.id}>{list.name}</button>
                      ))}
                    </table>
                  </div>
                  <br />
                </div>
              </div>

            )
      }
      {Errormessage &&
        <div>
          <div class="message error">
            <div class="text">{Errormessage}</div>
          </div>
        </div>
      }
    </div>
  )
}
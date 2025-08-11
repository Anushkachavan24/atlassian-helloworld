import React, { useState, useEffect } from "react";
import { invoke } from '@forge/bridge';
import Allsites from "./allsites";
import Drive from "./drive";
import '../App.css'

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
    <div >
      {
        info ? <Drive driveId={driveid} siteId="root" /> :
          sites ? (<Allsites />) :
            (!sites && rootsite) ? (
              <div style={{ marginTop: "10px", height: '435px', overflow: 'scroll' }}>
                <button className="button-allsites" onClick={getsite}>All Sites</button>
                <div className="siteinfo">
                  <h3>{rootsite.displayName}</h3>
                  <h5>Discription: {rootsite.description}</h5>
                  <h5>Created At: {rootsite.createdDateTime}</h5>
                  <h5>Last Modified At: {rootsite.lastModifiedDateTime}</h5>
                </div>
                <br /><br />
                <div>
                  <h2>Sub-sites</h2>
                  {subsites.length === 0 ? <div>No subsites</div> :
                    <>
                      <div style={{ display: 'flex' }}>
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Last Modified At</th>
                          </tr>
                          {subsites.map((subsite) => (
                            <tr>
                              <th>{<button className="clickbutton" onClick={() => getsite(subsite.id.split(',')[1])} value={subsite.id.split(',')[1]}> {subsite.name}</button>}</th>
                              <th><h5>{subsite.createdDateTime}</h5></th>
                              <th>{subsite.lastModifiedDateTime}</th>
                            </tr>
                          ))}
                        </table>
                      </div>
                      <br />
                    </>
                  }
                </div>
                <br /><br />
                <div>
                  <h2>Drives</h2>
                  {drives.length === 0 ? <div>No drives</div> : <>
                    <div style={{ display: 'flex' }}>
                      <table className="styled-table">
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
                              <th>{<button className="clickbutton" onClick={() => getdriveinfo(drive.id)} value={drive.id}> {drive.name}</button>}</th>
                              <th><h5>{drive.createdDateTime}</h5></th>
                              <th>{drive.lastModifiedDateTime}</th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>}
                  <br />
                </div>
                <div>
                  <h2>Lists</h2>
                  {lists.length === 0 ? <div>No lists</div> : <>
                    <div style={{ display: 'flex' }}>
                      <table className="styled-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Last Modified At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((list) => (
                            <tr>
                              <th>{<button className="clickbutton" onClick={() => getsite(list.id)} value={list.id}> {list.name}</button>}</th>
                              <th><h5>{list.createdDateTime}</h5></th>
                              <th>{list.lastModifiedDateTime}</th>
                            </tr>
                            // <button onClick={() => getsite(list.id)} value={list.id}>{list.name}</button>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>}
                  <br />
                </div>
              </div>

            ) : (Errormessage &&
              <div>
                <div class="message error">
                  <div class="text">{Errormessage}</div>
                </div>
              </div>
            )
      }

    </div>
  )
}
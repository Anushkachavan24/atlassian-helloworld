import React from "react";
import { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import Allsites from "./allsites";
import Drive from "./drive";
import List from "./list"
import '../App.css'

const Site = ({ siteId }) => {
    const [drives, setDrives] = useState([])
    const [sites, setSites] = useState(false)
    const [site, setSite] = useState([])
    const [driveinfo, setdriveInfo] = useState(false)
    const [listinfo, setlistInfo] = useState(false)
    const [subsites, setSubsites] = useState([])
    const [lists, setLists] = useState([])
    const [Errormessage, setErrorMessage] = useState('')
    const [driveid, setDriveId] = useState('')
    const [listid, setListId] = useState('')

    useEffect(() => {
        const getsiteinfo = async () => {
            const data = await invoke('getSiteById', { data: siteId })
            setSite(data)
        }

        const getsubsite = async () => {
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

        const getdrive = async () => {
            const data = await invoke('getdrive', { data: siteId })
            if (Array.isArray(data)) {
                setDrives(data)
                if (data === []) {
                    setErrorMessage("No Subsite Found")
                }
            }
            else {
                setErrorMessage(data)
            }
        }

        const getlist = async () => {
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
        getsiteinfo()
        getsubsite()
        getdrive()
        getlist()

    }, [])

    const getsite = () => {
        setSites(true)
    }

    const getdriveinfo = async (driveId) => {
        setDriveId(driveId)
        setdriveInfo(true)
    }

    const getlistinfo = async (listId) => {
        setListId(listId)
        setlistInfo(true)
    }

    return (
        <div style={{ overflow: 'auto' }}>
            {
                driveinfo ? <Drive driveId={driveid} siteId={site.id} /> :
                    listinfo ? <List listId={listid} siteId={site.id} /> :
                        sites ? (<Allsites />) :
                            site && (
                                <div style={{ marginTop: "10px", height: '435px', overflow: 'scroll' }}>
                                    <button className="button-allsites" onClick={getsite}>All Sites</button>
                                    <div className="siteinfo">
                                        <h3>{site.displayName}</h3>
                                        <h5>Discription: {site.description}</h5>
                                        <h5>Created At: {site.createdDateTime}</h5>
                                        <h5>Last Modified At: {site.lastModifiedDateTime}</h5>
                                    </div>
                                    <br /><br />
                                    <div>
                                        <h2>Sub-sites</h2>
                                        {subsites.length === 0 ? <div>No subsites</div> : <>
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
                                                        {subsites.map((subsite) => (

                                                            <tr>
                                                                <th>{<button className="clickbutton" onClick={() => getsite(subsite.id.split(',')[1])} value={subsite.id.split(',')[1]}> {subsite.name}</button>}</th>
                                                                <th>{subsite.createdDateTime}</th>
                                                                <th>{subsite.lastModifiedDateTime}</th>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>}
                                        <br />
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
                                                                <th>{drive.createdDateTime}</th>
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
                                                                <th>{<button className="clickbutton" onClick={() => getlistinfo(list.id)} value={list.id}> {list.name}</button>}</th>
                                                                <th>{list.createdDateTime}</th>
                                                                <th>{list.lastModifiedDateTime}</th>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>}
                                        <br />
                                    </div>
                                </div>
                            )
            }
        </div>
    )
}

export default Site
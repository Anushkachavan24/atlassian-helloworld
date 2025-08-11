import React from "react";
import { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import Site from './site'
import '../App.css'

const Allsites = () => {
    const [showsites, setShowsites] = useState([])
    const [info, setInfo] = useState(false)
    const [siteid, setsiteid] = useState('')

    useEffect(() => {
        const getSites = async () => {
            const data = await invoke('getSites')
            if (Array.isArray(data)) {
                setShowsites(data)
            }
        }
        getSites()
    }, [])
    
    const getsite = async (siteinfo) => {
        const siteId = siteinfo.id.split(',')[1]
        console.log(siteId)
        setsiteid(siteId)
        setInfo(true)

    }
    return (
        <div>
            {
                info ? <Site siteId={siteid} /> : 
                <div style={{ marginTop: "10px", height: '435px', overflow: 'scroll', display: 'flex'}} >
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Last Modified At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showsites.map((site) => (
                            <tr>
                                <th>{<button className="clickbutton" onClick={() => getsite(site)} value={site.id.split(',')[1]}> {site.name}</button>}</th>
                                <th>{site.createdDateTime}</th>
                                <th>{site.lastModifiedDateTime}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>

    )
}

export default Allsites
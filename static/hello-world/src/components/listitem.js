import React, { useEffect } from "react";
import { useState } from 'react';
import { invoke } from '@forge/bridge';
import folder from '../images/folder.png';
import Item from "./item";
import Page1 from "./page1";
import Site from "./site";
import List from "./list"


const Listitem = ({ itemid, listid, siteid }) => {
    const [iteminfo, setItemInfo] = useState([])
    // const [info, setInfo] = useState(false)
    // const [items, setitems] = useState('')
    const [column, setcolumn] = useState('')
    const [back, setback] = useState(false)

    useEffect(() => {
        const getinfo = async () => {
            const data = await invoke('getlistById', { id: itemid, listid: listid, siteid: siteid })
            const columndata = await invoke('getcolumnname', {listid: listid, siteid: siteid})
            setcolumn(columndata)
            setItemInfo(data)
            
            
            console.log(columndata[0])
        }
        getinfo()
    }, [])

    // const getitems = async (item) => {
    //     console.log(item)
    //     setitems(item)
    //     setInfo(true)
    // }

    const handleGoBack = () => {
        setback(true)
    }

    return (
        <div>
            {
                // info ? (<Listitem parentid="list" itemId={items.id} driveid={items.parentReference.driveId} parent="list" />) :
                // (siteId === "root" && back) ? (<Page1 />) :
                //     (back && siteId !== "root") ? (<List listId={listId} siteId={siteId} />) :

                < div >
                    <button onClick={handleGoBack}>Go Back</button>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Last Modified At</th>
                        </tr>
                        <tr>
                            <th>{column.name}</th>
                            <th>{iteminfo.lastModifiedDateTime}</th> 
                        </tr>
                    </table>
                </div>

            }
        </div >
    )
}

export default Listitem
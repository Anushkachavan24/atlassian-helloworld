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
    const [info, setInfo] = useState('')
    // const [items, setitems] = useState('')
    const [column, setcolumn] = useState([])
    const [back, setback] = useState(false)
    let column1 = []

    useEffect(() => {
        const getinfo = async () => {
            const data = await invoke('getlistById', { id: itemid, listid: listid, siteid: siteid })
            const columndata = await invoke('getcolumnname', { listid: listid, siteid: siteid })
            setcolumn(columndata)
            setItemInfo(data)
            for (let i = 0; i < columndata.length; i++) {
                column1.push(columndata[i])
            }
            console.log(column1)
            console.log(columndata)
            setInfo(data.fields)
            console.log(data.fields)
        }
        getinfo()
    }, [])

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
                    <button className="button-allsites" onClick={handleGoBack}>Go Back</button>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Last Modified At</th>
                        </tr>
                        {/* {column1[0]} */}
                        {/* {column1[0].name} */}

                        {column.map((columninfo) => (
                            <tr>
                                <p key={columninfo.id}>{columninfo.displayName}</p>
                            </tr>
                        ))}
                        {/* {column} */}
                        {info.map((i) => (
                            <tr>
                            <p key={i}>{i}</p>
                        </tr>
                        ))}
                    </table>
                    <p>{info.Title}</p>
                </div>

            }
        </div >
    )
}

export default Listitem
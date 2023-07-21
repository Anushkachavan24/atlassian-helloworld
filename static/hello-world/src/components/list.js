import React, { useEffect } from "react";
import { useState } from 'react';
import { invoke } from '@forge/bridge';
import folder from '../images/folder.png';
import Item from "./item";
import Page1 from "./page1";
import Site from "./site";
import Listitem from "./listitem";

const List = ({ listId, siteId }) => {
    const [listinfo, setListInfo] = useState([])
    const [info, setInfo] = useState(false)
    const [items, setitems] = useState('')
    const [back, setback] = useState(false)

    useEffect(() => {
        const getinfo = async () => {
            const data = await invoke('getlistinfo', { id: listId, siteid: siteId })
            setListInfo(data)
            console.log(data)
        }
        getinfo()
    }, [])

    const getitems = async (item) => {
        console.log(item.id )
        console.log(item.parentReference.id)
        console.log(item.parentReference.siteId)

        setitems(item)
        setInfo(true)
    }

    const handleGoBack = () => {
        setback(true)
    }

    return (
        <div>
            {
                info ? (<Listitem itemid={items.id} listid= {listId} siteid={items.parentReference.siteId.split(',')[1]}/>) :
            
                    (siteId === "root" && back) ? (<Page1 />) :
                        (back && siteId !== "root") ? (<Site siteId={siteId} />) :
                            (
                                < div >
                                    <button onClick={handleGoBack}>Go Back</button>
                                    <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created At</th>
                                            <th>Last Modified At</th>
                                        </tr>
                                        {listinfo.map((list) => (
                                            (<tr>
                                                <th>{<button onClick={() => getitems(list)} value={list.id}> {list.id}</button>}</th>
                                                <th>{list.createdDateTime}</th>
                                                <th>{list.lastModifiedDateTime}</th>
                                            </tr>)
                                        ))}
                                    </table>
                                </div>
                            )
            }
        </div >
    )
}

export default List
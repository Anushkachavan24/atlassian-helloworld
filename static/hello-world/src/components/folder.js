import React from "react";
import { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import '../App.css'
import Item from "./item";
import folder from '../images/folder.png';
import png from '../images/png.png'
import xlsx from '../images/xlsx.png'
import mp4 from '../images/mp4.png'
import download from '../images/download.png'
import pdf from '../images/pdf.png'
import word from '../images/word.png'
import txt from '../images/txt.png'
import mp3 from '../images/mp3.png'
import vsd from '../images/vsd.png'
import ppt from '../images/ppt.png'

const Folder = ({ parentid, itemId, driveId }) => {
    const [iteminfo, setItemInfo] = useState([])
    const [info, setInfo] = useState(false)
    const [items, setitems] = useState('')
    const [back, setback] = useState(false)

    useEffect(() => {
        const getinfo = async () => {
            const data = await invoke('getiteminfo', { id: itemId, driveId: driveId })
            setItemInfo(data)
            console.log(data)
        }
        getinfo()
    }, [])


    const getitems = async (itemId) => {
        setitems(itemId)
        setInfo(true)
    }

    const downloadfile = async (downloadurl) => {
        const link = document.createElement('a');
        link.href = downloadurl;
        link.download = true; // Set the 'download' attribute to download the file directly
        link.click();
    }

    const handleGoBack = () => {
        setback(true)
    }
    return (
        <div>
            {
                info ? (<Item parentid={itemId} itemId={items.id} driveid={items.parentReference.driveId} parent="folder" />) :
                    back ? (<Item parentid={iteminfo[0].parentReference.driveId} itemId={parentid} driveid={iteminfo[0].parentReference.driveId} parent="folder" />) :
                        (
                            <div>
                                <button className="button-allsites" onClick={handleGoBack}>Go Back</button>
                                <table className="styled-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created At</th>
                                            <th>Last Modified At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {iteminfo.map((item) => (
                                            (item['@microsoft.graph.downloadUrl']) ?
                                                (<tr>
                                                    <th>{
                                                        item.name.split('.')[1] === ("png" || "jpg" || "jpeg" || "bmp" || "svg" || "tiff" || "webp") ?
                                                            (<img style={{ width: "35px", height: "35px" }} src={png} alt="image" />) :
                                                            item.name.split('.')[1] === "mp4" ?
                                                                (<img style={{ width: "35px", height: "35px" }} src={mp4} alt="image" />) :
                                                                item.name.split('.')[1] === ("xlsx" || "xls" || "xlsm" || "csv" || "xltm" || "xltx" || "xlsb") ?
                                                                    (<img style={{ width: "35px", height: "35px" }} src={xlsx} alt="image" />) :
                                                                    item.name.split('.')[1] === "docx" ?
                                                                        (<img style={{ width: "35px", height: "35px" }} src={word} alt="image" />) :
                                                                        item.name.split('.')[1] === "pdf" ?
                                                                            (<img style={{ width: "35px", height: "35px" }} src={pdf} alt="image" />) :
                                                                            item.name.split('.')[1] === "txt" ?
                                                                                (<img style={{ width: "35px", height: "35px" }} src={txt} alt="image" />) :
                                                                                item.name.split('.')[1] === ("ppt" || "pptx" || "pps" || "ppsx" || "pot" || "potx" || "pptm" || "ppsm") ?
                                                                                    (<img style={{ width: "35px", height: "35px" }} src={ppt} alt="image" />) :
                                                                                    item.name.split('.')[1] === "vsdx" ?
                                                                                        (<img style={{ width: "35px", height: "35px" }} src={vsd} alt="image" />) :
                                                                                        item.name.split('.')[1] === "mp3" ?
                                                                                            (<img style={{ width: "35px", height: "35px" }} src={mp3} alt="image" />) :
                                                                                            null
                                                    }
                                                    </th>
                                                    <th>{item.name}</th>
                                                    <th>{item.createdDateTime}</th>
                                                    <th>{item.lastModifiedDateTime}</th>
                                                    <th><div onClick={() => downloadfile(drive['@microsoft.graph.downloadUrl'])}>
                                                        <img style={{ width: "35px", height: "35px" }} src={download} alt="download" />
                                                    </div></th>
                                                </tr>)
                                                :
                                                (<tr>
                                                    <th><img style={{ width: "35px", height: "35px" }} src={folder} alt='folder' /></th>
                                                    <th>{<button className="clickbutton" onClick={() => getitems(item)} value={item.id}> {item.name}</button>}</th>
                                                    <th>{item.createdDateTime}</th>
                                                    <th>{item.lastModifiedDateTime}</th>
                                                </tr>)
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
            }

        </div>
    )
}

export default Folder
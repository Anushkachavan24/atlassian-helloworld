import React, { useEffect } from "react";
import { useState } from 'react';
import { invoke } from '@forge/bridge';
import folder from '../images/folder.png';
import png from '../images/png.png'
import xlsx from '../images/xlsx.png'
import mp4 from '../images/mp4.png'
import pdf from '../images/pdf.png'
import word from '../images/word.png'
import txt from '../images/txt.png'
import mp3 from '../images/mp3.png'
import vsd from '../images/vsd.png'
import ppt from '../images/ppt.png'
import download from '../images/download.png'
import Item from "./item";
import Page1 from "./page1";
import Site from "./site";


const Drive = ({ driveId, siteId }) => {
    const [driveinfo, setDriveInfo] = useState([])
    const [info, setInfo] = useState(false)
    const [items, setitems] = useState('')
    const [back, setback] = useState(false)

    useEffect(() => {
        const getinfo = async () => {
            const data = await invoke('getdriveinfo', { data: driveId })
            setDriveInfo(data)
            console.log(data)

        }
        getinfo()
    }, [])


    const getitems = async (item) => {
        console.log(item)
        setitems(item)
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
                info ? (<Item parentid="drive" itemId={items.id} driveid={items.parentReference.driveId} parent="drive" />) :
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
                                        {driveinfo.map((drive) => (

                                            (drive['@microsoft.graph.downloadUrl']) ?
                                                (<tr>
                                                    <th>{
                                                        drive.name.split('.')[1] === ("png" || "jpg" || "jpeg" || "bmp" || "svg" || "tiff" || "webp") ?
                                                            (<img style={{ width: "35px", height: "35px" }} src={png} alt="image" />) :
                                                            drive.name.split('.')[1] === "mp4" ?
                                                                (<img style={{ width: "35px", height: "35px" }} src={mp4} alt="image" />) :
                                                                drive.name.split('.')[1] === ("xlsx" || "xls" || "xlsm" || "csv" || "xltm" || "xltx" || "xlsb") ?
                                                                    (<img style={{ width: "35px", height: "35px" }} src={xlsx} alt="image" />) :
                                                                    drive.name.split('.')[1] === "docx" ?
                                                                        (<img style={{ width: "35px", height: "35px" }} src={word} alt="image" />) :
                                                                        drive.name.split('.')[1] === "pdf" ?
                                                                            (<img style={{ width: "35px", height: "35px" }} src={pdf} alt="image" />) :
                                                                            drive.name.split('.')[1] === "txt" ?
                                                                                (<img style={{ width: "35px", height: "35px" }} src={txt} alt="image" />) :
                                                                                drive.name.split('.')[1] === ("ppt" || "pptx" || "pps" || "ppsx" || "pot" || "potx" || "pptm" || "ppsm") ?
                                                                                    (<img style={{ width: "35px", height: "35px" }} src={ppt} alt="image" />) :
                                                                                    drive.name.split('.')[1] === "vsdx" ?
                                                                                        (<img style={{ width: "35px", height: "35px" }} src={vsd} alt="image" />) :
                                                                                        drive.name.split('.')[1] === "mp3" ?
                                                                                            (<img style={{ width: "35px", height: "35px" }} src={mp3} alt="image" />) :
                                                                                            null
                                                    }
                                                    </th>
                                                    <th>{drive.name}</th>
                                                    <th>{drive.createdDateTime}</th>
                                                    <th>{drive.lastModifiedDateTime}</th>
                                                    <th><div onClick={() => downloadfile(drive['@microsoft.graph.downloadUrl'])}>
                                                        <img style={{ width: "35px", height: "35px" }} src={download} alt="download" />
                                                    </div></th>
                                                </tr>)
                                                :
                                                (<tr>
                                                    <th><img style={{ width: "35px", height: "35px" }} src={folder} alt='folder' /></th>
                                                    <th>{<button onClick={() => getitems(drive)} value={drive.id}> {drive.name}</button>}</th>
                                                    <th>{drive.createdDateTime}</th>
                                                    <th>{drive.lastModifiedDateTime}</th>
                                                </tr>)
                                        ))}
                                    </table>
                                </div>
                            )
            }

        </div >
    )
}

export default Drive
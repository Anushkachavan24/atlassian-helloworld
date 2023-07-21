import React from "react";
import { useState } from 'react';
import { invoke } from '@forge/bridge';
import Thirdform from './thirdform'

export default function Firstform() {
    const [inputs, setInputs] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const credentials = JSON.stringify(inputs)
            console.log(credentials)
            console.log("dfbvjdfkudgvkubvkjdfsbvdufsikbgj")
            const data = await invoke('getCredentials', { data: credentials })
            console.log(data)
            setIsSubmitted(true)
        }
        catch (error) {
            console.log("Error sending data to backend", error)
        }
        // alert(JSON.stringify(inputs))
    }

    return (
        <div>
        {
            !isSubmitted ? (
                <div id='firstform' className="firstform">
                    <form onSubmit={handleSubmit}>
                        <div id='inputfields' className='inputfields'>
                            <div className='field'>
                                <input
                                    type="text"
                                    id="FID"
                                    name="FID"
                                    value={inputs.FID || ""}
                                    placeholder="Application ID (Client ID)"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='field'>
                                <input
                                    type="text"
                                    id="SID"
                                    name="SID"
                                    value={inputs.SID || ""}
                                    placeholder="Client Secret"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='field'>
                                <input
                                    type="text"
                                    id="TID"
                                    name="TID"
                                    value={inputs.TID || ""}
                                    placeholder="Tenant ID"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button type='submit' id='firstbutton' className="button">Proceed</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <Thirdform />
            )
        }
        </div>
    )
}
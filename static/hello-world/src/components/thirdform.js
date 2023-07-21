import React, { useState } from "react";
import { invoke } from '@forge/bridge';
import checked from '../images/checked.png';
import cancel from '../images/cancel.png';
import Page1 from "./page1";

export default function Thirdform() {
    const [Successmessage, setSuccessMessage] = useState('')
    const [Errormessage, setErrorMessage] = useState('')
    const [isVisible, setIsVisible] = useState('')
    const [issuccess, setSuccess] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = await invoke('getToken')
        if (data === "Sucessfully Connected!") {
            setSuccessMessage("Sucessfully Connected!")
            setIsVisible(true)
            setSuccess(false)
            setTimeout(() => {
                setIsVisible(false)
                setSuccess(true)
            }, 5000)

        }
        else {
            setErrorMessage(data)
        }
    }

    return (
        <div>

            {!issuccess &&
                <form onSubmit={handleSubmit}>
                    <div id='thirdform' className='thirdform'>
                        <button type="submit" id='thirdbutton' className="button">Test your connection</button>
                    </div>
                </form>
            }

            {isVisible &&
                <div class="message">
                    <div class="message success">
                        <img src={checked} alt="Checkmark" />
                        <div class="text">{Successmessage}</div>
                    </div>
                </div>
            }
            {Errormessage &&
                <div>
                    <div class="message error">
                        <img src={cancel} alt="Cancel" />
                        <div class="text">{Errormessage}</div>
                    </div>
                </div>
            }
            {issuccess &&
                (<Page1 />)
            }
        </div>
    )
}

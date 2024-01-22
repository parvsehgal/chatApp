import axios from 'axios'
import React, { useState } from 'react'
import { sendMessage } from "../utils/api.js"
export default function ChatInput({ contact, changeChat, chat, currUser }) {

  const [message, setMessagwe] = useState('')

  const sendMess = async () => {
    console.log("from", currUser)
    console.log("to", chat)
    const response = await axios.post(sendMessage, {
      message: message,
      to: chat._id,
      from: currUser._id,
    })
    console.log(response)
  }

  return (
    <div className='messageBox'>
      <span>
        <input placeholder='enter message' onChange={(event) => setMessagwe(event.target.value)} /> <button onClick={sendMess}> Send Message</button>
      </span>
    </div>
  )
}

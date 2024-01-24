import axios from 'axios'
import React, { useState } from 'react'
import { sendMessage } from "../utils/api.js"
import { getMessages } from "../utils/api"
export default function ChatInput({ contact, changeChat, chat, currUser, socket, setMessages }) {

  const [message, setMessagwe] = useState('')
  const getAllMessages = async () => {
    const response = await axios.post(getMessages, {
      from: currUser._id,
      to: chat._id
    })
    setMessages(response.data)
  }

  const sendMess = async () => {
    const response = await axios.post(sendMessage, {
      message: message,
      to: chat._id,
      from: currUser._id,
    })
    socket.emit("message-sent", getAllMessages)
  }

  return (
    <div className='messageBox'>
      <span>
        <input placeholder='enter message' onChange={(event) => setMessagwe(event.target.value)} /> <button onClick={sendMess}> Send Message</button>
      </span>
    </div>
  )
}

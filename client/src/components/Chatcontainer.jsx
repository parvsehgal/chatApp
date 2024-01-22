import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getMessages } from "../utils/api.js"
import "../css/contacts.css"
export default function Chatcontainer({ contacts, changeChat, chat, currUser }) {
  const [messages, setMessages] = useState([])

  const getAllMessages = async () => {
    const response = await axios.post(getMessages, {
      from: currUser._id,
      to: chat._id
    })
    console.log(response)
    setMessages(response.data)
  }
  useEffect(() => {
    getAllMessages()
  }, [chat])

  const toDis = messages.map((data) => {
    return (
      <div className={"aMessage" + (data.fromSelf ? 'sender' : 'reciever')}>{data.message}</div>
    )
  })
  return (
    <div>
      <div className='chatBox'>
        {toDis}
      </div>
    </div>
  )
}

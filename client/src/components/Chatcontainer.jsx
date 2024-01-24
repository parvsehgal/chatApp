import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getMessages } from "../utils/api.js"
import "../css/contacts.css"

export default function Chatcontainer({ chat, currUser, socket, messages, setMessages }) {
  const getAllMessages = async () => {
    const response = await axios.post(getMessages, {
      from: currUser._id,
      to: chat._id
    })
    setMessages(response.data)
  }
  useEffect(() => {
    socket.on("message-recieved", (data) => {
      console.log("message recieved inside socket")
      getAllMessages();
    })
  }, [socket])

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

import axios from "axios";
import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";

import { contactsApi } from "../utils/api";
export default function Chat() {

  const navigator = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [chat, setChat] = useState(undefined)
  const [contacts, setContacts] = useState([])

  const getUsers = async () => {
    const response = await axios.post(contactsApi, currUser);
    setContacts(response.data.users)
  }
  function changeChat(data) {
    console.log("changing chat")
    setChat(data);
  }

  useEffect(() => {
    const isUser = localStorage.getItem("currUser");
    if (!isUser) {
      navigator("/register");
    }
    setCurrUser(JSON.parse(localStorage.getItem("currUser")))
  }, [])

  useEffect(() => {
    //api call that will give all users except the currentUser
    getUsers();
  }, [currUser])

  return (
    <div>
      <div>
        <div className="">
          this is the chat page
        </div>
        <Contacts contacts={contacts} changeChat={changeChat} chat={chat} currUser={currUser}></Contacts> </div>
    </div>
  )
}

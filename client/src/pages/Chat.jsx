import axios from "axios";
import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";

import { contactsApi } from "../utils/api";
export default function Chat() {

  const navigator = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  useEffect(() => {
    const isUser = localStorage.getItem("currUser");
    if (!isUser) {
      navigator("/register");
    }
    setCurrUser(JSON.parse(localStorage.getItem("currUser")))
  }, [])

  useEffect(() => {
    //api call
    const response = axios.get(`${contactsApi}`);
    console.log(response.data)
  }, [currUser])

  return (
    <div>
      <div>
        this is the chat page
      </div>
    </div>
  )
}

import { io } from "socket.io-client";
import "../css/contacts.css";
import Chatcontainer from "./Chatcontainer";
import ChatInput from "./ChatInput";
import { useState } from "react";

import { useNavigate } from "react-router-dom"

const Contacts = ({ contacts, changeChat, chat, currUser }) => {
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()
  const socket = io.connect("http://localhost:4000");
  const online = (data) => {
    changeChat(data);
  }

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login")
  }

  const toDis = contacts.map((data) => {
    return (
      <div className="item" onClick={() => online(data)}>
        {data.name}
      </div>
    );
  });
  return (
    <div>
      Select person to chat with
      <div className="chatPage">
        <div className="contacts">{toDis}</div>
        <div className="side">
          {chat ? (
            <div>
              <span>
                <div>in chat with {chat.name}</div>
                <button onClick={logoutHandler}>LOGOUT</button>
              </span>
              <Chatcontainer contacts={contacts} changeChat={changeChat} chat={chat} currUser={currUser} socket={socket} messages={messages} setMessages={setMessages} ></Chatcontainer>
              <ChatInput contacts={contacts} changeChat={changeChat} chat={chat} currUser={currUser} socket={socket} setMessages={setMessages}></ChatInput>
            </div>
          ) : (
            <div>welcome to chat page</div>
          )}
        </div>
      </div>
    </div >
  );
};
export default Contacts;

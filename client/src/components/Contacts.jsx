import "../css/contacts.css";
import Chatcontainer from "./Chatcontainer";
import ChatInput from "./ChatInput";

const Contacts = ({ contacts, changeChat, chat, currUser }) => {
  const toDis = contacts.map((data) => {
    return (
      <div className="item" onClick={() => changeChat(data)}>
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
              <div>in chat with {chat.name}</div>
              <Chatcontainer contacts={contacts} changeChat={changeChat} chat={chat} currUser={currUser}></Chatcontainer>
              <ChatInput contacts={contacts} changeChat={changeChat} chat={chat} currUser={currUser}></ChatInput>
            </div>
          ) : (
            <div>welcome to chat page</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contacts;

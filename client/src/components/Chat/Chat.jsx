import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import { useStateProvider } from "@/context/StateContext";

function Chat() {
  const [{messagesSearch}] = useStateProvider()
  return( <div className={`${messagesSearch && "hidden md:block"} w-screen md:w-full border-conversation-border border-l bg-conversation-panel-background flex flex-col h-[100vh] z-10`}>
    <ChatHeader/>
    <ChatContainer />
    <MessageBar/>
  </div>)
}

export default Chat;

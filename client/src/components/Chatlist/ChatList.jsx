import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import { useState, useEffect } from "react";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{contactsPage, currentChatUser}] = useStateProvider()
  const [pageType, setPageType] = useState("default")

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts")
    } else {
      setPageType("default")
    }
  }, [contactsPage])
  

  return <div className={`md:flex ${currentChatUser && "hidden"} w-screen md:w-full bg-panel-header-background flex-col max-h-screen z-20`}>
    {pageType === "default" && 
    <>
      <ChatListHeader/>
      <SearchBar/>
      <List/>
    </>}
    {pageType === "all-contacts" && <ContactsList /> }
  </div>;
}

export default ChatList;

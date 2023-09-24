import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatListItem from "./ChatLIstItem";
import Empty from "../Empty";
import Image from "next/image";

function List() {
  const [{userInfo, userContacts, filteredContacts, contactSearch}, dispatch] = useStateProvider()

  useEffect(() => {
    const getContacts = async () => {
      try {
          const {data: {users, onlineUsers}} = await axios.get(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`)
          dispatch({type: reducerCases.SET_USER_CONTACTS, userContacts: users})
          dispatch({type: reducerCases.SET_ONLINE_USERS, onlineUsers})
      } catch (error) {
        console.log(error)
      }
    }
    if(userInfo?.id) getContacts() 
  }, [userInfo])
  
  return <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
    {
    userContacts.length === 0 ? <div className="flex md:hidden w-full bg-panel-header-background flex-col h-[70vh]  items-center justify-center">
    <Image src="/whatsapp.gif" alt="radiant" height={150} width={150} />
    <p className="text-icon-green text-[28px] font-bold mt-10">RADIANT</p>
    <p className="text-white text-[17px] mt-10">Go to chats and connect to your friends</p>
  </div>
    
    :contactSearch && filteredContacts && filteredContacts.length > 0 ? filteredContacts.map(contact => (
      <ChatListItem data={contact} key={contact.id} />
    ))
    : contactSearch && filteredContacts && filteredContacts.length === 0 
    ? <div className="w-full h-[50vh] flex items-center justify-center"><span className="text-secondary"> No Contacts with that </span></div>
    
    :userContacts.map(contact => (
      <ChatListItem data={contact} key={contact.id} />
    ))
  }
  </div>;
}

export default List;

import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchContacts, setSearchContacts] = useState([])

  const [{userInfo}, dispatch] = useStateProvider()

  useEffect(() => {
    if(searchTerm.length) {
      const filteredData = {}
      Object.keys(allContacts).forEach(key => {
        filteredData[key] = allContacts[key].filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      })
      setSearchContacts(filteredData)
    } else {
      setSearchContacts(allContacts)
    }
  }, [searchTerm])
  

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {data: {users}} = await axios.get(GET_ALL_CONTACTS)
        setAllContacts(users)
        setSearchContacts(users)
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])
  
  return <div className="h-full flex flex-col">
    <div className="h-16 flex items-end px-3 py-4">
      <div className="flex items-center gap-12 text-white">
        <BiArrowBack onClick={() => dispatch({type: reducerCases.SET_ALL_CONTACTS_PAGE})} className="cursor-pointer text-xl" />
        <span>New Chat</span>
      </div>
    </div>
    
    <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar ">
      <div className="flex py-3 items-center gap-3 h-14">
        <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
          <div>
            <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
          </div>
          <div>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search or start a new chat" className="bg-transparent text-sm focus:outline-none text-white w-full" />
          </div>
        </div>
      </div>
      {Object.entries(searchContacts).map(([initialLetter, userList]) => userList.length ? (
          <div key={Date.now() + initialLetter}>
            <div className={`${userList.length === 1 && userList[0].id === userInfo.id && "hidden"} text-teal-light pl-10 pt-5`}>{initialLetter}</div>
            {userList.map(contact => {
              if(contact?.id !== userInfo?.id) 
              return (<ChatListItem data={contact} isContactPage={true} key={contact.id} />)
            })}
            </div>    
        ) : <></>
      )}
    </div>

  </div>;
}

export default ContactsList;

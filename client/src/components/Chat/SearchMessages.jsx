import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function SearchMessages() {
  const [{currentChatUser, messages}, dispatch] = useStateProvider()
  const [searchTerm, setSearchTerm] = useState("")
  const [searcherMessages, setSearcherMessages] = useState([])

  useEffect(() => {
    if(searchTerm) {
      setSearcherMessages(messages.filter(message => message.type == "text" && message.message.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setSearcherMessages([])
    }
  }, [searchTerm])
  

  return <div className="w-screen md:w-full border-conversation-border border-1 bg-conversation-panel-background flex flex-col z-10 max-h-screen">
    <div className="h-16 px-4 py-5 flex gap-10 items-center bg-panel-header-background text-primary-strong">
      <IoClose onClick={() => dispatch({type: reducerCases.SET_MESSAGE_SEARCH})} className="cursor-pointer text-icon-lighter text-2xl" />
      <span>Search Messages</span>
    </div>
    <div className="overflow-auto custom-scrollbar h-full">
      <div className="flex items-center flex-col w-full">
        <div className="flex px-5 items-center gap-3 h-14 w-full">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
            <div>
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search Messages" className="bg-transparent text-sm focus:outline-none text-white w-full py-[8px]" />
            </div>
          </div>
        </div>
        <span className="mt-5 text-secondary">
          {!searchTerm.length && `Search for messages with ${currentChatUser.name}`}
        </span>
      </div>
      <div className="flex justify-center h-full flex-col">
        {searchTerm.length > 0 && !searcherMessages.length && <span className="text-secondary w-full flex justify-center">No messages found</span>}
        <div className="flex flex-col w-full h-full">
          {searcherMessages.map((message, i) => <div key={i} className="hover:bg-background-default-hover w-full px-5 border-t-[0.1px] border-secondary py-2">
            <div className="text-sm text-secondary text-[12px] md:text-[14px]">{calculateTime(message.createdAt)}</div>
            <div className="text-white ">
            {message.message.split(new RegExp(`(${searchTerm})`, 'i')).map((part, index) =>
              part.toLowerCase() === searchTerm.toLowerCase() 
              ? (<span key={index} className="text-green-400">{part}</span>) : (part))}
            </div>
          </div>)}
        </div>
      </div>
    </div>
  </div>;
}

export default SearchMessages;

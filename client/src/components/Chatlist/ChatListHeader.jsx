import { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
import { useRouter } from "next/router";

function ChatListHeader() {
  const router = useRouter()
  const [{userInfo}, dispatch] = useStateProvider()
  const [contextMenuCordinates, setContextMenuCordinates] = useState({x:0, y:0})
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)

  const contextMenuOptions = [
    {name: "Logout", callback: async () => {
      setIsContextMenuVisible(false)
      router.push("/logout")
    }}]

  const showContextMenu = (e) => {
    e.preventDefault()
    setContextMenuCordinates({x: e.pageX, y: e.pageY})
    setIsContextMenuVisible(true)
  }

  const handleAllContactsPage = () => {
    dispatch({type: reducerCases.SET_ALL_CONTACTS_PAGE})
  }

  return <div className="h-16 px-4 py-3 flex justify-between items-center">
    <div className="cursor-pointer">
      <Avatar type="sm" image={userInfo?.profileImage} />
    </div>
    <span className="text-white">RADIANT</span>
    <div className="flex gap-6">
      <BsFillChatLeftTextFill title="New Chat" onClick={handleAllContactsPage} className="text-panel-header-icon cursor-pointer text-xl" />
      <BsThreeDotsVertical onClick={(e) => showContextMenu(e)} id="context-opener" title="Menu" className="hidden md:block text-panel-header-icon cursor-pointer text-xl" />
      <FiLogOut onClick={() => router.push("/logout")} id="context-opener" title="Menu" className="block md:hidden text-panel-header-icon cursor-pointer text-xl" />
      {isContextMenuVisible && <ContextMenu options={contextMenuOptions} cordinates={contextMenuCordinates} contextMenu={isContextMenuVisible} setContextMenu={setIsContextMenuVisible} />}
    </div>
  </div>;
}

export default ChatListHeader;

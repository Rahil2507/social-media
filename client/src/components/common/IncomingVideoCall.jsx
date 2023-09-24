import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";

function IncomingVideoCall() {
  const [{incomingVideoCall, socket}, dispatch] = useStateProvider()

  const acceptCall = () => {
    dispatch({type: reducerCases.SET_VIDEO_CALL, videoCall: {...incomingVideoCall, type: "in-coming"}})
    socket.current.emit("accept-incoming-call", {id: incomingVideoCall.id})
    dispatch({type: reducerCases.SET_INCOMING_VIDEO_CALL, incomingVideoCall: undefined})
  }
  
  const rejectCall = () => {
    socket.current.emit("reject-video-call", {from: incomingVideoCall.id})
    dispatch({type: reducerCases.END_CALL})
  }

  return <div className="flex-col md:flex-row h-full md:h-24 w-full md:w-80 absolute md:fixed md:bottom-8 mb-0 md:right-6 z-50 rounded-sm flex gap-5 items-center justify-center md:justify-start p-4 bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-14">
    <div className="mb-10 md:mb-0">
      <Image className="block md:hidden" src={incomingVideoCall.profilePicture} alt="avatar" width={150} height={150} />
      <Image className="hidden md:block" src={incomingVideoCall.profilePicture} alt="avatar" width={70} height={70} />
    </div>
    <div className="flex flex-col md:block items-center">
      <div className="text-[35px] md:text-[18px]">{incomingVideoCall.name}</div>
      <div className="text-lg font-thin md:font-normal md:text-xs">Incoming Video Call</div>
      <div className="flex gap-2 mt-5 md:mt-2">
        <button onClick={rejectCall} className="bg-red-500 p-1 min-w-[100px] md:min-w-0 px-3 text-lg md:text-sm rounded-full">Reject</button>
        <button onClick={acceptCall} className="bg-green-500 p-1 min-w-[100px] md:min-w-0 px-3 text-lg md:text-sm rounded-full">Accept</button>
      </div>
    </div>
  </div>
}

export default IncomingVideoCall;

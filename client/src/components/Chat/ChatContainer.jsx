import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useRef, useEffect } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), {ssr: false})

function ChatContainer () {
  const chatContainerRef = useRef(null);
  const [{messages, currentChatUser, userInfo}] = useStateProvider()
  const divRef = useRef()

  return  <div ref={chatContainerRef} className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar flex flex-col-reverse max-h-[100%]">
    <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="ml-2 mr-[3px] my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, i) => (
              <div key={i} className={`flex ${message.senderId===currentChatUser.id? "justify-start" : "justify-end"} overflow-hidden`}>
                {message.type === "text" && (
                  <div ref={divRef} className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end  max-w-[100%] md:max-w-[45%] ${message.senderId===currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"}`}>
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span  className="text-bubble-meta">
                        {message.senderId === userInfo.id && <MessageStatus messageStatus={message.messageStatus} />}
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && <ImageMessage message={message} />}
                {message.type === "audio" && <VoiceMessage message={message} />}
              </div>
            ))}
          </div>
        </div>  
      </div>
  </div>;
}

export default ChatContainer;

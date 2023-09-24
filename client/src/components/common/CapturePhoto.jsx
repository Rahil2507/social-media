import React, { useEffect } from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5"

function CapturePhoto({setImage, hidePhotoLibrary}) {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      videoRef.current.srcObject = stream
    }
    startCamera()
    return () => {
      stream?.getTracks().forEach(track => track.stop())
    }
    }, [])

  

  const capturePhoto = () => {
    const canvas = document.createElement("canvas")
    canvas.getContext('2d').drawImage(videoRef.current,0,0,300,150)
    setImage(canvas.toDataURL("imag/jpeg"))
    hidePhotoLibrary(false)
  }

  return <div className="absolute h-4/6 w-screen md:w-2/6 top-1/4 left-0 md:left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <div onClick={() => hidePhotoLibrary(false)} className="pt-2 pr-2 cursor-pointer flex items-end justify-end">
        <IoClose className="h-10 w-10" />
      </div>
      <div className="flex justify-center">
        <video id="video" width="400" autoPlay ref={videoRef} ></video>
      </div>
      <button onClick={capturePhoto} className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"></button>
    </div>
  </div>
}

export default CapturePhoto;

import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5"

function PhotoLibrary({setImage, hidePhotoLibrary}) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ]

  return <div className="fixed top-10 md:top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center">
    <div className="h-man-w-max bg-gray-900 gap-6 rounded-lg p-4">
      <div onClick={() => hidePhotoLibrary(false)} className="pt-2 pe-2 cursor-pointer flex items-end justify-end">
        <IoClose className="h-10 w-10" />
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-10 md:gap-16 p-5 py-5 md:p-16">
        {images.map((image, i) => (
          <div key={i} onClick={() => {setImage(images[i]), hidePhotoLibrary(false)}}>
            <div className="h-20 w-20 md:h-24 md:w-24 cursor-pointer relative">
              <Image src={image} fill alt="avatar" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default PhotoLibrary;

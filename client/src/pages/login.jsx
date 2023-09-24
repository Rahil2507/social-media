import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc'
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useEffect } from "react";

function login() {
  const router = useRouter()
  const [{userInfo, newUser}, dispatch] = useStateProvider()

  useEffect(() => {
    if(!newUser && userInfo?.id) router.push("/")
  }, [userInfo, newUser])
  

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    const { user: {displayName: name, email, photoURL: profileImage} } = await signInWithPopup(firebaseAuth, provider)
    try {
      if (email) {
      const {data} = await axios.post(CHECK_USER_ROUTE, {email})
      

      if(!data.status) {
        await dispatch({type: reducerCases.SET_NEW_USER, newUser: true})
        await dispatch({type: reducerCases.SET_USER_INFO, userInfo: {name, email, profileImage, status: ""}})
        router.push("/onboarding")
      }else {
        const { id, name, email, profilePicture: profileImage, status } = data.data
        await dispatch({type: reducerCases.SET_USER_INFO, userInfo: { id, name, email, profileImage, status }})
        router.push("/")
      }
      }
    } catch (err) {
        console.log(err)
      }
  }

  return (
  <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-white">
      <Image src='/whatsapp.gif' height={300} width={300} alt="radiant" className="hidden md:block" />
      <Image src='/whatsapp.gif' height={200} width={200} alt="radiant" className="block md:hidden" />
      <span className="text-4xl md:text-7xl">Radiant</span>
    </div>
    <button onClick={handleLogin} className="flex items-center justify-center bg-search-input-container-background p-5 rounded-lg">
      <FcGoogle className="text-2xl md:text-4xl"/>
      <span className="text-white text-sm md:text-2xl ml-2">Login with google</span>
    </button>
  </div>
  )
}

export default login;

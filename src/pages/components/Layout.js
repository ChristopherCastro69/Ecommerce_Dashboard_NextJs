
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"

export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session){
    return (
      <div className={'bg-slate-800 w-screen h-screen flex items-center'}>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')}  className="bg-white p-2 px-4 rounded-lg text-black">Login with Google</button>
        </div>
         </div>
      )
  }

  // Logged In


  return (
    <div className="bg-slate-800 min-h-screen flex">
      <Nav/>
      <div className="bg-neutral-900 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4 " >
            {children}
      </div>
    </div>

  )
}

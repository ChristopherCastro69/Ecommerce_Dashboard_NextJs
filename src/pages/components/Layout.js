import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({ children }) {
  const { data: session } = useSession();

  const handleGoogleSignIn = async () => {
    // Sign in with Google
    await signIn('google', { callbackUrl: window.location.href });
  };

  const handleLogout = async () => {
    // Sign out
    await signOut();
  };

  if (!session) {
    return (
      <div className={'bg-slate-800 w-screen h-screen flex items-center'}>
        <div className="text-center w-full">
          <button onClick={handleGoogleSignIn} className="bg-white p-2 px-4 rounded-lg text-black">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  // Logged In

  return (
    <div className="bg-slate-800 min-h-screen flex">
      <Nav/>
      <div className="bg-neutral-900 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4 " >
        {children}
        {/* <button onClick={handleLogout} className="bg-white p-2 px-4 rounded-lg text-black">
          Logout
        </button> */}
      </div>
    </div>
  );
}

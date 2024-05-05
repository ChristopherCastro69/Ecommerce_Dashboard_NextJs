import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const handleGoogleSignIn = async () => {
    // Sign in with Google
    await signIn("google", { callbackUrl: window.location.href });
  };

  const handleLogout = async () => {
    // Sign out
    await signOut();
  };

  if (!session) {
    return (
      <div className={"bg-slate-800 w-screen h-screen flex items-center"}>
        <div className="text-center w-full">
          <button
            onClick={handleGoogleSignIn}
            className="bg-white p-2 px-4 rounded-lg text-black"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  // Logged In

  return (
    <div className="min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      <div className="bg-slate-800 min-h-screen flex">
        <Nav show={showNav} />
        <div className="bg-neutral-900 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4 ">
          {children}
        </div>
      </div>
    </div>
  );
}

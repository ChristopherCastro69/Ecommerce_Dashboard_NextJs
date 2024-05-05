import Layout from "@/pages/components/Layout";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <div className="flex bg-zinc-800 gap-1 rounded-lg overflow-hidden">
          <Image src={session?.user?.image} alt="" className="w-8 h-8 " />
          <span className="py-1 px-2">{session?.user?.email}</span>
        </div>
      </div>
    </Layout>
  );
}

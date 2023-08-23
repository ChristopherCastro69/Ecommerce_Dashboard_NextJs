import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ['topitops123@gmail.com']

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  //Active Connection
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      session: ({session, token, user}) => {
        if(adminEmails.includes(session?.user?.email) ){
          return session;
        }
        else{
          return false;
        }
        
      },
    }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res){
    const session = await getServerSession(req, res, authOptions);
    if(!adminEmails.includes(session?.user?.email)){
      throw 'not admin'
    }
}

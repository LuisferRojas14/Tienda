import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database";

declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@correo.com'},
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña'},
      },
      async authorize(credentials) {
 
        console.log({credentials});
        
 
        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )
      }
    }),
 
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
   
 
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
 
  // Callbacks
 
  callbacks: {
    async jwt({ token, account, user }){
      
      
 
      if( account ){ 
        token.accessToken = account.access_token;
 
        switch (account.type) {
          case 'oauth':
            // crear o verificar si existe en mi DB
             token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;
          
          case 'credentials':
            token.user = user;
            
          break;
        }
      }      
 
      return token;
    },
    async session({ session, token, user }){
 
      
 
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
 
      return session;
    }
  }
})
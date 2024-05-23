 
import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { vtoService } from "~/services/VTOService";
import { getCookie, getCookies, setCookie } from 'cookies-next';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: '384556277769914',
      clientSecret: '48085181bb1ed725a2ed0bb777adcc27',
    }),
    GoogleProvider({
      clientId:
        '633328077550-eskhjvlrk2rm77q4nnql0f6hvvcoo8m1.apps.googleusercontent.com',
      clientSecret: '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',
      secret: '78zFZvyspgAIBXPKdA0AhFqcNWXX16/CEmBFOHU3iOg=',

      callbacks: {
        async signIn({ account, profile }) {
          
          if (account.provider === 'google') {
            

            return (
              profile.email_verified && profile.email.endsWith('@example.com')
            )
          }
          
          return true // Do different verification for other providers that don't have `email_verified`
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      
      
      
      return true
    },
    async redirect({ url, baseUrl }) {
      
    
      return '/business-app?from=' + url
    },
    async session({ session, user, token }) {
      
  
      let accessToken = null;

      
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      
      

     

      return token
    },
  },
}
export default NextAuth(authOptions)

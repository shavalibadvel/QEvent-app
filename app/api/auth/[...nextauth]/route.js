import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
console.log("GITHUB_ID:", process.env.GITHUB_ID);
console.log("SECRET set?:", !!process.env.NEXTAUTH_SECRET);
const handler = NextAuth({
    
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
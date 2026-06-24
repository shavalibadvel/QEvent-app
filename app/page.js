import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Next-auth Demo</h1>
      {session ? (
        <div className="space-y-4 text-center">
          <p>Welcome, {session.user.name}!</p>
          <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </Link>
        </div>
      ) : (
        <Link href="/api/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In with GitHub
        </Link>
      )}
    </div>
  )
}


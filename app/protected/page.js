import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function ProtectedPage() {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/protected")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Protected Page</h1>
      <p className="mb-4">This page is protected and can only be accessed by authenticated users.</p>
      <p className="mb-8">Welcome, {session.user.name}!</p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </Link>
    </div>
  )
}

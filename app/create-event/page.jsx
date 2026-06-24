"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/events");
    }
  }, [session, status, router]);

  if (status === "loading")
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  if (!session) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Create Event
      </h1>
      <p className="text-lg">
        Welcome, {session.user?.name}! Build your event form here.
      </p>
    </div>
  );
}
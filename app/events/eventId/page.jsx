"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Tag from "@/components/Tag";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://qevent-backend.labs.crio.do/events/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center mt-10 text-xl">Loading event...</p>;
  if (!event || event.error)
    return <p className="text-center mt-10 text-xl">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        className="w-full max-h-[400px] object-cover rounded-md shadow-lg mb-6"
        src={event.image}
        alt={event.name}
      />

      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {event.name}
      </h1>
      <p className="text-lg mt-1">{event.location}</p>
      <p className="text-md text-slate-600">{event.artist}</p>

      <div className="flex gap-2 items-center flex-wrap my-4">
        {event.tags?.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>

      <p className="leading-relaxed text-justify text-slate-700 my-6">
        {event.description}
      </p>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
          {event.price > 0 ? `$ ${event.price.toLocaleString()}` : "FREE"}
        </h2>
        <button className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:opacity-70">
          Buy Tickets
        </button>
      </div>
    </div>
  );
}
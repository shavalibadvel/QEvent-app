"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesArtist = artist ? event.artist === artist : true;
    const matchesTag = tag ? event.tags?.includes(tag) : true;
    return matchesArtist && matchesTag;
  });

  if (loading) return <p className="text-center mt-10 text-xl">Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {artist ? `Events by ${artist}` : tag ? `${tag} Events` : "All Events"}
      </h1>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-xl">No events found.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function EventsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-xl">Loading...</p>}>
      <EventsList />
    </Suspense>
  );
}
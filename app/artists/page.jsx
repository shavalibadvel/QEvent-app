"use client";

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/artists");
        const data = await res.json();
        setArtists(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading artists...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Artists
      </h1>
      <div className="flex flex-wrap justify-center">
        {artists.map((artist, index) => (
          <ArtistCard key={`${artist.name}-${index}`} artistData={artist} />
        ))}
      </div>
    </div>
  );
}
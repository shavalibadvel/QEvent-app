"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/tags");
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading tags...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
        Tags
      </h1>
      <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
        {tags.map((tag) => (
          <Tag text={tag.name} key={tag.id} clickable={true} />
        ))}
      </div>
    </div>
  );
}
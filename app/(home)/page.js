"use client";

import dynamic from "next/dynamic";
import EventCard from "@/components/EventCard";
import React from "react";
import { dummyEvents } from "@/constants/dummyEvents";

// Load Swiper only on the client — never during server/static build and hydration, to avoid issues with Swiper's window/document usage fgijKJ
const SwiperComponent = dynamic(
  () => import("@/components/SwiperComponent"),
  { ssr: false }
);

function App() {
  return (
    <div className="h-full">
      <SwiperComponent />

      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
        Explore Events
      </h1>

      <div className="flex items-center justify-around mt-8 mb-32 flex-wrap">
        {dummyEvents.map((eventData) => (
          <EventCard eventData={eventData} key={eventData.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
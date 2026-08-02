"use client";

import { useMemo } from "react";

const InfiniteScroll = () => {
  const text = "Insurance, that financially secure you and your family round the clock... Find the best insurance policies for your needs and save money!";
  const words = useMemo(() => text.split(" "), []);

  return (
    <div className="relative overflow-hidden w-full bg-gradient-to-b from-gray-400 to-gray-300 py-2 rounded-lg">
      <div className="flex whitespace-nowrap group">
        {/* Duplicate content for infinite effect */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 animate-scroll group-hover:[animation-play-state:paused]"
          >
            {words.map((word, idx) => (
              <span
                key={idx}
                className="mx-2 text-lg font-medium text-white"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;

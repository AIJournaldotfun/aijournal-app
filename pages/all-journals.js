import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as THREE from "three"; // Required for Vanta.NET
import NET from "vanta/dist/vanta.net.min"; // Vanta.NET for animated background
import fs from "fs";
import path from "path";

export default function AllJournals({ entries }) {
  const router = useRouter();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null); // Reference for the background container

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current, // Attach animation to the referenced container
          THREE: THREE, // Required THREE.js instance
          backgroundColor: 0xffffff, // White background
          color: 0x000000, // Black lines
          color2: 0xcccccc, // Gray nodes
          points: 10.0, // Number of points in the net
          maxDistance: 20.0, // Maximum distance for connections
          spacing: 15.0, // Distance between grid points
          showDots: true, // Show glowing dots
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Cleanup on unmount
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef} // Attach the ref to the parent container
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-inter text-gray-900"
    >
      {/* Social Media Buttons */}
      <div className="absolute top-4 right-8 flex space-x-4">
        <a
          href="https://x.com/AIJournaldotfun"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 shadow transition-transform transform hover:scale-110"
          aria-label="Follow us on Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-blue-500"
          >
            <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775a4.92 4.92 0 0 0 2.163-2.725c-.951.555-2.005.959-3.127 1.184a4.902 4.902 0 0 0-8.337 4.47C7.69 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.66 2.475c0 1.708.869 3.216 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.83-.413.111-.849.171-1.296.171-.316 0-.624-.031-.927-.089.631 1.953 2.445 3.376 4.604 3.417a9.868 9.868 0 0 1-6.102 2.104c-.395 0-.779-.023-1.161-.067a13.936 13.936 0 0 0 7.548 2.213c9.056 0 14.004-7.514 14.004-14.004 0-.213-.005-.425-.014-.636.962-.695 1.796-1.56 2.457-2.548l-.047-.02z" />
          </svg>
        </a>
        <a
          href="https://github.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 shadow transition-transform transform hover:scale-110"
          aria-label="Visit our GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-800"
          >
            <path d="M12 0C5.371 0 0 5.371 0 12c0 5.301 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577 0-.285-.01-1.042-.016-2.046-3.338.725-4.042-1.612-4.042-1.612-.546-1.387-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.832 2.805 1.303 3.492.996.108-.775.418-1.303.762-1.603-2.666-.303-5.467-1.334-5.467-5.933 0-1.311.469-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.654 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.222 0 4.61-2.807 5.625-5.479 5.921.429.369.813 1.096.813 2.209 0 1.594-.014 2.877-.014 3.268 0 .32.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.629-5.371-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* Explanation Card on the Left */}
      <div className="absolute top-20 left-8 max-w-md bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">What Each Entry Means:</h2>
        <p className="text-gray-700">
          Each entry displayed here represents an individual response generated
          by the O1 Pro model. These responses were logged during its
          self-analysis and study to better understand its behavior, strengths,
          limitations, and create improvements in the process.
        </p>
      </div>

      {/* Content Section */}
      <div className="absolute top-20 right-4 bg-gray-100 p-8 rounded-lg shadow-lg w-[70%] h-[80vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Journal Entries - Updates every 5 minutes</h2>
        <div className="h-full overflow-y-auto space-y-6">
          {entries.length === 0 ? (
            <p className="text-gray-700">No journal entries available.</p>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry.id || index}
                className="bg-gray-200 text-gray-900 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Entry #{index + 1}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.response}</p>
                <p className="mt-4 text-sm text-gray-500">
                  <strong>Timestamp:</strong> {entry.timestamp || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// Fetch data from cache.json file
export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), "cache.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(fileContents);

    const entries = Object.keys(parsedData).map((key) => ({
      id: key,
      ...parsedData[key],
    }));

    return {
      props: {
        entries: entries || [],
      },
    };
  } catch (error) {
    console.error("Error loading cache:", error);

    return {
      props: {
        entries: [],
      },
    };
  }
}

"use client";

import { useRouter } from "next/navigation";

export const ChannelBox = ({ integration }: { integration: any }) => {
  const router = useRouter();

  return (
    <div
      key={integration.link}
      className={`p-6 rounded-lg shadow-lg transform transition-transform ${
        integration.link === "tg"
          ? "bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer"
          : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50"
      }`}
      aria-disabled={integration.link !== "tg"}
      onClick={() => router.push(`/channels/${integration.link}`)}
    >
      <img
        src={integration.imageUrl}
        alt={integration.title}
        className="h-16 mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
        {integration.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
        {integration.description}
      </p>
    </div>
  );
};

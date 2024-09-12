<<<<<<< HEAD
"use client";
import { Nav } from "@/components/nav";
import { useCheckauthQuery } from "@/store/api/authApi";
=======
import { Nav } from "@/components/nav";
>>>>>>> b6d8b87 (first commit)
import Image from "next/image";

export default function Home() {
  const { data } = useCheckauthQuery(null);
  console.log(data);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
<<<<<<< HEAD
      here
=======
     here
>>>>>>> b6d8b87 (first commit)
    </div>
  );
}

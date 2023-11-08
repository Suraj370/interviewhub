
import React  from "react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return(
    <main className="flex h-screen flex-col gap-4 justify-center items-center   ">
      <h1 className="text-center text-3xl font-bold ">Ace your Interview </h1>
      <div className="text-center mx-auto max-w-xl text-2xl text-slate-400">
        <p>Don&apos;t miss out on the great opportunity. Try our AI powered mock interview </p>
      </div>
      <div className="text-center text-xl">
        <Link href = "/session">
          <div className="px-5 py-2.5 font-semibold text-white capitalize  bg-gradient-to-br from-purple-300 to-rose-600  rounded">
            Say hello
          </div>
        </Link>
      </div>
    
    </main>
  )
}

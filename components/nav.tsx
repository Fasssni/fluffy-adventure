'use client'

import Link from 'next/link'

export function Nav() {
  return (
    <nav className="w-screen flex justify-center items-center py-4">
      <div className="space-x-4">
        <Link href="/login" className="text-black hover:underline">Login</Link>
        <Link href="/signup" className="text-black  hover:underline">Sign Up</Link>
        <Link href="/dashboard" className="text-black  hover:underline">Dashboard</Link>
      </div>
    </nav>
  )
}
"use client";

import Link from "next/link";
import { Fragment } from "react";
import SideBar from "./sidebar";
import { useCheckauthQuery } from "@/store/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { createPortal } from "react-dom";

export function Nav() {
  const isAuthorized = useAuth();
  const { isLoading } = useCheckauthQuery(undefined, {
    skip: isAuthorized,
  });
  if (isLoading) {
    return createPortal(<Spinner />, document.body);
  }
  if (!isAuthorized)
    return (
      <nav className="w-screen flex justify-center items-center py-4">
        <div className="space-x-4">
          <Fragment>
            <Link href="/login" className="text-black hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-black  hover:underline">
              Sign Up
            </Link>
          </Fragment>
        </div>
      </nav>
    );

  return <SideBar />;
}
const Spinner = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900  z-50">
    <div className="flex flex-col items-center">
      <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-400 rounded-full animate-spin"></div>
      <p className="text-white mt-4 font-semibold">Loading...</p>
    </div>
    <style jsx>{`
      .spinner {
        border-color: rgba(255, 255, 255, 0.3);
        border-top-color: #3498db; /* Customize your accent color */
      }
    `}</style>
  </div>
);

"use client";

import Link from "next/link";
import { Fragment } from "react";
import SideBar from "./sidebar";
import { useCheckauthQuery } from "@/store/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "./ui/spinner";

export function Nav() {
  const isAuthorized = useAuth();
  const { isLoading } = useCheckauthQuery(undefined, {
    skip: isAuthorized,
  });
  if (isLoading) {
    return <Loader />;
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
const Loader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900  z-50">
    <Spinner />
  </div>
);

"use client";

import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { Fragment } from "react";
import SideBar from "./sidebar";

export function Nav() {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  console.log(isAuthorized);
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

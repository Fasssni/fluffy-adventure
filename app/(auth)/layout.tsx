import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"w-full justify-center items-center"}>
      {children}
    </div>
  );
}
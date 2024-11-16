"use client";

import { signOut } from "next-auth/react";


export default function SignOutButton() {
  return (
    <>
      <h3 style={{ cursor: "pointer" }} onClick={() => signOut()}>
        Logout
      </h3>
    </>
  );
}

"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function OnboardUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          address: "", // You can take this from a form if needed
          phone: "",
          role: "customer",
        }),
      });
    }
  }, [isSignedIn, user]);

  return null;
}

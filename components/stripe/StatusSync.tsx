"use client";

import { useEffect } from "react";

export default function StripeStatusSync() {
  useEffect(() => {
    async function sync() {
      const status = await fetch("/api/stripe/status").then((r) => r.json());
      alert('something')

      if (status.onboarded) {
        alert('true')
        await fetch("/api/stripe/complete", { method: "POST" });
      }
    }

    sync();
  }, []);

  return null;
}

export async function startStripeOnboarding() {
  const response = await fetch("/api/stripe/connect", { method: "POST" });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Failed to start Stripe onboarding.");
  }

  const { url } = await response.json();

  return url as string;
}

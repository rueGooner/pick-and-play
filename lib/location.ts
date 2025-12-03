export async function lookupPostcode(postcode: string) {
  if (!postcode) throw new Error("Postcode is required");

  const cleaned = postcode.replace(/\s+/g, "").toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_POSTCODE_LOOKUP}${cleaned}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.error || "Invalid postcode");
  }

  return {
    lat: data.result.latitude,
    lng: data.result.longitude,
    postcode: data.result.postcode,
  };
}

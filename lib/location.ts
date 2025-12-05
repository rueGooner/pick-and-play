import { VenueResponseItem } from "@/types/venues.type";
import { supabaseClient } from "./supabase/client";

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

export async function findNearbyVenues(
  postcode: string,
  distanceMiles?: number,
  limit?: number
): Promise<VenueResponseItem[]> {
  const supabase = supabaseClient();

  const coords = await lookupPostcode(postcode);
  if (!coords) throw new Error("Invalid postcode");

  const { data, error } = await supabase.rpc("venues_within_distance", {
    input_lat: coords.lat,
    input_lng: coords.lng,
    max_distance_miles: distanceMiles ?? 10,
    limit_count: limit ?? 5,
  });

  if (error) throw error;
  return data;
}

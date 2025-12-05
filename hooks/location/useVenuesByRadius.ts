"use client";

import { findNearbyVenues } from "@/lib/location";
import { useQuery } from "@tanstack/react-query";

export function useVenuesByRadius(postcode: string) {
  return useQuery({
    queryKey: ["venues", postcode],
    queryFn: async () => {
      const result = await findNearbyVenues(postcode);
      return result;
    },
  });
}

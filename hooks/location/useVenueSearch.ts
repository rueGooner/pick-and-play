"use client";

import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export function useVenueSearch(query: string) {
  const supabase = supabaseClient();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    let active = true;
    setLoading(true);

    const fetch = async () => {
      const { data } = await supabase
        .from("venues")
        .select("*")
        .ilike("venue_name", `%${query}%`)
        .limit(10);

      if (active) {
        setResults(data ?? []);
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetch, 300);
    return () => {
      active = false;
      clearTimeout(debounce);
    };
  }, [query]);

  return { results, loading };
}

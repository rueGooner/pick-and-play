import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse";
import fetch from "node-fetch";
import { stringify } from "csv-stringify/sync";
import { Venue, PostcodesIoResponse } from "@/types/venues.type";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIG
const INPUT_CSV = path.join(__dirname, "venues.csv");
const OUTPUT_CSV = path.join(__dirname, "venue-output.csv");

//
// Types
//

function hasEmptyFields(venue: Venue): boolean {
  return Object.values(venue).some(
    (v) => v === "" || v === null || v === undefined
  );
}

//
// STEP 1 — Parse CSV into JSON array
//
async function csvToJson(filePath: string): Promise<Venue[]> {
  const fileContent = fs.readFileSync(filePath, "utf8");

  return new Promise((resolve, reject) => {
    parse(
      fileContent,
      { columns: true, trim: true, skip_empty_lines: true },
      (err, records) => (err ? reject(err) : resolve(records as Venue[]))
    );
  });
}

//
// CLEANUP — Safely remove club name from start of address_line
//
function cleanStreetArea(name: string, address_line: string): string {
  if (!address_line) return "";

  const lowerStreet = address_line.toLowerCase();
  const lowerName = name.toLowerCase();

  // ONLY remove if the street begins with the club name
  if (lowerStreet.startsWith(lowerName)) {
    const cleaned = address_line.slice(name.length).trim();
    return cleaned.replace(/^[-,.\s]+/, ""); // remove leftover punctuation
  }

  return address_line; // leave untouched otherwise
}

//
// STEP 2 — Geocode a single postcode
//
async function geocodePostcode(postcode: string) {
  const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(
    postcode
  )}`;

  try {
    const res = await fetch(url);
    const json = (await res.json()) as PostcodesIoResponse;

    if (json.status === 200 && json.result) {
      return {
        postcode,
        lat: json.result.latitude,
        lng: json.result.longitude,
      };
    }
  } catch (err) {
    console.error("Error geocoding", postcode, err);
  }

  return { postcode, lat: null, lng: null };
}

//
// MAIN PIPELINE
//
async function main() {
  console.log("STEP 1: Parsing CSV…");

  let venues = await csvToJson(INPUT_CSV);

  console.log(`Parsed ${venues.length} rows`);

  //
  // CLEANUP — Fix address_line before doing anything else
  //
  venues = venues.map((v) => ({
    ...v,
    address_line: cleanStreetArea(v.venue_name, v.address_line),
  }));

  //
  // STEP 2: Extract unique postcodes
  //
  console.log("STEP 2: Extracting unique postcodes…");

  const uniquePostcodes = Array.from(
    new Set(venues.map((v) => v.postcode.trim()))
  );

  console.log(`Found ${uniquePostcodes.length} unique postcodes`);

  //
  // STEP 3: Geocode unique postcodes
  //
  console.log("STEP 3: Geocoding postcodes…");

  const postcodeLookup: Record<
    string,
    { lat: number | null; lng: number | null }
  > = {};

  for (let i = 0; i < uniquePostcodes.length; i++) {
    const pc = uniquePostcodes[i];
    const geo = await geocodePostcode(pc);

    postcodeLookup[pc] = { lat: geo.lat, lng: geo.lng };

    if (i % 50 === 0) {
      console.log(`Geocoded ${i}/${uniquePostcodes.length}`);
    }

    await new Promise((r) => setTimeout(r, 50)); // polite delay
  }

  console.log("Geocoding complete!");

  //
  // STEP 4: Merge lat/lng back into venues
  //
  console.log("STEP 4: Merging coordinates…");

  const enrichedVenues = venues.map((v) => {
    const pc = v.postcode.trim();
    const { lat, lng } = postcodeLookup[pc] || { lat: null, lng: null };

    return {
      ...v,
      lat,
      lng,
    };
  });

  //
  // STEP 5: Write final CSV
  //
  console.log("STEP 5: Writing output CSV…");

  const filteredVenues = enrichedVenues.filter((v) => !hasEmptyFields(v));

  const csv = stringify(filteredVenues, {
    header: true,
    columns: ["venue_name", "address_line", "town", "postcode", "lat", "lng"],
  });

  fs.writeFileSync(OUTPUT_CSV, csv);

  console.log("Done!");
  console.log("Output saved →", OUTPUT_CSV);
}

main();

export type Venue = {
  venue_name: string;
  address_line: string;
  town: string;
  postcode: string;
  lat?: number | null;
  lng?: number | null;
};

export type PostcodesIoResponse = {
  status: number;
  result: {
    postcode: string;
    latitude: number;
    longitude: number;
  } | null;
};

export type VenueResponseItem = {
  id: string;
} & Venue;

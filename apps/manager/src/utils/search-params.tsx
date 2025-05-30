import { createLoader, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  q: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

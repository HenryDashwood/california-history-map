// GeoJSON format for expedition routes
// Easy to edit at geojson.io - just copy the coordinates array and paste back here

export interface ExpeditionGeoJSON {
  name: string;
  leader: string;
  startYear: number;
  endYear: number;
  type: "land" | "sea" | "mixed";
  description: string;
  color: string;
  // GeoJSON LineString coordinates: [[lng, lat], [lng, lat], ...]
  coordinates: number[][];
}

export const expeditionsGeoJSON: ExpeditionGeoJSON[] = [
  {
    name: "Sacred Expedition (Portolá-Serra)",
    leader: "Gaspar de Portolá & Junípero Serra",
    startYear: 1769,
    endYear: 1770,
    type: "land",
    description:
      "First Spanish land expedition into Alta California, establishing the mission system",
    color: "#8B4513",
    // Paste this coordinates array into geojson.io as a LineString to edit
    coordinates: [
      [-115.9, 30.9], // Velicatá, Baja California
      [-117.1611, 32.7157], // San Diego
      [-117.4, 33.2], // San Luis Rey area
      [-117.7, 33.6], // San Juan Capistrano area
      [-117.9, 33.8], // Mission San Gabriel site
      [-118.25, 34.05], // Los Angeles area
      [-119.15, 34.27], // Ventura area
      [-119.7, 34.4], // Santa Barbara
      [-120.1, 34.6], // Gaviota area
      [-120.4, 34.9], // Santa Maria Valley
      [-120.7, 35.3], // San Luis Obispo
      [-120.8, 35.6], // Paso Robles
      [-121.3, 36.3], // Soledad area
      [-121.9256, 36.5397], // Monterey/Carmel
      [-121.8, 36.75], // Salinas Valley
      [-121.75, 36.9], // Pajaro Valley
      [-122.0, 37.0], // Santa Cruz Mountains
      [-122.1, 37.2], // Inland route
      [-122.2, 37.4], // Sweeney Ridge (SF Bay discovery)
    ],
  },
  {
    name: "Anza Expeditions",
    leader: "Juan Bautista de Anza",
    startYear: 1775,
    endYear: 1776,
    type: "land",
    description:
      "Overland route from Sonora to establish San Francisco - 240 colonists, 1,800 miles",
    color: "#DAA520",
    coordinates: [
      [-107.40023902388472, 24.800047341179567],
      [-109.90023902388472, 26.900047341179565],
      [-110.95023902388472, 29.100047341179568],
      [-110.90023902388472, 31.300047341179567],
      [-111.00023902388472, 31.700047341179566],
      [-110.90662887677159, 32.47852091622601],
      [-111.04435001099459, 32.75250411399128],
      [-112.0913107433715, 32.84067718705087],
      [-112.80023902388471, 32.800047341179564],
      [-113.5187539405936, 32.80942022945233],
      [-114.07606246034685, 32.64238465917617],
      [-114.60023902388471, 32.70004734117957],
      [-115.50023902388472, 33.00004734117957],
      [-116.10023902388471, 33.10004734117957],
      [-116.90023902388472, 33.300047341179564],
      [-117.90023902388472, 33.800047341179564],
      [-118.25023902388472, 34.050047341179564],
      [-118.50023902388472, 34.20004734117957],
      [-119.15023902388472, 34.27004734117957],
      [-119.50968746218686, 34.45088120335304],
      [-119.69556355432704, 34.432383790184296],
      [-119.70023902388472, 34.400047341179565],
      [-120.10023902388471, 34.60004734117957],
      [-120.40023902388472, 34.900047341179565],
      [-120.70023902388472, 35.300047341179564],
      [-120.80023902388471, 35.60004734117957],
      [-121.17492362780182, 36.01855169712614],
      [-121.25173961419605, 36.17797281970465],
      [-121.30023902388471, 36.300047341179564],
      [-121.50023902388472, 36.50004734117957],
      [-121.90023902388472, 36.60004734117957],
      [-121.80602725514373, 36.592343755771],
      [-121.73621604948794, 36.74196741138458],
      [-121.75023902388472, 36.900047341179565],
      [-121.90023902388472, 37.20004734117957],
      [-122.05023902388471, 37.400047341179565],
      [-122.11824623548777, 37.432431610967186],
      [-122.16100252397148, 37.461053682806494],
      [-122.20000458218124, 37.47427062081712],
      [-122.25023902388472, 37.50004734117957],
      [-122.37356847714716, 37.58697111137495],
      [-122.40023902388472, 37.650047341179565],
      [-122.42523902388471, 37.75004734117957],
      [-122.41423902388472, 37.77604734117957],
    ],
  },
  {
    name: "Dana's Voyage - Two Years Before the Mast",
    leader: "Richard Henry Dana Jr.",
    startYear: 1834,
    endYear: 1836,
    type: "sea",
    description:
      "Hide and tallow trade voyage chronicled in 'Two Years Before the Mast'",
    color: "#4682B4",
    coordinates: [
      [-117.1611, 32.7157], // San Diego
      [-117.6, 33.4], // San Juan Capistrano
      [-118.0, 33.7], // San Pedro
      [-119.3, 34.3], // Santa Barbara
      [-121.9, 36.6], // Monterey
      [-122.4, 37.8], // San Francisco Bay
      [-121.9, 36.6], // Return to Monterey
      [-119.3, 34.3], // Santa Barbara
      [-117.1611, 32.7157], // San Diego
    ],
  },
  {
    name: "Jedediah Smith Expedition",
    leader: "Jedediah Smith",
    startYear: 1826,
    endYear: 1827,
    type: "land",
    description: "First American overland expedition to California",
    color: "#8B0000",
    coordinates: [
      [-109.0, 37.0], // Utah/Arizona border
      [-115.2, 36.1], // Las Vegas area
      [-116.2, 34.7], // Mojave River
      [-117.3, 34.1], // Cajon Pass
      [-117.9, 33.8], // Mission San Gabriel
      [-119.8, 36.7], // Central Valley
      [-119.5, 37.7], // Yosemite area
      [-119.8, 38.5], // Ebbetts Pass
    ],
  },
  {
    name: "Frémont Expeditions",
    leader: "John C. Frémont",
    startYear: 1843,
    endYear: 1846,
    type: "land",
    description:
      "US exploration expeditions that helped precipitate the Bear Flag Revolt",
    color: "#191970",
    coordinates: [
      [-119.8, 39.5], // Nevada
      [-121.5, 38.5], // Sacramento Valley
      [-121.9, 37.3], // San Jose
      [-121.9, 36.6], // Monterey
      [-121.7, 36.9], // Gavilan Peak
      [-122.5, 39.5], // Sacramento Valley
      [-121.5, 42.0], // Klamath Lake
    ],
  },
];

// Helper function to get expeditions active in a given year
export function getActiveExpeditionsGeoJSON(year: number): ExpeditionGeoJSON[] {
  return expeditionsGeoJSON.filter(
    (exp) => year >= exp.startYear && year <= exp.endYear
  );
}

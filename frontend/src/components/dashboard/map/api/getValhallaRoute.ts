import { decodePolyline } from "../utils";

type Waypoint = {
  latitude: number;
  longitude: number;
};

type Step = {
  from_index: number;
  to_index: number;
  distance: number;
  time: number;
  instruction: {
    text: string;
  };
};

type Leg = {
  distance: number;
  time: number;
  steps: Step[];
};

type Feature = {
  type: "Feature";
  properties: {
    mode: string;
    waypoints: { location: [number, number]; original_index: number }[];
    units: "metric" | "imperial";
    distance: number;
    distance_units: "meters";
    time: number;
    legs: Leg[];
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: Feature[];
  properties: {
    mode: string;
    waypoints: { lat: number; lon: number }[];
    units: "metric" | "imperial";
  };
};

export const getDefaultRoute = async (
  waypoints: Waypoint[],
  profile: string = "auto"
): Promise<FeatureCollection> => {
  const valhallaUrl = "https://valhalla1.openstreetmap.de/optimized_route?json=";

  if (!Array.isArray(waypoints) || waypoints.length < 2) {
    throw new Error("At least two waypoints are required.");
  }

  const locations = waypoints.map((waypoint) => ({
    lat: waypoint.latitude,
    lon: waypoint.longitude,
  }));

  const routeRequest = {
    locations,
    costing: profile,
    directions_options: { units: "kilometers" },
  };

  try {
    const response = await fetch(valhallaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    let shapeIndexOffset = 0;
    const legs: Leg[] = data.trip.legs.map((leg: any) => {
      const steps: Step[] = leg.maneuvers.map((step: any) => ({
        from_index: step.begin_shape_index + shapeIndexOffset,
        to_index: step.end_shape_index + shapeIndexOffset,
        distance: step.length,
        time: step.time,
        instruction: {
          text: step.instruction,
        },
      }));

      const lastStep = leg.maneuvers[leg.maneuvers.length - 1];
      if (lastStep) {
        shapeIndexOffset += lastStep.end_shape_index;
      }

      return {
        distance: leg.summary.length,
        time: leg.summary.time,
        steps: steps,
      };
    });

    const fullCoordinates = data.trip.legs
      .map((leg: any) => decodePolyline(leg.shape))
      .flat();

    const feature: Feature = {
      type: "Feature",
      properties: {
        mode: profile,
        waypoints: locations.map((loc, index) => ({
          location: [loc.lon, loc.lat],
          original_index: index,
        })),
        units: data.trip.units === "kilometers" ? "metric" : "imperial",
        distance: data.trip.summary.length,
        distance_units: "meters",
        time: data.trip.summary.time,
        legs: legs,
      },
      geometry: {
        type: "LineString",
        coordinates: fullCoordinates,
      },
    };

    return {
      type: "FeatureCollection",
      features: [feature],
      properties: {
        mode: profile,
        waypoints: locations,
        units: data.trip.units === "kilometers" ? "metric" : "imperial",
      },
    };
  } catch (error) {
    console.error("Error while fetching or transforming the route:", error);
    throw error;
  }
};

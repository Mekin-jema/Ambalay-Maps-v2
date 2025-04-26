type Waypoint = {
  latitude: number;
  longitude: number;
  place_name?: string;
};

type OptimizedRouteResponse = any; // Ideally define this more strictly based on OSRM API response

export const getOptimizedRouteWithStops = async (
  waypoints: Waypoint[]
): Promise<OptimizedRouteResponse> => {
  if (!waypoints || waypoints.length < 2) {
    throw new Error(
      "At least two waypoints are required to calculate a route."
    );
  }

  try {
    // Filter out invalid waypoints
    const validWaypoints = waypoints.filter(
      (wp) => wp.longitude !== undefined && wp.latitude !== undefined
    );

    if (validWaypoints.length < 2) {
      throw new Error("At least two valid waypoints are required.");
    }

    const locations = validWaypoints
      .map((wp) => `${wp.longitude},${wp.latitude}`)
      .join(";");

    const osrmUrl = `https://router.project-osrm.org/trip/v1/driving/${locations}?source=first&overview=full&geometries=geojson&steps=true`;

    const response = await fetch(osrmUrl);

    if (!response.ok) {
      throw new Error(
        `OSRM API Error (Status: ${response.status}): ${response.statusText}`
      );
    }

    const data: OptimizedRouteResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching the optimized route:", error);
    throw error;
  }
};

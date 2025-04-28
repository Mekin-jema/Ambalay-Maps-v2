type Waypoint = {
  longitude: number;
  latitude: number;
  place_name?: string; // Optional field for place name
};

type RouteResponse = any; 
// You can replace `any` with a more detailed type if you want strict typing for the OSRM response.

export const getShortestRoute = async (
  waypoints: Waypoint[]
): Promise<RouteResponse> => {
  try {
    const locations = waypoints
      .map((wp) => `${wp.longitude},${wp.latitude}`)
      .join(";");

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${locations}?overview=full&geometries=geojson`;

    const response = await fetch(osrmUrl);
    if (!response.ok) {
      throw new Error(`OSRM API Error: ${response.statusText}`);
    }

    const data: RouteResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching the route:", error);
    throw error;
  }
};

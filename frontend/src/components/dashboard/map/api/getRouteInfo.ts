type Waypoint = {
  longitude: number;
  latitude: number;
  place_name?: string; // Optional field for place name
};

type RouteInfoResponse = any; 
// You can define a more specific type later based on OSRM's response structure if you want.

export const getRouteInfo = async (
  waypoints: Waypoint[]
): Promise<RouteInfoResponse> => {
  try {
    const locations = waypoints
      .map((wp) => `${wp.longitude},${wp.latitude}`)
      .join(";");

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${locations}?overview=false&alternatives=true&steps=true&geometries=geojson`;

    const response = await fetch(osrmUrl);
    if (!response.ok) {
      throw new Error(`OSRM API Error: ${response.statusText}`);
    }

    const data: RouteInfoResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching the route:", error);
    throw error;
  }
};

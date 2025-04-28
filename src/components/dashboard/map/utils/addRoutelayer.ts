import maplibregl from "maplibre-gl";
import getPlaceNameFromCoordinates from "../api/getPlaceFromCoordinates";

let markers: maplibregl.Marker[] = []; // Store marker instances

// Define types for waypoint data
interface Waypoint {
  placeName?: string;
  longitude: number;
  latitude: number;
}

/**
 * Helper function to fetch place name
 * @param lngLat - The lngLat object containing longitude and latitude
 * @returns - A promise that resolves to the place name or a fallback string
 */
const getLocation = async (lngLat: maplibregl.LngLat): Promise<string> => {
  try {
    return await getPlaceNameFromCoordinates(lngLat);
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return `${lngLat.lng}, ${lngLat.lat}`;
  }
};

/**
 * Adds a route layer with draggable markers styled like Google Maps
 * @param map - Maplibre GL map instance
 * @param color - Route line color
 * @param geometry - Array of [lng, lat] coordinates
 * @param name - Unique route layer name
 * @param thickness - Route line thickness
 * @param setWaypoints - State updater for waypoints
 * @param waypoints - Array of waypoint objects
 * @param dispatch - Redux dispatch or state function
 */
export const addRouteLayer = (
  map: maplibregl.Map,
  color: string,
  geometry: [number, number][],
  name: string,
  thickness: number,
  setWaypoints: (waypoints: Waypoint[]) => void,
  waypoints: Waypoint[],
  dispatch: Function
): void => {
  // Clean up previous layers and sources
  if (map.getLayer(name)) map.removeLayer(name);
  if (map.getSource(name)) map.removeSource(name);

  // Add new GeoJSON source for the route
  map.addSource(name, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: geometry,
      },
    },
  });

  // Add styled route line (Google Maps like)
  map.addLayer({
    id: name,
    type: "line",
    source: name,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color || "#4285F4",   // Google Maps blue
      "line-width": thickness || 6,
      "line-opacity": 0.8,
    },
  });

  // Remove any existing markers
  markers.forEach((marker) => marker.remove());
  markers = [];

  // Loop through waypoints and create draggable markers
  waypoints.forEach((waypoint, index) => {
    const isStart = index === 0;
    const isEnd = index === waypoints.length - 1;

    // Google-like marker colors
    const markerColor = isStart
      ? "#34A853"   // Green for start
      : isEnd
      ? "#EA4335"   // Red for end
      : "#F9AB00";  // Yellow for middle points

    // Create draggable marker
    const marker = new maplibregl.Marker({
      color: markerColor,
      draggable: true,
    })
      .setLngLat([waypoint.longitude, waypoint.latitude])
      .addTo(map);

    // Add shadow and circle effect for Google Maps vibe
    const el = marker.getElement();
    el.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
    el.style.borderRadius = "50%";
    el.style.width = "32px";
    el.style.height = "32px";

    // Store marker instance
    markers.push(marker);

    // Handle dragging
    marker.on("dragend", async () => {
      const lngLat = marker.getLngLat();

      // Reverse geocode to get updated place name
      const placeName = await getLocation(lngLat);

      // Update the waypoints array
      const updatedWaypoints = [...waypoints];
      updatedWaypoints[index] = {
        placeName,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };

      // Update the waypoints state
      dispatch(setWaypoints(updatedWaypoints));

      // Update the route line with new coordinates
      const source = map.getSource(name) as maplibregl.GeoJSONSource;
      if (source) {
        source.setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: updatedWaypoints.map((wp) => [wp.longitude, wp.latitude]),
          },
        });
      }
    });
  });
};

// Import dependencies
import { setWaypoints } from "@/Redux/MapSlice";
import maplibregl, { Map, Marker, Popup, GeoJSONSource, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getPlaceNameFromCoordinates } from "../api";

// Type definitions
interface Waypoint {
  placeName: string;
  longitude: number;
  latitude: number;
}

interface Step {
  from_index: number;
  to_index: number;
  instruction?: {
    text: string;
  };
  [key: string]: any;
}

interface Leg {
  steps: Step[];
}

interface FeatureProperties {
  legs: Leg[];
}

interface Feature {
  geometry: {
    coordinates: number[][];
  };
  properties: FeatureProperties;
}

interface RouteData {
  features: Feature[];
}

type DispatchType = (action: any) => void;

let routeData: RouteData | null = null;
let routeStepsData: any;
let instructionsData: any;
let stepPointsData: any;
let markers: Marker[] = []; // Store marker instances

// Helper function to fetch place name
const getLocation = async (lngLat: { lng: number; lat: number }): Promise<string> => {
  try {
    return await getPlaceNameFromCoordinates(lngLat);
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return `${lngLat.lng}, ${lngLat.lat}`;
  }
};

const popup = new Popup();

export const addUpdatedValhalla = (
  map: Map,
  data: RouteData,
  waypoints: Waypoint[],
  dispatch: DispatchType,
  profile: string
) => {
  routeData = data;
  const steps: any[] = [];
  const instructions: any[] = [];
  const stepPoints: any[] = [];

  if (!routeData.features || !routeData.features[0] || !routeData.features[0].properties.legs) {
    console.error("Invalid route data structure");
    return;
  }

  markers.forEach((marker) => marker.remove());
  markers = [];

  waypoints.forEach((waypoint, index) => {
    const isStart = index === 0;
    const isEnd = index === waypoints.length - 1;

    const markerColor = isStart
      ? "#34A853"
      : isEnd
      ? "#EA4335"
      : "#F9AB00";

    const marker = new maplibregl.Marker({
      color: markerColor,
      draggable: true,
    })
      .setLngLat([waypoint.longitude, waypoint.latitude])
      .addTo(map);

    const el = marker.getElement();
    el.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
    el.style.borderRadius = "50%";
    el.style.width = "32px";
    el.style.height = "32px";

    markers.push(marker);

    marker.on("dragend", async () => {
      const lngLat = marker.getLngLat();
      const placeName = await getLocation(lngLat);

      const updatedWaypoints = [...waypoints];
      updatedWaypoints[index] = {
        placeName,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };

      dispatch(setWaypoints(updatedWaypoints));

      const source = map.getSource("route") 
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

  const legGeometry = routeData.features[0]?.geometry?.coordinates;
  if (routeData.features[0]?.properties?.legs) {
    routeData.features[0]?.properties.legs.forEach((leg) => {
      if (!legGeometry) return;

      leg.steps.forEach((step, index) => {
        if (step.instruction) {
          instructions.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: legGeometry[step.from_index],
            },
            properties: {
              text: step.instruction.text,
            },
          });
        }
        if (index !== 0) {
          stepPoints.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: legGeometry[step.from_index],
            },
            properties: step,
          });
        }

        if (step.from_index === step.to_index) return;

        const stepGeometry = legGeometry.slice(step.from_index, step.to_index + 1);
        if (
          Array.isArray(legGeometry) &&
          step.from_index >= 0 &&
          step.to_index >= 0 &&
          step.from_index < legGeometry.length &&
          step.to_index < legGeometry.length
        ) {
          steps.push({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: stepGeometry,
            },
            properties: step,
          });
        } else {
          console.warn(`Invalid indices for step geometry: from_index=${step.from_index}, to_index=${step.to_index}`);
        }
      });
    });
  } else {
    console.error("No legs found in route data");
  }

  routeStepsData = {
    type: "FeatureCollection",
    features: steps,
  };

  instructionsData = {
    type: "FeatureCollection",
    features: instructions,
  };

  stepPointsData = {
    type: "FeatureCollection",
    features: stepPoints,
  };

  // Remove previous layers
  if (map.getLayer("route-layer")) map.removeLayer("route-layer");
  if (map.getSource("route")) map.removeSource("route");
  if (map.getLayer("points-layer")) map.removeLayer("points-layer");
  if (map.getSource("points")) map.removeSource("points");

  // Add sources
  map.addSource("route", {
    type: "geojson",
    data: routeData,
  });

  map.addSource("points", {
    type: "geojson",
    data: instructionsData,
  });

  addLayerEvents(map);
  drawRoute(map, profile);
};

function drawRoute(map: Map, profile: string) {
  if (!routeData) return;

  let style: any = {
    type: "line",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#A91CD8",
      "line-width": 10,
    },
    filter: ["==", "$type", "LineString"],
  };

  switch (profile) {
    case "bicycle":
      style.paint["line-dasharray"] = [0.08, 1];
      style.paint["line-opacity"] = 0.6;
      break;
    case "pedestrian":
      style.paint["line-dasharray"] = [0.1, 1];
      style.paint["line-opacity"] = 0.8;
      break;
    case "motor_scooter":
      style.paint["line-opacity"] = 0.7;
      break;
    case "transit":
      style.paint["line-opacity"] = 0.5;
      style.paint["line-width"] = 12;
      break;
    case "multimodal":
      style.paint["line-opacity"] = 0.4;
      break;
    case "auto":
    default:
      style.paint["line-opacity"] = 1.0;
      break;
  }

  (map.getSource("route") as GeoJSONSource)?.setData(routeData);

  map.addLayer({
    id: "route-layer",
    type: "line",
    source: "route",
    ...style,
  });

  (map.getSource("points") as GeoJSONSource)?.setData(instructionsData);

  map.addLayer({
    id: "points-layer",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff",
      "circle-stroke-color": "#aaa",
      "circle-stroke-width": 1,
    },
  });
}

function addLayerEvents(map: Map) {
  map.on("mouseenter", "route-layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "route-layer", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("mouseenter", "points-layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "points-layer", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("mousemove", "route-layer", (e) => {
    if (!e.features || e.features.length === 0 || !routeData) return;

    const clickedFeature = e.features[0];
    const routeGeometry = routeData.features[0].geometry;

    const clickedPoint = e.lngLat;

    let closestDistance = Infinity;
    let pointIndex = 0;

    const routeCoordinates = routeGeometry.coordinates;

    for (let i = 0; i < routeCoordinates.length; i++) {
      const routePoint = routeCoordinates[i];
      const dx = clickedPoint.lng - routePoint[0];
      const dy = clickedPoint.lat - routePoint[1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
        pointIndex = i;
      }
    }

    const steps = routeData.features[0].properties.legs.flatMap((leg) => leg.steps);
    let cumulativeDistance = 0;
    let cumulativeTime = 0;
    // (You can continue your logic here)
  });
}

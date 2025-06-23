"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import AddressBox from "./inputHandler";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { addUpdatedValhalla } from "./utils/add-updated-valhalla";
import { fetchPOIs, fetchTrafficData, getDefaultRoute, getRouteInfo } from "./api";
import { removePOILayerFromMap } from "./utils/remove-poi-layer";
import { addPOILayerToMap, addTrafficLayer, categories } from "./utils";
import { Main } from "../utils/main";
import MapStyles from "./map-style-popup";
import { variablelStyles } from "./map-styles/variable-style";
import GeocodingInput from "./single-input";
import CategoryScroll from "./poi-buttons";

// Define TypeScript interfaces
interface Waypoint {
  latitude: number | null;
  longitude: number | null;
}

interface POI {
  id: number;
  name: string;
  lat: number;
  lng: number;
  icon: string;
  color: string;
  cuisine?: string;
  internet_access?: string;
  opening_hours?: string;
  tourism?: string;
  website?: string;
  iconComp?: React.ComponentType;
}

interface TrafficData {
  // Define the structure of your traffic data here
  // Adjust according to your actual data structure
  [key: string]: any;
}

interface mapStyle {
  name: string;
  url: string;
  thumbnail: string; // Path to image (string)
}


const Map: React.FC = () => {
  // Refs for map container and instance
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  // State variables with TypeScript types
  const [route, setRoute] = useState<any>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCategoryDetailPopup, setShowCategoryDetailPopup] = useState<boolean>(false);
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [toggleGeocoding, setToggleGeocoding] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<string>(variablelStyles[0].url);
  const [profile, setProfile] = useState<string>("auto");
  const [selectedStyle, setSelectedStyle] = useState<string>(variablelStyles[0].name);

  const { state } = useSidebar();
  const dispatch = useDispatch<typeof import('../../../store/Store').store.dispatch>();
  const { waypoints } = useSelector((state: any) => state.map);
  const myAPIKey = process.env.NEXT_PUBLIC_API_KEY || "";
  console.log("API Key:", myAPIKey);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [38.7613, 9.0108],
      zoom: 30,
    });

    const currentMap = mapInstance.current;

    currentMap.on("load", () => {
      currentMap.flyTo({
        center: [38.7613, 9.0108],
        zoom: 14,
        speed: 1.2,
        curve: 1.5,
        essential: true,
      });
    });

    currentMap.on("click", "poi-layer", (e) => {
      const features = e.features?.[0];
      if (!features) return;

      const poiId = features.id;
      currentMap.setPaintProperty("poi-layer", "icon-size", [
        "case",
        ["==", ["get", "id"], poiId],
        2.0,
        1.0,
      ]);
    });

    currentMap.addControl(new maplibregl.NavigationControl(), "bottom-right");
    currentMap.addControl(new maplibregl.FullscreenControl(), "bottom-right");

    const layerSwitcher = document.createElement("div");
    layerSwitcher.className = "maplibregl-ctrl maplibregl-ctrl-group";
    const satelliteButton = document.createElement("button");
    satelliteButton.innerHTML = "🛰️";
    // satelliteButton.onclick = () => {
    //   currentMap.setStyle(`${style.satellite.url}?apiKey=${myAPIKey}`);
    // };
    layerSwitcher.appendChild(satelliteButton);
    currentMap.addControl(
      { onAdd: () => layerSwitcher, onRemove: () => { } },
      "bottom-right"
    );

    const marker = new maplibregl.Marker({
      color: "#4285F4",
      draggable: true,
    })
      .setLngLat([38.7626, 9.0404])
      .addTo(currentMap);

    currentMap.on("styleimagemissing", (e) => {
      const missingImageId = e.id;
      const category = categories.find((cat) => cat.icon === missingImageId);

      if (category && !currentMap.hasImage(missingImageId)) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        const iconName = category.icon;
        const color = category.textColor;
        const strokeColor = "ffffff00";
        const iconType = 'material';
        img.src = `https://api.geoapify.com/v1/icon/?type=material&color=${encodeURIComponent(color)}&icon=${iconName}&iconType=${iconType}&strokeColor=${encodeURIComponent(strokeColor)}&apiKey=${myAPIKey}`;

        img.onload = () => {
          currentMap.addImage(missingImageId, img);
        };
        img.onerror = () => {
          console.error(`Failed to load icon for ${iconName}`);
        };
      }
    });

    currentMap.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,

      }),
      "bottom-right"
    );

    setMap(currentMap);

    return () => {
      if (currentMap) {
        currentMap.remove();
      }
    };
  }, []);

  // Update map style when mapStyle changes
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setStyle(`${mapStyle}?apiKey=${myAPIKey}`);
    }
  }, [mapStyle, myAPIKey]);

  // Fetch and render routes based on waypoints
  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    const isValidWaypoints = waypoints.every(
      (wp: Waypoint) => wp.latitude !== null && wp.longitude !== null
    );
    if (!isValidWaypoints) return;

    const fetchRoutes = async () => {
      try {
        const valhallaRoute = await getDefaultRoute(waypoints, profile);
        const routeInfo = await getRouteInfo(waypoints);

        if (routeInfo?.routes?.length > 0) {
          setRoute(routeInfo.routes[0]);
        }

        addUpdatedValhalla(map, valhallaRoute, waypoints, dispatch, profile);
      } catch (error) {
        console.error("Error fetching routes:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchRoutes();
  }, [map, waypoints, dispatch, profile]);

  // Add POIs to the map
  useEffect(() => {
    if (!map || pois.length === 0) return;
    addPOILayerToMap(map, pois);
  }, [pois, map]);

  // Fetch and render traffic data
  useEffect(() => {
    if (!map) return;

    const getTrafficData = async () => {
      try {
        const data = await fetchTrafficData();
        setTrafficData(data);
        addTrafficLayer(map, data);
      } catch (error) {
        console.error("Error fetching traffic data:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    getTrafficData();
  }, [map]);

  const handleStyleChange = (style: mapStyle) => {
    setMapStyle(style.url);
    setSelectedStyle(style.name);
  };

  const handleCategoryClick = async (category: { name: string; tag: string; icon: string; textColor: string }) => {
    if (!map || loading) return;

    if (activeCategory === category.name) {
      setActiveCategory(null);
      setPois([]);
      removePOILayerFromMap(map);
      return;
    }

    setShowCategoryDetailPopup(true);
    setActiveCategory(category.name);

    try {
      const center = map.getCenter().toArray();
      const data = await fetchPOIs(category.tag, center);

      if (!data || !data.elements) {
        console.error("Data or elements are undefined");
        return;
      }

      const poisData: POI[] = data.elements.map((element: any) => ({
        id: element.id,
        name: element.tags?.["name:am"] || element.tags?.name || "Unknown",
        lat: element.lat || element.center?.lat,
        lng: element.lon || element.center?.lon,
        icon: category.icon,
        color: category.textColor,
        cuisine: element.tags?.cousine || "",
        internet_access: element.tags?.internet_access || "",
        opening_hours: element.tags?.opening_hours || "",
        tourism: element.tags?.tourism || "",
        website: element.tags?.website || "",
      }));

      setPois(poisData);
      removePOILayerFromMap(map);
      addPOILayerToMap(map, poisData);
    } catch (error) {
      console.error("Error fetching POIs:", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <Main className="relative w-full h-screen ml-1 mr-1">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-green-400 font-semibold">
              Loading Traffic Data...
            </p>
          </div>
        </div>
      )}

      <MapStyles
        variablelStyles={variablelStyles}
        selectedStyle={selectedStyle}
        handleStyleChange={handleStyleChange}
      />

      <div className={`fixed top-0 ${state === "collapsed" ? "md:left-[60px]" : "md:left-[300px]"} left-0 flex z-10 items-center`}>
        {/* <SidebarTrigger className="ml-2" /> */}
        {toggleGeocoding ? (
          <AddressBox
            route={route}
            map={map}
            setToggleGeocoding={setToggleGeocoding}
            profile={profile}
            setProfile={setProfile}
          />
        ) : (
          <GeocodingInput map={map} setToggleGeocoding={setToggleGeocoding} />
        )}
      </div>

      <ToastContainer position="top-center" autoClose={10000} />
      <div ref={mapContainer} className="fixed  z-0 top-0 bottom-0  bg-white w-full h-full rounded-[18px]" />

      <CategoryScroll
        categories={categories}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
      />

      {/* <div className="relative z-40">
        {showCategoryDetailPopup && pois.length > 0 ? (
          <Categories
            setShowCategoryDetailPopup={setShowCategoryDetailPopup}
            setShowFilterPopup={setShowFilterPopup}
            data={pois}
            map={map}
          />
        ) : (
          showFilterPopup && (
            <Filter
              setShowFilterPopup={setShowFilterPopup}
              setShowCategoryDetailPopup={setShowCategoryDetailPopup}
            />
          )
        )}
      </div> */}
    </Main>
  );
};

export default Map;
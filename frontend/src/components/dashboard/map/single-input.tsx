
"use client";
import React, { useState, ChangeEvent } from "react";
import { MdDirections } from "react-icons/md"; // Google Maps-like icon
import getPlaces from "./api/getPlaces";
// maplibre-gl.d.ts
import * as maplibregl from 'maplibre-gl';

declare module 'maplibre-gl' {
  interface Map {
    currentMarker?: maplibregl.Marker;
  }
}

interface Suggestion {
  lat: number;
  lon: number;
  name: string;
  display_name: string;
}

interface GeocodingInputProps {
  map: maplibregl.Map | null;
  setToggleGeocoding: (toggle: boolean) => void;
}

const GeocodingInput: React.FC<GeocodingInputProps> = ({ map, setToggleGeocoding }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const queryPlaces = async (query: string): Promise<void> => {
    if (query) {
      const res = await getPlaces(query);

      if (res) {
        const formattedSuggestions = res.map((place: any) => ({
          lat: place.lat,
          lon: place.lon,
          name: place.name || "Unknown", // Provide a default if 'name' is missing
          display_name: place.display_name,
        }));
        setSuggestions(formattedSuggestions);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);
    queryPlaces(value);
  };

  const handleSelectSuggestion = (suggestion: Suggestion): void => {
    const { lat, lon, name, display_name } = suggestion;
    if (!map) return;

    if (map.currentMarker) {
      map.currentMarker.remove();
    }

    const marker = new maplibregl.Marker({ color: "#4285F4", draggable: true })
      .setLngLat([lon, lat])
      .setPopup(new maplibregl.Popup().setHTML(name))
      .addTo(map);

    map.currentMarker = marker;

    map.flyTo({ center: [lon, lat], essential: true });

    setSuggestions([]);
    setInputValue(display_name);
  };

  return (
    <div className="relative p-2 w-[392px] flex items-center gap-1">
      <div className="relative sm:w-full w-[350px]">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search Ambalay Maps"
          className="w-full py-3 shadow-xl mt-3 font-sora border-[1px] border-green-800 pl-5 pr-12 rounded-full dark:bg-inherit focus:outline-none transition-all"
        />

        <MdDirections
          className="absolute right-3 top-9 transform -translate-y-1/2 text-[#0B57D0] cursor-pointer"
          size={24}
          onClick={() => setToggleGeocoding(true)}
        />

        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-[99.999%] bg-white shadow-lg z-0 rounded-t-xl">
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeocodingInput;

import maplibregl from "maplibre-gl";

/**
 * Removes the Points of Interest (POI) layer and source from the map
 * @param map - The Maplibre GL map instance
 */
export const removePOILayerFromMap = (map: maplibregl.Map): void => {
  // Ensure the map has a valid style before proceeding
  if (!map.getStyle()) return;

  // Remove the POI layer if it exists
  if (map.getLayer('poi-layer')) {
    map.removeLayer('poi-layer');
  }

  // Remove the POI source if it exists
  if (map.getSource('pois')) {
    map.removeSource('pois');
  }

  // Optionally reset the cursor in case it's still set
  map.getCanvas().style.cursor = '';
};

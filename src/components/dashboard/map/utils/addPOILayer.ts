// Define the type for POI (Points of Interest) data
import maplibregl from 'maplibre-gl';

interface POI {
  icon: string;
  name?: string;
  color: string;
  url?: string;
  lat: number;
  lng: number;
}

// Function to add Points of Interest (POI) layer to the map
export const addPOILayerToMap = (map: maplibregl.Map, pois: POI[]): void => {

  // Remove existing POI layer and source if present
  if (map.getSource('pois')) {
    map.removeLayer('poi-layer');
    map.removeSource('pois');
  } 

  // Define the GeoJSON source for POIs
  map.addSource('pois', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: pois.map((poi) => ({
        type: 'Feature',
        properties: {
          icon: poi.icon,   // icon name matching the sprite or image
          name: poi.name,   // optional name of the POI
          color: poi.color, // dynamic text color
          url: encodeURI(poi.url || "https://www.google.com/maps/?entry=wc"), // Dynamically set and encode URL
        },
        geometry: {
          type: 'Point',
          coordinates: [poi.lng, poi.lat],
        },
      })),
    },
  });

  // Add the symbol layer to display POI icons and names
  map.addLayer({
    id: 'poi-layer',
    type: 'symbol',
    source: 'pois',
    layout: {
      'icon-image': ['get', 'icon'],
      'icon-size': 0.8, // Adjust icon size as needed
      'icon-allow-overlap': true,
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 14,
      'text-offset': [1.2, 0],        // horizontal shift (x = 1.2, y = 0)
      'text-anchor': 'left',          // anchor text to the left of icon
      'text-optional': true,
    },
    paint: {
      'text-color': ['get', 'color'], // Use dynamic color from POI properties
      'text-halo-color': 'rgba(247, 247, 247, 0.3)',
      'text-halo-width': 5,
    },
  });

  // Add click event to open the URL in a new tab
  map.on('click', 'poi-layer', (e: maplibregl.MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['poi-layer'] });
    if (features.length) {
      const url = features[0].properties.url;
      if (url) {
        window.open(url, '_blank'); // Open the URL in a new tab
      }
    }
  });

  // Change the cursor to a pointer when hovering over the POI layer
  map.on('mouseenter', 'poi-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Reset the cursor when leaving the POI layer
  map.on('mouseleave', 'poi-layer', () => {
    map.getCanvas().style.cursor = '';
  });
};

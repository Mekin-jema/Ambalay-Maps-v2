import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { googleProtocol, createGoogleStyle } from 'maplibre-google-maps';

const MapComponent = () => {
    useEffect(() => {
        // Add the Google Maps protocol
        maplibregl.addProtocol('google', googleProtocol);

        // Create a Google Maps style (replace with your API key)
        const googleStyle = createGoogleStyle('google-maps-source', 'roadmap', 'AIzaSyBJ_XlxltqRMHEaqUxKak6LkIb0jt4qRWM');

        // Initialize your MapLibre map with the Google Maps style
        const map = new maplibregl.Map({
            container: 'map',
            style: googleStyle,
            center: [-73.985, 40.748],
            zoom: 12
        });

        return () => {
            // Clean up the map instance on component unmount
            map.remove();
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;
/**
 * Decodes a Valhalla encoded polyline into an array of coordinates.
 * @param encoded - The encoded polyline string.
 * @returns An array of coordinates where each coordinate is an [longitude, latitude] pair.
 */
function decodePolyline(encoded: string): [number, number][] {
  let coordinates: [number, number][] = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b: number;
    let shift = 0;
    let result = 0;

    // Decoding latitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    // Reset for longitude decoding
    shift = 0;
    result = 0;

    // Decoding longitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    // Push the decoded coordinate (longitude, latitude)
    coordinates.push([lng / 1e6, lat / 1e6]);
  }

  return coordinates;
}

export default decodePolyline;

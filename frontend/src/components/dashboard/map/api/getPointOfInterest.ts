type Coordinates = [number, number]; // [longitude, latitude]

type OverpassElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    [key: string]: string;
  };
};

type OverpassResponse = {
  elements: OverpassElement[];
};

const fetchPOIs = async (
  categoryTag: string,
  center: Coordinates
): Promise<OverpassResponse | undefined> => {
  const [lng, lat] = center;
  const radius = 5000; // 5 km search radius

  const query = `
    [out:json];
    (
      node[${categoryTag}](around:${radius},${lat},${lng});
      way[${categoryTag}](around:${radius},${lat},${lng});
      relation[${categoryTag}](around:${radius},${lat},${lng});
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: OverpassResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching POIs:", error);
  }
};

export default fetchPOIs;

type PlaceResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  // You can add more fields depending on what you expect from Nominatim
};

export default async function getPlaces(query: string): Promise<PlaceResult[] | undefined> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ET`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: PlaceResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Ethiopian places:", error);
  }
}

type Coordinates = {
  lat: number;
  lng: number;
};

type NominatimResponse = {
  name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    neighbourhood?: string;
    suburb?: string;
    county?: string;
    state?: string;
    state_district?: string;
    country?: string;
    [key: string]: any; // Catch any extra fields
  };
};

const getPlaceNameFromCoordinates = async (
  lngLat: Coordinates
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lngLat.lat}&lon=${lngLat.lng}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: NominatimResponse = await response.json(); // Parse and type the response

    const placeName =
      data?.name ||
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.address?.neighbourhood ||
      data?.address?.suburb ||
      data?.address?.county ||
      data?.address?.state ||
      data?.address?.state_district ||
      data?.address?.country ||
      "";

    return placeName;
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Unknown Location";
  }
};

export default getPlaceNameFromCoordinates;

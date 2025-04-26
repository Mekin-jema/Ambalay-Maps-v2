type Coordinate = {
  latitude: number;
  longitude: number;
};

type DirectionResponse = any; // You can define this more strictly based on the API response structure if you want

export default async function getDirection(
  originCoord: Coordinate,
  destinationCoord: Coordinate
): Promise<DirectionResponse | undefined> {
  try {
    const response = await fetch(
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${originCoord.longitude},${originCoord.latitude};${destinationCoord.longitude},${destinationCoord.latitude}?overview=false&alternatives=true&steps=true&geometries=geojson`
    );

    return response.json();
  } catch (error) {
    console.error("There was an error while fetching direction:", error);
  }
}

const here = {
  apiKey: "6ZKCmRwks4GRrsbzUG3Mey-Nq_eoGNklO7m13osVzmU", // Replace with your HERE API key
  trafficApiUrl: `https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=bbox:28.5246,40.8021,29.4320,41.1999&apiKey=6ZKCmRwks4GRrsbzUG3Mey-Nq_eoGNklO7m13osVzmU`,
};

type TrafficDataResponse = any; 
// You can replace `any` with a detailed type if you want based on HERE API's traffic flow response.

const fetchTrafficData = async (): Promise<TrafficDataResponse | undefined> => {
  try {
    const response = await fetch(here.trafficApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: TrafficDataResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    return undefined;
  }
};

export default fetchTrafficData;

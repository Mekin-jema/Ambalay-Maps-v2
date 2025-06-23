import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the state and actions
interface Waypoint {
  placeName: string;
  longitude: number | null;
  latitude: number | null;
}

interface MapState {
  waypoints: Waypoint[];
  open: boolean;
  // route: any | null;
  // map: any | null;
}

const initialState: MapState = {
  waypoints: [
    { placeName: "", longitude: null, latitude: null },
    { placeName: "", longitude: null, latitude: null },
  ],
  open: false,
  // route: null,
  // map: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
      state.waypoints = action.payload;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    // setRoute: (state, action: PayloadAction<any | null>) => {
    //   state.route = action.payload;
    // },
    // setMap: (state, action: PayloadAction<any | null>) => {
    //   state.map = action.payload;
    // },
  },
});

export const { setWaypoints, setOpen } = mapSlice.actions;

export default mapSlice.reducer;

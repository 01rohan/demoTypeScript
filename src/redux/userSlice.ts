import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  step: number;
  userData: { [key: string]: string }[]; // Change userData to be an array of objects
  storeData: { [key: string]: string };
}

const initialState: UserState = {
  step: 1,
  storeData: {},
  userData: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ [key: string]: string }[]>
    ) => {
      state.userData = action.payload; // Set the array directly
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setData: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.storeData = { ...state.storeData, ...action.payload };
    },
  },
});

export const { setUserData, setStep, setData } = userSlice.actions;
export default userSlice.reducer;

export type RootState = ReturnType<typeof userSlice.reducer>;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  navOption?: "products" | "add"
  isMobileNavOpen: boolean
} = {
  isMobileNavOpen: false
}

const dataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setNavOption: (state, action: PayloadAction<{navOption: "products" | "add"}>) => {
      state.navOption = action.payload.navOption
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen
    },
  }
})

export const { setNavOption, toggleMobileNav } = dataSlice.actions


export default dataSlice.reducer
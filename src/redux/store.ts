import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./slice/classSlice";

export const store = configureStore({
    reducer: classSlice
});
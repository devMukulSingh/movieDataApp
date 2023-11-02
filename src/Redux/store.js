import { configureStore } from "@reduxjs/toolkit";
import  homeSlice  from "./homeSlice.js";
import loadingSlice from "./loadingSlice.js";


export const store = configureStore({
    reducer:{
        home: homeSlice,
        loading : loadingSlice
    }
});

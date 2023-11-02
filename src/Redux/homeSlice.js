import { createSlice } from "@reduxjs/toolkit";


export const homeSlice = createSlice({
    name:'home',
    initialState : {
        genres:{},
        url:{},
        pageNum:[] 
    },
    reducers:{
        getApiConfigurations : ( state,action ) => {
            state.url = action.payload;
        },
        getGenres : (state,action) => {
            state.genres = action.payload;
        },
        getPageNum : (state,action) => {
            state.pageNum = action.payload;
        }
        
    }
})

export const{ getApiConfigurations, getGenres, getPageNum } = homeSlice.actions;

export default homeSlice.reducer;
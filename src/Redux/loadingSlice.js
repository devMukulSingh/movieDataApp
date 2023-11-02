import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({

    name:'loading',

    initialState : { 
        heroBannerLoading : '',
        trendingLoading : '',
        detailsLoading: false,
        exploreLoading: false,
        searchLoading : false,
    },

    reducers:{

        getHeroSectionLoading : (state,action) => {
            state.heroBannerLoading = action.payload;
        },
        getTrendingSectionLoading : (state,action) => {
            state.trendingLoading = action.payload;
        },
        getDetailsPageLoading : (state,action) => {
            state.detailsLoading = action.payload;
        },
        getExplorePageLoading : ( state,action ) => {
            state.exploreLoading = action.payload;
        },
        getSearchPageLoading : ( state,action ) => {
            state.searchLoading = action.payload;
        }
    },
})

export const { getHeroSectionLoading,
                getTrendingSectionLoading,
                getDetailsPageLoading,
                getExplorePageLoading,
                getSearchPageLoading  } = loadingSlice.actions;

export default loadingSlice.reducer;
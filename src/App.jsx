import React from 'react';
import { useEffect } from 'react'
import { fetchDataFromApi } from './Utils/api'
import {  useDispatch, useSelector } from "react-redux";
import { getApiConfigurations } from './Redux/homeSlice';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import DetailsPage from "./Pages/DetailsPage";
import SearchResults from "./Pages/SearchResults";
import Explore from "./Pages/Explore";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
/////////////////////////////////////////////////////

const App = () => {

  useEffect( () => {
    fetchConfiguration();
  },[]);
  const dispatch = useDispatch();

  const fetchConfiguration = async() => {

    const { images } = await fetchDataFromApi("/configuration"); 
    
    const url = {
      backdrop: `${images.secure_base_url}original`,
    }
    dispatch(getApiConfigurations(url));
  }

  const { heroBannerLoading, trendingLoading, detailsLoading, exploreLoading, searchLoading }
          = useSelector( state => state.loading );
   return (
    <>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path = "/" element = {<HomePage/>}/>
              <Route path = "/:mediaType/:id" element = {<DetailsPage/>} />
              <Route path = "/search/:query" element = {<SearchResults/>} />
              <Route path = "/explore/:mediaType" element = {<Explore/>} />
              <Route path = "*" element = {<Error/>} />
            </Routes>
            {!heroBannerLoading &&
             !trendingLoading &&
              !detailsLoading &&
               !exploreLoading &&
                !searchLoading &&
            <Footer/> }
        </BrowserRouter>


    </>
  )
}


export default App

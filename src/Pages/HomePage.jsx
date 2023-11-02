import React from 'react';
import { Box, styled } from "@mui/material";
import HeroBanner from './HeroBanner';
import Trending from '../Components/Home/Trending.jsx';
import Popular from '../Components/Home/Popular.jsx';
import TopRated from '../Components/Home/TopRated.jsx';
import { useSelector } from 'react-redux';

/////////////////////////////////
const MainBox = styled(Box) (({theme}) => ({
  // height:"90vh",
  display:'flex',
  flexDirection:'column',
  gap:'1rem',
  padding:'0 !important',
  [theme.breakpoints.down('sm')]:{
    gap:0
  },
  overflow:'auto',
  scrollbarWidth:'none',
  '&::-webkit-scrollbar':{
    display:"none !important",

  }

}))

/////////////////////////////////MAIN FUNCTION STARTS//////////////////////
const Home = () => {

    const {  heroBannerLoading, trendingLoading }  = useSelector( state => state.loading);
    console.log(heroBannerLoading);

  return (
    <>
      { 
        !heroBannerLoading && 

        <MainBox> 
            <HeroBanner/>
            <Trending />
            <Popular />
            <TopRated />
          </MainBox>
      
        }
      
    </>
  )
}

export default Home
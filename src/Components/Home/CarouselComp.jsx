import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import React from 'react';
import { Box,styled } from "@mui/material";
import MovieCardHome from './MovieCardHome.jsx';
import { Link } from "react-router-dom";
///////////////////////////////////////////////
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 900, min:600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max:600, min: 0 },
    items: 1,
  }
};
const MainBox = styled(Box)({
  '.react-multi-carousel-item':{
    marginLeft:10,
  },
  '.react-multi-carousel-list':{
    overflow:'visible',
    overflowX:'hidden !important',
  }
})

//////////////////////MAIN FUNCTION STARTS//////////////////////////////
const CarouselComp = ( { data,loading } ) => {

  return (
    <>
    {
      !loading && 
   
        <MainBox>

           { data &&
            <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={false}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            centerMode={true} 
            >  
 
            { 
              data?.map( (movie,index) => {
                let mediaType;
                if(movie?.original_title){
                  mediaType = 'movie'  
                }
                else{
                  mediaType = "tv"
                }

                return(
                <Link style={{ textDecoration:'none',marginLeft:20}} to = {`/${mediaType}/${movie.id}`} key={index}>
                  <MovieCardHome movie={movie} loading={loading} key={index} />
                </Link>  
                  )
                })
              }
 
            </Carousel>}

    </MainBox>
  }
  </>
  )
}

export default CarouselComp

import React from 'react';
import { Box,Rating,Typography,styled } from "@mui/material";
import { useSelector } from 'react-redux';
import Ratings from '../Ratings';
import Img from "../LazyLoading/Img";
import dayjs from 'dayjs';
///////////////////////////////////////////////

const MainBox = styled(Box)({
    color:'#fff',
    position:"relative",
    marginRight:10,
    height:'36rem',

})

const MovieImg = styled(Img)(({theme}) =>({
    width:'100%',
    height:'30rem',
    objectFit:'contain',
    borderRadius:10,
}))
const MovieTitle = styled(Typography)({
  display:'-webkit-box',
  '-webkit-box-orient':'vertical',
  '-webkit-line-clamp':'2',
  overflow:"hidden",
  fontSize:16,

})
  
///////////////////////////////////////MAIN FUNCTION STARTS/////////////////////////////
const MovieCardSearch = ( { movie,explore }) => {
 
    const{ url } = useSelector(state => state.home);
    const movieImg = url?.backdrop + movie?.poster_path;
    const blankImg = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
 
  return (
    
    <MainBox>
        {
          explore && 
          <Box sx={{ position:'absolute', top:450,left:20, zIndex:100}}>
            <Ratings rating={movie?.vote_average.toFixed(1)}/>
          </Box>
        }

        <MovieImg src={movie?.poster_path ? movieImg : blankImg  } alt="movieimg" />

        <Box sx={{ position:'absolute',bottom:0 }}>
          <MovieTitle>
            {movie.original_title || movie.name}
          </MovieTitle>
          <Typography sx={{ fontSize:14,color:'#7f8c8d'}}>{dayjs(movie.release_date || movie.first_air_date).format("MMM D,YYYY") }</Typography>
        </Box>

    </MainBox>
  )
}

export default MovieCardSearch
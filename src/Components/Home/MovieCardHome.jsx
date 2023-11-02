import React from 'react';
import { Box,Typography,styled } from "@mui/material";
import { useSelector } from 'react-redux';
import Ratings from '../Ratings';
import Img from '../LazyLoading/Img';
import dayjs from 'dayjs';
///////////////////////////////////////////////

const MainBox = styled(Box) (({theme}) => ({
    color:'#fff',
    display:"flex",
    flexDirection:'column',
    height:"70vmin",
    [theme.breakpoints.down('lg')]:{
    height:"auto",
    }
  
}))
const MovieImg = styled(Img)(({theme}) =>({
    width:'100%',
    height:'100%',
    objectFit:'cover',
    borderRadius:10,

}))
const MovieTitle = styled(Typography) (({theme}) => ({
  fontSize:16,
  margin:'1.5rem 0 0 0',
  display:"-webkit-box",
  '-webkit-box-orient':'vertical',
  '-webkit-line-clamp':'2',
  overflow:"hidden",
  
}))
  
///////////////////////////////////////MAIN FUNCTION STARTS/////////////////////////////
const MovieCardHome = ( { movie,loading }) => {
 
    const{ url } = useSelector(state => state.home);
    const movieImg = url?.backdrop + movie?.poster_path;
    const emptyImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
 
  return (
    <>
    {
      !loading &&

        <MainBox>
          
          <MovieImg src={movie?.poster_path ? movieImg : emptyImg} alt="movieimg" />

          <Box sx={{ position:'relative'}}>
            <Box sx={ { position:"absolute",top:-30,left:10}  }>
              <Ratings rating = {movie?.vote_average.toFixed(1)} />
            </Box>
            <MovieTitle>{movie?.original_title || movie?.name}</MovieTitle>
            <Typography sx={{ fontSize:14,color:'#7f8c8d'}}>{ dayjs(movie?.release_date).format("MMM DD, YYYY")}</Typography>
          </Box>

        </MainBox>
      }
    </>
  )
}

export default MovieCardHome
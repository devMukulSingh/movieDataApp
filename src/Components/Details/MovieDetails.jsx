import React, { useState } from 'react';
import { Box,styled,Typography } from "@mui/material";
import Ratings from '../Ratings.jsx';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Img from '../LazyLoading/Img.jsx';
import dayjs from 'dayjs';

///////////////////////////////////////////

const MainBox = styled(Box)(({theme}) =>({

}))
  
const MovieDetailsBox = styled(Box) (({theme}) => ({
    padding:'3rem 7rem',
     display:'flex',
     gap:'2rem',
     [theme.breakpoints.down('lg')]:{
      padding:'3rem 3rem',
    },
     [theme.breakpoints.down("md")]:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',

    },
    [theme.breakpoints.down('sm')]:{
      padding:'0 20px',
    }
}))
const StyledPosterImg = styled(Img) (({theme}) => ({
    width:'18rem',
    objectFit:'contain',
    borderRadius:10,
    [theme.breakpoints.down('lg')]:{
      width:'25rem'
    },
    [theme.breakpoints.down('sm')]:{
      borderRadius:0,
      width:'100vw',
    },


}))
const StyledBackdropImg = styled(Img) (({theme}) =>  ({
  width:'100%',
  opacity:'0.5 !important',
  [theme.breakpoints.down('lg')]:{
    height:"63rem",
    objectFit:'cover',
    opacity:'0.3 !important'
  },
  [theme.breakpoints.down('sm')]:{
      display:'none'
  },


}))
const DetailsBox = styled(Box)(({theme}) => ({
  gap:'1rem',
   display:'flex',
   flexDirection:'column', 
   zIndex:10,
   [theme.breakpoints.down('md')]:{

    alignItems:'center',

   }
}))


///////////////////////////////////////MAIN FUNCTION STARTS//////////////////////////////////////////////////////
const MovieDetails = ({data,url}) => {

    const posterUrl = url.backdrop + data?.poster_path;
    const backdropUrl = url.backdrop + data?.backdrop_path;
    const[openPlayer,setOpenPlayer ] = useState(false);
    const handlePlayBtn = () => {
        setOpenPlayer(true);
    }


  return (

    <MainBox>

         <Box sx={{ position:"absolute",height:'100rem',overflow:"hidden"}}>
          <StyledBackdropImg src={backdropUrl} alt="backdropUrl" />
        </Box>

      <MovieDetailsBox>

          <Box sx={{ zIndex:10}}>
            <StyledPosterImg src={posterUrl} alt="movieImg" />
          </Box>

          <DetailsBox>

              <Typography sx={{ fontSize:30, fontWeight:600}}>
                {data?.original_title || data?.name} 
                  <span style={{ fontSize:25,fontWeight:500,marginLeft:10}}>
                   ({ dayjs(data?.release_date || data?.first_air_date).format("YYYY")   })
                  </span>
                <Typography>{
              data?.genres?.map( (genre,index) => {
                return(
                  <>
                    {genre.name}{ index < data?.genres?.length-1 && ',' }
                  </>
                )

              })} </Typography>
              </Typography>

              <Box sx={{ display:'flex',gap:'1rem', zIndex:10}}>
                <Ratings rating = {data?.vote_average.toFixed(1)} movieDetails={true}/>
                <Typography>User <br />Score</Typography>
                <Typography sx={{display:'flex',alignItems:'center',gap:1,cursor:'pointer'}}>
                  Play Trailer <PlayCircleOutlineIcon fontSize='large' onClick = { () => handlePlayBtn() } />
                </Typography>

              </Box>

              <Typography sx={{ fontSize:14, color:'#f5f5f5',fontStyle:'italic'}}>{data?.tagline}</Typography>
          
              <Typography sx={{fontWeight:600,fontSize:20}}>
                Overview
                <Typography>{data?.overview}</Typography>
              </Typography>

          </DetailsBox>

      </MovieDetailsBox>

    </MainBox>
  )
}

export default MovieDetails
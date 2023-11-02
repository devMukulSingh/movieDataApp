import React, { useState } from 'react';
import { Box,styled,Typography, Divider } from "@mui/material";
import useFetch from '../../Hooks/useFetch';
import VideoCard from "./VideoCard";
//////////////////////////////////////////////////////////////////

const MainBox = styled(Box) (({theme}) => ({
  padding:'1rem 7rem',
  [theme.breakpoints.down('md')]:{
    padding:'0.5rem 2rem'
  }
}))

const DividerStyled = styled(Divider) (({theme}) => ({
  borderColor:'#fff',
  margin:'2rem auto',
}))
////////////////////MAIN FUNCTION STARTS//////////////////////////////////

const MovieVideosSection = ({mediaType,id}) => {

  const{data,loading } = useFetch(`/${mediaType}/${id}/videos`);

  return (
    <>
      {
        !loading && data?.results &&
        <MainBox>
          <Typography sx={{ fontSize:20, fontWeight:600}}>Official Videos</Typography>
          <Box sx={{display:'flex',gap:'1rem',overflowX:'scroll',position:'relative'}}>
            {
              !loading &&
              data?.results?.map( (video,key) => {
                return(
                  <VideoCard video={video} key={video?.id}/>
                  )
                })
              }

          </Box>
        <DividerStyled/>
    </MainBox>
  }

  </>
  )
}

export default MovieVideosSection
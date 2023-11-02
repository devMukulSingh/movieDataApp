import React from 'react';
import { Box,Typography, styled,Divider} from "@mui/material";
import useFetch from '../../Hooks/useFetch';
import CarouselRecommended from './CaruselRecommended';
////////////////////////////////////////////////////////////////////////////////

const MainBox = styled(Box) (({theme}) =>  ({
  position:"relative",
  width:'85vw',
  margin:'0 auto',
  [theme.breakpoints.down('lg')]:{
    // margin:0,
    // width:'90vw',
    // padding:'0 1rem'
  },

}))
const RecommendationBox = styled(Box) (({theme}) =>  ({

    display:"flex",
   [theme.breakpoints.down('lg')]:{
    // padding:'20px',
   }
}))
const CarouselBox = styled(Box) (({theme}) => ({
    [theme.breakpoints.down('lg')]:{
        // width:'100vw',
        margin:0,
    },
    [theme.breakpoints.down('sm')]:{
        // padding:'10px'
       }
}))
const DividerStyled = styled(Divider) (({theme}) => ({
  borderColor:'#fff',
  margin:'2rem auto',
}))

////////////////////////MAIN FUNCTION STARTs/////////////////////////////////////////
const Recommendations = ( { mediaType,id} ) => {

  const{ data,loading } = useFetch(`/${mediaType}/${id}/similar`); 

  return (
    <>
      {

        !loading && data?.results &&
        <MainBox>   
            <RecommendationBox >
                <Typography sx={{fontSize:'1.3rem',fontWeight:600}}>Recommended</Typography>
            </RecommendationBox>
              
            <CarouselBox>
            {
                !loading &&
                <CarouselRecommended data={data?.results} loading={loading} />

            }
            </CarouselBox>

            
        <DividerStyled  />
        </MainBox>
      }
    </>
  )
}

export default Recommendations
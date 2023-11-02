import React, { useEffect, useState } from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Typography, styled,Divider } from "@mui/material";
import useFetch from '../../Hooks/useFetch';
import CarouselComp from './CarouselComp';
import { getTrendingSectionLoading } from "../../Redux/loadingSlice.js";
import { useDispatch } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////

const MainBox = styled(Box) (({theme}) =>  ({
  width:"70vw",
  margin:'1rem auto 0 auto',
  [theme.breakpoints.down('lg')]:{
    margin:'1rem 0 0 0',
    width:'100vw',
    padding:'0 20px',
  },

}))
const ToggleButtonStyled = styled(ToggleButton)({
    color:"#000",
    textTransform:"none",
    width:'5rem',
    borderRadius:100,
    border:'none',

    '&:select':{
      background: 'linear-gradient(194deg, rgba(255,76,0,1) 42%, rgba(245,110,0,1) 59%)',
      transition: 'background 1s ease-in-out',
      color:'#fff',
    }
})
const TrendingBox = styled(Box) (({theme}) =>  ({
  display:"flex",
   justifyContent:'space-between',
   alignItems:'center',
  //  marginBottom:"1rem",

   [theme.breakpoints.down('sm')]:{
    flexDirection:'column',
    gap:20,
   }

}))
const CarouselBox = styled(Box) (({theme}) => ({
 

}))
const DividerStyled = styled(Divider) (({theme}) => ({
  borderColor:'#fff',
  margin:'1rem auto 2rem auto', 
}))

////////////////////////MAIN FUNCTION STARTs/////////////////////////////////////////
const Trending = () => {
 
  const dispatch = useDispatch();
  const[btnValue,setBtnValue] = useState('day');
  const[timeFrame,setTimeFrame] = useState('day');

  const{ data,loading } = useFetch(`/trending/movie/${timeFrame}`); 
  dispatch(getTrendingSectionLoading(loading));

  
  const handleChange = (e,newAlignment) => {
    e.preventDefault();
    setBtnValue(newAlignment);
    setTimeFrame(e.target.value);


  }
  return (
    <>
    {
      !loading &&
      
        <MainBox>   

          <TrendingBox >
            <Typography sx={{fontSize:'1.3rem',fontWeight:600}}>Trending</Typography>
            <ToggleButtonGroup sx={{background: '#fff', width:'10rem',padding:'2px 5px',borderRadius:10,height:'2.4rem',}}
              exclusive
              onChange={handleChange}
              value={btnValue}
              >
              <ToggleButtonStyled value="day" >
                Day
              </ToggleButtonStyled>
              <ToggleButtonStyled value="week" >
                Week
              </ToggleButtonStyled>
            </ToggleButtonGroup>
         </TrendingBox>
          
          <CarouselBox >
          {
            !loading &&
           <CarouselComp data={data?.results} loading={loading} recommended={false}/>
          
          } 
          <DividerStyled  />
          </CarouselBox>

      </MainBox>
  }
  </>
  )
}

export default Trending
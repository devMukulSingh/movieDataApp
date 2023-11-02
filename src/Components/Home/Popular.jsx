import React, { useEffect, useState } from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Typography, styled,Divider} from "@mui/material";
import useFetch from '../../Hooks/useFetch';
import CarouselComp from './CarouselComp.jsx';


const MainBox = styled(Box) (({theme}) =>  ({
  width:"70vw",
  [theme.breakpoints.down('lg')]:{
    margin:0,
    width:'100vw',
    padding:'0 20px',
  },
  margin:'0 auto 0 auto',

}))
const ToggleButtonStyled = styled(ToggleButton)({
    color:"#000",
    textTransform:"none",
    width:'7rem',
    borderRadius:100,
    border:'none',

    '&:select':{
      background: 'linear-gradient(194deg, rgba(255,76,0,1) 42%, rgba(245,110,0,1) 59%)',
      transition: 'background 1s ease-in-out',
      color:'#fff',
    }
})
const PopularBox = styled(Box) (({theme}) =>  ({
  display:"flex",
   justifyContent:'space-between',
   alignItems:'center',

   [theme.breakpoints.down('sm')]:{
    flexDirection:'column',
    gap:20,
   }

}))
const CarouselBox = styled(Box) (({theme}) => ({
 

}))
const DividerStyled = styled(Divider) (({theme}) => ({
  borderColor:'#fff',
  margin:'2rem auto', 
}))
////////////////////////MAIN FUNCTION STARTs/////////////////////////////////////////
const Popular = () => {
 
  const[btnValue,setBtnValue] = useState('movie');
  const[endpoint,setEndpoint] = useState('movie');

  const{ data,loading } = useFetch(`/${endpoint}/popular`); 

 
  const handleChange = (e,newAlignment) => {
    e.preventDefault();
    setBtnValue(newAlignment);
    setEndpoint(e.target.value);

  }
  return (
    <>
    {
      !loading && 

       <MainBox>   
            <PopularBox >
              <Typography sx={{fontSize:'1.3rem',fontWeight:600}}>What's Popular</Typography>
              <ToggleButtonGroup sx={{background: '#fff', width:'12rem',padding:'2px 5px',borderRadius:10,height:'2.4rem',}}
                exclusive
                onChange={handleChange}
                value={btnValue}
                >
                <ToggleButtonStyled value="movie" >
                  Movies
                </ToggleButtonStyled>
                <ToggleButtonStyled value="tv" >
                  TV Shows
                </ToggleButtonStyled>
              </ToggleButtonGroup>
          </PopularBox>
            
          <CarouselBox>
          {
              !loading &&
              <CarouselComp data={data?.results} loading={loading}/>
              
          }
          <DividerStyled  />

          </CarouselBox>

      </MainBox>

  }

  </>
  )
}




export default Popular
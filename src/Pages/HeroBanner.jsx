import React, { useEffect, useState } from 'react';
import { Box, styled, InputBase, Button, Typography } from "@mui/material";
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../Components/LazyLoading/Img.jsx';
import { LinearProgress } from '@mui/material';
import { getHeroSectionLoading } from '../Redux/loadingSlice';
/////////////////////////////////////////////////////////////

const MainBox = styled(Box)({
    padding:'0 !important',

})

const SearchBar = styled(Typography) (({theme}) => ({
    background:'#ffffff',
    color:'#000',
    width:'20rem',
    display:"flex",
     padding:'0 0 0 10px', 
     zIndex:999,
     marginTop:20,
     [theme.breakpoints.down('sm')]:{
        width:'18rem',
     }
}))
const ImgStyled = styled(Img) (({theme}) => ({
    width:'100vw',
    height:'70vh',
    objectFit:'cover',
    position:'relative',
    objectPosition:"top",

    [theme.breakpoints.down('lg')]:{
        width:'100vw',
        height:'50vh',
    }
}))
const ButtonStyled = styled(Button)({
    textTransform:'none',
    marginLeft:'auto',
    borderRadius:0,
    background:'linear-gradient(194deg, rgba(255,76,0,1) 42%, rgba(245,110,0,1) 59%)',

})
const InputBaseStyled = styled(InputBase)({
    width:'100%',
})
/////////////////////////////MAIN FUCNTION STARTS//////////////////////////////////
const HeroBanner = () => {

    const dispatch = useDispatch();
    const[background, setBackground] = useState('');
    const[query,setQuery ] = useState();
    const navigate = useNavigate();
    const{ data, loading } = useFetch("/movie/upcoming");
    const { url } = useSelector(state=> state.home);

    useEffect( () => {
        if(data){
            dispatch(getHeroSectionLoading(loading));  
            const bg = url.backdrop + data?.results[Math.floor(Math.random()* 20 )]?.backdrop_path;
            setBackground(bg);
        }
    },[data])

    const handleSearchBtn = (e) => {
        if(e.key==="Enter" && query.length>0){
            navigate(`/search/${query}`); 
        }
    }
  return (
    <>
      {
          loading ? <LinearProgress sx={{ marginTop:"10vh"}}/> :
    
          <MainBox>
            <Box sx={{ display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ImgStyled src={background} alt="backdropImg" />

                    <Box sx={{position:'absolute', display:'flex',flexDirection:"column",alignItems:'center'}}>
                        <Typography sx={{ color:'#bdc3c7',fontWeight:600,fontSize:'1.8rem',zIndex:999, textAlign:'center', marginTop:10}}>
                            Milions of Movies and TV Shows to discover.Explore Now
                        </Typography>
                        <SearchBar>
                            <InputBaseStyled onChange={ (e) => setQuery(e.target.value)} onKeyUp={ (e) => handleSearchBtn(e)}/>
                            <ButtonStyled variant='contained' >Search</ButtonStyled>
                        </SearchBar>
                    </Box>

            </Box>
            </MainBox>
            
        }
    </>

        
  )
}

export default HeroBanner
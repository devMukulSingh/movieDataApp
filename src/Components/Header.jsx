import { Box,styled, AppBar, Toolbar, Typography, Dialog,InputBase, Button, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from "../Assets/movix-logo.png";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Close from '@mui/icons-material/Close';
/////////////////////////////////////////////////////////////
 
const MainBox = styled(Box)({
   
})

const AppBarStyled = styled(AppBar)({
  zIndex:100,
  height:'10vh',
  boxShadow:'none', 
  background:'rgba(0,0,0,0.25)',
  // backdropFilter:'blur(3.5px)',
})
const MenuIconStyled = styled(MenuIcon)(({theme}) =>({
  display:'none',
  [theme.breakpoints.down('sm')]:{
    display:'block',
  }
}))
const InputBaseStyled = styled(InputBase)({
  width:'100%',
})
const SearchBar = styled(Typography)({
  background:'#ffffff',
  color:'#000',
  width:'30rem',
  display:"flex",
   padding:'5px 10px', 
   borderRadius:1,
   alignItems:"center",
   zIndex:999,
})
const SearchDialog = {
  position:'absolute',
  top:43,
}
const Logo = styled(Link)({
  textDecoration:"none",
  color:'#fff',
  display:'flex',
  alignItems:'center',
  gap:10,
})
const ButtonStyled = styled(Button)({
  color:'#fff',
  textTransform:'none',
  fontSize:16,
  ' &:hover':{
    transition:'background 1s ease-in',
    background:'linear-gradient(194deg, rgba(255,76,0,1) 42%, rgba(245,110,0,1) 59%)',
  },
  
})
const NavLinkBox = styled(Box) (({theme}) => ({
  marginLeft:'auto',
  display:'flex',
  gap:20,
  alignItems:'center',
    [theme.breakpoints.down('sm')]:{
      '&>:nth-child(-n+2)':{
          display:"none",
      }
    }
}))
const DrawerStyled ={
    padding:'5px 10px',
    background:'#010D16 !important',
    marginTop:'4rem',
    position:'relative',
    width:'100%'

  }


/////////////////////////////MAIN FUNCTION STARTS///////////////////////////////////////
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const[openSearch,setOpenSearch] = useState(false);
  const[ showNavbar, setShowNavbar ] = useState(true);
  const[ lastScrollY, setLastScrollY] = useState(0);
  const[query,setQuery ] = useState('');
  const[openDrawer,setOpenDrawer] = useState(false);
  
  useEffect( () => {
      window.scrollTo(0,0);
  },[location])
  
  useEffect( () => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll",controlNavbar);
    }
  },[lastScrollY])

  const controlNavbar = () => {
      if(window.scrollY > 200){ 
        if(window.scrollY > lastScrollY)
          setShowNavbar(false);
          else{
            setShowNavbar(true);
          }
      }
      setLastScrollY(window.scrollY);
  }

  const openSearchBar = () => {
    setOpenSearch(true);
  }
  const handleCloseSearch = () => {
    setOpenSearch(false);
  }
 const handleSearchBtn = (e) => {
  if(e.key==="Enter" && query?.length > 0){
    navigate(`/search/${query}`);
    setOpenSearch(false);
  }
 }

 const handleMovieBtn = (mediaType) => {
    navigate(`/explore/${mediaType}`);
    setOpenDrawer(false);
 }

 const handleOpenDrawer = () => {
  setOpenDrawer(true);
 }
 const onCloseDrawer = ( ) => {
  setOpenDrawer(false);
 }
  return (
    <MainBox>

        <AppBarStyled position="fixed" sx={ showNavbar ? {} :  {display:'none'} } >
          <Toolbar sx={{ display:'flex', gap:1, alignItems:'center',justifyContent:'center'}}>
            <Logo to="/">
              <img src={logo} alt="logo" style={ { width:'3rem' }} />
              <Typography>Movix</Typography>
            </Logo>
           <NavLinkBox>
              <ButtonStyled onClick = { () => handleMovieBtn('movie') } > Movies </ButtonStyled>
              <ButtonStyled onClick = { () => handleMovieBtn('tv') } > TV Shows </ButtonStyled>
              <SearchIcon onClick = { () => openSearchBar() } sx={{ cursor:"pointer"}}/>
              <MenuIconStyled onClick={ handleOpenDrawer}/>
            </NavLinkBox> 
          </Toolbar>
        </AppBarStyled>

        <Dialog
          open = {openSearch}
          onClose = { () => handleCloseSearch() }
          hideBackdrop={true}
          PaperProps={{ sx: SearchDialog}}
          >
          <SearchBar>
            <InputBaseStyled onChange={ (e) => setQuery(e.target.value)} onKeyUp={ (e) => handleSearchBtn(e) }/>
            <SearchIcon onClick = { () => openSearchBar() } sx={{ cursor:"pointer"}}/>
          </SearchBar>

        </Dialog>

        <Drawer
          open = {openDrawer}
          onClose={onCloseDrawer}
          anchor='top'
          elevation={30}
          hideBackdrop={true}
          PaperProps={ { sx: DrawerStyled }}
          > 
              <Close onClick = { onCloseDrawer } sx={{ color:'#fff', position:'absolute',right:15}} />
              <ButtonStyled sx={{ width:'6rem'}} onClick = { () => handleMovieBtn('movie') } > Movies </ButtonStyled>
              <ButtonStyled sx={{ width:'6rem'}} onClick = { () => handleMovieBtn('tv') } > TV Shows </ButtonStyled>
          </Drawer>

    </MainBox>
  )
}

export default Header
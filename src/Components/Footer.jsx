import React from 'react';
import { Box,Typography,styled } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
 

const MainBox = styled(Box)({
    display:'flex',
    flexDirection:"column",
    alignItems:"center",
    justifyContent:'center',
    background:'#020C1B',
    padding:"3rem 0",
    marginTop:'1.5rem',

  })
  const FooterText = styled(Typography)({
    '&:hover':{
      color:"#F59408",
      cursor:"pointer",
    }
  })
  const FooterBox = styled(Box) (({theme}) =>  ({
    display:'flex',
    gap:20,
      [theme.breakpoints.down('sm')]:{
        flexDirection:'column',

      }
  }))
const Footer = () => {
 
  return (

    <MainBox>

      <FooterBox>
        <FooterText>Terms of Use</FooterText>
        <FooterText>Privacy Policy</FooterText>
        <FooterText>Contact Us</FooterText>
        <FooterText>About Us</FooterText>
      </FooterBox>

      <Box sx={{ display:'flex',gap:2,marginTop:'2rem'}}>
          <FacebookRoundedIcon fontSize='large' sx={{ cursor:"pointer"  }}/>
          <InstagramIcon fontSize='large' sx={{ cursor:"pointer"  }}/>
          <TwitterIcon fontSize='large'sx={{ cursor:"pointer"  }}/>
          <LinkedInIcon fontSize='large'sx={{ cursor:"pointer"  }}/>
      </Box>

    </MainBox>
  )
}

export default Footer
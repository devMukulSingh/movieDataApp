import { Box, styled } from '@mui/material';
import React from 'react'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MainBox = styled(Box)({
    borderRadius:'50%',
    background:'#fff',
    width:'3rem',
    height:'3rem',
    color:'#000',
    display:'flex',
    alignItems:'center',
    justifyContent:"center",
    fontSize:14,

})

const Ratings = ( { rating,movieDetails } ) => {
  return (
    <MainBox sx={ movieDetails && { height:'4rem',width:'4rem' } }>
        <CircularProgressbar
            value = {rating}
            text = {rating}
            maxValue={10}
            styles={buildStyles({
                pathColor:
                rating < 5 ? "red" : rating < 7 ? "orange" : "#4cd137",
                textSize:'28px',
                textColor:'#000',
            })}
            />
    </MainBox>

  )
}

export default Ratings
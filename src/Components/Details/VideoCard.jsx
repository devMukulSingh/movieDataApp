import {React,useState} from 'react'
import { Box,Typography,styled } from "@mui/material";
import VideoPlayer from './VideoPlayer';

//////////////////////////////////////////////////////////////////

const ThumbnailImg = styled('img')({
  width:'25rem',
})
const VideoTitle = styled(Typography)({
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '2',
  overflow:'hidden'
})
////////////////////////////MAIN FUNCTION STARTS////////////////////////////////////

const VideoCard = ( {video} ) => {

    const[openVideo,setOpenVideo] = useState(false);

    const handleVideoClick = () => {
      setOpenVideo(true); 
    }


  return (
    <Box>
            
        <Box onClick={ () => handleVideoClick() } >
            <ThumbnailImg src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} alt="videoThumbnail" />
        </Box>

        <VideoPlayer openVideo={openVideo} setOpenVideo={setOpenVideo} id={video?.key}/>

        <VideoTitle sx={{ lineClamp:'2',}}>{video?.name}</VideoTitle>

  </Box>
  )
}

export default VideoCard
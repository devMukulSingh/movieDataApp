import { CircularProgress, Grid, Typography,styled} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from '../Utils/api';
import MovieCardSearch from "../Components/Search/MovieCardSearch";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import { getPageNum } from '../Redux/homeSlice';
import { getSearchPageLoading } from '../Redux/loadingSlice';
/////////////////////////////////////////////////////////////////////////////

const MainGrid = styled(Grid) (({theme}) =>  ({
  marginTop:'10vh',
  padding:'1rem 3rem',

  [theme.breakpoints.down('lg')]:{
    padding:'1rem 1rem',
  }
}))
const StyledGrid = styled(Grid)({
  marginBottom:'3rem',
  overflow:'hidden',
  display:"flex",
  justifyContent:"center",
  alignItems:'center',
  // marginRight:'10px',
})

/////////////////////////MAIN FUNCTION STARTs///////////////////////////////////////////
const SearchResults = () => {

  const[loading,setLoading] = useState(false);
  const[pageNum,setPageNum] = useState(1);
  const[apiResult,setApiResult] = useState(null);
  const{ query } = useParams();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getPageNum(pageNum));
    setPageNum(1);
    fetchInitalData();
    dispatch(getSearchPageLoading(loading));
  },[query]);

  const fetchInitalData = async() => {
    setLoading(true);
    const res = await fetchDataFromApi(`/search/movie?query=${query}&page=${pageNum}`);
    setPageNum(page => page+1);
    setApiResult(res);
    setLoading(false);
  }

  const fetchNextPage = async() => {

    const res = await fetchDataFromApi(`/search/movie?query=${query}&page=${pageNum}`);
    setApiResult({
      ...apiResult, results:[...apiResult.results,...res.results]
    });
    setPageNum(page => page+1);

  }

  ////////////////////////////////////////////////////JSX PART///////////////////////////////////////////////////
  return (
      <MainGrid container 
        direction='row'
        justifyContent='center'
        alignItems='center'
        >
        { 
          loading ? <CircularProgress/> :
          apiResult?.results?.length > 0 ? 
            apiResult?.results?.map( (movie,index) => {
                return(
                  <StyledGrid items lg={3} md={4} sm={6} xs={12} key={index}>
                    <InfiniteScroll
                      dataLength={apiResult?.results?.length || [] }
                      next={fetchNextPage}
                      // loader={<CircularProgress/>}
                      hasMore={ pageNum <= apiResult?.total_pages }
  
                      >
                        <Link to = {`/movie/${movie?.id}`} style={{ textDecoration:'none' }}>
                          <MovieCardSearch movie={movie} explore={false}/>
                        </Link>
                    </InfiniteScroll>
                    </StyledGrid>
                )
              })
              :
              <Typography sx={{ fontWeight:600}}>Sorry, No Search Results Found</Typography>
            }
      </MainGrid>

  )
}

export default SearchResults
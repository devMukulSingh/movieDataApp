import { Box, styled,Grid, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../Utils/api';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import MovieCardSearch from '../Components/Search/MovieCardSearch';
import Select from 'react-select';
import useFetch from "../Hooks/useFetch";
import { useDispatch } from 'react-redux';
import { getExplorePageLoading } from "../Redux/loadingSlice";
//////////////////////////////////////////////////////////////////////
const MainBox = styled(Box)(({theme}) => ({
  marginTop:'10vh',
  padding:'2rem 4rem',
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
const FilterBox = styled(Box) (({theme}) => ({
  display:"flex",
  padding:'0 1rem 2rem 0.5rem',

  [theme.breakpoints.down('md')]:{
      alignItems:"center",
      justifyContent:'center',
      flexDirection:'column',
      gap:20,
  },
  
  ' & > div ': {
    display:'flex',
    alignItems:'center',
    gap:10,
    marginLeft:'auto',

    [theme.breakpoints.down('md')]:{
      flexDirection:"column",
      marginLeft:0,
      gap:10
    }
  }

}))

const SelectGenres = styled(Select) (({theme}) =>  ({
  color:'#000 !important',
  minWidth:"15rem",
  [theme.breakpoints.down('md')]:{
    width:'65vmin',
  }

}))
const SelectSort = styled(Select)  (({theme}) => ({
    color:'#000',
    minWidth:'15rem',
    [theme.breakpoints.down('md')]:{
      width:'65vmin',
    },
}))
let filters = {};
/////////////////////////////MAIN FUNCTION STARTS//////////////////////////////////
const Explore = () => {

  const sortByData = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'vote_average.desc', label: 'Vote Average Descending' },
    { value: 'vote_average.asc', label: 'Vote Average Ascending' },
    { value: 'primary_release_date.desc', label: 'Release Date Descending' },
    { value: 'primary_release_date.asc', label: 'Release Date Ascending' },

  ];

  const dispatch = useDispatch();
  const { mediaType } = useParams();
  const [apiResult,setApiResult] = useState(null);
  const [ pageNum,setPageNum ] = useState(1);
  const [ genres, setGenres ] = useState(null);
  const [sortByFilter, setSortByFilter ] = useState(null);
  const [loading,setLoading] = useState(null);



  useEffect( () => {
    
    dispatch(getExplorePageLoading(loading));
    filters = {}; 
    setApiResult(null);
    setSortByFilter(null);
    setGenres(null);
    setPageNum(1);
    fetchInitalData();


  },[mediaType]);

  

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitalData = async() => {

    setLoading(true);
    const res = await fetchDataFromApi(`/discover/${mediaType}`,filters);
    setApiResult(res);
    setPageNum( prev => prev+1);
    setLoading(false);
  }
  const fetchNextPage = async() => {
    const res = await fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`,filters);
    setApiResult({
      ...apiResult, results:[...apiResult.results, ...res.results]
    });
    setPageNum( prev => prev+1);

  
  }

  const handleFilters = (selectedItems,action) => {
      if(action.name==="sortbydata"){
          setSortByFilter(selectedItems);
            if(action.action !== "clear"){
              filters.sort_by = action.value;
            }
            else{
              delete filters.sort_by;
            }
        
      }
      if(action.name==="genres"){
          setGenres(selectedItems);
            if(action.action !== "clear"){
              let genreId = selectedItems?.map( g => g.id);
              console.log(genreId);
              genreId = JSON.stringify(genreId).slice(1,-1);
              filters.with_genres = genreId;
            }
            else{
              delete filters.with_genres;
            }
      }
      setPageNum(1);
      fetchInitalData();
  }

  return (
      <>
        {
          loading ? <LinearProgress sx={{ marginTop:'10vh'}}/> : 
          <MainBox>

            <FilterBox>
              <Typography sx={{ fontSize:25,fontWeight:600}}>
                Explore { mediaType==="movie" ? "Movies" : "TV Shows" }
              </Typography>

                <Box >
                  <SelectGenres
                    isMulti
                    name='genres'
                    value={genres}
                    options={genresData?.genres}
                    onChange={handleFilters}
                    className="react-select-container genresDD"
                    classNamePrefix="react-select"
                    placeholder="Select genres"
                    closeMenuOnSelect={false}
                    getOptionLabel={ (option) => option.name }
                    getOptionValue={ (option) => option.id }

                  />
                  <SelectSort
                      name='sortbydata'
                      closeMenuOnSelect={false}
                      value={sortByFilter}
                      options={sortByData}
                      onChange={handleFilters}
                      className="react-select-container genresDD"
                      classNamePrefix="react-select"
                      placeholder="Sort By"
                    />
              </Box>

            </FilterBox>

            <Grid container 
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            { 
              apiResult?.results?.map( (movie,index) => {
                  return(
                    <StyledGrid items lg={3} md={4} sm={6} xs={12} key={index}>
                      <InfiniteScroll
                        dataLength={apiResult?.results?.length || 0 }
                        next={fetchNextPage}
                        hasMore={ pageNum <= apiResult?.total_pages }
                        >
                          <Link to = {`/${mediaType}/${movie?.id}`} style={{ textDecoration:'none' }}>
                            <MovieCardSearch movie={movie} explore={true}/>
                          </Link>
                      </InfiniteScroll>
                      </StyledGrid>
                  )
                })
              }
        </Grid>

      </MainBox> 
      }

      </>

  )
}

export default Explore
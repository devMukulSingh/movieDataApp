import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../Utils/api";


const useFetch = (url) => {
    const[loading,setLoading] = useState(null);
    const[data, setData] = useState(null);
    const[error, setError ] = useState(null);

    useEffect( () => {
         fetchData();
    },[url]);

    const fetchData = async() => {
     try {
           setLoading(true);
           const results  = await fetchDataFromApi(url);
           setData(results);
           setLoading(false);
     } catch (error) {
        setLoading(false);
        setError(error);

     }
    }

    return { loading,data,error }
}
export default useFetch;
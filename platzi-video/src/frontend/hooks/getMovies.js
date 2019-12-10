
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/movies');
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return movies;
};

export default useGetMovies;

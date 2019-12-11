/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get('/movies');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyMovies = async () => {
    try {
      const { data } = await axios.get('/user-movies');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const response = await Promise.all([fetchMovies(), fetchMyMovies()]);
    setMovies(response[0]);
    setMyMovies(response[1]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    movies,
    myMovies,
  };
};

export default useGetMovies;

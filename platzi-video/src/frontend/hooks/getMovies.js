/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get('/movies');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserMovies = async () => {
    try {
      const { data } = await axios.get('/user-movies');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const response = await Promise.all([fetchMovies(), fetchUserMovies()]);
    setUserMovies(response[1]);
    setMovies(response[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    movies,
    userMovies,
  };
};

export default useGetMovies;

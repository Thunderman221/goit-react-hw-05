import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTM1NDE1NThhMTRiNGVhZjljMTJhNTZlY2Q4YWIwYSIsIm5iZiI6MTcyNzUxMTgxMi4xODIzNjMsInN1YiI6IjY2ZjdiYWVjMTQwZmJmNmExYTVmMWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzVfiAiV202zoTsDnsiueF5wlrQOy3dMOy3cjVTuO-c";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint, params = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params,
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchMovieId = async (movieId) => {
  return fetchMovies(`/movie/${movieId}`);
};

export const fetchCastById = async (movieId) => {
  return await fetchMovies(`/movie/${movieId}/credits`);
};

export const fetchReviewsById = async (movieId) => {
  return await fetchMovies(`/movie/${movieId}/reviews`);
};

import axios from "axios";

// Fonction fetch movies en fonction de l'input query

export const searchMovies = async (query) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=" +
      query +
      "&language=fr-FR",
  );
  return response.data.results;
};

// Fonction fetch movies en fonction de la popularité

export const searchPopularMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR",
  );
  return response.data.results;
};

// Fonction fetch movies en fonction de l'ID du film

export const searchIdMovies = async (id) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR",
  );
  return response.data;
};

// Fonction fetch movies en fonction d'autres critères

export const searchTypeMovies = async (genre, vote, year) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&with_genres=" +
      genre +
      "&vote_average.gte=" +
      vote +
      "&primary_release_year=" +
      year,
  );
  return response.data.results;
};

// Récuperer le tableau des genres avec ids

export const getGenre = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR",
  );
  return response.data.genres;
};

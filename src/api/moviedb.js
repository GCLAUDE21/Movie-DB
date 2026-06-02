import axios from "axios";

// Fonction fetch movies en fonction de l'input query

export const searchMovies = async (query, page) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=" +
      query +
      "&language=fr-FR&page=" +
      page,
  );
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

// Fonction fetch movies en fonction de la popularité

export const searchPopularMovies = async (page) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&page=" +
      page,
  );
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
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

export const searchTypeMovies = async (genre, vote, year, page) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&with_genres=" +
      genre +
      "&vote_average.gte=" +
      vote +
      "&primary_release_year=" +
      year +
      "&page=" +
      page,
  );
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

// Récuperer le tableau des genres avec ids

export const getGenre = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR",
  );
  return response.data.genres;
};

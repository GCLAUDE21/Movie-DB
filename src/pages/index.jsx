import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { searchMovies, searchPopularMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';



const index = () => {
    const [movies, setMovies] = useState([])
    


    // Fetch lancé uniquement par la recherche dans le header
    const handleSearch = async (query) => {
        const films = await searchMovies(query)
        setMovies(films)
    }   


    // Fetch utilisé au chargement de la page (useEffect) trié par popularité
  useEffect( () =>  {
    const fetchPopular = async () => {
        const films = await searchPopularMovies();
        setMovies(films)
    }
    fetchPopular()

  }, [])


    return (
        <>
        < Header onSearch={handleSearch}  />
        <section className="resultat">
            {movies.map((movie) => (
                < MovieCard key={movie.id} movie={movie} />
            ) )}
        </section>

        < Footer />
        </>
    );
};

export default index;
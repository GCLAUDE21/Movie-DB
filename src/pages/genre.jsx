import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchTypeMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';

const genre = () => {

    const {id} = useParams() // recupere l'id genre dans l'adresse 
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        const fetchGenre = async () => {
            const films = await searchTypeMovies(id,"","")
            setMovies(films)
        }
        fetchGenre()

    }, [])
    


    return (
         <section className="resultat">
            {movies.map((movie) => (
                < MovieCard key={movie.id} movie={movie} />
            ) )}
        </section>
    );
};

export default genre;
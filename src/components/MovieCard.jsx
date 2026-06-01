import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({movie}) => {
    return (
       < Link to={`/movie/${movie.id}`}> <div className="cardMovie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`Affiche de  ${movie.title}`} />
            <h3>{movie.title}</h3>
            <span>{movie.vote_average}</span>
            <span>{ new Date(movie.release_date).toLocaleDateString("fr-FR")}</span>

        </div> </ Link>
    );
};

export default MovieCard;
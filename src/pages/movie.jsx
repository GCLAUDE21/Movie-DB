import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { searchIdMovies } from '../api/moviedb';

const movie = () => {

    const { id } = useParams() // Recupere l'id du film via l'url
    const [movie, setMovie] = useState({})
    const navigate = useNavigate() // permet d'appeler le retour a la page -1

    useEffect(() => {
        const fetchMovie = async () => {
            const film = await searchIdMovies(id)
            setMovie(film)
        };
        fetchMovie()
    }, [id])


    return (
        <>
        <div className="cardFocus">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`Affiche de  ${movie.title}`} />
            <h3>{movie.title}</h3>
            <h4>"{movie.tagline}"</h4>
            <span>{movie.release_date && "Sortie le " + new Date(movie.release_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</span>
            <ul>{movie.genres?.map((genre) => (
                < Link to={`/genre/${genre.id}`}> <li key={genre.id}>{genre.name}</li> </Link >
            ))}</ul>
            <span>Note : {movie?.vote_average?.toFixed(1)}</span>
            <span>{ movie.budget > 0 && ` Budget : ${movie.budget.toLocaleString("fr-FR")} €`}</span>
            <p>{movie.overview}</p>

            <button onClick={() => navigate(-1)}>Retour</button>

            
        </div>
        </>
    );
};

export default movie;
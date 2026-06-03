import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { searchIdMovies } from '../api/moviedb';
import Header from '../components/Header';
import Footer from '../components/Footer';

const movie = () => {

    const { id } = useParams() // Recupere l'id du film via l'url
    const [movie, setMovie] = useState({})
    const navigate = useNavigate() // permet d'appeler le retour a la page -1
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const film = await searchIdMovies(id)
                if (!film) {
                    setError(true)
                } else {
                    setMovie(film)
                    setError(false)
                }
            } catch (err) {
                setError(true)
            }
        };
        fetchMovie()
    }, [id])


    return (
        <>
        < Header />
        {error ? <h3>Aucun film trouvé</h3> : <div className="cardFocus">
            <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt={`Affiche de  ${movie.title}`} />
            <h2>{movie.title}</h2>
            {movie.tagline && <h4> " {movie.tagline} " </h4>}
            <span>{movie.release_date && "Sortie le " + new Date(movie.release_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</span>
            <ul>{movie.genres?.map((genre) => (
                < Link key={genre.id} to={`/genre/${genre.id}`}> <li>{genre.name}</li> </Link >
            ))}</ul>
            <span>Note : {movie?.vote_average?.toFixed(1)}</span>
            <span>{ movie.budget > 0 && ` Budget : ${movie.budget.toLocaleString("fr-FR")} €`}</span>
            {movie.runtime > 0 && <span>Durée : {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>}
            <p>{movie.overview}</p>

            <button onClick={() => navigate(-1)}>Retour</button>

            
        </div> }
        < Footer />
        </>
    );
};

export default movie;
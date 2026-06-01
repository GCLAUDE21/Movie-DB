import React, { useEffect, useState } from 'react';
import { getGenre, searchTypeMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';

const browse = () => {

    const [genre, setGenre] = useState("")
    const [vote, setVote] = useState("")
    const [year, setYear] = useState("")
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]) // tableau des genres


    //Fetch pour récuperer les genres
    useEffect(() => {
        const fetchGenres = async () => {
            const genress = await getGenre()
            setGenres(genress)
        };
        fetchGenres()

    }, [])


    //Fetch Types
    useEffect(() => {
        const fetchType = async () => {
            const films = await searchTypeMovies(genre, vote, year)
            setMovies(films)
        };
        fetchType();
    }, [genre,vote,year])

    return (
        <>
        <div className="filters">
            <h2>Recherches avancées</h2>

            <div className="options">
                <select onChange={(e) => setGenre(e.target.value)} name="genre" id="">
                    <option value="">Tous</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            <label htmlFor="note">Note minimum</label>
            <input id='note' onChange={(e) => setVote(e.target.value)} type="number" min={0} />
            <label htmlFor="year">Année de sortie</label>
            <input onChange={(e) => setYear(e.target.value)} id='year' type="text" />
            </div>
        </div>
        <div className="cards">
            {movies.map((movie) => (
                < MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        </>
    );
};

export default browse;
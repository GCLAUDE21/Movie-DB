import React, { useEffect, useState } from 'react';
import { getGenre, searchTypeMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const browse = () => {

    const [genre, setGenre] = useState("")
    const [vote, setVote] = useState("")
    const [year, setYear] = useState("")
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]) // tableau des genres
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(1)



    //Fetch pour récuperer les genres 
    useEffect(() => {
        const fetchGenres = async () => {
            try {
               const genress = await getGenre()
                   setGenres(genress) 
               
            } catch (err) {
                console.log(err);
            }
        }
        fetchGenres()

    }, [])


    //Fetch Types
    useEffect(() => {
        const fetchType = async () => {
            try {
                const {results, totalPages} = await searchTypeMovies(genre, vote, year, page)
                if (results.length == 0) {
                    setError(true)
                } else {
                    setMovies(results)
                    setTotalPages(totalPages)
                    setError(false)
                }
            } catch (err) {
                setError(true)
            }
        };
        fetchType();
    }, [genre,vote,year, page])

    return (
        <>
        < Header />
        <div className="filters">
            <h2>Recherches avancées</h2>

            <div className="options">
                <label htmlFor="genre">Genre</label>
                <select onChange={(e) => setGenre(e.target.value)} name="genre" id="genre">
                    <option value="">Tous</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            <label htmlFor="note">Note minimum</label>
            <input id='note' onChange={(e) => setVote(e.target.value)} type="number" min={0} max={10} />
            <label htmlFor="year">Année de sortie</label>
            <input onChange={(e) => setYear(e.target.value)} id='year' type="text" />
            </div>
        </div>
        {!error && <div className="navPage">
            <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédent</button>
            <span>==Page  {page}==</span>
            <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivant</button>
        </div> }
        <div className="cards">
            {error ? <h3>Aucun film trouvé</h3> : movies.map((movie) => (
                < MovieCard movie={movie} key={movie.id} />
            ))}
            
        </div>
        {!error && <div className="navPage">
            <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédent</button>
            <span>==Page  {page}==</span>
            <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivant</button>
        </div> }

        < Footer />
        
        </>
    );
};

export default browse;
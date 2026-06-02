import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { searchMovies, searchPopularMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';

const index = () => {
    const [movies, setMovies] = useState([]); //tableau des films
    const [searchParams] = useSearchParams(); //lire les params de l'url
    const queryFromUrl = searchParams.get("query"); //extrait query de l'url
    const [page, setPage] = useState(1); 
    const [error, setError] = useState(false); 
    const [totalPages, setTotalPages] = useState(1) 
    const [currentQuery, setCurrentQuery] = useState("") //stock la requete pour gérer le changement de page

    // Fetch lancé uniquement par la recherche dans le header
    const handleSearch = async (query) => {
        try {
            setPage(1)
            const {results, totalPages} = await searchMovies(query, 1);
            if (results.length == 0) {
                setError(true)
            } else {
                setMovies(results);
                setTotalPages(totalPages)
                setError(false)
                setCurrentQuery(query)
            }
        } catch (err) {
            setError(true);
        }
    };

    // joué au chargement & quand page ou queryFromUrl change
    useEffect(() => {
    const fetchData = async () => {
        try {
            const query = currentQuery || queryFromUrl;
            if (query) {
                const {results, totalPages} = await searchMovies(query, page);
                if (results.length === 0) {
                    setError(true)
                } else {
                    setMovies(results);
                    setTotalPages(totalPages);
                    setError(false);
                }
            } else {
                const {results, totalPages} = await searchPopularMovies(page);
                if (results.length === 0) {
                    setError(true)
                } else {
                    setMovies(results);
                    setTotalPages(totalPages);
                    setError(false);
                }
            }
        } catch (err) {
            setError(true);
        }
    };
    fetchData();
}, [page, queryFromUrl]);

    return (
        <>
            <Header onSearch={handleSearch} />
            {!error &&  <div className="navPage">
                <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédente</button>
                <span>Page {page}</span>
                <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivante</button>
            </div>}
            <section className="resultat">
                {error ? <h3>Aucun film trouvé</h3> : movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </section>
           {!error &&  <div className="navPage">
                <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédente</button>
                <span>Page {page}</span>
                <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivante</button>
            </div>}
            <Footer />
        </>
    );
};

export default index;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchTypeMovies } from '../api/moviedb';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const genre = () => {

    const {id} = useParams() // recupere l'id genre dans l'adresse 
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    
    useEffect(() => {
        const fetchGenre = async () => {
            try {
               const {results, totalPages} = await searchTypeMovies(id,"","", page)
            setMovies(results)
            setTotalPages(totalPages) 
            } catch (err) {
                console.log(err);
            }
            
        }
        fetchGenre()

    }, [id, page])
    


    return (
        <>
        < Header />
        <div className="navPage">
            <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédent</button>
            <span>==Page  {page}==</span>
            <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivant</button>
        </div>
         <section className="resultat">
            {movies.map((movie) => (
                < MovieCard key={movie.id} movie={movie} />
            ) )}
        </section>
        <div className="navPage">
            <button onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Précédent</button>
            <span>==Page  {page}==</span>
            <button onClick={() => totalPages !== page && setPage(page + 1)}>Suivant</button>
        </div>
        < Footer />
        </>
    );
};

export default genre;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({onSearch}) => {
    const [inputSearch, setInputSearch] = useState("code"); // Récupere la valeur de l'input
    const navigate = useNavigate()



    


    return (
        <header>
            <div className="header-container">
                <div className="logoMain"></div>
                <h1>Movie DB</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    // Si onSearche existe, on est sur la page index car passé en prop, sinon on lui passe la recherche dans l'url et on redirige
                    if (onSearch) {onSearch(inputSearch)} else {
                        navigate(`/?query=${inputSearch}`)
                    }
                }} >
                <input placeholder='Recherchez un film...' onChange={(e) => setInputSearch(e.target.value)} type="text" />
                <button type='submit'>Rechercher</button>
                </form>
                <nav>
                    <ul>
                        <li><Link to="/">Index</Link></li> -
                        <li><Link to="/browse">Films</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
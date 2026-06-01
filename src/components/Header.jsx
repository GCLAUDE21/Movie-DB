import React, { useState } from 'react';

const Header = ({onSearch}) => {
    const [inputSearch, setInputSearch] = useState("code"); // Récupere la valeur de l'input



    


    return (
        <header>
            <div className="header-container">
                <div className="logoMain"></div>
                <h1>Movie DB</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSearch(inputSearch)
                }} >
                <input  onChange={(e) => setInputSearch(e.target.value)} type="text" />
                <button type='submit'></button>
                </form>
            </div>
        </header>
    );
};

export default Header;
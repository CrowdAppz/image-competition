import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    render() {
        return (
            <div className="searchbar-container">
                <input className="search-input"
                       autofocus
                       placeholder="Search" />
            </div>
        );
    }
}

export default SearchBar;

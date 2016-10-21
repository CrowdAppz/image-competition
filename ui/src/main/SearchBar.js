import React from 'react';
import ActionSearch from 'material-ui/svg-icons/action/search';

import './SearchBar.css';

const iconStyle = {
    color: "white",
    marginRight: "24px"
};

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

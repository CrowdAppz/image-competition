import React from 'react';
import TextField from 'material-ui/TextField'
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
                <ActionSearch style={iconStyle} />
                <TextField className="search-input"
                           hint="Search"
                           floatingLabelText="Search" />
            </div>
        );
    }
}

export default SearchBar;

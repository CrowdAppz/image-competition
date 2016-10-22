import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {

    static propTypes = {
      onSearch : React.PropTypes.func
    }

    constructor(){
      super();
      this.state={text:""};
    }

    handleKeyPress(event) {
      if(event.key === 'Enter'){
        this.props.onSearch(this.state.text);
      }
    }

    handleChange(event) {
      this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className="searchbar-container">
                <input className="search-input"
                       autofocus
                       placeholder="Search"
                       onKeyPress={event => this.handleKeyPress(event)}
                       onChange={event => this.handleChange(event)}/>
            </div>
        );
    }
}

export default SearchBar;

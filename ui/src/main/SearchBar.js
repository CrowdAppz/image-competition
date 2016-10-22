import React from 'react';
import * as JsApi from '../client/js-api.js';
import AutoComplete from 'material-ui/AutoComplete';

import './SearchBar.css';

class SearchBar extends React.Component {

    static propTypes = {
      onSearch : React.PropTypes.func
    }

    constructor(){
      super();
      this.state = {text:"",
                    dataSource: []
                   };
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.props.onSearch(this.state.text);
      }
    }

    handleChange = (value) => {
      this.setState({text: value});
      this.props.onSearch(this.state.text);
    }

    handleUpdateInput = (value) => {
      this.setState({text: value});
      JsApi.autocomplete(value)
           .then(response => response.json())
           .then(json => this.setState({dataSource: json}))
    }

    render() {
        return (
            <div className="searchbar-container">
                <AutoComplete
                  hintText="Search"
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleUpdateInput}
                  onNewRequest={this.handleChange}
                />
            </div>
        );
    }
}

export default SearchBar;

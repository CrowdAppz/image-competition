import React from 'react';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import UploadButton from './upload/UploadButton';
import * as JsApi from '../client/js-api.js';

import './Main.css';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {'images': []};
    }

    componentWillMount() {
        // client.getData().then(response => response.json() ).then(json => this.setState({imageData: json}))
        JsApi.getAllImages().then(response => response.json()).then(json => this.setState({'images': json}));
    }

    handleSearch(text) {
      const self = this;
      JsApi.search(text)
        .then(response => response.json())
        .then(json => self.setState({'images': json}));
    }

    render() {
        return (
            <div className="main-container">
                <SearchBar onSearch={text=>this.handleSearch(text)}/>
                <div className="image-cards-container">
                    {this.state.images.map(image =>
                      <ImageCard title={image.title}
                                 key={image._id}
                                 id={image._id}
                                 tags={image.tags}
                                 comments={image.comments}
                                 imageBase64={image.imageBase64}
                      />)}
                </div>
                <UploadButton />
            </div>
        );
    }
}

export default Main;

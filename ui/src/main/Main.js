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

    render() {
        return (
            <div className="main-container">
                <SearchBar />
                <div className="image-cards-container">
                    {this.state.images.map((image, index) =>
                      <ImageCard title={image.title}
                                 key={index}
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

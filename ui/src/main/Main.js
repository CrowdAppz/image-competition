import React from 'react';
import {GridList} from 'material-ui/GridList';
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
      console.log(text, text.length);
      if(text.length === 0){
        JsApi.getAllImages().then(response => response.json()).then(json => this.setState({'images': json}));
        return;
      }

      JsApi.search(text)
        .then(response => response.json())
        .then(json => self.setState({'images': json}));
    }

    render() {
        const style = {
            margin: "72px auto",
            width: "67%"
        }
        return (
            <div className="main-container">
                <SearchBar onSearch={text=>this.handleSearch(text)}/>
                <GridList cellHeight={320} className="image-cards-container" style={style}>
                    {this.state.images.map(image =>
                      <ImageCard title={image.title}
                                 key={image._id}
                                 id={image._id}
                                 tags={image.tags}
                                 comments={image.comments}
                                 imageBase64={image.imageBase64}
                      />)}
                </GridList>
                <UploadButton />
            </div>
        );
    }
}

export default Main;

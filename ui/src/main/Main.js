import React from 'react';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import UploadButton from './upload/UploadButton';

import './Main.css';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        // client.getData().then(response => response.json() ).then(json => this.setState({imageData: json}))
    }

    render() {
        const imageData="foo";
        return (
            <div className="main-container">
                <SearchBar />
                <div className="image-cards-container">
                    {this.state.data.map(image => <ImageCard imageData={image.data} />)}
                    <ImageCard imageData={this.state.imageData}/>
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                </div>
                <UploadButton />
            </div>
        );
    }
}

export default Main;

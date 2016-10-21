import React from 'react';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import UploadButton from './upload/UploadButton';

import './Main.css';

class Main extends React.Component {
    render() {
        return (
            <div className="main-container">
                <SearchBar />
                <div className="image-cards-container">
                    <ImageCard />
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

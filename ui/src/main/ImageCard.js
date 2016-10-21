import React from 'react';

import './ImageCard.css';

import testImage from './test.jpg';

class ImageCard extends React.Component {
    static propTypes = {
        imageData: React.PropTypes.string
    };

    render() {
        const style = {
            backgroundImage: 'url(' + this.props.imageData + ')'
        }
        return (
            <div className="image-card-container">
                <div className="image-card-image" style={style}>
                    <div className="image-card-details">
                        <span className="image-card-title">Flowers</span>
                        <span className="image-card-subtitle">Look at my flowers</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageCard;

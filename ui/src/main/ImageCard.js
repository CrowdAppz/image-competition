import React from 'react';

import './ImageCard.css';

//import testImage from './test.jpg';

const tagStyle = {
  marginRight: "5px"
}

class ImageCard extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        comments: React.PropTypes.array,
        tags: React.PropTypes.array,
        imageBase64: React.PropTypes.string
    };

    render() {
        const style = {
            backgroundImage: 'url(' + this.props.imageBase64 + ')'
        }
        return (
            <div className="image-card-container">
                <div className="image-card-image" style={style}>
                    <div className="image-card-details">
                        <span className="image-card-title">{this.props.title}</span>
                        <span className="image-card-subtitle">
                          {this.props.tags.map(tag => <span style={tagStyle}>{tag}</span>)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageCard;

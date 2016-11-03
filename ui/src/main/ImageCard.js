import React from 'react';
import { browserHistory } from 'react-router'
import {GridTile} from 'material-ui/GridList';

import './ImageCard.css';

//import testImage from './test.jpg';

const tagStyle = {
  marginRight: "4px"
}

class ImageCard extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        comments: React.PropTypes.array,
        tags: React.PropTypes.array,
        imageBase64: React.PropTypes.string,
        id: React.PropTypes.string
    };

    handleCardClick(id) {
        browserHistory.push(`/detail/${id}`)
    }

    render() {
        const style = {
            backgroundImage: 'url(' + this.props.imageBase64 + ')',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }
        return (
            <GridTile className="image-card-container"
                      title={this.props.title}
                      subtitle={this.props.tags.map((tag, index) => <span key={index} style={tagStyle}>{tag}</span>)}
                      onClick={() => this.handleCardClick(this.props.id)}>
                    <div className="image-card-image" style={style}></div>
            </GridTile>
        );
    }
}

export default ImageCard;

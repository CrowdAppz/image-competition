import React from 'react';
import Subheader from 'material-ui/Subheader';
import {browserHistory} from 'react-router';

import './SimilarImages.css';

const styles = {
    subHeaderStyle: {
        lineHeight: "2",
        paddingLeft: "8px"
    }
};

class SimilarImages extends React.Component {
    static propTypes = {
        images: React.PropTypes.array
    }

    handleImageClick(id) {
        browserHistory.push(`/detail/${id}`);
    }

    renderImage(image, index) {
        return (
            <div key={index} className="similar-image">
                <h1>{index}</h1>
            </div>
        );
    }

    render() {
        if (!this.props.images || this.props.images.length === 0) {
            return null;
        }
        return (
            <div className="similar-images-container">
                <Subheader style={styles.subHeaderStyle}>Similar Images</Subheader>
                <div className="similar-images">
                    {this.props.images.map((image, index) => this.renderImage(image, index))}
                </div>
            </div>
        );
    }
}

export default SimilarImages;

import React from 'react';

import './HeaderImage.css';

class HeaderImage extends React.Component {
    static propTypes = {
        image: React.PropTypes.string,
        title: React.PropTypes.string
    }

    render() {
        const imageStyle = {
            backgroundImage: `url(${this.props.image})`
        };

        return (
            <div className="header-image" style={imageStyle}>
                <span className="header-image-title">{this.props.title}</span>
            </div>
        );
    }
}

export default HeaderImage;

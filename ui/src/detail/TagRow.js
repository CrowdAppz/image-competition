import React from 'react';
import Chip from 'material-ui/Chip';

import './TagRow.css';

const tagStyle = {
    margin: "8px",
    float: "left"
}

class TagRow extends React.Component {
    static propTypes = {
        tags: React.PropTypes.array
    }

    render() {
        return (
            <div className="tag-row">
                {this.props.tags.map((tag, index) => {
                    return (
                        <Chip key={index}
                              style={tagStyle}
                              className="tag-row-tag">
                              {tag}
                        </Chip>
                    );
                })}
            </div>
        );
    }
}

export default TagRow;

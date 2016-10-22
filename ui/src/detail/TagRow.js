import React from 'react';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';

import './TagRow.css';

const styles = {
    tagStyle: {
        margin: "8px",
        float: "left"
    },
    subHeaderStyle: {
        lineHeight: "2",
        paddingLeft: "8px"
    }
};

class TagRow extends React.Component {
    static propTypes = {
        tags: React.PropTypes.array
    }

    render() {
        return (
            <div className="tag-row">
                <Subheader style={styles.subHeaderStyle}>Tags</Subheader>
                {this.props.tags.map((tag, index) => {
                    return (
                        <Chip key={index}
                              style={styles.tagStyle}
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

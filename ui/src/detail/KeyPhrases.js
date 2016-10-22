import React from 'react';
import Subheader from 'material-ui/Subheader';

import './KeyPhrases.css';

const styles = {
    subHeaderStyle: {
        lineHeight: "2",
        paddingLeft: "8px"
    }
};

class KeyPhrases extends React.Component {
    static propTypes = {
        keyPhrases: React.PropTypes.array
    }

    render() {
        if(this.props.keyPhrases && this.props.keyPhrases.length > 0) {
            return (
                <div className="key-phrases-container">
                    <Subheader style={styles.subHeaderStyle}>Key Phrases</Subheader>
                    {this.props.keyPhrases.map((keyPhrase, index) => {
                        return (
                            <span key={index} className="key-phrase">{keyPhrase}</span>
                        );
                    })}
                </div>
            );
        }
        return null;
    }
}

export default KeyPhrases;

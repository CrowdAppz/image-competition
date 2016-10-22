import React from 'react';
import Subheader from 'material-ui/Subheader';

import './SentimentScore.css';

const styles = {
    subHeaderStyle: {
        lineHeight: "2",
        paddingLeft: "8px"
    }
}

class SentimentScore extends React.Component {
    static propTypes = {
        sentimentScore: React.PropTypes.number
    }

    calculateColor(weight) {
        const color1 = [0, 255, 0];
        const color2 = [255, 0, 0];
        var p = weight;
        var w = p * 2 - 1;
        var w1 = (w/1+1) / 2;
        var w2 = 1 - w1;
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
            Math.round(color1[1] * w1 + color2[1] * w2),
            Math.round(color1[2] * w1 + color2[2] * w2)];
        return rgb;
    }

    getInnerBarStyle() {
        const width = this.props.sentimentScore * 100;
        const rgb = this.calculateColor(this.props.sentimentScore);
        const hexColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        return {
            backgroundColor: hexColor,
            width: `${width}%`
        };
    }

    render() {
        if (this.props.sentimentScore) {
            return (
                <div className="sentiment-score-container">
                    <Subheader style={styles.subHeaderStyle}>Sentiment Score</Subheader>
                    <div className="sentiment-score">
                        <span className="bar-element">☹️</span>
                        <div className="sentiment-bar-outer">
                            <div className="sentiment-bar-inner"
                                 style={this.getInnerBarStyle()}></div>
                        </div>
                        <span className="bar-element">😃</span>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default SentimentScore;

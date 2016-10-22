import React from 'react';
import HeaderImage from './HeaderImage';
import TagRow from './TagRow';
import KeyPhrases from './KeyPhrases';
import SentimentScore from './SentimentScore';
import CommentList from './CommentList';
import SimilarImages from './SimilarImages';
import {getImage, addCommentToImage} from '../client/js-api';

import './Detail.css';

class Detail extends React.Component {

    constructor() {
        super();

        this.state = {
            image: "",
            tags: [],
            comments: [],
            title: ""
        };
    }

    componentWillMount() {
        getImage(this.props.params.id)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    image: json.imageBase64,
                    tags: json.tags,
                    comments: json.comments,
                    title: json.title,
                    keyPhrases: json.topKeyPhrases,
                    sentimentScore: json.sentimentScore
                })
            })
            .catch(error => console.warn("Error while loading image details", error));
    }

    handleSendComment(commentText) {
        addCommentToImage(this.props.params.id, commentText)
            .then(response => response.json())
            .then(json => this.setState({comments: json[0].comments}))
            .catch(error => console.warn("Error while sending comments:", error));
    }

    render() {
        // You clicked on id: {this.props.params.id}
        return (
            <div className="detail-container">
                <HeaderImage image={this.state.image} title={this.state.title} />
                <TagRow tags={this.state.tags} />
                <KeyPhrases keyPhrases={this.state.keyPhrases} />
                <SentimentScore sentimentScore={this.state.sentimentScore} />
                <CommentList comments={this.state.comments}
                             onSendComment={(commentText) => this.handleSendComment(commentText)} />
                <SimilarImages images={["a", "b", "c", "d", "e", "f", "g", "h"]}/>
            </div>
        );
    }
}

export default Detail;

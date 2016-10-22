import React from 'react';
import HeaderImage from './HeaderImage';
import TagRow from './TagRow';
import KeyPhrases from './KeyPhrases';
import SentimentScore from './SentimentScore';
import CommentList from './CommentList';
import SimilarImages from './SimilarImages';
import {getImage, getSimilarImages, addCommentToImage} from '../client/js-api';

import './Detail.css';

class Detail extends React.Component {

    constructor() {
        super();

        this.state = {
            image: "",
            tags: [],
            comments: [],
            title: "",
            similarImages: [],
        };
    }

    componentWillMount() {
        this.loadData(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.loadData(nextProps.params.id);
        }
    }

    loadData(id) {
        getImage(id)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    image: json.imageBase64,
                    tags: json.tags,
                    comments: json.comments,
                    title: json.title,
                    keyPhrases: json.topKeyPhrases,
                    sentimentScore: json.sentimentScore
                });
                if (json.tags) {
                    let words = json.tags;
                    if (json.topKeyPhrases) {
                        words = words.concat(json.topKeyPhrases);
                    }
                    getSimilarImages(words, 10)
                        .then(response => response.json())
                        .then(json => {
                            const similarImages = json.filter(image => image._id !== id);
                            this.setState({
                                similarImages: similarImages
                            });
                        })
                        .catch(error => console.warn("Error while loading similar images", error));
                }
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
                <SimilarImages images={this.state.similarImages}/>
            </div>
        );
    }
}

export default Detail;

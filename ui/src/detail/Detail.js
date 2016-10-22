import React from 'react';
import TagRow from './TagRow';
import HeaderImage from './HeaderImage';
import CommentList from './CommentList';
import {addCommentToImage} from '../client/js-api';

import './Detail.css';

import testImage from './test.jpg';
const tags = ["flower", "awesome", "weed", "yellow", "white", "green"];
const comments = [
    "Awesome image bro 😎",
    "I really like this picture because it reminds me of my home back in Texas. Yeeeha! 🐮",
    "Nice flowers sweetie. Miss you xoxo 😘 ",
    "This is a winner. I hope you take me with you on that vacation! ⛴"
]

class Detail extends React.Component {

    constructor() {
        super();

        this.state = {
            image: testImage,
            tags: tags,
            comments: comments
        };
    }

    componentWillMount() {
        //TOOD load image data
        console.log(`Loading image data for id ${this.props.params.id}`)
    }

    handleSendComment(commentText) {
        addCommentToImage(this.props.imageId, commentText)
            .then(response => response.json())
            .then(json => this.setState({comments: json}))
            .catch(error => console.warn("Error while sending comments:", error));
    }

    render() {
        // You clicked on id: {this.props.params.id}
        return (
            <div className="detail-container">
                <HeaderImage image={this.state.image} title="Flowers"/>
                <TagRow tags={this.state.tags} />
                <CommentList comments={this.state.comments}
                             onSendComment={(commentText) => this.handleSendComment(commentText)} />
            </div>
        );
    }
}

export default Detail;

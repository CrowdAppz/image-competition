import React from 'react';
import TagRow from './TagRow';
import HeaderImage from './HeaderImage';
import CommentList from './CommentList';

import './Detail.css';

import testImage from './test.jpg';
const tags = ["flower", "awesome", "weed", "yellow", "white", "green"];
const comments = [
    "Awesome image bro 😎",
    "I really like this picture because it reminds me of my home back in Texas. Yeeeha! 🐮",
    "Nice flowers sweetie. Miss you xoxo 😘 ",
    "This is a winner. I hope you take me with you on that vacation! ⛴"
]

class Main extends React.Component {
    render() {
        // You clicked on id: {this.props.params.id}
        return (
            <div className="detail-container">
                <HeaderImage image={testImage} title="Flowers"/>
                <TagRow tags={tags} />
                <CommentList comments={comments} />
            </div>
        );
    }
}

export default Main;

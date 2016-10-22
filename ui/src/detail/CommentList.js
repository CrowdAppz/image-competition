import React from 'react';
import CommentInput from './CommentInput';

import './CommentList.css';

class CommentList extends React.Component {
    static propTypes = {
        comments: React.PropTypes.array,
        onSendComment: React.PropTypes.func
    }

    renderComment(comment, index) {
        return (
            <div className="comment-container" key={index}>
                <div className="comment-time">A few moments ago</div>
                <div className="comment-text">{comment}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="comment-list-container">
                <CommentInput onSendComment={this.props.onSendComment} />
                {this.props.comments.map((comment, index) => this.renderComment(comment, index))}
            </div>
        );
    }
}

export default CommentList;

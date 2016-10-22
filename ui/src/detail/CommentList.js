import React from 'react';
import Paper from 'material-ui/Paper';
import CommentInput from './CommentInput';

import './CommentList.css';

class CommentList extends React.Component {
    static propTypes = {
        comments: React.PropTypes.array,
        onSendComment: React.PropTypes.func
    }

    renderComment(comment, index) {
        return (
            <Paper className="comment-container" key={index} zDepth={1}>
                <div className="comment-time">A few moments ago</div>
                <div className="comment-text">{comment.text}</div>
            </Paper>
        );
    }

    render() {
        return (
            <div className="comment-list-container">
                <CommentInput onSendComment={this.props.onSendComment} />
                {this.props.comments && this.props.comments.length > 0
                    ? this.props.comments.map((comment, index) => this.renderComment(comment, index))
                    : null
                }
            </div>
        );
    }
}

export default CommentList;

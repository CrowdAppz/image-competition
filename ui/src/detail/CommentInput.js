import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';

import './CommentInput.css';

const styles = {
    sendButton: {
        marginLeft: "16px"
    }
};

class CommentInput extends React.Component {
    static propTypes = {
        onSendComment: React.PropTypes.func
    }

    constructor() {
        super();

        this.state = {
            comment: ""
        };
    }

    handleInputChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    handleKeyPress(event) {
        if(event.key === "Enter") {
            this.handleSend();
        }
    }

    handleSend() {
        console.log(`Sending "${this.state.comment}" to the backend`);
        this.props.onSendComment(this.state.comment);
        this.setState({
            comment: ""
        });
    }

    render() {
        return (
            <div className="comment-input-container">
                <TextField hintText="Add new comment"
                           floatingLabelText="Add new comment"
                           value={this.state.comment}
                           onChange={(event) => this.handleInputChange(event)}
                           onKeyPress={(event) => this.handleKeyPress(event)} />
                <RaisedButton style={styles.sendButton}
                              primary={true}
                              icon={<ContentSend />}
                              onClick={() => this.handleSend()} />
            </div>
        );
    }
}

export default CommentInput;

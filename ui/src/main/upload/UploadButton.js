import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './UploadButton.css';

class UploadButton extends React.Component {
    constructor() {
        super();

        this.state = {
            dialogOpen: false
        };
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    getActions() {
        return [
            <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={() => this.closeDialog()} />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={() => this.closeDialog()} />
      ];
    }

    render() {
        return (
            <div>
                <FloatingActionButton className="upload-fab"
                                      onClick={() => this.openDialog()}>
                    <ContentAdd />
                </FloatingActionButton>

                <Dialog title="Upload your image"
                        actions={this.getActions()}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={() => this.closeDialog()}>
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}

export default UploadButton;

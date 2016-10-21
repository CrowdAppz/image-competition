import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UploadForm from './UploadForm';

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

    render() {
        return (
            <div>
                <FloatingActionButton className="upload-fab"
                                      onClick={() => this.openDialog()}>
                    <ContentAdd />
                </FloatingActionButton>
                <UploadForm isOpen={this.state.dialogOpen}
                            onClose={() => this.closeDialog()} />
            </div>
        );
    }
}

export default UploadButton;

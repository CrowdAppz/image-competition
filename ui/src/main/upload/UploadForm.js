import _ from "lodash";
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropZone from 'react-dropzone';
import ChipInput from 'material-ui-chip-input';
import TextField from 'material-ui/TextField';
import {uploadImage} from '../../client/js-api';

import './UploadForm.css';

class UploadForm extends React.Component {
    static propTypes = {
        isOpen: React.PropTypes.bool.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            base64Image: null,
            title: null,
            tags: []
        };
    }

    handleFileRead(reader) {
        const base64Image = reader.result;
        this.setState({
            base64Image: base64Image
        });
    }

    handleDrop(acceptedFiles) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => this.handleFileRead(fileReader), false);
        fileReader.readAsDataURL(acceptedFiles[0]);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleTagsChange(tags) {
        this.setState({
            tags: tags
        });
    }

    handleClose() {
        this.setState({
            base64Image: null
        });
        this.props.onClose();
    }

    handleSubmit() {
        if(!this.state.base64Image || !this.state.title) {
            this.handleClose();
            return;
        }

        uploadImage(this.state.base64Image, this.state.title, this.state.tags)
            .then(() => this.handleClose())
            .catch(error => console.warn("Error while submitting image:", error));
    }

    getActions() {
        return [
            <FlatButton label="Cancel"
                        primary={true}
                        onTouchTap={() => this.handleClose()} />,
            <FlatButton label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => this.handleSubmit()} />
      ];
    }

    renderDropZone() {
        return (
            <DropZone onDrop={(acceptedFiles) => this.handleDrop(acceptedFiles)}>
                <div className="upload-dropzone-text">
                    Drop your images here to upload them.
                    Or click to select an image to upload.
                </div>
            </DropZone>
        );
    }

    render() {
        return (
            <Dialog title="Upload your image"
                    actions={this.getActions()}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={() => this.handleClose()}>
                {this.state.base64Image
                    ? <img role="presentation" className="upload-result-img" src={this.state.base64Image} />
                    : this.renderDropZone()
                }
                <TextField style={{width: '100%'}}
                           hintText="Title"
                           floatingLabelText="Title"
                           onChange={(event) => this.handleTitleChange(event)} />
                <ChipInput style={{width: '100%'}}
                           hintText="Tags"
                           floatingLabelText="Tags"
                           onChange={(tags) => this.handleTagsChange(tags)} />
            </Dialog>
        );
    }
}

export default UploadForm;

import _ from "lodash";
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropZone from 'react-dropzone';
import ChipInput from 'material-ui-chip-input';

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
            tags: []
        };
    }

    handleFileRead(reader) {
        const base64Image = reader.result;
        console.log("base64 image:", base64Image);
        this.setState({
            base64Image: base64Image
        });
    }

    handleDrop(acceptedFiles) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => this.handleFileRead(fileReader), false);
        fileReader.readAsDataURL(acceptedFiles[0]);
    }

    handleAddTag(tag) {
        this.setState({
            tags: this.state.tags.push(tag)
        })
    }

    handleRemoveTag(tag) {
        const indexOfTag = this.state.tags.indexOf(tag);
        const tags = _.cloneDeep(this.state.tags);
        tags.splice(indexOfTag, 1);
        this.setState({
            tags: tags
        })
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

    getActions() {
        return [
            <FlatButton label="Cancel"
                        primary={true}
                        onTouchTap={() => this.handleClose()} />,
            <FlatButton label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => this.handleClose()} />
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
                    ? <img className="upload-result-img" src={this.state.base64Image} />
                    : this.renderDropZone()
                }
                <ChipInput style={{width: '100%'}}
                           hintText="Tags"
                           floatingLabelText="Tags"
                           onChange={(tags) => this.handleTagsChange(tags)} />
            </Dialog>
        );
    }
}

export default UploadForm;

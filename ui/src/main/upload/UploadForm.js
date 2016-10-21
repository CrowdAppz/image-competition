import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropZone from 'react-dropzone';

class UploadForm extends React.Component {
    static propTypes = {
        isOpen: React.PropTypes.bool.isRequired,
        onClose: React.PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {};
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

    getActions() {
        return [
            <FlatButton label="Cancel"
                        primary={true}
                        onTouchTap={this.props.onClose} />,
            <FlatButton label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.props.onClose} />
      ];
    }

    render() {
        return (
            <Dialog title="Upload your image"
                    actions={this.getActions()}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={this.props.onClose}>
                <DropZone onDrop={(acceptedFiles) => this.handleDrop(acceptedFiles)}>
                    <div className="upload-dropzone-text">
                        Drop your images here to upload them.
                        Or click to select an image to upload.
                    </div>
                </DropZone>
            </Dialog>
        );
    }
}

export default UploadForm;

import _ from "lodash";
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropZone from 'react-dropzone';
import ChipInput from 'material-ui-chip-input';
import TextField from 'material-ui/TextField';
import {uploadImage} from '../../client/js-api';
import {annotateImage} from '../../client/vision-api';

import './UploadForm.css';

const styles = {
    dropZone: {
        width: "100%",
        border: "1px dashed #999",
        padding: "32px"
    }
};

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

    isAtLeastPossible(likelihood) {
        return likelihood === "POSSIBLE"
            || likelihood === "LIKELY"
            || likelihood === "VERY_LIKELY";
    }

    convertImageAnnotationsToTags(imageAnnotations) {
        const annotation = imageAnnotations.responses[0];
        let tags = this.state.tags;
        // extract landmark annotations if available
        if (annotation.landmarkAnnotations) {
            tags = tags.concat(annotation.landmarkAnnotations
                .map(landmarkAnnotation => landmarkAnnotation.description));
        }

        // extract logo annotations if available
        if (annotation.logoAnnotations) {
            tags = tags.concat(annotation.logoAnnotations
                .map(logoAnnotation => logoAnnotation.description));
        }

        // extract labels if available
        if (annotation.labelAnnotations) {
            tags = tags.concat(annotation.labelAnnotations
                .map(labelAnnotation => labelAnnotation.description));
        }

        // extract moods / facial annotations
        if (annotation.faceAnnotations) {
            tags = tags.concat(annotation.faceAnnotations
                .map(faceAnnotation => {
                    let moods = [];
                    if (this.isAtLeastPossible(faceAnnotation.joyLikelihood))  {
                        moods.push("joy");
                    }
                    if (this.isAtLeastPossible(faceAnnotation.sorrowLikelihood)) {
                        moods.push("sorrow");
                    }
                    if (this.isAtLeastPossible(faceAnnotation.angerLikelihood)) {
                        moods.push("anger");
                    }
                    if (this.isAtLeastPossible(faceAnnotation.surpriseLikelihood)) {
                        moods.push("surprise");
                    }
                    if (this.isAtLeastPossible(faceAnnotation.blurredLikelihood)) {
                        moods.push("blurred");
                    }
                    if (this.isAtLeastPossible(faceAnnotation.headwearLikelihood)) {
                        moods.push("headwear");
                    }
                    return moods;
                }));
        }

        // remove duplicates
        tags = tags.filter((item, index, self) => self.indexOf(item) === index);

        this.setState({
            tags: tags
        });

        // save dominantColors in state
        if (annotation.imagePropertiesAnnotation) {
            this.setState({
                dominantColors: annotation.imagePropertiesAnnotation.dominantColors
            });
        }
    }

    handleFileRead(reader) {
        const base64Image = reader.result;
        this.setState({
            base64Image: base64Image
        });

        annotateImage(base64Image)
        .then(response => response.json())
        .then(json => {
            console.log("Annotate Result:", json);
            this.convertImageAnnotationsToTags(json);
        })
        .catch(error => console.warn("Error while annotating image:", error));
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
            base64Image: null,
            title: null,
            tags: []
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

    renderActions() {
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
            <DropZone style={styles.dropZone}
                      onDrop={(acceptedFiles) => this.handleDrop(acceptedFiles)}>
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
                    actions={this.renderActions()}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={() => this.handleClose()}>
                {this.state.base64Image
                    ? <div className="upload-result-img"
                           style={{backgroundImage: `url(${this.state.base64Image})`}} />
                    : this.renderDropZone()
                }
                <TextField style={{width: '100%'}}
                           hintText="Title"
                           floatingLabelText="Title"
                           onChange={(event) => this.handleTitleChange(event)} />
                <ChipInput style={{width: '100%'}}
                           hintText="Tags"
                           floatingLabelText="Tags"
                           value={this.state.tags}
                           onChange={(tags) => this.handleTagsChange(tags)} />
            </Dialog>
        );
    }
}

export default UploadForm;

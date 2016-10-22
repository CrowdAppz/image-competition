import credentials from './credentials.json';

const API_KEY = credentials.visionApiKey;
const ANNOTATE_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

const FEATURES = [
    {
        type: "LANDMARK_DETECTION",
        maxResults: 3
    }, {
        type: "LOGO_DETECTION",
        maxResults: 3
    }, {
        type: "FACE_DETECTION",
        maxResults: 3
    }, {
        type: "LABEL_DETECTION",
        maxResults: 10
    }, {
        type: "IMAGE_PROPERTIES",
        maxResults: 5
    }, {
        type: "SAFE_SEARCH_DETECTION",
        maxResults: 3
    }
];

const annotateImage = imageBase64 => {
    return fetch(ANNOTATE_URL, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({
            requests: [{
                image: {
                    content: imageBase64.split(",")[1]
                },
                features: FEATURES
            }]
        })
    });
};

export {
    annotateImage
}

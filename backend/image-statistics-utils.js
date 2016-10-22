const getSentimentScore = imageData => {
    if (!imageData || !imageData.comments || imageData.comments.length === 0) {
        return undefined;
    }

    const sentimentSum = imageData.comments
        .map(comment => comment.sentiment)
        .reduce((previous, current) => previous + current, 0);
    return sentimentSum / imageData.comments.length;
};

const getTopKeyPhrases = imageData => {
    if (!imageData || !imageData.comments || imageData.comments.length === 0) {
        return undefined;
    }

    const keyPhraseByCount = {};
    imageData.comments.forEach(comment => {
        comment.keyPhrases.forEach(keyPhrase => {
            if (!keyPhraseByCount[keyPhrase]) {
                keyPhraseByCount[keyPhrase] = 1;
            } else {
                keyPhraseByCount[keyPhrase] = keyPhraseByCount[keyPhrase] + 1;
            }
        });
    });

    return Object.keys(keyPhraseByCount).sort((a, b) => b - a).slice(0, 3);
};

module.exports = {
    getSentimentScore,
    getTopKeyPhrases
};

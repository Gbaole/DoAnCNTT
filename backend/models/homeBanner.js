const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    }
});

const child = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
    },
    textColor: {
        type: String,
        trim: true,
    },
    textAlign: {
        type: String,
        trim: true,
    },
    fontSize: {
        type: String,
        trim: true,
    },
    fontWeight: {
        type: String,
        trim: true,
    },
    fontStyle: {
        type: String,
        trim: true,
    },
    btnColor: {
        type: String,
        trim: true,
    },
    onClickGoToURL: {
        type: String,
        trim: true,
    },
    maxWidth: {
        type: String,
        trim: true,
    },
    top: {
        type: String,
        trim: true,
    },
    left: {
        type: String,
        trim: true,
    },
    bottom: {
        type: String,
        trim: true,
    },
    right: {
        type: String,
        trim: true,
    },
});

const homeBannerSchema = new mongoose.Schema({
    children: {
        type: [child],
    },
    figure: {
        type: mediaSchema,
    },
    index: {
        type: Number,
        default: 0,
    },
});

const HomeBanner = mongoose.model('HomeBanner', homeBannerSchema);
module.exports = { HomeBanner };


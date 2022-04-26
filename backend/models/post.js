const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    subtitle: { type: String, required: true},
    content: { type: String, required: true},
    link: { type: String, required: true},
    lat: { type: String, required: true},
    long: { type: String, required: true},
    addr: { type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);

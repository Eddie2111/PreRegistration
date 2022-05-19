const { Collection } = require('mongo');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phonenumber: {
        type: Number,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    avatar: String,
    gallery: [String],
    date: { type: Date, default: Date.now }

},
{ collection: 'event_vendors' }
);



module.exports = mongoose.model('User', userSchema);
const { Collection } = require('mongo');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now }

},
{ collection: 'event_vendors' }
);



module.exports = mongoose.model('service', userSchema);
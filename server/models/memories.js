const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memorySchema = new Schema({
    title: {
        type: String,
        maxlength: 50,
        required: true
    },
    description: {
        type: String
    },
    photo:{
        type: String
    },
    date: {
        type: Date
    }
})

const Memory = mongoose.model('memory',memorySchema);
module.exports = Memory;
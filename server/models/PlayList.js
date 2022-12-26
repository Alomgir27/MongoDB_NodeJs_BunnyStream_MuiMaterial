const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : false,
    },
    collectionId : {
        type : String,
        required : true,
    },
    
}, { timestamps: true })

const PlayList = mongoose.model('PlayList', videoSchema);

module.exports = { PlayList }
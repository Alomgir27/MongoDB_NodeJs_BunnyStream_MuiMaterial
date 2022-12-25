const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const videoSchema = mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : false,
    },
    name : {
        type : String,
        required : false,
    },
    username : {
        type : String,
        required : false,
    },
    videoId : {
        type : String,
        required : true,
    },
    // libraryId : {
    //     type : String,
    //     required : false,
    // },
    collectionId : {
        type : String,
        required : false,
    },
    title : {
        type : String,
        required : false,
    },
    description : {
        type : String,
        required : false,
    },
    tags : {
        type : Array,
        required : false,
    },
    // apiKey : {
    //     type : String,
    //     required : false,
    // }
    
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }
const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema({
    title : {
        type : String,
        required : false
    },
    description : {
        type : String,
        required : false
    },
    tags : {
        type : Array,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    filePath : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        required : true
    },
    likes : {
        type : Number,
        required : true
    },
    dislikes : {
        type : Number,
        required : true
    },
    uploadDate : {
        type : Date,
        required : true
    },
    uploader : {
        type : String,
        required : true
    },
    uploaderId : {
        type : String,
        required : true
    }
});

mongoose.model("Video", UserDetailsScehma);
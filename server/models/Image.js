const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : false,
    },
    imageId : {
        type : Schema.Types.ObjectId,
        required : true,
    }
});


const Image = mongoose.model("Image", imageSchema);

module.exports = { Image }
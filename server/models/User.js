
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator : function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message : 'Email is not valid',
        }
    },
    password : {
        type : String,
        required : true,
        validate : {
            validator : function(v) {
                return v.length >= 6;
            },
            message : 'Password must be at least 6 characters long',
        }
    },
    date : {
        type : Date,
        default : Date.now
    },
    url : {
        type : String,
        required : false
    },
    // libraryId : Number,
    // ApiKey : String,

});

const User = mongoose.model("User", UserSchema);

module.exports = { User }
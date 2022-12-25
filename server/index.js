const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket, MongoDBNamespace } = require('mongodb');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const request = require('request');
const axios = require('axios');
const mongodb = require('mongodb');
require("dotenv").config();


const PORT = process.env.PORT || 27017;


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());




//connect to mongoDB

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



mongoose.connection.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
});



//Allow access Post, Put, Delete and Patch
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/// connect to mongoDB by using MongoClient
const client = new MongoClient(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });








app.use('/api/users', require('./routes/users'));
app.use('/api/videos', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/images', require('./routes/image'));


app.use('uploads', express.static('uploads'));

// Get all images
app.get('/api/images/:id', (req, res) => {
    const id = req.params.id;

    const db = client.db('test');
    
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });

    const downloadStream = bucket.openDownloadStream(new mongodb.ObjectID(id));

    downloadStream.pipe(res);

    downloadStream.on('error', () => {
        res.status(404).json({ error: 'Not found' });
    });

    downloadStream.on('finish', () => {
        console.log('done');
    })
   
});
   



app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});



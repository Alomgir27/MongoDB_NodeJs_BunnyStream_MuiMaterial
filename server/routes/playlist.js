const express = require('express');
const router = express.Router();
const multer = require('multer');
const app = express();
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


//=================================


const { PlayList } = require("../models/PlayList");
const { Video } = require("../models/Video");




//=================================

router.post("/createPlaylist", (req, res) => {
    const { playlistName, playlistDescription, userId } = req.body;
    console.log(playlistName, playlistDescription, userId);

    axios.post(`https://video.bunnycdn.com/library/${process.env.libraryId}/collections`, {
        name: playlistName
    }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             AccessKey: process.env.ApiKey,
        }
    }).then((response) => {
        console.log(response.data);
        const newPlaylist = new PlayList({
            userId: userId,
            name: playlistName,
            description: playlistDescription,
            collectionId: response.data.guid
        });
        newPlaylist.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });

    }).catch((error) => {
        console.log(error);
    });

});


router.post("/getPlaylists", (req, res) => {
    const { userId } = req.body;
    PlayList.find({ userId: userId })
        .exec((err, playlists) => {
            if (err) return res.status
                (400).send(err);
            res.status(200).json({ success: true, playlists })
        })
});

router.post("/getPlaylistDetails", (req, res) => {
    const { collectionId } = req.body;
    //https://video.bunnycdn.com/library/libraryId/collections/collectionId
    axios.get(`https://video.bunnycdn.com/library/${process.env.libraryId}/collections/${collectionId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessKey: process.env.ApiKey,
        }
    }).then((response) => {
        console.log(response.data);
        res.status(200).json({
            success: true,
            data: response.data
        });
    }).catch((error) => {
        console.log(error);
    });
});



router.post("/deletePlaylist", (req, res) => {
    const { collectionId } = req.body;

    //delete all videos from MongoDB in the collection which collectionId is collectionId
    
    PlayList.findOneAndDelete({ collectionId: collectionId })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            axios.delete(`https://video.bunnycdn.com/library/${process.env.libraryId}/collections/${collectionId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    AccessKey: process.env.ApiKey,
                }
            }).then((response) => {
                console.log(response.data);
                res.status(200).json({
                    success: true
                });
            }).catch((error) => {
                console.log(error);
            });
        })
    Video.deleteMany({ collectionId: collectionId })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
        })
    return res.status(200).json({
        success: true
    });
});








//=================================


module.exports = router;
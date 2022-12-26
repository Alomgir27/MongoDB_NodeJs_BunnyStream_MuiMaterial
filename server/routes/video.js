const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Video } = require("../models/Video");
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

const { User } = require("../models/User");




//all about video
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        let exts = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mpg', '.mpeg', '.3gp', '.3g2', '.m4v', '.f4v', '.f4p', '.f4a', '.f4b']
        // only allow video files
        if(!exts.includes(ext)) {
            return cb(res.status(400).end('only video files are allowed'), false);
        }
        
        cb(null, true)
    }
})

var upload = multer({ storage: storage });


//all about video





router.post('/upload', upload.single('file'), async (req, res) => {
    const { writer, title, description, tags, collectionId } = req.body;

    // console.log(writer, title, description, tags, libraryId, apiKey);
    

  try {
    // Create read stream for file
    const readStream = fs.createReadStream(path.join(__dirname, `../uploads`, req.file.filename));

    // Create video in BunnyCDN library
    const optionsToCreateVideo = {
      method: "POST",
      url: `http://video.bunnycdn.com/library/${process.env.libraryId}/videos`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        AccessKey: process.env.ApiKey,
      },
      data: JSON.stringify({
        title: title,
        collectionId: collectionId,
    }),
    };
     await axios.request(optionsToCreateVideo)
        .then(async (response) => {
            console.log(response.data);
            const videoId = response.data.guid;
            let { guid } = response.data;
            // console.log(videoId, req.body.libraryId, req.body.apiKey);


            const optionsToUploadVideo = {
                method: "PUT",
                url : `https://video.bunnycdn.com/library/${process.env.libraryId}/videos/${videoId}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/octet-stream",
                    AccessKey: process.env.ApiKey,
                },
                data: readStream,
            };
        
             await axios.request(optionsToUploadVideo)
                .then(async (response) => {  
                    console.log(response.data);
                    const { metaTags } = response.data;
                    let tagsArray = [];
                    if(tags) {
                        tagsArray = tags.split(',');
                        tagsArray = tagsArray.map((tag) => tag.trim());
                        tagsArray = tagsArray.map((tag) => tag.toLowerCase());
                    }
                    if(metaTags) {
                        metaTags.forEach((tag) => {
                            tagsArray.push(tag);
                        });
                    }


                    fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename));


                      await User.findById({ _id: writer})
                        .then((user) => {
                            console.log(user);
                            const video = new Video({
                                videoId: guid,
                                userId: user._id,
                                name: user.name,
                                username: user.username,
                                title: title,
                                description: description,
                                tags: tagsArray,
                                collectionId: collectionId,
                            });
        
                            video.save((err, doc) => {
                                if (err) return res.json({ success: false, err });
                                res.status(200).json({ success: true, doc });
                            })
                        })
                        .catch((error) => {
                            console.error(error);
                            return res.status(400).json({ success: false, error });
                        });


                })
                .catch((error) => {
                    console.error(error);
                    return res.status(400).json({ success: false, error });
                });
        })
        .catch((error) => {
            console.error(error);

            return res.status(400).json({ success: false, error });
        });
    
  } catch (error) {

    console.error(error);
    return res.status(400).json({ success: false, error });
   
  } 
    
});


       
// create collection of bunnyCDN videos

router.post('/createCollection', (req, res) => {
    // console.log(req.body.collectionName);
    axios.post(`http://video.bunnycdn.com/library/${process.env.libraryId}/collections`, {
        name: req.body.collectionName
    }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessKey: process.env.ApiKey,
        }
    })
        .then((response) => {
            res.status(200).json({ success: true, collection: response.data })
        })
        .catch((error) => {
            console.error(error);
            return res.status(400).json({ success: false, error });
        });
})





router.post('/getVideos', (req, res) => {
    const { page } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find().skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
   
})

router.post('/getRecentVideos', (req, res) => {
    const { page } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find().sort({ _id: -1 }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })

})

router.post('/getVideosBySearch', (req, res) => {
    const { page, search } = req.body;
    console.log(search);
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ $and : [{ $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { tags: { $regex: search, $options: 'i' } }] }] }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})




router.post('/getVideosByTag', (req, res) => {
    const { page, tag } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ tags: { $regex: tag, $options: 'i' } }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})

router.post('/getVideosByCollection', (req, res) => {
    const { page, collectionId } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ collectionId: collectionId }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})

router.post('/getVideosByTagOrSearch', (req, res) => {
    const { page, search, tag } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ $or: [{ title: { $regex: search, $options: 'i' } }, { tags: { $regex: tag, $options: 'i' } }] }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})

router.post('/getVideosByTagAndSearch', (req, res) => {
    const { page, search, tag } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ $and: [{ title: { $regex: search, $options: 'i' } }, { tags: { $regex: tag, $options: 'i' } }] }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})

router.post('/getVideosByRecentlyAdded', (req, res) => {
    const { page } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find().sort({ _id: -1 }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})






router.post('/getVideoByVideoId', (req, res) => {
    axios.get(`http://video.bunnycdn.com/library/${process.env.libraryId}/videos/${req.body.videoId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessKey: process.env.ApiKey,
        }
    })
        .then((response) => {
            res.status(200).json({ success: true, video: response.data })
        })
        .catch((error) => {
            console.error(error);
            return res.status(400).json({ success: false, error });
        });
})

router.post('/getRelatedVideos', (req, res) => {
    const { page, title } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ $or: [{ title: { $regex: title, $options: 'i' } }, { description: { $regex: title, $options: 'i' } }, { tags: { $regex: title, $options: 'i' } }] }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
    
   
})

router.post('/VideoByVideoId', (req, res) => {
    const { videoId } = req.body;
    console.log(videoId);
    Video.findOne({ "videoId": videoId })
        .exec((err, video) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, video });
        })
})

router.post('/getUserByVideoId', (req, res) => {
    // console.log(req.body.videoId);
    Video.findOne({ "videoId": req.body.videoId })
        .exec((err, video) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, user: video });
        })
})

router.post('/getVideosByUserId', (req, res) => {
    const { page, userId } = req.body;
    const limit = 100;
    const skip = (page - 1) * limit;
    Video.find({ userId: userId }).skip(skip).limit(limit).exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, videos });
    })
})

module.exports = router;

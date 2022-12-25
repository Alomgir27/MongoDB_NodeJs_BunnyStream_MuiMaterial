const express = require('express');
const router = express.Router();
const { Image } = require("../models/Image");
const multer = require('multer');   
const path = require('path');
const fs = require('fs');
const mongodb = require('mongodb');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const mongoose = require('mongoose');







var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        let exts = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.svg', '.webp']
        // only allow image files
        if(!exts.includes(ext)) {
            return cb(res.status(400).end('only image files are allowed'), false);
        }
      cb(null, true)
    }
})

var upload = multer({ storage: storage });



router.post('/upload', upload.single('file'), async (req, res) => {
    let gridFSBucket = new mongodb.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
    let uploadStream = gridFSBucket.openUploadStream(req.file.filename, {
        metadata: {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            encoding: req.file.encoding
        },
        contentType: req.file.mimetype
    });

    let id = uploadStream.id;
    
    
    fs.createReadStream(req.file.path)
        .pipe(uploadStream)
        .on('error', (error) => {
            console.log(error);
           fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename));

        })
        .on('finish', () => {
            console.log('done!');
            fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename));

            const image = new Image({
                userId : req.body.userId,
                imageId : id
            });

            console.log(req.body.userId, id)

            image.save((err, doc) => {
                if(err) return res.json({ success: false, err })
                return res.status(200).json({
                    success: true,
                    image: doc
                })
            })
        });
});

    

router.post('/getImageByUserId', (req, res) => {
    console.log(req.body.userId)
    Image.find({ userId : req.body.userId })
        .exec((err, image) => {
            if(err) return res.status
            const id  = image[0].imageId;
            console.log(new mongodb.ObjectID(id))
            let gridFSBucket = new mongodb.GridFSBucket(mongoose.connection.db, {
                bucketName: 'uploads'
            });

          

            gridFSBucket.find({ _id : new mongodb.ObjectID(id) }).toArray((err, files) => {
                if(!files || files.length === 0) {
                    return res.status(404).json({
                        err: 'no files exist'
                    });
                }
                files.forEach(file => {
                    file.id = file._id;
                    file.url = `http://localhost:27017/api/images/${file._id}`;
                });
                res.json(files)
            })
           
        })
});
   


// // Get all images
// router.get('/api/images', async (req, res) => {

    
//     const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });

//     // Get all files from GridFS
//     const files = await bucket.find().toArray();

//     // make the file buffer available to the client
//     files.forEach(file => {
//         file.id = file._id;
//         file.url = `http://localhost:27017/api/images/${file._id}`;
//     });

//     res.json(files);

   
// });
    
    
// router.get('/api/images/:id', async (req, res) => {
//     const db = client.db('test');
//     const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });

//     // Get the file from GridFS
//     const file = await bucket.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray();

//     // make the file buffer available to the client
//     file.forEach(file => {
//         file.id = file._id;
//         file.url = `http://localhost:27017/api/images/${file._id}`;
//     });

//     res.json(file);
    
// });


module.exports = router;
const express = require('express');
const router = express.Router();
const { SignUp, SignIn, Forget, Delete, Verify } = require('../Middleware/userMiddle')
const multer = require('multer')
const imageModel = require('../Model/imagesModel')
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const DIR = __dirname + "/images"
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(" ").join("-")
        cb(null, filename)
    }
});
const upload = multer({ storage: storage });

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/forget', Forget);
router.post('/delete', Delete);
router.post('/verify', Verify);

router.post('/fileuploading', upload.array("images", 5), async (req, res) => {
    try {
        for (let i = 0; i < req.files.length; i++) {
            let final = new imageModel({
                filename: req.files[i].filename,
                image: {
                    data:fs.readFileSync(path.join(__dirname + '/images/' + req.files[i].filename)),
                    contentType:"image/png"
                }
            }) 
            final.save()
        }
        
        res.status(201).json("File Uploaded Successfully");
    }
    catch (err) {
        res.status(401).json(err)
    }
});

router.get('/fileuploading', async (req, res) => {
    try {
        let find = await imageModel.find({}, { _id: 0 })
        res.status(201).json(find)
    }
    catch (err) {
        res.status(401).json(err)
    }
})
module.exports = router;
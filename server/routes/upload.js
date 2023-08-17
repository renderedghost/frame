const io = require('../server').io;
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const sharp = require('sharp');
const Image = require('../models/Image');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

router.post('/', upload.array('images'), async (req, res) => {
    try {
        const files = req.files;

        // Use Promise.all to process and upload images in parallel
        const uploadPromises = files.map(async (file) => {
            const inputBuffer = file.buffer;

            const outputBuffer = await sharp(inputBuffer)
                .resize(1024, 1024, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .toBuffer();

            const filename = file.originalname;
            const dateRegex = /\d{4}-\d{2}-\d{2} \d{2}.\d{2}.\d{2}/;
            const dateMatch = filename.match(dateRegex);
            const date = dateMatch ? new Date(dateMatch[0].replace(/-/g, '/').replace('.', ':')) : new Date();

            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: filename,
                Body: outputBuffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            };

            const s3Response = await s3.upload(params).promise();

            const newImage = new Image({
                filename: filename,
                date: date,
                s3Url: s3Response.Location,
            });

            await newImage.save();

            // Emit a Socket.io event after the image is successfully saved
            io.emit('imageUploaded', newImage);
        });

        // Wait for all images to be processed and uploaded
        await Promise.all(uploadPromises);

        res.status(200).send({ message: 'Files uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});

module.exports = router;
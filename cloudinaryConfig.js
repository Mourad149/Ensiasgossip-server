const uploader  = require('cloudinary').uploader
const config =require('cloudinary').config
const dotenv = require('dotenv')
dotenv.config();
const cloudinaryConfig = () => config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.cloudinaryConfig=cloudinaryConfig;
exports.uploader=uploader;

const multer = require("multer");
const Datauri=require("datauri")
const storage = multer.memoryStorage();
const path = require('path')
const multerUploads = multer({ storage }).array('file',5);
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.originalname).toString(), req.buffer);
exports.multerUploads=multerUploads;
exports.dataUri=dataUri;

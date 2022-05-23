require("dotenv").config()
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require("express")

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_CLOUD_KEY,
     api_secret: process.env.CLOUDINARY_SECRET,
     secure: true
})

const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
          folder: "fakturaApp",
          allowedFormats: ["jpeg", "png", "jpg"]
     }
})


module.exports = {
     cloudinary,
     storage
}
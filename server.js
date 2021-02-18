const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require ('multer-s3')
const path = require('path')
require('dotenv').config()

const app = express()
const s3 = new aws.S3({apiVersion:'2006-03-01'})

aws.config.update({
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET,
    region: 'us-east-1'  
});


const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : 'osmterega',
        metadata : (req , file , cb) => {
            cb(null, { fileName : file.fieldname})
        },
        key : (req , file , cb) => {
            const ext = path.basename(file.originalname)
            cb(null , ext)
        }
    })
})

const port = 3001
app.use(express.static('./'))

app.post('/',upload.array('avatar'),(req,res)=>{
  return res.json({status : "ok", uploaded:req.files.length})
})

app.listen(port, ()=>{console.log('app is listening on port: ', port)})

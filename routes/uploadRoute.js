const express = require('express');
const router = express.Router()
const multer = require('multer');
const uploadController = require('../controller/uploadController')
const checkAuth = require('../checkAuth/auth')

const storage = multer.diskStorage({
    destination: (req,file,cb) => { 
      console.log(file)
      cb(null, 'upload');
    },
    filename: (req,file,cb) => {
      
      cb(null,Date.now() + file.originalname);
    }
  })

router.post('/file',checkAuth,multer({storage: storage}).single('files'),uploadController.upload)

router.get('/getprofile',checkAuth,uploadController.getprofile);

router.delete('/deletefile/:id',checkAuth,uploadController.deleteFile);



module.exports =router;
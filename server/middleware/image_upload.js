const multer = require('multer');
const router = require('express').Router();
const path = require('path');
const employeeSchema = require('../models/emp.model');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
     cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
      }
  });


router.post('/upload_img', async(req,res) => {
    try {
        const upload = await multer({storage : storage}).single('file');
        upload(req,res,(err)=>{
           
            if(!req.file){
                res.json({"status":"failure",message:err.message})
            } else if(err instanceof multer.MulterError){
                res.json({"mul_err":err})
            } else if(err){
                res.json({"post_err":err.message})
            } else {
                const data = req.file;
                console.log(req.file)
                res.json({status:'success',data:data})
            }
        })
    } catch (error) {
        res.json({"err":error.message})
    }
})

router.post('/img', async(req,res) => {
    try {
        const email = req.query.email
        const upload = await multer({storage : storage}).single('file');
        upload(req,res,(err)=>{
            if(!req.file){
                res.json({status:"failure","message":"please file upload"})
            } else if(err instanceof multer.MulterError){
                res.json({"mul_err":err})
            } else if(err){
                res.json({"post_err":err.message})
            } else {
                const data = req.file;
                // res.json({status:'success',data:data})
                employeeSchema.findOneAndUpdate({email:email},{image : data},{new:true}).then(result=>{
                    res.json({status:'success',message:'image successfully added!',result});
                }).catch(err=>{
                    res.json({status:'failure',message:err.message});
                })
            }
        })
    } catch (error) {
        res.json({"error":error.message})
    }
})



module.exports = router;
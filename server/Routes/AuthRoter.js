const express = require('express')
const router = express.Router();
const Authcontroller = require('../Controllers/AuthController.js');
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Profile')

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
router.post("/register", Authcontroller.Register);
router.post("/login", Authcontroller.Login)
router.post("/profileAdd",upload.single('file'),Authcontroller.AddImg)
router.get('/getimg',Authcontroller.Getimg)
router.put('/updateuser/:email', Authcontroller.UpdateUser);



module.exports = router
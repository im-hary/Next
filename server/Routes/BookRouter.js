const express = require('express')
const router = express.Router();
const BooksController = require('../Controllers/BooksController.js')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Assets')

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.get('/get', BooksController.GetBooks);
router.get('/getbookimg', BooksController.GetBookimg)
router.post('/add', upload.single('file'), BooksController.AddBook);
router.post("/addBookimg",upload.single('file'),BooksController.AddImg)
router.put('/updateBook/:id', BooksController.UpdateBook);
router.delete('/delete/:id', BooksController.DeleteBook)


module.exports = router

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});
const upload = multer({ storage });

const users = [
    {
        email: "demo@example.com",
        password: "123456"
    }
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
let lastUploadedImage = null;


app.get('/', (req, res) => {
    res.render('index', { title: 'Gallery', imgSrc: lastUploadedImage });
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/imgUpload', (req, res) => {
    res.render('imgUpload', { title: 'Gallery', imgSrc: lastUploadedImage });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.redirect('/imgUpload');
    } else {
        res.redirect('/login');
    }
});

app.post('/imgUpload', upload.single('photos'), (req, res) => {
    if (req.file) {
        lastUploadedImage = `/uploads/${req.file.filename}`;
        res.render('imgUpload', { title: "Gallery", imgSrc: lastUploadedImage });
    } else {
        res.status(400).send('File upload failed.');
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server running on http://localhost:3000');
});

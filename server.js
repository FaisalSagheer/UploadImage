

const express = require('express');
const app = express();
const path = require('path')


app.use(express.static(path.join(__dirname,'public')))
const users = [
    {
        email: "demo@example.com",
        password: "123456"
    }
]

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/imgUpload', (req, res) => {
    res.render('imgUpload.ejs')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(u => u.email === email && u.password === password)
    if(user){
        res.redirect('/imgUpload')
    }
    else{
        res.redirect('/login')
    }
})



app.listen(3000)
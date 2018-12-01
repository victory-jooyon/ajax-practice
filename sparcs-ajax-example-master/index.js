const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const List = require('./model/list.js');

/* Databas connection */
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to MongoDB server");
});
mongoose.connect('mongodb://localhost/ajax-example')

// MiddleWare seeting
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.set('views', __dirname+'/public/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.get('/', (req, res) => {
    res.render('/main.html');
})

// API
app.post('/api/v1/add', (req, res) => {
    // name, todo, date

    if (req.body.name.length === 0 || req.body.todo.length === 0 || req.body.date.length === 0) {
        console.log('Wrong input')
        return res.redirect('/main.html');
    }

    const list = new List();
    list.name = req.body.name;
    list.todo = req.body.todo;
    list.date = req.body.date;

    list.save(err => {
        if (err) {
            console.log(err);
            return res.redirect('/main.html');
        }
        return res.redirect('/main.html');
    });
})

app.get('/api/v1/load', (req, res) => {
    List.find({}, (err, lists) => {
        return res.json(lists)
    })
})

const server = app.listen(8000, () => {
    console.log('server is running at 8000');
});

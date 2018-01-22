// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./models');

////////////////////
//  DATA
///////////////////

var books = [
  {
    _id: 15,
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    _id: 16,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    _id: 17,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];


var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err){
      console.log("index error: "+err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  db.Book.findById(req.params.id, function(err, book){
    if (err) return res.send(err);
    res.send(book);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  db.Book.create({
      title: req.body.title,
      author: req.body.author},
  function(err,book) {
      if (err) return console.log(err);
      console.log(book);
      res.redirect('/');
  });
});

// update book
app.put('/api/books/:id', function(req,res){
  db.Book.update({
    name: req.body.name,
    author: req.body.author
  }, function(err, book){
    if (err) console.log(err);
    console.log(book);
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  db.Book.findOneAndRemove({
    _id: req.params.id
  }, function(err){
    if (err) console.log(err);
    res.json;
    res.redirect('/');
    console.log('Book deleted!');
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});

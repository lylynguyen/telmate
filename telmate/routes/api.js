var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var COMMENTS_FILE = path.join(__dirname, '../comments.json');
var IMAGE_FILE = path.join(__dirname, '../slideshow.json');

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

router.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: new Date().toJSON().slice(0,10),
      author: req.body.author,
      text: req.body.text,
      image: req.body.image

    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

router.get('/slideshow', function(req, res) {
  fs.readFile(IMAGE_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;

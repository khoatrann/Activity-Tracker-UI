const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://alex_bartlett:dbeiHhTqVTqsqgQV@cluster0.4yaxu.mongodb.net/places_db?retryWrites=true&w=majority")
.then(() => {
  console.log('connected to database')
})
.catch(() => {
  console.log('connection failed')
})

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
    link: req.body.link,
    lat: req.body.lat,
    long: req.body.long,
    addr: req.body.addr
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  if (typeof(req.query.lat) != 'undefined'){
    Post.find({lat:req.query.lat,long:req.query.long})
  .then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
  }
  else{
    Post.find()
  .then(documents => {

    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
  }


});
module.exports = app;


const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const posts = [
  {
    id: 1,
    title:'Pomeranian',
    subtitle:'nice dog',
    content: 'This is my first dog',
    link:'../../../assets/pomeranian.jpg'
  },
  {
    id: 2,
    title:'Shih Tzu',
    subtitle:'bad dog',
    content: 'This is my second dog',
    link:'../../../assets/shih-tzu.jpeg'
  },
  {
    id: 3,
    title:'Shiba Inu',
    subtitle:'dog barks a lot',
    content: 'This is my third dog',
    link:'https://material.angular.io/assets/img/examples/shiba2.jpg'
  }
];


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
  const post = req.body;
  posts.push(post);
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
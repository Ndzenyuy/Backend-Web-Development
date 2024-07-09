import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

const API_URL = "https://44168qrbjf.execute-api.us-east-1.amazonaws.com/dev/"

let lastId = 3;
let posts = [];

app.use(express.static("public"));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts

app.get("/posts", async (req, res) => {
  const response = await axios.get(`${API_URL}/messages`);   
  posts = response.data.body
  console.log(posts);
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fetchedPost = posts.find((post) => post.id === id);
  res.json(fetchedPost);
  
});

//CHALLENGE 3: POST a new post

app.post("/posts", (req, res) => {
  const newPost = {
    id : posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date
  }
  posts.push(newPost);
  res.json(newPost);
})

//CHALLENGE 4: PATCH a post when you just want to update one parameter

app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === id);
  const newPost = {
    id: id,
    title: req.body.title     ||  existingPost.id,
    content: req.body.content ||  existingPost.content,
    author: req.body.author   ||  existingPost.author    
  };
  const existingPostIndex = posts.findIndex((posts) => posts.id === id);
  posts[existingPostIndex] = newPost;
  res.json(newPost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const existingPostIndex = posts.findIndex((posts) => posts.id === id);
  posts.slice(posts[existingPostIndex], 1);
  res.json(id);

});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

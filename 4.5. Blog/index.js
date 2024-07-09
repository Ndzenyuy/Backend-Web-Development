import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Set up EJS as the view engine
// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


let blogPosts = [
    {
      id: 1,
      title: 'My First Blog Post',
      content: 'This is the content of my first blog post.'
    },
    {
      id: 2,
      title: 'Another Blog Post',
      content: 'This is the content of another blog post.'
    }
  ];


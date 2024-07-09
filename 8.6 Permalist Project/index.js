import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "myTodo",
  password: "admin",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  const results = await db.query("SELECT * FROM todo_list ORDER BY id ASC");
  items = results.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO todo_list (title) VALUES ($1)", [item]);
  } catch(err){
    console.error(err);
  };
  
  console.log(item);
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const itemId = req.body.updatedItemId;
  console.log(item);
  console.log(itemId);
  try{
    await db.query("UPDATE todo_list SET title = ($1) WHERE id = $2", [item, itemId]);
  
  } catch(err){
    console.error(err);
  };
  res.redirect("/");

});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  try{
    await db.query("DELETE FROM todo_list WHERE id = $1", [itemId]);
  } catch(err){
    console.error(err);
  };
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

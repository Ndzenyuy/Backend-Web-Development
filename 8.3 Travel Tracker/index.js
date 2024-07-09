import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3002;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432,
});

db.connect();

let readCountry_codes = [];
let countryCodes = [];
let visited_countries = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.query("SELECT * FROM visited_countries", (err, res) =>{
  if(err){
    console.error("error executing query", err.stack);
  } else {
    readCountry_codes = res.rows; 
    for (let i = 0; i < readCountry_codes.length; i++) {
      visited_countries.push(readCountry_codes[i].country_code);
    }   
    }
    db.end();
});

app.get("/", async (req, res) => {
  //Write your code here.

  res.render("index.ejs", {
    countries: visited_countries,
    total: visited_countries.length
  });
});

app.post("/add", async (req, res) =>{
    const new_country = req.body.country.toUpperCase();
    db.query(`INSERT INTO visited_countries ( country_code ) VALUES ( '${new_country}' )`, (err, res) => {
      if(err){
        console.error("Error writing to database", err.stack);
      } else {
        visited_countries.push(new_country);
        console.log(visited_countries);
      }
    });
    res.redirect("/");
    db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

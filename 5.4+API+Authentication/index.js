import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "ndzenyuy";
const yourPassword = "jones";
const yourAPIKey = "763b6f42-f70d-41c6-9f66-18a513c27b0c";
const yourBearerToken = "518b0713-9a12-4de8-a1a4-ca45ab2592b5";


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  
  
});

app.get("/basicAuth", async (req, res) => {


    try{
      const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
        auth: {
            username: yourUsername,
            password: yourPassword
        },     
      
      });
      const result = JSON.stringify(response.data); 

      res.render("index.ejs", { content: result });
    } catch (error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
      });
    }

    
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }


});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` }
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get( "https://secrets-api.appbrewery.com/secrets/2", config);
    console.log(result.data);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

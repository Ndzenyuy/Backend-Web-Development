import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3001;
let posts = [];

const API_URL = "https://44168qrbjf.execute-api.us-east-1.amazonaws.com/dev"

app.get("/", async (req, res) => {
    const response = await axios.get(`${API_URL}/messages`);    
    console.log(response.data.body);
    res.json(response.data.body);
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
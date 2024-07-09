import express from 'express';


const app = express();
const port = 3000;


app.get("/", (req, res) => {
    const today = new Date();
    
    const day = today.getDay();

    let type = "weekday";
    let adv = "please do work hard";

    if (day === 0 || day === 6){
        type = "weekend";
        adv = "please do have much fun";
    }

    res.render("index.ejs", {
        dayType: type,
        advise: adv,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });


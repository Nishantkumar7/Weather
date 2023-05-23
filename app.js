const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    const query =req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a7d178a8a81d37dca4a6c1b6231a79c4&units=metric";
    https.get(url,(response)=>{

        response.on("data",(d)=>{
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp
            const weatherDescription =weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://api.openweathermap.org/img/w/"+icon+".png"
            res.setHeader("Content-Type", "text/html");
            res.write("<p>The Whether is currently "+weatherDescription+"</p>")
            res.write("<h1>The temptature in "+query+" is "+temp+" degree celcious<h1>")
            res.write("<img src="+imageURL+">")
            res.send()
        })
    })
})

app.listen("3000",()=>{
    console.log("Started");
})



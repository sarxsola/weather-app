var PORT = process.env.PORT

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "f9aabfff9675996de83cc18baa942651";
    var units = "metric";
    var typeOfDegree = "Celcius";
    if (req.body.imperial === "on") {
        units = "imperial";
        typeOfDegree = "Fahrenheit";
    }

    const url =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        apiKey +
        "&units=" +
        units;

    http.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            if(weatherData.main.temp) {

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconLink = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

            res.write(
                "<h1>The weather in " + query + " is " + weatherDescription + "</h1>"
            );
            res.write(
                "<h1>The temperature in " +
                query +
                " is " +
                temp +
                " degrees " +
                typeOfDegree +
                "</h1>"
            );
            res.write("<img src=" + iconLink + ">");

            
            }
            else {
                res.write("City was not found")
            }

            res.send();
        });
    });
});

app.listen(PORT, function () {
    console.log("Server opened at port 3000");
});

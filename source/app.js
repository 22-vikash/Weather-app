const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weather'); 

const port = process.env.PORT || 5000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../template/views');

const partialsPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "Please enter the Location in order to search"
        })
    }

    weatherData(address, (error, {temperature, description, city} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, city);
        res.send({
            temperature,
            description,
            city
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})

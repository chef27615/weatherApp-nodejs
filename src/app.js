const path = require('path');
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000;

//Defined paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ray Williams'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ray Williams'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message:'This was my attempt to build a NodeJs weather app',
        title: 'Help',
        name: 'Ray Williams'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'must provide an address'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
            if(error){
                return res.send({error})
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
})



app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Ray Williams',
        errorMessage : 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Ray Williams',
        errorMessage : 'Page not found'
    })
})



app.listen(port, () => {
    console.log(`server up on port ${port}`)
})
/* eslint-disable consistent-return */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const creator = 'Igr';

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: creator,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: creator,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Helping since 1989',
    message: 'Getting help',
    name: creator,
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Error! You must provide an address',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = 0) => {
    if (error) {
      return res.send({
        error: 'Unable to find location. Try another search.',
      });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: 'Unable to connect to forecast services',
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) { // URL for search /products?search=games
    return res.send('Error! Provide a search');
  }
  res.send({
    procuct: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    pageNotFound: 'Help article not found.',
    name: creator,
    title: 'Error 404. Not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    pageNotFound: 'Error: 404. Page not found.',
    name: creator,
    title: 'NOT FOUND! 404.',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running at port: ${port}`);
});

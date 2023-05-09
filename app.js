const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/beers", (req, res) => {
  fetch("https://api.punkapi.com/v2/beers")
  .then((result)=>{
    result.json().then((jsonResponse)=>{

      const beers = jsonResponse.results;

      res.render("beers/beers-list", {beers: beers});
    })
  })
})

app.get("/beerDetails/:beerName", (req, res)=>{
  const name = req.params.beerName;

  fetch("https://api.punkapi.com/v2/beers?per_page=25/"+name)
  .then((result)=>{
    result.json().then((jsonResponse)=>{

      const name = jsonResponse.name;
      const image_url = jsonResponse.image_url;
      
      

      
      res.render("beers/beers-details", {name, image_url});
    })
  })


})

app.get('/random-beer', (req, res) => {
  res.render('Random Beer');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

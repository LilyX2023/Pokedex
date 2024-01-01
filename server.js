//import express
const express = require('express')
//create our app object
const app = express()

//require the pokemon data
const pokemons = require('./models/pokemon.js')

// middleware
app.use(express.static("public")) // use a "public" folder for files

/**
 * Route
 * induces
 * index new delete update create edit show
 */

//pokemon index route
//get request to /pokemons
//return all pokemons
app.get('/pokemon', (req,res) => {
    res.render('index.ejs',{pokemons})
})

//new route
app.get('/pokemon/new', (req,res) => {
    res.render('new.ejs')
})
//pokemon show route
//get request to /pokemons/:id
//return the single pokemon
app.get('/pokemon/:id', (req, res)=>{
    const mappedPokemons = pokemons.map(({name, img, type, stats}) =>({name, img, type, hp: stats.hp, attach: stats.attack, defense: stats.defense}))
    //get id from params
    const id = req.params.id
    //get the pokemon from the array
    const pokemon = mappedPokemons[id]
    
    //map out the simpler array with the needed property 

    //render the pokemon as response
    res.render('show.ejs', {pokemon})
})

//server listener

app.listen(3000,()=>{
    console.log("listening on port 3000")
})
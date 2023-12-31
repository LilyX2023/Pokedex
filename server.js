//import express
const express = require('express')
//create our app object
const app = express()

//require the pokemon data
const pokemons = require('./models/pokemon.js')

/**
 * Route
 * induces
 * index new delete update create edit show
 */

//pokemon index route
//get request to /pokemons
//return all pokemons
app.get('/pokemons', (req,res) => {
    res.send(pokemons)
})

//pokemon show route
//get request to /pokemons/:id
//return the single pokemon
app.get('/pokemons/:id', (req, res)=>{
    //get id from params
    const id = req.params.id
    //get the pokemon from the array
    const pokemon = pokemons[id]
    //render the pokemon as response
    res.render('show.ejs', {pokemon})
})

//server listener

app.listen(3000,()=>{
    console.log("listening on port 3000")
})
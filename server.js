//import express
const express = require('express')
//create our app object
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')

//require the pokemon data
const pokemons = require('./models/pokemon.js')


// middleware
app.use(express.static("public")) // use a "public" folder for files
app.use(express.urlencoded({extended:true}))//add the data to req.body
app.use(morgan("dev"))
app.use(methodOverride("_method"))



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

//Create Route - Receive form data, add new pokemon
//post request /pokemon
//create a pokemon from the form data, then redirect back to index
app.post("/pokemon",(req, res)=>{
    const newPokemon ={
        name: req.body.name,
        img: req.body.img,
        
       type: req.body.type.split(" "),

        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        },
    }
    req.body = newPokemon
    pokemons.push(req.body)
    res.redirect("/pokemon")
})

//Delete route - delete request goes to /pokemon/:id
app.delete('/pokemon/:id',(req, res)=> {
    //get the id from params
    const id = req.params.id
    pokemons.splice (id, 1)
    res.redirect('/pokemon');
})
//pokemon show route
//get request to /pokemons/:id
//return the single pokemon
app.get('/pokemon/:id', (req, res)=>{
    const mappedPokemons = pokemons.map(({name, img, type, stats}) =>({name, img, type, hp: stats.hp, attack: stats.attack, defense: stats.defense}))
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

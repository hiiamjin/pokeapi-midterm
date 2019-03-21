const
    superagent = require('superagent')
    pokeapi = require('pokeapi')
    inquirer = require('inquirer')

async function searchPrompt(matches) {
        
        return inquirer.prompt([{
            type: 'list',
            message: 'select the pokemon you are searching for',
            name: 'pokemon',
            choices: matches,
            validate: pokemon => {
                if(pokemon.length == 0)
                    return 'You must select a pokemon'
                else
                    return true
            }
        }])
}



async function search(gen = 10, name = 'ab') {
    const newPokemonList = []
   
    if(gen == 10){
        for(let i = 1; i < 8; i++){
            const poke = await pokeapi.find(i)
            //const found = await pokeapi.look(name)

            const pokemonList = poke.pokemon_species
   

            pokemonList.forEach(function(element) {
                //console.log(element.name)
                newPokemonList.push(element.name)
            })
        }
    }

    else{
        const poke = await pokeapi.find(gen)
        //const found = await pokeapi.look(name)

        const pokemonList = poke.pokemon_species
   

         pokemonList.forEach(function(element) {
                //console.log(element.name)
        newPokemonList.push(element.name)
         })

    }
    

    const matches = newPokemonList.filter(function(value){
      if(value) {
        return(value.substring(0, name.length) === name.toLowerCase())
        }
      })

    const searchList = matches

    //console.log(searchList)
    const foundPokemon = await searchPrompt(matches)

    const pokemonInfo = await pokeapi.look(foundPokemon.pokemon)

    print(pokemonInfo)

}


const print = (pokemonInfo) => {
    console.log('=====POKEMON INFO=====')

    console.log(`Name: ${pokemonInfo.name}`)

    const id = pokemonInfo.id

    let genNum = 0

    if(id < 152)
        genNum = 1
    else if(id > 151 && id < 252)
        genNum = 2   
    else if(id > 251 && id < 387)
        genNum = 3
    else if(id > 386 && id < 494)
        genNum = 4
    else if(id > 493 && id < 650)
        genNum = 5
    else if(id > 649 && id < 722)
        genNum = 6
    else if(id > 721)
        genNum = 7

    console.log(`Generation: ${genNum}`)

    console.log(`Pokedex number: ${id}`)

    const typesList = []

    const getTypes = pokemonInfo.types

     getTypes.forEach(getTypes => {
        typesList.push(getTypes.type.name)
    })

     if(typesList.length > 1){
            const lst = typesList
            const last = lst.pop()
            console.log(`Types : ${lst} and ${last}`)
     }

     else
            console.log(`Type/s: ${typesList}`)


    console.log('------BASE STATS------')
    const baseStats = pokemonInfo.stats
    baseStats.reverse()

    baseStats.forEach(baseStats => {
        console.log(`${baseStats.stat.name} : ${baseStats.base_stat}`)
    })
    
    
}

module.exports = { 
    search
}

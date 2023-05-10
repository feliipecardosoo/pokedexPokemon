const pokemonName = document.querySelector ('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input_search = document.querySelector('.input_search')
const bttnPrev = document.getElementById('prevPokemon'); 
const bttnNext = document.getElementById('nextPokemon'); 

let searchPokemon = 1

const fetchpokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)  
    
    if (APIResponse.status ===200){
         const data =  APIResponse.json()
         return data 
    }
    else {
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = ''
        pokemonName.innerHTML = 'Pokemon Inexistente';
    }
    
}

const renderPokemon = async (pokemon) =>{

    const data = await fetchpokemon(pokemon)

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    searchPokemon = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
}

form.addEventListener('submit', (e) => {
    e.preventDefault();  
    renderPokemon(input_search.value.toLowerCase())
    input_search.value = ''
})

bttnPrev.addEventListener('click', function(){
    searchPokemon -= 1
    renderPokemon(searchPokemon)
})

bttnNext.addEventListener('click', function(){
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
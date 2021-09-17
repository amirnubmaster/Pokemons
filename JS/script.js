const base_url = 'https://pokeapi.co/api/v2/pokemon'
const container = document.querySelector('.row')

var OFFSET = 0
var state = 1118 / 20;

function getData(url , query , cb){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(r => cb(r))
}

getData(base_url , `offset=${OFFSET}&limit=20` , res =>{
    console.log(res.results);
    const card = res.results.map(item => Card(item)).join('')
    container.innerHTML = card
})




function Card(item){
    return`
        <div class="col-xl-4 mt-4">
            <div class="card text-light">
                <div onclick="choosePokemon('${item.url}')" class="card-header text-center bg-dark">
                    <h5>${item.name}</h5>
                </div>
            </div>
        </div>
    `
}


// function choosePokemon(url){
//     getData(){
        
//     }
// }


const prev = document.querySelector('.prev')
const count = document.querySelector('.count')
const next = document.querySelector('.next')

var pagination = 1;


prev.addEventListener('click' , e =>{
    e.preventDefault()

    OFFSET-=20
    pagination--
    count.innerHTML = pagination

    getData(base_url , `offset=${OFFSET}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join('')
        container.innerHTML = card
    })

    if(pagination < 1){
        prev.classList.add('disabled')
    }

    if(pagination < state){
        next.classList.remove('disabled')
    }
})



next.addEventListener('click' , e =>{
    e.preventDefault()
    OFFSET+= 20
    pagination++
    count.innerHTML = pagination

    getData(base_url , `offset=${OFFSET}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join('')
        container.innerHTML = card
    })

    if(pagination > state){
        next.classList.add('disabled')
    }

    if(pagination > 1){
        prev.classList.remove('disabled')
    }
})



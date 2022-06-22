var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
let descFilme;
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;

    descFilme = data[chave];
});


const API_KEY = 'api_key=182db6a4ea8c66773d3aea3aa4281cb6&language=pt-BR';
const URL_PADRAO = 'https://api.themoviedb.org/3';
const url =  URL_PADRAO + '/search/movie?' + API_KEY + '&query=' + descFilme;
const img_url = 'https://image.tmdb.org/t/p/w500';
let imgFilme;

function pesquisarFilmes(){
    event.preventDefault();
    let valor = document.getElementById('pesquisar').value
    window.location = "pesquisar.html?filme="+valor;
}

if(descFilme != null){
    pegarFilmes(url);
}

function pegarFilmes(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            detalhesFilmes(data.results);
        })
}


function detalhesFilmes(data){

    data.forEach(movie => {   
  
        const {id, title, backdrop_path, overview, vote_average, release_date, homepag} = movie;
        const filmeEl = document.createElement('div');

        if(backdrop_path != null){
            imgFilme = img_url+backdrop_path;
        } else {
            imgFilme = "js/img/no_image.png";
        }

        filmeEl.innerHTML = `.
                <div class="row">
                    <div class ="col-12 col-sm-12 col-md-12 col-lg-6 mt-3">
                        <img style="width: 100%;" src="${imgFilme}" alt="${data['title']}">
                    </div>
                    <div class = "col-12 col-sm-12 col-md-12 col-lg-6">
                        <p class = "titulovideo">${title}</p>
                        <p class = "texto">${overview}</p>
                        <!--avaliações-->
                        <p class = "info">
                            <span class = "info1">Lançamento:</span>
                            <span class = "avaliacao">${release_date}</span>
                        </p>
                        <p class = "info">
                            <span class = "info1">Avaliação:</span>
                            <span class = "avaliacao">${vote_average}</span>
                        </p>
                        <p class = "info">
                            <span class = "info1">Detalhes:</span>
                            <span class = "avaliacao">
                                <a href="detalhes.html?id=${id}">
                                    <button id="${id}" class="btn btn-secondary">info</button>
                                </a>                        
                            </span>
                        </p>
                    </div>
                </div>
                `;   
        
        document.getElementById("detalhes").appendChild(filmeEl);
    })  
}
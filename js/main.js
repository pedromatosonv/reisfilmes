
const API_ACCESS_TOKEN = 'api_key=182db6a4ea8c66773d3aea3aa4281cb6&language=pt-BR';
const URL_PADRAO = 'https://api.themoviedb.org/3';
const url =  URL_PADRAO + '/discover/movie?sort_by=popularity.desc&' + API_ACCESS_TOKEN;
const img_url = 'https://image.tmdb.org/t/p/w500';

const lancamentos = document.getElementById("lancamentos");

recebeFilmes(url);
function recebeFilmes(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            enviarFilmesForm(data.results);
        })
}


function enviarFilmesForm(data){

    data.forEach(movie => {
        const {id, title, backdrop_path, overview, vote_average, release_date} = movie;
        const filmeEl = document.createElement('div');
        filmeEl.setAttribute('class', 'carousel-item');
        filmeEl.innerHTML = `
                <div class="row">
                <div class ="col-12 col-sm-2 col-xs-9 col-md-12 col-lg-6 mt-3 mb-3">
                    <img style="width: 100%;" src="${img_url+backdrop_path}" alt="${title}">
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

        document.getElementById("lancamento").appendChild(filmeEl);
    })
}

function pesquisarFilmes(){
    event.preventDefault();
    let valor = document.getElementById('pesquisar').value
    window.location = "pesquisar.html?filme="+valor;

}
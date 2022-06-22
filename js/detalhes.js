var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
let idMove;
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;

    idMove = data[chave];
});



const API_ACCESS_TOKEN = 'api_key=182db6a4ea8c66773d3aea3aa4281cb6&language=pt-BR';
const URL_PADRAO = 'https://api.themoviedb.org/3';
const img_url = 'https://image.tmdb.org/t/p/w500';
// const url =  URL_PADRAO + '/movie/' + idMove + '?' + API_ACCESS_TOKEN;

const url =  URL_PADRAO + '/movie/' + idMove + '?' + API_ACCESS_TOKEN;
pegarFilmes(url);



function pegarFilmes(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            detalhesFilmes(data);
        })
}


function detalhesFilmes(data){
    // <iframe width="560" height="315" src="${img_url+data['backdrop_path']}" title="${data['title']}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        const filmeEl = document.createElement('div');
        filmeEl.innerHTML = `
        <div class="row">
            <div class ="col-12  col-md-12 col-lg-5 mb-3 mt-3">
                <img style="width: 100%;" src="${img_url+data['poster_path']}" alt="${data['title']}">
            </div>
            <div class = "col-12 col-sm-12 col-md-12 col-lg-6">
                <p class = "titulovideo">${data['title']}</p>
                <p class = "texto">${data['tagline']}</p>
                <!--avaliações-->
                <p class = "info">
                    <span class = "info1">Categoria Principal:</span>
                    <span class = "detalhes">${data['genres'][0]['name']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Produtor:</span>
                    <span class = "detalhes">${data['production_companies'][1]['name']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Lançamento:</span>
                    <span class = "detalhes">${data['release_date']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Quantidade de views:</span>
                    <span class = "detalhes">${data['revenue']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Tempo médio:</span>
                    <span class = "detalhes">${data['runtime']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Avaliação:</span>
                    <span class = "detalhes">${data['vote_average']}</span>
                </p>
                <p class = "info">
                    <span class = "info1">Página do Filme:</span>
                    <span class = "detalhes"><a href="${data['homepage']}">Link</a></span>
                </p>
                <p class = "info">
                    <span class = "info1">Descrição:</span>
                    <span class = "detalhes">${data['overview']}</span>
                </p>
                <a href="javascript:history.back()" >
                    <button type="button" class="btn btn-primary">
                        Voltar
                    </button>
                </a>
            </div>
        </div>
        `;

        document.getElementById("detalhes").appendChild(filmeEl);
    // })
}

function pesquisarFilmes(){
    event.preventDefault();
    let valor = document.getElementById('pesquisar').value
    window.location = "pesquisar.html?filme="+valor;

}
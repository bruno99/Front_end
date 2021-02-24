var apidata;
var page=1;

const fetchData = (page=1) => {//cogemos los datos de la api de Rick&Morty
    const url = "https://rickandmortyapi.com/api/character?page=" + page;
    fetch(url)
    .then(response => response.json())
    .then(data => fillData(data))

}
function findNext() {
    page = page+1;
    fetchData(page);//cada vez que se cambia de pagina hay que coger los datos de esa pagina
}
    
function findPrev(){
    page = page-1;
    fetchData(page);//cada vez que se cambia de pagina hay que coger los datos de esa pagina
}
const fillData = (data, page=1) => {
    console.log(data);
    var html = '';
    data.results.forEach(ch => {
        html += "<div class = 'target'>";
            html += "<img class = 'char_image' src='" + ch.image + "'alt='CHAR IMAGE'/>";//cargamos la foto
            html += "<div class = 'char_desc_section'>";
                html += "<div><h2>" + ch.name + "</h2><div>";//cargamos el nombre
                    if(ch.status === "Alive"){//cargamos su estado y especie
                        html += "<div class = 'status_alive'></div>" + ch.status + "   |   " + ch.species + "</div>";
                    }else if(ch.status === "unknown"){
                        html += "<div class = 'status_unknown'></div>" + ch.status + "   |   " + ch.species + "</div>";
                    }else if(ch.status === "Dead"){
                        html += "<div class = 'status_dead'></div>" + ch.status + "    |   " + ch.species + "</div>";
                    }
                html += "</div>";               
                html += "<div class='section'>";
                    html += "<h4>Origin:</h4>";//cargamos su origen
                    html += "<h3>" + ch.origin.name + "</h3>";
                html += "</div>"
        html += "</div></div>"
        document.getElementById("list").innerHTML = html;
    })
}

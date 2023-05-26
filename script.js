$(document).ready(function () {
    $(("form")).on("submit", function (e) {
        e.preventDefault();
        let searchFilm = $('input').val();
        getMovies(searchFilm);
    });
});

function getMovies(searchFilm) {
    axios.get('http://www.omdbapi.com/?s=' + searchFilm + '&apikey=cd155937').then((response) => {
        let films = response.data.Search;
        let output = "";
        $.each(films, (index, film) => { 
            output += `
            <div>
               <img class="my-4" src="${film.Poster}">
               <h4 class="text-warning my-2">${film.Title}</h4>
               <a onclick="filmSelected('${film.imdbID}')" class="btn btn-success my-2" href="#">Інформація про фильм</a>
            </div>
            `;
        });

        $(".films").html(output);

    } ).catch((error) => {
        console.log(error);
    });
}

function filmSelected(id) {
    sessionStorage.setItem("filmID", id)
    window.location = "film.html";
    return false;
}

function getMovie() {
    let filmID = sessionStorage.getItem('filmID');
    axios.get('http://www.omdbapi.com/?i=' + filmID + '&apikey=cd155937').then((response) => {
       console.log(response);
       let film = response.data;
       let output = `
       <div class="d-flex">
          <div class="">
             <img src="${film.Poster}" class="my-4 mx-5">
          </div>
          <div class="w-75">
             <h2 class="text-warning">${film.Title}</h2>
             <ul class="bg-black pe-5 py-4 me-5 ">
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning"><strong>Рейтинг:</strong> ${film.imdbRating
                }</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Жанр:</strong> ${film.Genre}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Тип:</strong> ${film.Type}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Час:</strong> ${film.Runtime}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Країна:</strong> ${film.Country}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Реліз:</strong> ${film.Released}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Мова:</strong> ${film.Language}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Режисер:</strong> ${film.Director}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Письменник:</strong> ${film.Writer}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Актори:</strong> ${film.Actors}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center text-warning my-2"><strong>Нагороди:</strong> ${film.Awards
                }</li>
             </ul>
          </div>
       </div>
       <div>
          <div>
             <h3>Сюжет</h3>
             <section class="text-warning mx-3 pb-5">${film.Plot}</section>
             <a href="https://www.imdb.com/title/${filmID}" target="_blank" class="btn btn-success mx-3">Трейлер</a>
          </div>
       </div>
       `;
       $('.film').html(output);
    }).catch((error) => {
       console.log(error);
    });
 };
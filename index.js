if (window.location.search){
  console.log(window.location.search.substr(1))
}

//Refresh if older than one day
if ( localStorage.getItem("db") == null || ( Date.now() - JSON.parse(localStorage.getItem("db-updated") )) > 86400) {
  fetch("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=e269b0432cb35577201f06837e2a5803")
    .then(resp => resp.json()).then((weatherData) => {
      localStorage.setItem("db", JSON.stringify(weatherData));
      localStorage.setItem("db-updated", Date.now());
      updateView();
    });
} else {
  updateView();
}

function updateView(){
  const data = JSON.parse( localStorage.getItem("db") )
  /* change stuff in header*/
  document.getElementById('city').innerHTML = data.city.name
  document.getElementById('degree').innerHTML = `${ data.list[0].main.temp } °`
  document.getElementById('desc').innerHTML = data.list[0].weather[0].description

  /*
   * How the sortign callback works:
   * a < b, return -1; 
   * a > b, return 1; 
   * a === b, return 0;
   * */

  if(window.location.search.substr(1) === "wind=asc"){
    document.getElementById("windsorter").href = "index.html?wind=desc"
    data.list.sort(function(a,b) { return (a.wind.speed > b.wind.speed) ? 1 : ((b.wind.speed > a.wind.speed) ? -1 : 0);} );
  } else if(window.location.search.substr(1) === "wind=desc"){
    document.getElementById("windsorter").href = "index.html?wind=asc"
    data.list.sort(function(a,b) { return (a.wind.speed < b.wind.speed) ? 1 : ((b.wind.speed < a.wind.speed) ? -1 : 0);} );
  }

  data.list.forEach(function(item){
    var i = document.createElement("tr")

    // formatting date in Javascript is a pain in the ass
    var date = new Date(item.dt_txt)
    var datestring = `${ date.getDate() }.${ ( date.getMonth() + 1 ) }.${ date.getFullYear() } ${date.getHours() }:${ date.getMinutes() }0`

    i.innerHTML += `<td><img class="img-fluid" alt=${data.list[0].weather[0].description} src="./weatherIcons/${item.weather[0].icon}.svg" /></td>`
    i.innerHTML += "<td>"+ datestring + "</td>";
    i.innerHTML += "<td>"+ item.main.temp_max +"</td>";
    i.innerHTML += "<td>"+ item.main.temp_min +"</td>";
    i.innerHTML += "<td>"+item.weather[0].description+"</td>";
    i.innerHTML += "<td>"+item.wind.speed+"</td>";

    document.getElementsByTagName("tbody")[0].appendChild(i);
  })

}

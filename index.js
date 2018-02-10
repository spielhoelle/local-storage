//Refresh localstorage if db is older than one day
if ( localStorage.getItem("db") == null || ( Date.now() - JSON.parse(localStorage.getItem("db-updated") )) > 86400) {
  fetch("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=e269b0432cb35577201f06837e2a5803")
    .then(resp => resp.json()).then((weatherData) => {
      //set db
      localStorage.setItem("db", JSON.stringify(weatherData));
      //set db expiry date
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
    // here we append a GET parameter with the sorting method
    // eg. 
    // www.example.com 
    // gets:
    // www.example.com?wind=desc
    document.getElementById("windsorter").href = "index.html?wind=desc"
    //here we sort the data array before rendering
    data.list.sort(function(a,b) { return (a.wind.speed > b.wind.speed) ? 1 : ((b.wind.speed > a.wind.speed) ? -1 : 0);} );
  } else if(window.location.search.substr(1) === "wind=desc"){
    //here goes sorting revers
    document.getElementById("windsorter").href = "index.html?wind=asc"
    data.list.sort(function(a,b) { return (a.wind.speed < b.wind.speed) ? 1 : ((b.wind.speed < a.wind.speed) ? -1 : 0);} );
  }

  //create forecast table
  var cardTemplate = document.getElementById('card-template')

  data.list.forEach(function(item){
    var cardClone = cardTemplate.cloneNode(true);
    var date = new Date(item.dt_txt)
    var datestring = `${ date.getDate() }.${ ( date.getMonth() + 1 ) }.${ date.getFullYear() } ${date.getHours() }:${ date.getMinutes() }0`
    cardClone.removeAttribute('id')
    cardClone.classList.remove('d-none')
    cardClone.querySelector('.card-title').innerHTML = datestring
    cardClone.querySelector('.card-text').innerHTML = item.weather[0].description
    cardClone.querySelector('.list-group-item:nth-child(1)').innerHTML = `Max: ${ item.main.temp_max }`
    cardClone.querySelector('.list-group-item:nth-child(2)').innerHTML = `Min: ${ item.main.temp_min }`
    

    document.getElementById("target").appendChild(cardClone);
    document.getElementById("loader").classList.add("loaded")

  })

}


// window.scrollY
// document.body.clientHeight
// window.innerHeight
// document.getElementById("xyz").style.width = percent + "%"


window.addEventListener('scroll', function(e) {
  var percent = (window.scrollY ) / (document.body.clientHeight - window.innerHeight) * 100
  document.getElementById("scroll").style.width = percent + "%"
});

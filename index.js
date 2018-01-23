if( localStorage.getItem("db") == null) { 
  fetch("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=e269b0432cb35577201f06837e2a5803")
    .then(resp => resp.json()).then((weatherData) => {
      console.log ("nothing in localstorage, lets save the data inside", weatherData );
      localStorage.setItem("db", JSON.stringify(weatherData))
    });
} else {
  console.log("localstorage present")
  console.log( JSON.parse( localStorage.getItem("db") ) )
}
const data = JSON.parse( localStorage.getItem("db") )
document.getElementById('city').innerHTML = data.city.name
document.getElementById('degree').innerHTML = `${ data.list[0].main.temp } °`
document.getElementById('desc').innerHTML = data.list[0].weather[0].description

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

  document.getElementsByTagName("tbody")[0].appendChild(i);
})


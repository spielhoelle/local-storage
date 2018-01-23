fetch("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=e269b0432cb35577201f06837e2a5803")
  .then(resp => resp.json()).then((weatherData) => {
    console.log ("nothing in localstorage, lets save the data inside", weatherData );
  });

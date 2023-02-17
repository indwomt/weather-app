let searchButton = $("#search-button")
let currentTemperature = $("#current-temperature")

let apiKey = "ed0dafb04bbcbcd11b70d5fbaf06678b"
let testText = $("#test-text").val()


let savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || []


function getWeather(searchedCity) {
  
  let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=ed0dafb04bbcbcd11b70d5fbaf06678b"
  console.log(requestUrl)
  
  console.log(searchedCity)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      let iconLink = data.list[1].weather.icon

      $('#current-city').text(searchedCity + "'s Current Weather")
      
      currentTemperature.text("Temperature: " + Math.trunc(((data.list[0].main.temp - 273.15) * 9 / 5 + 32))) 
      $('#current-wind-speed').text('Wind Speed: ' + data.list[0].wind.speed)
      $('#current-humidity').text('Humidity: ' + data.list[0].main.humidity + ' %')
      

      $('#future-temp-1').text("Temperature: " + Math.trunc(((data.list[1].main.temp - 273.15) * 9 / 5 + 32)))
      $('#future-date-1').text(data.list[1].dt_txt)
      $("#future-humidity-1").text(data.list[1].main.humidity + "%")
      $('#future-icon-1').attr("src","https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png")

      $('#future-temp-2').text("Temperature: " + Math.trunc(((data.list[2].main.temp - 273.15) * 9 / 5 + 32)))
      $('#future-date-2').text(data.list[2].dt_txt)
      $("#future-humidity-2").text(data.list[2].main.humidity + "%")
      $('#future-icon-2').attr("src","https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png")

      $('#future-temp-3').text("Temperature: " + Math.trunc(((data.list[3].main.temp - 273.15) * 9 / 5 + 32)))
      $('#future-date-3').text(data.list[3].dt_txt)
      $("#future-humidity-3").text(data.list[3].main.humidity + "%")
      $('#future-icon-3').attr("src","https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png")

      $('#future-temp-4').text("Temperature: " + Math.trunc(((data.list[4].main.temp - 273.15) * 9 / 5 + 32)))
      $('#future-date-4').text(data.list[4].dt_txt)
      $("#future-humidity-4").text(data.list[4].main.humidity + "%")
      $('#future-icon-4').attr("src","https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png")

      $('#future-temp-5').text("Temperature: " + Math.trunc(((data.list[5].main.temp - 273.15) * 9 / 5 + 32)))
      $('#future-date-5').text(data.list[5].dt_txt)
      $("#future-humidity-5").text(data.list[5].main.humidity + "%")
      $('#future-icon-5').attr("src","https://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png")



    })

}


$("#search-button").click(function (event) {
  event.preventDefault();
  let searchedCity = $("#city-choice").val()
  if (searchedCity == ""){
    window.alert("Please enter a city")
    return
  }

  

  getWeather(searchedCity)
  savedSearches.push(searchedCity)
  localStorage.setItem("savedSearches", JSON.stringify(savedSearches))
  function addNewButton() {
  if(searchedCity)
    $('#history').append(`<button>${searchedCity}</button>`)
    $("#history button:last").click(function() {
      getWeather(this.innerHTML);
   })
  }
  $(".forecast-card-container").style.display = "block"
  addNewButton()
})

var history = $("#history")

window.onload = function createButton() {
  // $("#history").html("")
  for (var i = 0; i < savedSearches.length; i++) {
    var newSearchButton = $("button")
    $("#history").append(newSearchButton)
    newSearchButton.click(function() {
      getWeather(this.innerHTML);
      })  
      $("#history").append(`<button>${savedSearches[i]}</button>`);
      $("#history button:last").click(function() {
         getWeather(this.innerHTML);
      });
    newSearchButton.click(function(event) {
    event.preventDefault()
    getWeather(newSearchButton.html())
    console.log(newSearchButton.html())
  })
  
 
}
   
  }
 
createButton()



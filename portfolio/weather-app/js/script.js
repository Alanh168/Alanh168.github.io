$(document).ready(function() {
  // Get Location based on IP
  var latitude, longitude;
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(populateData);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }
  function populateData(position) {
    latitude = position.coords.latitude.toFixed(4);
    longitude = position.coords.longitude.toFixed(4);
    $("#latitude .coordinates").html(latitude);
    $("#longitude .coordinates").html(longitude);
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + Math.round(latitude) + "&lon=" + Math.round(longitude), function(data) {
      temp = Math.round((data.main.temp * 9)/5 + 32);
      $('#temperature').html(temp + '\xB0F');

      $("#weather").html(data.weather[0].main);

      var windSpeed = data.wind.speed;
      var windDirection = data.wind.deg;

      // Changing the value of windDirection to an actual direction
      if(windDirection > 345 || windDirection <= 30) {
        windDirection = "E";
      }
      else if (windDirection > 30 && windDirection <= 75) {
        windDirection = "NE";
      }
      else if (windDirection > 75 && windDirection <= 105) {
        windDirection = "N";
      }
      else if (windDirection > 105 && windDirection <= 165) {
        windDirection = "NW";
      }
      else if (windDirection > 165 && windDirection <= 195) {
        windDirection = "W";
      }
      else if (windDirection > 195 && windDirection <= 245) {
        windDirection = "SW";
      }
      else if (windDirection > 245 && windDirection <= 285) {
        windDirection = "S";
      }
      else if (windDirection > 285 && windDirection <= 345) {
        windDirection = "SE";
      }
      if(windSpeed == null) {
        windSpeed = 'N/A Wind Speed';
        console.log("Failed to get wind speed");
      }
      if(windDirection == null) {
        windDirection = '';
        console.log("Failed to get wind direction");
      }
      $("#wind").html(windDirection + " " + windSpeed + " knots");

      // Change Icon according to Weather
      if(data.weather[0].main == 'Rain') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-showers"></i>`
        );
      }
      else if(data.weather[0].main == 'Drizzle') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-sprinkle"></i>`
        );
      }
      else if(data.weather[0].main == 'Clouds') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-cloudy"></i>`
        );
      }
      else if(data.weather[0].main == 'Snow') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-snow"></i>`
        );
      }
      else if(data.weather[0].main == 'Clear') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-day-sunny"></i>`
        );
      }
      else if(data.weather[0].main == 'Thunderstorm') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-thunderstorm"></i>`
        );
      }
      else if(data.weather[0].main == 'Mist') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-fog"></i>`
        );
      }
      else if(data.weather[0].main == 'Smoke') {
        document.querySelector(".icon-area").insertAdjacentHTML("beforeend",
        `<i class="wi wi-smoke"></i>`
        );
      }
    });
  }
  getLocation();

 });

$('#changeDegreeUnits').click(function() {
  var fullText = $('#temperature').text();
  var temp = fullText.substring(0, fullText.length-2);
  var currentUnit = fullText.substring((fullText.length-1), fullText.length);
  if(currentUnit == 'F') {
    temp = Math.round(((temp - 32) * 5)/9);
    $('#temperature').text(temp + '\xB0C');
  }
  else {
    temp = Math.round((temp * 9)/5 + 32);
    $('#temperature').text(temp + '\xB0F');
  }
});
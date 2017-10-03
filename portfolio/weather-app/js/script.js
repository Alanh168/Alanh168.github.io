$(document).ready(function() {
  // Get Location based on IP
  $.getJSON("http://ip-api.com/json/", function(data) {
    $("#location").html(data.city);
    // Get Zip and Country Code and store them in variables
    var zip = data.zip;
    var countryCode = data.countryCode.toLowerCase();

    // Get Weather, Temperature, and wind using OpenWeatherMap API, zip code, and country code

    getWeather(zip, countryCode);

  });

  function getWeather(zip, countryCode) {
    var api_key = '8eda145370e8903509870ccfbb9e452f';
    $.ajax({
      url : "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + countryCode + '&mode=html&appid=' + api_key,
      type: 'GET',
      dataType: 'jsonp',
      success : function(weatherData) {
        // Temperature
        var temperature = Math.round((weatherData.main.temp * 9)/5 + 32);
        $("#temperature").html(temperature + '\xB0F');

        // Weather
        var forecast = weatherData.weather[0].main;
        if(forecast == null) {
          $("#weather").html("N/A");
          console.log("Failed to get weather information");
        }
        else {
          $("#weather").html(forecast);
        }

        // Winds

        var windSpeed = weatherData.wind.speed;
        var windDirection = weatherData.wind.deg;
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
      },
      error: function () {
        console.log('Failed!');
      }
    });
  }

  // function changeCloudColor() {
  // }
  //
  // function changePageColor() {
  // }



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

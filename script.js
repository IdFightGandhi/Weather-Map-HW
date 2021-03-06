$(document).ready(function(){

var searchHistory = [];

moment().format("L");

if (localStorage.getItem("city")!==null){

    var lastSearch = JSON.parse(localStorage.getItem("city"));
    for(var i =0;i<lastSearch.length;i++){
        pageLoad(lastSearch[i]);
    }

    


}
//search function for Current City weather//

function searchCity(cityName) {
   
   
        //here are variables for the URL's
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
   
    //use URL variables in an ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log("is this the response??", response);
        console.log("is it this one?",queryURL);
        
        $("#current").empty();
        var mainDate = moment().format('L');


        //make variables for city information
        var cityNameEl = $("<h2>").text(response.name);
        var displayMainDate = cityNameEl.append("" + mainDate);
        var temperatureEl = $('<p>').text("Temperature is " + response.main.temp);
        var humidityEl = $('<p>').text("Humidity is " + response.main.humidity);
        var windSpEl = $("<p>").text("Current Wind Speed is " + response.wind.speed);
        var currentWeather = response.weather[0].main;

    //then you have icons for weather types that display

        if (currentWeather ==="Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");

        }else if (currentWeather==="Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");

        }else if (currentWeather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");

        }else if (currentWeather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");

        }else if (currentWeather === "Snow") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }

    var displayDiv = $('<div>');

    displayDiv.append(displayMainDate,currentIcon,temperatureEl,humidityEl, windSpEl);

    $("current").html(displayDiv);

        //Call API for UV info
    var latitude = response.coord.lat;
    var longitude = response.coord.lat;
    var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + latitude  + "&lon=" + longitude;

        $.ajax({
            url:queryURLUv,
            method:'GET'
        }).then(function(response){
            $('#uvl-display').empty();
            console.log("do I get lat and lon??",response)
            var uvlresult = response.value;

            var uvlEl = $("<button class='btn bg-success;'>").text("UV Index: " + response.value);

            $('#uvl-display').html(uvlEl);

        });
        var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
        $.ajax({
            url: queryURLforcast,
            method:'GET'
    
        }).then(function (response) {
            console.log("WTF???", response)
            var results =response.list;
    
            $('#5day').empty();
    
            for (var i=0; i <results.length;i += 8){
                var fiveDayForcastDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
    
                var date = results[i].dt.txt;
                // var setD =date.substr(0,10)
                var temp = results[i].main.temp;
                varhum = results[i].main.temp;
                var hum = results[i].main.humidity;
    
    
                var h5date = $("<h5 class='card-title'>").text(date);
                var pgTemp = $("<p class='card-text'>").text("Temp: " + temp);
                var pgHum = $("<p class='card-text'>").text("Humidity " + hum);
    
                var weather = results[i].weather[0].main;
    
                if (currentWeather ==="Rain") {
                    var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                    currentIcon.attr("style", "height: 40px; width: 40px");
        
                }else if (currentWeather==="Clouds") {
                    var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                    currentIcon.attr("style", "height: 40px; width: 40px");
        
                }else if (currentWeather === "Clear") {
                    var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                    currentIcon.attr("style", "height: 40px; width: 40px");
        
                }else if (currentWeather === "Drizzle") {
                    var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                    currentIcon.attr("style", "height: 40px; width: 40px");
        
                }else if (currentWeather === "Snow") {
                    var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                    currentIcon.attr("style", "height: 40px; width: 40px");
                }
    
                fiveDayForcastDiv.append(h5date);
                fiveDayForcastDiv.append(currentIcon);
                fiveDayForcastDiv.append(pgHum);
                fiveDayForcastDiv.append(pgTemp);
                $("#5day").append(fiveDayForcastDiv);
            }
        });
    
    pageLoad();

    
    //searchHistory.push(cityName);




    })};

    //Here you need an ajax call for the five day forecast
 
   

// $("#select-city").on("click", function (event){
//     event.preventDefault();

//     var cityInput = $("city-input").val();
//     var textContent = $(this).siblings("input").val();
//     var storeArr = [];
//     storeArr.push(textContent);
   
// });

function pageLoad(text) {
    //var lastSearch = JSON.parse(localStorage.getItem("city"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(text);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhistory").prepend(psearch);


}
$("#select-city").on("click", function (event) {
    event.preventDefault();
    var citySearch =$("#city-input").val().trim()
    console.log(citySearch, "hello");
    searchHistory.push(citySearch);
    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log("178hello")
    searchCity(citySearch);
    // pageLoad();
    

    // console.log("this is my stuff")
})

$("#searchhistory").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});
});

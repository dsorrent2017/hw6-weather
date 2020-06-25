const openweatherMapApiKey = "8b3374952ed551fd8ee66530403608ee";
/**
 API call:
api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}

api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}

Parameters:
q city name, state code and country code divided by comma, use ISO 3166 country codes. You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations.

Examples of API calls:
api.openweathermap.org/data/2.5/weather?q=London

api.openweathermap.org/data/2.5/weather?q=London,uk


API response:
{"coord": { "lon": 139,"lat": 35},
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 281.52,
    "feels_like": 278.99,
    "temp_min": 280.15,
    "temp_max": 283.71,
    "pressure": 1016,
    "humidity": 93
  },
  "wind": {
    "speed": 0.47,
    "deg": 107.538
  },
  "clouds": {
    "all": 2
  },
  "dt": 1560350192,
  "sys": {
    "type": 3,
    "id": 2019346,
    "message": 0.0065,
    "country": "JP",
    "sunrise": 1560281377,
    "sunset": 1560333478
  },
  "timezone": 32400,
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200
}



JSON format is used by default. To get data in XML or HTML formats just set up mode = xml or html.

Parameters:
mode - possible values are xml and html. If mode parameter is empty the format is JSON by default.
Examples of API calls:
JSON api.openweathermap.org/data/2.5/weather?q=London&appid=8b3374952ed551fd8ee66530403608ee << use this
https://openweathermap.org/current
XML api.openweathermap.org/data/2.5/weather?q=London&mode=xml

HTML api.openweathermap.org/data/2.5/weather?q=London&mode=html

api.openweathermap.org/data/2.5/forecast/hourly?q={Rochester}&appid=8b3374952ed551fd8ee66530403608ee

http://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=8b3374952ed551fd8ee66530403608ee
 */

 /*

# 05 Third-Party APIs: Work Day Scheduler

Create a simple calendar application that allows the user to save events for each hour of the day. 
This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. 
Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

See index.html for   
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>

*/


//global variables
const momentTime = moment().format('MMMM Do YYYY');
let militaryHours = moment().format('H');
const debug = true;
//Use font-awesome as imported in index.html
const saveImageButton = "./images/save-regular.svg"; 


//loop control variables : Future enhancement: make configureable with input text boxes
const numberHourRows = 18;
let hourDescriptions =  new Array(numberHourRows);  //ES6 like Java && C# makes  Array a 1st class object
const beginHour = 6;
const endHour = 24;

let cities = ["Rochester"];

//compute at runtime so set to null;
let displayHour = null;
let amOrPm =  null;
let $saveBtn = null;
let hour = 0;  //delete




function show5DayForecast(city){
    alert("show5DayForecast "+ city);
}


function addCityToSideBar(city){
    debugger;
    const cityLi = "<a" + 'href='+ city +" onclick='show5DayForecast(" + city + ")'></a>";
    console.log(cityLi);
    $('#found-cities').append(cityLi);

}

const currentDayForecastIx = 0;
const fiveDayForecastIx    = 1;

let weatherURLs = ["http://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=8b3374952ed551fd8ee66530403608ee",
                    "http://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=8b3374952ed551fd8ee66530403608ee"];

let lastCityToday = null;
let lastCity5Days = null;

function loadCityForecastData(index,city) {
    debugger;
    let lastURL = weatherURLs[index];
    let replaceCity = null;

    if(index == currentDayForecastIx){
        if(lastCityToday == null){
            lastCityToday = city;
        }
        replaceCity = lastCityToday;
    }else{
        if(lastCity5Days == null){
            lastCity5Days = city;
        }
        replaceCity = lastCity5Days;
    }
 
    var xhttp = new XMLHttpRequest();  //see figures and do JQuery with AJax  response = JQuery Ajax

    xhttp.onreadystatechange = function() {
        var toHtml = '"<h2>" +  city + "</h2>";';
       
        var myhttp = xhttp;
        if (this.readyState == 4 && this.status == 200) {
        
         //
         var response = this.response;  //this is http
         
         let jsonObj = JSON.parse(response);
         if(jsonObj == null){
             debugger;
             console.log("jsonObj null returning");
         }
  
         
         
  
         
  
         //watch all variables
       
         var val = null;

         for (var key in jsonObj) {
           if (jsonObj.hasOwnProperty(key)) {
             val = jsonObj[key];
 
             console.log(key + "-" + JSON.stringify(val));
             if(key == 'list'){
                 break;
             }
           }
         }

         let arrayOfDays = val;  //val has list 
         console.log("# objects = " + arrayOfDays.length);
         debug; return;

         let mainVal = jsonObj['main'];
         console.log(mainVal);

         var dateTime = mainVal["dt_text"];
         console.log("temp = " + temp);
         var humidity =  mainVal["humidity"];
  
         let coordVal=jsonObj["coord"];
         console.log("coord = " + coordVal);
         var lat = coordVal["lat"];
         var lon = coordVal["lon"];
         
         var windVal = jsonObj["wind"];
         var windSpeed = windVal["speed"];


         
//Have a loop that collects all the objects for each day and then gets the data
         return;
         



         let imageSuffix = 0;
         const dumpId = index == 0 ? "dumpJSON" :  "dump5JSON";
         let inner = "";
         for (i = 0; i < 1; i++) {   //traverse through days
          
          let valNum = parseFloat(temp);
          valNum = (valNum-32) / 1.8;
          toHtml += "<h4>" + "Temperature: " + valNum + "</h4>";
          console.log(toHtml);
  
          toHtml += "<h4>" + "Wind Speed: " + windSpeed + "</h4>";
  
          toHtml += "<h4>" + "Humidity: " + humidity + "% </h4>";
  
          //let longLatURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";
         
          let longLatURL ="https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + 
              "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";
  
          console.log(longLatURL);
  
          let uvIndex = getUVIndex(longLatURL);
  
          toHtml += "<h4>" + "UV Index: " + uvIndex + " </h4>";
  
  
          inner = dumpId + imageSuffix;
          document.getElementById(inner).innerHTML = toHtml; 
         } //for
        } //if ready
      }  // xhttp.onreadystatechange = function() {

  

    let targetURL = lastURL.replace(replaceCity,city)
    console.log(targetURL);

    xhttp.open("GET", targetURL, true);
    xhttp.send();
    
} //function end

function loadDoc(index,city) {
    var xhttp = new XMLHttpRequest();  //see figures and do JQuery with AJax  response = JQuery Ajax
    
    xhttp.onreadystatechange = function() {
      var toHtml = '"<h2>" +  city + "</h2>";';
  
      var myhttp = xhttp;
      if (this.readyState == 4 && this.status == 200) {
      
       //
       var response = this.response;
      
       let jsonObj = JSON.parse(response);
       if(jsonObj == null){
           debugger;
           console.log("jsonObj null returning");
       }

       
       var val = null;  //watch val
       let mainVal = jsonObj['main'];
       console.log(mainVal);
       var temp = mainVal["temp"];
       console.log("temp = " + temp);
       var humidity =  mainVal["humidity"];

       let coordVal=jsonObj["coord"];
       console.log("coord = " + coordVal);
       var lat = coordVal["lat"];
       var lon = coordVal["lon"];
       
       var windVal = jsonObj["wind"];
       var windSpeed = windVal["speed"];

    

       //watch all variables
     
/*** 
       for (var key in jsonObj) {
         if (jsonObj.hasOwnProperty(key)) {
           val = jsonObj[key];
           debugger;
           console.log(key + "-" + JSON.stringify(val));
         }
       }
****/
       
       debugger;
       
       let imageSuffix = 0;
       const dumpId = index == 0 ? "dumpJSON" :  "dump5JSON";
       let inner = "";
       for (i = 0; i < 1; i++) {   //traverse through days
       
        let valNum = parseFloat(temp);
        valNum = (valNum-32) / 1.8;
        toHtml += "<h4>" + "Temperature: " + temp + "</h4>";
        console.log(toHtml);

        toHtml += "<h4>" + "Wind Speed: " + windSpeed + "</h4>";

        toHtml += "<h4>" + "Humidity: " + humidity + "% </h4>";

        //let longLatURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";
       
        let longLatURL ="https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + 
            "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";

        console.log(longLatURL);
debugger;
        inner = dumpId + imageSuffix;  
        getUVIndex(longLatURL, toHtml, inner)
        
       } //for
      } //if ready
    }  // xhttp.onreadystatechange = function() {

     

    let lastURL = weatherURLs[index];
    let replaceCity = null;

    if(index == currentDayForecastIx){
        if(lastCityToday == null){
            lastCityToday = city;
        }
        replaceCity = lastCityToday;
    }else{
        if(lastCity5Days == null){
            lastCity5Days = city;
        }
        replaceCity = lastCity5Days;
    }
    let targetURL = lastURL.replace(replaceCity,city)
    console.log(targetURL);

    xhttp.open("GET", targetURL, true);
    xhttp.send();
} //function end

function  getUVIndex(longLatURL, toHtml, inner) {
   

        
    console.log(longLatURL);
    ///////////////////////////////

    var xhttp = new XMLHttpRequest();  //see figures and do JQuery with AJax  response = JQuery Ajax
   
    xhttp.onreadystatechange = function() {
      
      if (this.readyState == 4 && this.status == 200) {
      
       var response = this.response;
       console.log(JSON.stringify(response));

       
       let jsonObj = JSON.parse(response);
       if(jsonObj == null){
           debugger;
           console.log("jsonObj null returning");
       }

       debugger;
       console.log("jsonObj " + JSON.stringify(jsonObj));

       let value = jsonObj['value'];
       console.log("value = " + value);
       /**** *
       for (var key in jsonObj) {
         if (jsonObj.hasOwnProperty(key)) {
           val = jsonObj[key];
           debugger;
           console.log(key + "-" + JSON.stringify(val));
           if(key == "value"){
               break;
           }
         }
       }
       */
       debugger;
       let uvIndex = value;;
       console.log("uvIndex is " + uvIndex);
       toHtml += "<h4>" + "UV Index: " + uvIndex + " </h4>";
       document.getElementById(inner).innerHTML = toHtml; 
    
      }//if
    } //xhttp.onreadystatechange = function()

    ///////////////////////////

    xhttp.open("GET", longLatURL, true);
    xhttp.send();       

}//function end

/////////////////////////////////////////////////////////////////////////////////////////////

function loadDoc1(index,city) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      
      if (this.readyState == 4 && this.status == 200) {
      
 
       let allInfo = JSON.stringify(this.responseText);
       let allInfoSplit = allInfo.split(/:|,/);

    //    for(let i=0; i<allInfoSplit.length ; i++){
    //        let str = allInfoSplit[i];
           
    //        console.log(i + ":" + allInfoSplit[i]);
    //    }
       let toHtml = "<h1>"+city+"</h1>";
       let foundItems = 0;
       /*
       "{\"coord\":{\"lon\":-81.38,\"lat\":28.54},\"weather\":[{\"id\":801,\"main\":\"Clouds\",
       \"description\":\"few clouds\",\"icon\":\"02n\"}],\"base\":\"stations\",\"main\":{\"temp\":300.72,
       \"feels_like\":302.82,\"temp_min\":299.82,\"temp_max\":301.48,\"pressure\":1016,
       \"humidity\":74},\"visibility\":16093,
       \"wind\":{\"speed\":4.1,\"deg\":110},\"clouds\":{\"all\":20},\"dt\":1592963575,\"sys\":{\"type\":1,\"id\":5234,
       \"country\":\"US\",\"sunrise\":1592908143,\"sunset\":1592958392},\"timezone\":-14400,\"id\":4167147,\"name\":
       \"Orlando\",\"cod\":200}"

       "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";

        */
       let ndays = index + 1;
       
       let lastWind =0; //wind is the furthest down so save it as a starting point for the 5 day forecast
       let i = lastWind;

       let lat = null;
       let lon = null;
       let imageSuffix = 0;
       do {
         const dumpId = index == 0 ? "dumpJSON" :  "dump5JSON";
         let inner = "";
         

         for (i = lastWind; i < allInfoSplit.length; i++) {
           let str = allInfoSplit[i];
           if (str.indexOf("temp") > -1 && str.indexOf("temp_min") < 0 && str.indexOf("temp_max") < 0 ) {

             let valNum = parseFloat(allInfoSplit[i + 1]);
             valNum = (valNum-32) / 1.8;
             toHtml += "<h4>" + "Temperature: " + allInfoSplit[i + 1] + "</h4>";
             console.log(toHtml);

             foundItems++;
           } 
           

           if (str.indexOf("lon") > -1 && lon == null ) {

            lon = allInfoSplit[i + 1];
            
           }

           if (str.indexOf("lat") > -1 && lat == null) {

            lat = allInfoSplit[i + 1];
            
           } 

           if (str.indexOf("wind") > -1 ) {

             toHtml += "<h4>" + "Wind Speed: " + allInfoSplit[i + 2] + "</h4>";
             lastWind = i+2; //set for next for loop iteration for 5 day forecast
             foundItems++;
             console.log(toHtml);
             
           } 
           if (str.indexOf("humidity") > -1) {

             str = allInfoSplit[i+1];

             str = str.replace("}"," ");
             toHtml += "<h4>" + "Humidity: " + str + "% </h4>";
             console.log(toHtml);
             
           }
           if (foundItems == 3) {
             debugger;
             toHtml += "<h4>" + "UV Index: <i><strong>TBD</strong></i> </h4>";
             console.log(toHtml + " -> " +  dumpId + imageSuffix );
             debugger;
             inner = dumpId + imageSuffix;
             debugger;
             document.getElementById(inner).innerHTML = toHtml; 
             let longLatURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=eee27dfad5db9dce473a5293caa3df71";
             //getUVIndex(longLatURL);
             foundItems = 0;      
             imageSuffix++;      
             break;
           }
    
         }
        
       } while (--ndays > 0);

      }
      
    
    };
    

    let replaceCity = null;
    if(index == currentDayForecastIx){
        if(lastCityToday == null){
            lastCityToday = city;
        }
        replaceCity = lastCityToday;
    }else{
        if(lastCity5Days == null){
            lastCity5Days = city;
        }
        replaceCity = lastCity5Days;
    }
    
    let lastURL = weatherURLs[index];
    let targetURL = lastURL.replace(replaceCity,city)
    console.log(targetURL);

    xhttp.open("GET", targetURL, true);
    xhttp.send();

    
    if(index == currentDayForecastIx){
 
        lastCityToday = replaceCity;
    }else{
 
    lastCity5Days = replaceCity;
    }
}

$(document).ready(function() {
   
    //updateCurrentTimeWidget();

    let $hourSchedulerDiv = $('#hourSchedulerContainer');  //The bootstrap way of creating a table, see index.html
    $hourSchedulerDiv.empty(); //clear table on Reload and render it in the loop below

    loadDoc(0,"Miami");

    //debugger;
    loadCityForecastData(1, "Miami");
    for (let i = 0; i <= cities.length; i++) {
    
      const city = cities[i];
     
      //Build rows using JQuery Library methods: addClass(), attr()
      
      //A row div can be added to a 'container table' : use JQuuery convention of $ to begin variables initialized from JQuery library
      
      //addCityToSideBar(city);
    };
  
  
  });
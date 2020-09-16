
function toCel(t){
  return t-273;
}

function toDir(d){
  var dir = ["E","NE","N","NW","W","SW","S","SE"];
  return dir[Math.floor(d/45)];
}
// function load(index)
async function callnset(lat,long){
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat
+"&lon="+long+"&appid=ac4ee4b88bdce24675b3e66efc2c2fcb";
var weather ={
  temp:"",
  // maxTemp:"",
  // minTemp:"",
  condition:"",
  conditionDes:"",
  // clear:"",
  pressure:"",
  windspeed:"",
  winddir:"",
  rain:"",
  icon:""
};
var response = await fetch(url); 
var data     =    await response.json();
      //  console.log(data);
        weather.temp = (toCel(data.main.temp).toFixed(2)).toString()+" \u00B0"+"C";
        // weather.minTemp = (toCel(data.main.temp_min)).toString()+" \u00B0"+"C";;
        // weather.maxTemp = (toCel(data.main.temp_max)).toString()+" \u00B0"+"C";;
        weather.pressure = ((data.main.pressure)* 0.75006 ).toFixed(2).toString()+" mm";
        weather.condition = data.weather[0].main;
        weather.conditionDes = data.weather[0].description;
        weather.windspeed = (data.wind.speed)+ " m/s";
        weather.winddir = toDir(data.wind.deg); 
        if(data.rain)
        weather.rain = data.rain["1h"].toFixed(2)+" mm";
        weather.icon = data.weather[0].icon.slice(0,-1);
        console.log(data);
        // console.log(weather);


return weather;

}






export {callnset};




//karmarx.sicfuc 
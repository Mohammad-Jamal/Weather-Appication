let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let city_search = document.querySelector(".weather_search");


//todo To get the full country name
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

//todo To get the proper Date Time Formatting
const getDateTime = (dt) => {
  const currDate = new Date(dt * 1000);

  const options = {
    weekday : "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",

  }

  const formatter = new Intl.DateTimeFormat("en-US" ,options);
  return formatter.format(currDate);
}

let city = "Madanapalle";

//* search functionality
city_search.addEventListener('submit' ,(e) => {
  e.preventDefault();
  const cityName = document.querySelector(".city_name");

  city = cityName.value;

  getWeatherData();
  console.log(city);

  cityName.value = "";


})




const getWeatherData = async () => {

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a35e1ffbfe89e0a6777d5e7236c63804`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    // console.log(data);
    const {dt , main, name, wind, weather, sys} = data;

    cityName.innerHTML = `${name},${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_temperature.innerHTML = `${(main.temp - 273).toFixed()}&#176 C`;
    w_minTem.innerHTML = `Min : ${main.temp_min.toFixed() - 273}&#176 C`;
    w_maxTem.innerHTML = `Max : ${main.temp_max.toFixed() - 273}&#176 C`;

    w_feelsLike.innerHTML = `${(main.feels_like.toFixed(2) - 273).toFixed(2)}&#176 C`;
    w_humidity.innerHTML = `${main.humidity}&#176`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.log(error);
  }
}


document.body.addEventListener('load', getWeatherData());
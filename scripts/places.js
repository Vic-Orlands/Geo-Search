// --------------------------------------------------------------------Lets first get a hold of the necessary Html tags here----------------------------------------------------------------------------------
const inputField = document.querySelector('.inputField');
const searchButton = document.querySelector('.btn');
const displayMap = document.querySelector('.mapImage');
const displayWeather = document.querySelector(".weatherDisplay")
const displayLandmarksImages = document.querySelector(".landmarkImageContainer")


//------------------------------------------------------------ the proxy below allows access to the fetched openweather api else the request will be blocked by CORD----------------------------------------------------------------
const proxy = "https://cors-anywhere.herokuapp.com/";

const searchApi = () => {
    const getInputValue = inputField.value;
    const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=${getInputValue}&APPID=362a01de21f783b5fe2d7b810777d82e`
    fetch(api)
        .then(res => res.json())
        .then(data => {
            // Did the necessary celcius and fahrenheit conversion here
            const celciusTemperature = Math.round(parseFloat(data.main.temp) - 273.15);
            const fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);

            // and here, I returned the conversions
            displayWeather.innerHTML = `<ul>
            <li> Temperature of ${getInputValue} in Celcius is ${celciusTemperature}°C </li>
            <li> Temperature of ${getInputValue} in Fahrenheit is  ${fahrenheit}°F </li>
            <li> Pressure of ${getInputValue} is  ${data.main.pressure}Pa </li>
            <li> Humidity of ${getInputValue} is  ${data.main.humidity}°C </li>
            <li> Weather of ${getInputValue} is  ${data.weather[0].main} </li>
            </ul>
            `
            console.log(data)
        })

    //-------------------------------------------------------Below is the API for the map images-------------------------------------------------------
    const mapKey = 'mCLzct0mrLbj8On3AFJkHJPx3bv7wYme';
    const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${mapKey}&locations=${getInputValue}&size=@2x&defaultMarker=marker-sm-22407F-3B5998&size=600,400@2x`;
    fetch(mapUrl)
        .then(res => {
            console.log(res)
            return displayMap.innerHTML = `<img src=${res.url} alt="Map Image of ${getInputValue}" />`
        })

    //-------------------------------------------------------Below is the API for the images-------------------------------------------------------------------------
    const placekey = 'AIzaSyD8QCU1Lfx2_mbLNchv028xPWkB2hAIXLc'
    const placeUrl = `${proxy}https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${getInputValue}&key=${placekey}`
    fetch(placeUrl)
        .then(res =>  {
            console.log(res)
            displayLandmarksImages.innerHTML = `<img class="landmarkImage" src="${res.url}" alt="Image of ${getInputValue}" />`
        })

    inputField.value = " ";
}
searchButton.addEventListener('click', searchApi);

// ------------------------------------------------------Below is the API for autocompleting word searches---------------------------------------------------------
placeSearch({
    key: 'mCLzct0mrLbj8On3AFJkHJPx3bv7wYme',
    container: document.querySelector('#place-search-input')
});

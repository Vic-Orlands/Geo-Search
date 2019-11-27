// --------------------------------------------------------------------Lets first get a hold of the necessary Html tags here----------------------------------------------------------------------------------

const inputField = document.querySelector('.inputField');
const displayMap = document.querySelector('.mapImage');
const searchButton = document.querySelector('.btn');
const displayWeather = document.querySelector(".weatherDisplay")


//------------------------------------------------------------ the proxy below allows access to the fetched openweather api else the request will be blocked by CORD----------------------------------------------------------------
const proxy = "https://cors-anywhere.herokuapp.com/";

const searchApi = () => {
    const getInputValue = inputField.value;
    const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=${getInputValue}&APPID=362a01de21f783b5fe2d7b810777d82e`
    fetch(api)
        .then(res => res.json())
        .then(data => { 
            displayWeather.innerHTML = `<ul>
            <li> Temperature of ${getInputValue} is  ${data.main.temp} </li>
            <li> Pressure of ${getInputValue} is  ${data.main.pressure} </li>
            <li> Humidity of ${getInputValue} is  ${data.main.humidity} </li>
            <li> Weather of ${getInputValue} is  ${data.weather[0].main} </li>
            </ul>
            `
            console.log(data)
        })

    //-------------------------------------------------------Below is the API for the map images-------------------------------------------------------
    const mapKey = '____';
    const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${mapKey}&locations=${getInputValue}&size=@2x&defaultMarker=marker-sm-22407F-3B5998&size=600,400@2x`;
    fetch(mapUrl)
        .then(res => {
            console.log(res)
            return displayMap.innerHTML = `<img src=${res.url} alt="Map Image" />`
        })

    inputField.value = " ";
}
searchButton.addEventListener('click', searchApi);

<<<<<<< HEAD

// ------------------------------------------------------Below is the API for autocompleting word searches---------------------------------------------------------
placeSearch({
    key: 'mCLzct0mrLbj8On3AFJkHJPx3bv7wYme',
    container: document.querySelector('#place-search-input')
});
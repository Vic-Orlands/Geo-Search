// Lets get a hold of the necessary Html tags here

const inputField = document.querySelector('.inputField');
const displayMap = document.querySelector('.mapImage');
const searchButton = document.querySelector('.btn');
const displayWeather = document.querySelector(".weatherDisplay")

// the proxy below allows access to the fetched openweather api else the request will be blocked by CORD
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
            <li> Wind of ${getInputValue} is  ${data.wind[0].deg}degrees </li>
            </ul>
            `
            console.log(data)
        })
}

searchButton.addEventListener('click', searchApi);

// const facebookShare = document.querySelector(".socialPar");

// const fetchData = async () => {
//     try {
//         const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=aba&APPID=362a01de21f783b5fe2d7b810777d82e`
//         const response = await fetch(api)
//         const responseJSON = await response.json()
//         console.log(responseJSON)
//         return responseJSON
//     } catch (err) {
//         console.error(err)
//     }
// }

// fetchData()
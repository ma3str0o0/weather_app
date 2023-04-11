// Get references to the HTML elements we will be working with
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Add an event listener to the search button
search.addEventListener('click', () => {

    // Set the API key and city from user input
    const APIKey = '4d2d63a28ae291781bb65ce364295eff';
    const city = document.querySelector('.search-box input').value;

    //If input city is empty - nothing to return
    if (city === '')
        return;

    // Fetch the weather data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

                // If the API returns a 404 error, display an error message
                if (json.cod === '404') {
                        container.style.height = '400px';
                        weatherBox.style.display = 'none';
                        weatherDetails.style.display = 'none';
                        error404.style.display = 'block';
                        error404.classList.add('fadeIn');
                        return;
                    }

                    // If no errors occurred, hide the error message (if previously displayed) and display the weather data
                    error404.style.display = 'none';
                    error404.classList.remove('fadeIn');

                    // Get references to the HTML elements we will be updating with the weather data
                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');

                    // Set the weather image based on the weather conditions
                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'images/clear.png';
                            break;

                        case 'Rain':
                            image.src = 'images/rain.png';
                            break;

                        case 'Snow':
                            image.src = 'images/snow.png';
                            break;

                        case 'Clouds':
                            image.src = 'images/cloud.png';
                            break;

                        case 'Haze':
                            image.src = 'images/mist.png';
                            break;

                        default:
                            image.src = '';
                    }

                    //Set the temperature, description, humidity, wind speed - weather specs
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    description.innerHTML = `${json.weather[0].description}`;
                    humidity.innerHTML = `${json.main.humidity}%`;
                    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                    //Display the weather data
                    weatherBox.style.display = '';
                    weatherDetails.style.display = '';
                    weatherBox.classList.add('fadeIn');
                    weatherDetails.classList.add('fadeIn');
                    container.style.height = '590px';


                });
        
});

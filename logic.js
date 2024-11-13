const form = document.querySelector('form')
const content = document.querySelector('.content')

form.addEventListener('click', () => {
    form.style.border = '1px solid #93c5fd'
    form.style.boxShadow = '0 0 10px #bfdbfe'
})

document.addEventListener('click', (e) =>{
    if (e.target !== form && !form.contains(e.target)){
        form.style.border = '1px solid gray'
        form.style.boxShadow = '0 0 0'
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    input = document.querySelector('input').value.toLowerCase()
    if (input){
        try {
            const weather  = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+ input +'&appid=04f82635af6c780294154adccd7bce45')
            if (!weather.ok) {
                throw new Error(`could not fetch the weather parameter of ${input}, try again or enter a valid country name`)
            }
            const data = await weather.json()
            setWeather(data)
        }
        catch (e) {
            alert(e)
        }
    }else {
        alert('You must enter a country name')
    }

})
    

const setWeather = (data) => {
    content.innerHTML = " "

    const country = document.createElement('h2')
    country.textContent = `${data.name} ${data.sys.country}`
    const coordinate = document.createElement('h5')
    coordinate.textContent = `Coordinate: long ${data.coord.lon} lat ${data.coord.lat} `
    const weather = document.createElement('h5')
    weather.textContent = `Weather: ${data.weather[0].description} `
    const sunrise = document.createElement('h5')
    sunrise.textContent = `Sunrise: ${data.sys.sunrise}`
    const sunset = document.createElement('h5')
    sunset.textContent = `Sunset: ${data.sys.sunset}`
    const temp = document.createElement('h5')
    temp.textContent = `Temperature: ${data.main.temp}K`
    const pressure = document.createElement('h5')
    pressure.textContent = `Pressure: ${data.main.pressure}`
    const humidity = document.createElement('h5')
    humidity.textContent = `Humidity: ${data.main.humidity}`

    content.appendChild(country)
    content.appendChild(coordinate)
    content.appendChild(weather)
    content.appendChild(sunrise)
    content.appendChild(sunset)
    content.appendChild(temp)
    content.appendChild(pressure)
    content.appendChild(humidity)
    
}
const myApp = document.querySelector('.weather_app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.cityName');
const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const btn = document.querySelector('.mybutton');
const cities = document.querySelectorAll('.city');
const temp1 = document.querySelector('.temp1');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const seaLevel = document.querySelector('.seaLevel');
const description = document.querySelector('.description');
const country = document.querySelector('.country');
const longitude = document.querySelector('.long');
const latitude = document.querySelector('.lat')
const myPanel = document.querySelector('.panel')

let myApi = "f5fb28c0d0dd7eefc82f52937d88b038"

const getLocation =()=>{
    myDate = new Date().toDateString()
    const myday = myDate.substr(0,20)
    navigator.geolocation.getCurrentPosition((location)=>{
           let myLatitude = location.coords.latitude
           let myLongitude = location.coords.longitude
           let myendpoint2 = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${myApi}&units=metric`
           fetch(myendpoint2)
           .then((response)=>response.json())
           .then((myData)=>{
               temp.innerHTML = myData.main.temp.toFixed(0) + "&#176;" + "C"
               temp1.innerHTML = myData.main.temp + "&#176;" + "C"
               humidity.innerHTML = myData.main.humidity +"%"
               pressure.innerHTML = myData.main.pressure +"Pa"
               description.innerHTML = myData.weather[0].description
               country.innerHTML = `${myData.name} ${myData.sys.country}`
               longitude.innerHTML = myLatitude + "&#176;"
               latitude.innerHTML = myLongitude + "&#176;"
               iconId = myData.weather[0].icon.substr("04d".length)
               conditionOutput.innerHTML = myData.weather[0].main
               nameOutput.innerHTML = myData.name
               dateOutput.innerHTML = myday
               
           })
    })
}
const fetchWeatherData=()=>{
    let cityName = search.value;
    let myendpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApi}&units=metric`
    if(search.value.length == 0){
                    alert('Please check your location again.')
    }else{
        myDate = new Date().toDateString()
        const myday = myDate.substr(0,20)
        fetch(myendpoint)
        .then((response)=>response.json())
        .then((myData)=>{
            temp.innerHTML = myData.main.temp.toFixed(0) + "&#176;" + "C"
            temp1.innerHTML = myData.main.temp + "&#176;" + "C"
            humidity.innerHTML = myData.main.humidity + "%"
            pressure.innerHTML = myData.main.pressure +"Pa"
            description.innerHTML = myData.weather[0].description
            country.innerHTML = `${myData.name} ${myData.sys.country}`
            longitude.innerHTML = myData.coord.lon + "&#176;"
            latitude.innerHTML = myData.coord.lat + "&#176;"
            iconId = myData.weather[0].icon.substr("04d".length)
            conditionOutput.innerHTML = myData.weather[0].main
            nameOutput.innerHTML = myData.name
            dateOutput.innerHTML = myday
            myPanel.style.display = "block";
            if( conditionOutput.innerHTML == "Clear" && myData.main.temp1 <= 5 +"&#176;"+"C" ){
                myApp.style.backgroundImage = `url(./icedBg.webp)`
                icon.src = "./cloudlogo-removebg-preview.png"
            }else if(conditionOutput.innerHTML == 'Clouds'){
                myApp.style.backgroundImage = `url(./CloudyBackground.webp)`
                icon.src = "./cloudlogo-removebg-preview.png"
            }else if(conditionOutput.innerHTML == "Clear"){
                myApp.style.backgroundImage = `url(./clearSky.webp)`
                icon.src=  "./sunny.png"
            }else{}
        })


    }

}



const APIKEY = 'fdc07d63a0msh3d72ac82e247f0fp10ed11jsn62ff71c3abaf'
const URL = 'https://weatherapi-com.p.rapidapi.com/current.json'
const DEFAULT_LOCATION = 'Zapopan'

function setInitialLocation(position) {
  let query = position.coords.latitude + "," + position.coords.longitude
  fetchData(query)
}

function handleError(msg) {
  let errorElement = document.querySelector(".error")
  errorElement.style = "display:block"
  let errorSpan = document.querySelector(".error-message")
  errorSpan.textContent = msg
  console.log("Error getting your current location")

  setTimeout(() => {
    errorElement.style = "display:none"
    fetchData(DEFAULT_LOCATION)
  }, 3000)
}

function fetchData(query) {
  let options = {
    method: 'GET',
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
  }
  window.fetch(URL + "?q=" + query, options)
  .then(response => response.json())
  .then(data => {
    let icon = document.querySelector(".condition-icon")
    let city = document.querySelector(".city-name")
    let temp = document.querySelector(".temperature")
    let condition = document.querySelector(".condition")

    icon.style = 
      "display:inline-block;width:64px;"
      + "height:64px;vertical-align:middle;" 
      + "background-image:url('https:" + data.current.condition.icon + "');"
    city.textContent = data.location.name + ", " + data.location.region
    temp.textContent = data.current.temp_c + "° C"
    condition.textContent = data.current.condition.text
  })
  .catch(error => console.log(error))
}

function getGeolocation() {
  if('geolocation' in navigator) {
    const locOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }
    navigator.geolocation.getCurrentPosition(
      setInitialLocation,
      () => { handleError("Error getting your current location. "
      + "Setting default location")},
      locOptions
      )
  } else {
    handleError("El navegador no soporta geolocation")
    console.log("El navegador no soporta geolocation")
  }
}

getGeolocation()

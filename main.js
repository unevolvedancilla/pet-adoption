const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment() //create new  document fragment

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints//MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature
}

start();

async function petsarea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true) //create copy of the pet card template
    clone.querySelector(".pet-card").dataset.species = pet.species //adds the species of the pet to the pet card html for filtering
    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
    if (!pet.photo) pet.photo = "images/fallback.jpg"
    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone) //add the pet card HTML to document fragment
  })
  document.querySelector(".list-of-pets").appendChild(wrapper) //add document fragment to DOM tree
}

petsarea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear
  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"
  return `${age} years old`
}

//pet filter button code

const allButtons = document.querySelectorAll(".pet-filter button")
allButtons.forEach(element => {
  element.addEventListener("click", handleButtonClick)
})

function handleButtonClick(event) {
  //remove active class from any and all buttons
  allButtons.forEach(element => element.classList.remove("active"))
  //add active class to the button that just got clicked on
  event.target.classList.add("active")
  //filter the pets
  const currentFilter = event.target.dataset.filter
  document.querySelectorAll(".pet-card").forEach(element => {
    if (currentFilter == element.dataset.species || currentFilter == "all") {
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  })

}
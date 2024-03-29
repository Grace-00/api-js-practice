// reference elements I'll use in the project
const url = "https://restcountries.com/v3.1/all";
const template = document.getElementById("template");
const cardContainer = document.querySelector(".card__container");
const card = document.querySelector(".card");
const btn = document.getElementById("btn");
const input = document.getElementById("searchForCountry");
const select = document.getElementById("filterRegion");

// reference modal elements
const modal = document.querySelector(".modal");
const modalInner = document.querySelector(".modal__header");
const modalContent = document.querySelector(".modal__content");
const imgModal = document.querySelector(".modal__header-inner .modal__img");

// empty array in which I'll store the objects from the API
let countries = [];

// open modal if country name found on card === country name found in API and if matches show and populate the modal
cardContainer.addEventListener("click", (e) => {
  console.log(e)
  console.log(e.composedPath()[2]);
  let nameCountry = e.composedPath()[2].children[1].children[0].textContent;
  console.log(nameCountry)
  const openModal = () => {
    countries.map((country) => {

      if (nameCountry === country.name.common) {
        modal.classList.add("visible");
        modalContent.style.display = "block";
        modal.querySelector("img").setAttribute("src", country.flags.png);
        modal.querySelector(".countryName").textContent = `${country.name.common}`;
        modal.querySelector(".nativeName").textContent = country.nativeName
          ? `Native Name: ${country.nativeName}`
          : "";
        modal.querySelector(".population").textContent = country.population
          ? `Population: ${country.population}`
          : "";
        modal.querySelector(".region").textContent = country.region
          ? `Region: ${country.region}`
          : "";
        modal.querySelector(".subregion").textContent = country.subregion
          ? `Sub Region: ${country.subregion}`
          : "";
        modal.querySelector(".capital").textContent = country.capital
          ? `Capital: ${country.capital}`
          : "";
        modal.querySelector(
          ".topLevelDomain"
        ).textContent = country.tld
          ? `Top Level Domain: ${country.tld}`
          : "";
        modal.querySelector(".currencies").textContent = country.currencies
          ? `Currency: ${Object.entries(country.currencies).map(el=>el[1].name).join(', ')}`
          : "";
        modal.querySelector(".languages").textContent = country.languages
          ? `Languages: ${Object.values(country.languages).join(', ')}`
          : "";
        modal.querySelector(".borderCountries").textContent = country.borders
          ? `Borders: ${country.borders.map(border => border)}`
          : "";
      }
    });
  };
  openModal();
  modal.addEventListener("click", () => {
    //close modal
    modal.classList.remove("visible");
  });
});

// toggle dark mode
btn.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark-mode");
});

// show countries based on their regions - get region from ".region" class on card
select.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  const regions = document.querySelectorAll(".region");

  regions.forEach((region) => {
    console.log(region);
    if (region.innerText.includes(e.target.value)) {
      //   console.log(region.innerText);
      region.parentElement.parentElement.style.display = "block";
      console.log(region.parentElement.parentElement);
    } else {
      region.parentElement.parentElement.style.display = "none";
    }
  });
});

// show country matching user search - get country name from ".country" class on card
input.addEventListener("keyup", (e) => {
  const searchVal = e.target.value.toLowerCase();
  const names = document.querySelectorAll(".country");
  console.log(names);
  names.forEach((name) => {
    console.log(name);
    if (name.innerText.toLowerCase().includes(searchVal)) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// fetch url
fetch(url)
  .then((res) => res.json()) //get response and turn it into JSON
  .then((json) => {
    //get JSON
     console.log(json);
    countries = json; //save JSON in array

    countries.map((country) => {
      //map the array and populate the template
      const cardCountry = document.importNode(template.content, true);

      cardCountry.querySelector(".country").textContent = country.name.common;

      cardCountry.querySelector(".population").textContent = country.population
        ? `population: ${country.population}`
        : "";
      cardCountry.querySelector(".region").textContent = country.region
        ? `region: ${country.region}`
        : "";
      cardCountry.querySelector(".capital").textContent = country.capital
        ? `capital: ${country.capital}`
        : "";

      cardCountry.querySelector("img").setAttribute("src", country.flags.png);

      return cardContainer.appendChild(cardCountry); //append the populated card to the card__cointainer
    });
  });

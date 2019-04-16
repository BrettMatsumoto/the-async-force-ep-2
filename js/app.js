'use strict';

let resourceButton = document.getElementById('requestResourceButton');
resourceButton.addEventListener('click', giveInformation);

function giveInformation() {
  let inputBox = document.getElementById('resourceId').value;
  let inputSelector = document.getElementById('resourceType').value;
  let infoBox = document.getElementById('contentContainer');

  if (inputSelector === 'people') {
    const getPeople = new XMLHttpRequest();
    getPeople.addEventListener('load', reqListenerPeople);
    getPeople.open('GET', 'https://swapi.co/api/people/' + inputBox);
    getPeople.send();
  }

  function reqListenerPeople() {
    if (this.status !== 200) {
      let errorElem = document.createElement('h2');
      errorElem.innerHTML = 'error ' + this.status + ' found.';
      if (this.status === 404) {
        let noInfo = document.createElement('h3');
        noInfo.innerHTML = 'No Information found.';
        errorElem.appendChild(noInfo);
      }
    }

    let responseText = JSON.parse(this.responseText);
    let personNameH2 = document.createElement('h2');
    personNameH2.innerHTML = responseText.name;
    infoBox.appendChild(personNameH2);

    let personGenderP = document.createElement('p');
    personGenderP.innerHTML = responseText.gender;
    infoBox.appendChild(personGenderP);

    let personSpecies = document.createElement('p');

    const getPeopleSpecies = new XMLHttpRequest();
    getPeopleSpecies.addEventListener('load', reqListenerPeopleSpecies);
    getPeopleSpecies.open('GET', responseText.species.toString());
    getPeopleSpecies.send();

    function reqListenerPeopleSpecies() {
      let responseText = JSON.parse(this.responseText);
      personSpecies.innerHTML = responseText.name;
      infoBox.appendChild(personSpecies);
    }
  }

  if (inputSelector === 'planets') {
    if (this.status !== 200) {
      let errorElem = document.createElement('h2');
      errorElem.innerHTML = 'error ' + this.status + ' found.';
      if (this.status === 404) {
        let noInfo = document.createElement('h3');
        noInfo.innerHTML = 'No Information found.';
        errorElem.appendChild(noInfo);
      }
    }
    const getPlanet = new XMLHttpRequest();
    getPlanet.addEventListener('load', reqListenerPlanet);
    getPlanet.open('GET', 'https://swapi.co/api/planets/' + inputBox);
    getPlanet.send();
  }

  function reqListenerPlanet() {
    let responseText = JSON.parse(this.responseText);
    let planetName = document.createElement('h2');
    planetName.innerHTML = responseText.name;
    infoBox.appendChild(planetName);

    let planetTerrain = document.createElement('p');
    planetTerrain.innerHTML = responseText.terrain;
    infoBox.appendChild(planetTerrain);

    let planetPopulation = document.createElement('p');
    planetPopulation.innerHTML = responseText.population;
    infoBox.appendChild(planetPopulation);

    let filmListUl = document.createElement('ul');
    infoBox.appendChild(filmListUl);

    for (let i = 0; i < responseText.films.length; i++) {
      let responseText = JSON.parse(this.responseText);
      const getFilm = new XMLHttpRequest();
      getFilm.addEventListener('load', reqListenerFilms);
      getFilm.open('GET', responseText.films[i]);
      getFilm.send();

      function reqListenerFilms() {
        let responseText = JSON.parse(this.responseText);
        let filmListLi = document.createElement('li');
        filmListLi.innerHTML = responseText.title;
        filmListUl.appendChild(filmListLi);
      }
    }
  }
  if (inputSelector === 'starships') {
    if (this.status !== 200) {
      let errorElem = document.createElement('h2');
      errorElem.innerHTML = 'error ' + this.status + ' found.';
      if (this.status === 404) {
        let noInfo = document.createElement('h3');
        noInfo.innerHTML = 'No Information found.';
        errorElem.appendChild(noInfo);
      }
    }
    const getStarship = new XMLHttpRequest();
    getStarship.addEventListener('load', reqListenerStarships);
    getStarship.open('GET', 'https://swapi.co/api/starships/' + inputBox);
    getStarship.send();
  }

  function reqListenerStarships() {
    let responseText = JSON.parse(this.responseText);
    let shipName = document.createElement('h2');
    shipName.innerHTML = responseText.name;
    infoBox.appendChild(shipName);

    let shipManufacturer = document.createElement('p');
    shipManufacturer.innerHTML = responseText.manufacturer;
    infoBox.appendChild(shipManufacturer);

    let shipClass = document.createElement('p');
    shipClass.innerHTML = responseText.starship_class;
    infoBox.appendChild(shipClass);

    let filmListUl = document.createElement('ul');
    infoBox.appendChild(filmListUl);

    for (let i = 0; i < responseText.films.length; i++) {
      let responseText = JSON.parse(this.responseText);
      const getFilm = new XMLHttpRequest();
      getFilm.addEventListener('load', reqListenerFilms);
      getFilm.open('GET', responseText.films[i]);
      getFilm.send();

      function reqListenerFilms() {
        let responseText = JSON.parse(this.responseText);
        let filmListLi = document.createElement('li');
        filmListLi.innerHTML = responseText.title;
        filmListUl.appendChild(filmListLi);
      }
    }
  }
}

'use strict';

let resourceButton = document.getElementById('requestResourceButton');
resourceButton.addEventListener('click', giveInformation);

function giveInformation() {
  let inputBox = document.getElementById('resourceId').value;
  let inputSelector = document.getElementById('resourceType').value;
  let peopleInfo = document.getElementById('contentContainer');

  if (inputSelector === 'people') {
    const getPeople = new XMLHttpRequest();
    getPeople.addEventListener('load', reqListenerPeople);
    getPeople.open('GET', 'https://swapi.co/api/people/' + inputBox);
    getPeople.send();
  }

  function reqListenerPeople() {
    let responseText = JSON.parse(this.responseText);
    let personNameH2 = document.createElement('h2');
    personNameH2.innerHTML = responseText.name;
    peopleInfo.appendChild(personNameH2);

    let personGenderP = document.createElement('p');
    personGenderP.innerHTML = responseText.gender;
    peopleInfo.appendChild(personGenderP);

    let personSpecies = document.createElement('p');

    const getPeopleSpecies = new XMLHttpRequest();
    getPeopleSpecies.addEventListener('load', reqListenerPeopleSpecies);
    getPeopleSpecies.open('GET', responseText.species.toString());
    getPeopleSpecies.send()
    console.log(getPeopleSpecies);

    function reqListenerPeopleSpecies(){
      let responseText = JSON.parse(this.responseText);
      personSpecies.innerHTML = responseText.name;
      peopleInfo.appendChild(personSpecies);
    }
  }
}

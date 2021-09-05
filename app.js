"use strict"
let isValid = false;
let targetPerson = "";

const singleSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth", "Weight", "Height",
  "Eye color", "Occupation",
  "Multi",
];

const multiSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth", "Weight", "Height",
  "Eye color", "Occupation",
  "Exit"
];

function app(people) {
  const isNameKnown = promptFor("Use Lower Case for all prompts. Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  let searchResults;
  switch (isNameKnown) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let searchType = promptFor('How do you want to search? ' + singleSearchTypes, singleSearchTypeValidator)
      console.log("search type: " + searchType);
      switch (searchType) {
        case 'multi':
          searchResults = multiSearch(people);
          break;

        default:
          searchResults = search(searchType, people);
          break;
      }
      console.log('found ' + searchResults.length + ' results.');
      console.log('search results: ', searchResults);
      break;
    default:
      console.log('restart app');
      app(people);
      break;
  }

  function multiSearch(people) {
    console.log("Beginning multi-search");

    let filteredPeople = people;
    for (let i = 0; i < 5; i++) {
      let searchType = promptFor('Multi-search: Pick criteria ' + i + ' of 5(max): '
        + multiSearchTypes, multiSearchTypeValidator)

      console.log(searchType)
      switch (searchType) {
        case "exit":
          console.log("Here are the results of your search.");
          return filteredPeople;

        default:
          filteredPeople = search(searchType, people);
      }

      if (filteredPeople.length === 0) {
        alert("No results found, try again.");
        multiSearch(people);
      }
      console.log("Current filtered people: ", filteredPeople);
    }
    return filteredPeople;
  }

  if(searchResults.length === 1) {
    mainMenu(searchResults, people);
  }
  else if(searchResults.length > 1) {
    for (let i = 0; i < searchResults.length; ++i) {
      alert("Option: " + i + "\n " + searchResults[i].firstName + " " + searchResults[i].lastName + "\n DoB: "
        + searchResults[i].dob + "\nGender: " + searchResults[i].gender + "\nEye Color: " + searchResults[i].eyeColor );
    }
    let selectPersonFromConsole = promptFor('There are ' + searchResults.length
      + ' entries found. \n Please select 0 - ' + (searchResults.length - 1) + " to continue" , autoValid)
    while(selectPersonFromConsole < 0 || selectPersonFromConsole > searchResults.length){
      selectPersonFromConsole = promptFor('Please select a number 0 - ' + searchResults.length, autoValid)
    }
    mainMenu(searchResults, people, selectPersonFromConsole);
  }
  else{
    alert('No search results found');
  }
}

function search(searchType, people) {
  switch (searchType) {
    case "first name":
      return searchByFirstName(people);
    case "last name":
      return searchByLastName(people);
    case "weight":
      return searchByWeight(people);
    case "height":
      return searchByHeight(people);
    case "gender":
      return searchGender(people);
    case "date of birth":
      return searchByDoB(people);
    case "eye color":
      return searchByEyeColor(people);
    case "occupation":
      return searchByOccupation(people);
    default:
      console.log('Search type [' + searchType + '] not found');
      return people;
  }
}

function mainMenu(searchResults, people, z = 0){
  if (!searchResults) {
    alert("Could not find that individual.");
    return app(people);
  }
  const person = searchResults[z];
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName
    + " . \nDo you want to know their 'info', 'family', or 'descendants'? \nType the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      alert("Name: " + person.firstName + " " + person.lastName + " \nGender: "  + person.gender
        + " \mDoB: " + person.dob + " \nheight:" + person.height + " \nweight:" + person.weight + "\neye color:"
        + person.eyeColor + "\noccupation: " + person.occupation, autoValid)
      break;
    case "family":
      let personsParents = getParents(person, people)
      console.log(person.firstName + "'s parents:")
      console.log(personsParents)
      if(personsParents === 0){
        alert(person.firstName + " doesnt have any parents")
      }
      else if (personsParents === 1){
        alert(person.firstName + " has 1 parent\n" + "They are:\n" + personsParents[0].firstName + " "
          + personsParents[0].lastName)
      }
      else if (personsParents === 2){
        alert(person.firstName + " has 2 parents\n" + "They are:\n" + personsParents[0].firstName + " "
          + personsParents[0].lastName + "\n" + personsParents[1].firstName + personsParents[1].lastName)
      }
      let personsDescendants = getDescendants(person, people)
      console.log(person.firstName + "'s descendants")
      console.log(personsDescendants)
      alert(person.firstName + ' has ' + personsDescendants.length + " descendants")
      for (let i = 0; i < personsDescendants.length; ++i) {
        alert("First Name: " + personsDescendants[i].firstName + "   " + personsDescendants[i].lastName + "\n DoB: "
          + personsDescendants[i].dob + "\nGender: " + personsDescendants[i].gender );
      }
      let personsSpouse = getSpouse(person, people)
      console.log('The spouse')
      console.log(personsSpouse)
      if (personsSpouse !== undefined){
        const spouseVariable = personsSpouse[0];
        alert(person.firstName + " has a spouse: \n" + spouseVariable.firstName + " " + spouseVariable.lastName
          + "\n " + spouseVariable.gender + "             " + spouseVariable.dob)
      }
      else{
        alert(person.firstName + " doesnt have a spouse")
      }
      let personsSiblings = getSiblings(person, people, personsParents)
      alert(person.firstName + " has " + personsSiblings.length + " siblings")
      for (let i = 0; i < personsSiblings.length; ++i) {
        alert("First Name: " + personsSiblings[i].firstName + "   " + personsSiblings[i].lastName + "\n DoB: "
          + personsSiblings[i].dob + "\nGender: " + personsSiblings[i].gender );
      }
      console.log('the siblings')
      console.log(personsSiblings)
      break;
    case "descendants":
      let foundDescendants = getDescendants(searchResults[z], people)
      console.log(foundDescendants)
      alert("Name: " + person.firstName + " " + person.lastName + " has " + (foundDescendants.length) +" descendants. They are:")
      for (let i = 0; i < foundDescendants.length; ++i) {
        alert("First Name: " + foundDescendants[i].firstName + "   " + foundDescendants[i].lastName + "\n DoB: "
          + foundDescendants[i].dob + "\nGender: " + foundDescendants[i].gender );
      }
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(searchResults, people);
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    return potentialMatch.firstName.toLowerCase() === firstName.toLowerCase() && potentialMatch.lastName.toLowerCase() === lastName.toLowerCase();
  })
  console.log(foundPerson)
  return foundPerson;
}

function searchByFirstName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    return potentialMatch.firstName.toLowerCase() === firstName;
  })
  console.log("first name matches: ", foundPerson)
  return foundPerson;
}

function searchByLastName(people){
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
      return potentialMatch.lastName.toLowerCase() === lastName;
    }
  )
  console.log(foundPerson)
  return foundPerson;
}

function searchByWeight(people) {
  let pounds = promptFor("Input number of pounds", autoValid);
  let foundPounds = people.filter(function (potentialMatch) {
    return potentialMatch.weight == pounds;
  })
  console.log(foundPounds);
  return foundPounds;
}

function searchByHeight(people) {
  let cm = promptFor("Input number of centimeters", autoValid);
  let foundHeight = people.filter(function (potentialMatch) {
    return potentialMatch.height == cm;
  })
  console.log(foundHeight);
  return foundHeight;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What color eyes are we looking for?", autoValid);
  let foundEyeColor = people.filter(function (potentialMatch) {
    return potentialMatch.eyeColor === eyeColor;
  })
  console.log("eye color matches: ", foundEyeColor);
  return foundEyeColor;
}

function searchGender(people) {
  let genderNeutrality = promptFor("You want male or female?", autoValid);
  let foundGender = people.filter(function (potentialMatch) {
    return potentialMatch.gender === genderNeutrality;
  })
  console.log(foundGender);
  return foundGender;
}

function searchByDoB(people) {
  let dateOfBirth = promptFor("What date of birth are we looking for? dd/mm/yyyy format, if single digit no zeros", autoValid);
  let foundDateOfBirth = people.filter(function (potentialMatch) {
    return potentialMatch.dob === dateOfBirth;
  })
  console.log(foundDateOfBirth);
  return foundDateOfBirth;
}


function searchByOccupation(people) {
  let occupationSearch = promptFor("What occupation do you need?", autoValid);
  let foundOccupation = people.filter(function (potentialMatch) {
    return potentialMatch.occupation === occupationSearch;
  })
  console.log(foundOccupation);
  return foundOccupation;
}

// original function before recursion
// function getDecendants(person, people){
//   //get the persons ID, then find it in the parents array, could be 0 or 1
//   let descendantsID = new Array()
//   let personsID = person.id;
//   let foundDecendants = people.filter(function(descendantsID){
//     if(descendantsID.parents.length >= 1){
//       if(descendantsID.parents[0] == personsID || descendantsID.parents[1] == personsID){
//         console.log(person.firstName + ' is the parent of: ' + descendantsID.firstName)
//         return true;
//       }
//     }
//     else{
//       return false
//     }
//   })
//   return foundDecendants;
// }

function getDescendants(person, people) {
  const personsID = person.id;
  let foundDescendants = people.filter(function (person) {
    return person.parents[0] === personsID || person.parents[1] === personsID;
  });

  for(let i = 0; i < foundDescendants.length; i++) {
    const descendant = foundDescendants[i];
    console.log("recursion call, descendant: ", descendant);
    let descendantsOfDescendant = getDescendants(descendant, people);
    console.log("found descendants of descendant: ", descendantsOfDescendant);
    foundDescendants = foundDescendants.concat(descendantsOfDescendant);
  }

  console.log("all found descendants: ", foundDescendants);
  return foundDescendants;
}

function getSpouse(person, people){
  if(person.currentSpouse != null){
    let spouseID = person.currentSpouse
    let spouseRecord = people.filter(function(potentialMatch){
      return potentialMatch.id === spouseID;
    })
    console.log(spouseRecord)
    return spouseRecord;
  }
}

function getSiblings(person, people, personsParents){
  let personID = person.id
  let parentOne = personsParents[0]
  let parentTwo = personsParents[1]
  let parentsNumber = person.parents
  if(parentsNumber.length === 0){
  }
  else if(parentsNumber.length === 1){
    parentOne = personsParents[0]
  }
  else if(parentsNumber.length === 2){
    parentOne = personsParents[0]
    parentTwo = personsParents[1]
  }
  let foundSiblings = people.filter(function(descendantsID){
    if(descendantsID.parents.length >= 1){
      if(descendantsID.parents[0] === parentOne || descendantsID.parents[1] === parentOne
        || descendantsID.parents[0] === parentTwo || descendantsID.parents[1] === parentTwo){
        console.log(person.firstName + ' and ' + descendantsID.firstName + ' has the same parents')

        if(descendantsID.id != personID){
          return true;
        }
      }
    }
    else{
      return false
    }
  })
  return foundSiblings;
}

function getParents(person, people){
  let parentOne = person.parents[0]
  let parentTwo = person.parents[1]
  let parentsNumber = person.parents
  if(parentsNumber.length === 0){
    //No parents listed
  }
  else if(parentsNumber.length === 1){
    parentOne = person.parents[0]
  }
  else if(parentsNumber.length === 2){
    parentOne = person.parents[0]
    parentTwo = person.parents[1]
  }
  let foundParents = people.filter(function(potentialMatch){
    return potentialMatch.id === parentOne || potentialMatch.id === parentTwo;
  })
  console.log(foundParents);
  return foundParents;
}

function promptFor(question, validator) {
  let response;

  do {
    response = prompt(question).trim();
    isValid = validator(response);
  } while (!isValid || !response);

  return response;
}

function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}

function autoValid() {
  return true;
}

function singleSearchTypeValidator(input) {
  input = input.toLowerCase()
  return input === "first name" || input === "last name" || input === "gender" || input === "date of birth"
    || input === "height" || input === "weight" || input === "eye color" || input === "occupation" || input === "multi";
}

function multiSearchTypeValidator(input) {
  input = input.toLowerCase()
  return input === "first name" || input === "last name" || input === "gender" || input === "date of birth"
    || input === "height" || input === "weight" || input === "eye color" || input === "occupation" || input === "exit";
}

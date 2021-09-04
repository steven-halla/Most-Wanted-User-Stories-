"use strict"
let isValid = false;
let targetPerson = "";

const singleSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth",
  "Eye color", "Occupation",
  "Multi",
];

const multiSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth",
  "Eye color", "Occupation",
  "Exit"
];

// bugs!!!
// single search first name, last name, dob,
//multi search: first name last name,date of birth, exit
//family function is broke
function app(people) {
  const isNameKnown = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  let searchResults;
  switch (isNameKnown) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by criteria
      let searchType = promptFor('How do you want to search? ' + singleSearchTypes, singleSearchTypeValidator)
      console.log("search type: " + searchType);
      switch (searchType) {
        case 'first name':
          searchResults = searchByFirstName(people);
          break;
        case 'last name':
          searchResults = searchByLastName(people)
          break;
        case 'gender':
          searchResults = searchGender(people);
          break;
        case 'date of birth':
          searchResults = searchByDoB(people);
          break;
        case 'eye color':
          searchResults = searchByEyeColor(people);
          break;
        case 'occupation':
          searchResults = searchByOccupation(people);
          break;
        case 'multi':
          searchResults = multiSearch(people);
          break;
        default:
          console.log('Search type [' + searchType + '] not found');
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
    for (let i = 0; i < 3; i++) {
      let searchType = promptFor('Multi-search: Pick criteria ' + i + 1 + ' of 5(max): '
        + multiSearchTypes, multiSearchTypeValidator) //in the future add rotary dial type option 1,2,3 or typing in the function
      console.log(searchType)
      switch (searchType) {
        case "eye color":
          filteredPeople = searchByEyeColor(filteredPeople);
          break;
        case "gender":
          filteredPeople = searchGender(filteredPeople);
          break;
        case "occupation":
          filteredPeople = searchByOccupation(filteredPeople);
          break;
        case "exit":
        default:
          console.log("Exiting multi-search prompt.");
          return filteredPeople;
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

function mainMenu(searchResults, people, z = 0){
  if (!searchResults) {
    alert("Could not find that individual.");
    return app(people); // restart
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
      //lets get my persons parents
      let personsParents = getParents(person, people)
      console.log(person.firstName + "'s parents:")
      console.log(personsParents)
      if(personsParents == 0){
        alert(person.firstName + " doesnt have any parents")
      }
      else if (personsParents == 1){
        alert(person.firstName + " has 1 parent\n" + "They are:\n" + personsParents[0].firstName + " "
          + personsParents[0].lastName)
      }
      else if (personsParents == 2){
        alert(person.firstName + " has 2 parents\n" + "They are:\n" + personsParents[0].firstName + " "
          + personsParents[0].lastName + "\n" + personsParents[1].firstName + personsParents[1].lastName)
      }
      let personsKids = getDecendants(person, people)
      console.log(person.firstName + "'s kids")
      console.log(personsKids)
      alert(person.firstName + ' has ' + personsKids.length + " kids")
      for (let i = 0; i < personsKids.length; ++i) {
        alert("First Name: " + personsKids[i].firstName + "   " + personsKids[i].lastName + "\n DoB: "
          + personsKids[i].dob + "\nGender: " + personsKids[i].gender );
      }
      let personsSpouse = getSpouse(person, people)
      console.log('The spouse')
      console.log(personsSpouse)
      if (personsSpouse != undefined){
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
      let foundDescendants = getDecendants(searchResults[z], people)
      console.log(foundDescendants)
      alert("Name: " + person.firstName + " " + person.lastName + "has " + (foundDescendants.length) +" kids. They are:")
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
    return potentialMatch.firstName.toLowerCase() === firstName && potentialMatch.lastName.toLowerCase() === lastName;
  })
  console.log(foundPerson)
  return foundPerson;
}

function searchByFirstName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    console.log("firstname 1");

    return potentialMatch.firstName.toLowerCase() === firstName;
  })
  console.log("firstname 2");
  console.log("first name matches: ", foundPerson)
  return foundPerson;
}

function searchByLastName(people){
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
      return potentialMatch.lastName === lastName;
    }
  )
  console.log(foundPerson)
  return foundPerson;
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
  let genderNuetrality = promptFor("You want male or female?", autoValid);
  let foundGender = people.filter(function (potentialMatch) {
    return potentialMatch.gender === genderNuetrality;
  })
  console.log(foundGender);
  return foundGender;
}

function searchByDoB(people) {
  let dateOfBirth = promptFor("What date of birth are we looking for? dd/mm/yyyy format", autoValid);
  let founddateOfBirth = people.filter(function (potentialMatch) {
    return potentialMatch.dob === dateOfBirth;
  })
  console.log(founddateOfBirth);
  return founddateOfBirth;
}
function searchByOccupation(people){
  let occupationSearch = promptFor("What occupation do you need?", autoValid);
  let foundOccupation = people.filter(function(potentialMatch){
    return potentialMatch.occupation === occupationSearch;
  })
  console.log(foundOccupation);
  return foundOccupation;
}

// original funcction before recursion
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

function getDecendants(person, people) {
  let personsID = person.id;
  let foundDescendants = people.filter(function (descendantsID) {
    if (descendantsID.parents[0] === personsID || descendantsID.parents[1] === personsID) {
      return true;
      console.log("Hi1");
    }else{
      console.log("You got false")
      return false;
    }
  })

  for(let i = 0; i < foundDescendants.length; i++) {
    console.log("recursion call below");
    let resultFromRecursiveCall = getDecendants(foundDescendants[i],people);
    foundDescendants.concat(resultFromRecursiveCall)
  }
  return foundDescendants;

}
function getSpouse(person, people){
  if(person.currentSpouse != null){
    let spouseID = person.currentSpouse
    let spouseRecord = people.filter(function(potentialMatch){
      if(potentialMatch.id === spouseID){
        return true;
      }
      else{
        return false;
      }

    })
    console.log(spouseRecord)
    return spouseRecord;
  }
}

function searchByOccupation(people) {
  let occupationSearch = promptFor("What occupation do you need?", autoValid);
  let foundOccupation = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupationSearch) {
      return true;
    } else {
      return false;
    }
  })
  console.log(foundOccupation);
  return foundOccupation;
}

function getSiblings(person, people, personsParents){
  let personID = person.id
  let parentOne = personsParents[0].id
  let parentTwo = personsParents[1].id
  let parentsNumber = person.parents
  if(parentsNumber.length = 0){
    //No parents listed
  }
  else if(parentsNumber.length == 1){
    parentOne = personsParents[0].id
  }
  else if(parentsNumber.length == 2){
    parentOne = personsParents[0].id
    parentTwo = personsParents[1].id
  }
  let foundSiblings = people.filter(function(descendantsID){
    if(descendantsID.parents.length >= 1){
      if(descendantsID.parents[0] == parentOne || descendantsID.parents[1] == parentOne
        || descendantsID.parents[0] == parentTwo || descendantsID.parents[1] == parentTwo){
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
  let personID = person.id
  let parentOne = person.parents[0]
  let parentTwo = person.parents[1]
  let parentsNumber = person.parents
  if(parentsNumber.length = 0){
    //No parents listed
  }
  else if(parentsNumber.length == 1){
    parentOne = person.parents[0]
  }
  else if(parentsNumber.length == 2){
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
  if (input.toLowerCase() === "yes" || input.toLowerCase() === "no") {
    return true;
  } else {
    return false;
  }
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

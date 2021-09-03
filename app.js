"use strict"
let isValid = false;
let targetPerson = "";
// should i add "multi" to optionsArray?

const singleSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth",
  "Eye color", "Occupation",
  "Multi",
];

// we use these search types within multiSearch
const multiSearchTypes = [
  "First name", "Last Name", "Gender", "Date of Birth",
  "Eye color", "Occupation",
  "Exit"
];
//txt
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  const isNameKnown = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  let searchResults;
  switch (isNameKnown) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by criteria
      let searchType = promptFor('How do you want to search? ' + singleSearchTypes, singleSearchTypeValidator) //in the future add rotary dial type option 1,2,3 or typing in the function
      console.log("search type: " + searchType);
      //check response to the array choices, use customValidation to compare to array, create a case in a case?
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

  // use for loop set max to 5 which is their max choices
  // the for loop should end each time wtih a prompt asking user "yes or no" If they want to do more inputs
  // each time that an input is giving we need to add the people found to a list
  //use switch type to filter and store back in combinedChoice array
  //

  function multiSearch(people) {
    console.log("Beginning multi-search");
    // let combinedChoice = [];
    // prompt("Type in Eye Color to search by eye color or type in no eye color");

    let filteredPeople = people; // we don't want to modify original people array
    // console.log(filteredPeople); // make sure filteredPeople is actually reset
    for (let i = 0; i < 3; i++) {
      let searchType = promptFor('Multi-search: Pick criteria ' + i + 1 + ' of 5(max): ' + multiSearchTypes, multiSearchTypeValidator) //in the future add rotary dial type option 1,2,3 or typing in the function
      console.log(searchType)
      switch (searchType) {
        case "eye color":
          filteredPeople = searchByEyeColor(filteredPeople);
          // combinedChoice.push(searchResults);
          // console.log("Type in Gender to search for gender");
          break;
        case "gender":
          filteredPeople = searchGender(filteredPeople);
          // combinedChoice.push(searchResults);
          // console.log("Type in Occupation to search by occupation");
          break;
        case "occupation":
          filteredPeople = searchByOccupation(filteredPeople);
          // combinedChoice.push(searchResults);
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


  // if + do not break
  //have it to where it asks by one at a time.

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  //***** create option for main menu for single search, or the results of the multisearch */
  if(searchResults.length === 1) {
    mainMenu(searchResults, people);
  }
  else if(searchResults.length > 1) {
    //if Search result has more than 1 entry, we need to figure out which one we want.
    for (let i = 0; i < searchResults.length; ++i) {
      alert("Option: " + i + "\n " + searchResults[i].firstName + " " + searchResults[i].lastName + "\n DoB: " + searchResults[i].dob + "\nGender: " + searchResults[i].gender + "\nEye Color: " + searchResults[i].eyeColor );
    }
    let selectPersonFromConsole = promptFor('There are ' + searchResults.length + ' entries found. \n Please select 0 - ' + (searchResults.length - 1) + " to continue" , autoValid)
    while(selectPersonFromConsole < 0 || selectPersonFromConsole > searchResults.length){
      selectPersonFromConsole = promptFor('Please select a number 0 - ' + searchResults.length, autoValid)
    }
    mainMenu(searchResults, people, selectPersonFromConsole);
  }
  else{
    alert('No search results found');
  }
  //display how many results and option to select 1
}


// Menu function to call once you find who you are looking for
function mainMenu(searchResults, people, z = 0){ //default 0 for first

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!searchResults) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

//*********************** */
//they missed the index to display  the user
//****************** */

  const person = searchResults[z];
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . \nDo you want to know their 'info', 'family', or 'descendants'? \nType the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      alert("Name: " + person.firstName + " " + person.lastName + " \nGender: "  + person.gender + " \mDoB: " + person.dob + " \nheight:" + person.height + " \nweight:" + person.weight + "\neye color:" + person.eyeColor + "\noccupation: " + person.occupation, autoValid)
      break;
    case "family":
      alert("Name: " + person.firstName + " " + person.lastName + "has parents: " + person.parents + " and a spouse: " + person.currentSpouse)
      break;
    case "descendants":
      let foundDescendants = getDecendants(searchResults[z], people)
      console.log(foundDescendants)
      alert("Name: " + person.firstName + " " + person.lastName + "has " + (foundDescendants.length) +" kids. They are:")
      for (let i = 0; i < foundDescendants.length; ++i) {
        alert("First Name: " + foundDescendants[i].firstName + "   " + foundDescendants[i].lastName + "\n DoB: " + foundDescendants[i].dob + "\nGender: " + foundDescendants[i].gender );
      }

      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(searchResults, people); // ask again
  }
}


//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName.toLowerCase() === firstName && potentialMatch.lastName.toLowerCase() === lastName) {
      return true;
    } else {
      return false;
    }
  })
  console.log(foundPerson)
  return foundPerson;

}
function searchByFirstName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundPerson)
  return foundPerson;
}
function searchByLastName(people){
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  }
  )
  console.log(foundPerson)
  return foundPerson;

}

function searchByEyeColor(people){
  let eyeColor = promptFor("What color eyes are we looking for?", autoValid);
  let foundEyeColor = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  })
  console.log("eye color matches: ", foundEyeColor);
  return foundEyeColor;
}

function searchGender(people) {
  let genderNuetrality = promptFor("You want male or female?", autoValid);
  let foundGender = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === genderNuetrality) {
      return true;
    } else {
      return false;
    }
  })

  // let foundGender = people.filter(function(potentialMatch){ TODO consider simpler logic, directly return comparison
  //   return potentialMatch.gender === genderNuetrality;
  // })
  console.log(foundGender);
  return foundGender;
}

function searchByDoB(people) {
  let dateOfBirth = promptFor("What date of birth are we looking for? dd/mm/yyyy format", autoValid);
  let founddateOfBirth = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dateOfBirth) {
      return true;
    } else {
      return false;
    }
  })
  console.log(founddateOfBirth);
  return founddateOfBirth;
}
function searchByOccupation(people){
  let occupationSearch = promptFor("What occupation do you need?", autoValid);
  let foundOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupationSearch){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundOccupation);
  return foundOccupation;
}

function getDecendants(person, people){
  //get the persons ID, then find it in the parents array, could be 0 or 1
  let descendantsID = new Array()
  let personsID = person.id;
  let foundDecendants = people.filter(function(descendantsID){
    if(descendantsID.parents.length >= 1){
        if(descendantsID.parents[0] == personsID || descendantsID.parents[1] == personsID){
            console.log(person.firstName + ' is the parent of: ' + descendantsID.firstName)
            return true;
        }
    }
    else{
      return false
    }
  })
  return foundDecendants;
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
let parentOne = 0
let parentTwo = 0
  if(personsParents.length = 0){
    //No parents listed, so no siblings can be found
  }
  else if(personsParents.length == 1){
    parentOne = personsParents[0].id
  }
  else if(personsParents.length == 2){
    parentOne = personsParents[0].id
    parentTwo = personsParents[1].id
  }

// now that i have the parents ID in a variable, i can search the people array for parents with either of those id's, they shall now be known as siblings or step-siblings?

  let foundSiblings = people.filter(function(descendantsID){
    if(descendantsID.parents.length >= 1){
      if(descendantsID.parents[0] == personsID || descendantsID.parents[1] == personsID){
          console.log(person.firstName + ' is the parent of: ' + descendantsID.firstName)
          return true;
      }
  }
  else{
    return false
  }
})
return foundSiblings;
}

function getFamilyMembers(person, people){
  //Create a function:  use the ID of the current person, we can pull their parents id's and their spouses. use the parents ID to find their kids from descendants function
  let familyMembersID = new Array()
  let personsID = person.id
//does my guy/gal have parents?
  let personsParents = getDecendants(person, people)
//does my guy/gal have a spouse?
  let personsSpouse = getSpouse(person, people)
//does my guy/gal have siblings?, use the personParents, to get there descendants, then subtract our person to find other
  let personsSiblings = getSiblings(person, people, personsParents)
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion


//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, validator) {
  let response;

  do {
    response = prompt(question).trim();
    isValid = validator(response);
  } while (!isValid || !response);

  return response.toLowerCase();
}

// function promptFor(question, valid){
//   do{
//     var response = prompt(question).trim();
//     isValid = valid(response);
//   } while(response === ""  ||  isValid === false)
//   return response;
// }

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() === "yes" || input.toLowerCase() === "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.

function singleSearchTypeValidator(input) {
  input = input.toLowerCase()
  if (input === "first name" || input === "last name" || input === "gender" || input === "date of birth" || input === "height" || input === "weight" || input === "eye color" || input === "occupation" || input === "multi") {
    return true;
  } else {
    return false;
  }
}

function multiSearchTypeValidator(input) {
  input = input.toLowerCase()
  if (input === "first name" || input === "last name" || input === "gender" || input === "date of birth" || input === "height" || input === "weight" || input === "eye color" || input === "occupation" || input === "exit") {
    return true;
  } else {
    return false;
  }
}

//#endregion
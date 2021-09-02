"use strict"
let isValid = false;
let targetPerson = "";
let optionsArray = ["First name", "Last Name", "Gender", "Date of Birth", "Eye color", "Occupation"]
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people){
  // put this under no after find traits works
  findTraits();
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let searchTypeTwo = promptFor('How do you want to search? ' + optionsArray, customValidation) //in the future add rotary dial type option 1,2,3 or typing in the function
      console.log(searchTypeTwo)
      //check response to the array choices, use customValidation to compare to array, create a case in a case?
      switch(searchTypeTwo){
          case 'First Name':
            searchResults = searchByFirstName(people)
            break;
          case 'Last Name':
            searchResults = searchByLastName(people)
            break;
          case 'Gender':
            searchResults = searchGender(people)
            console.log(searchResults.length)
            break;
          case 'Date of Birth':
            searchResults = searchByDoB(people)
            break;
          case 'Eye Color':
            searchResults = searchByEyeColor(people)
            break;
          case 'Occupation':
            searchResults = searchByOccupation(people)      
            break;
      }
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  //***** create option for main menu for single search, or the results of the multisearch */
  if(searchResults.length > 1){
    //if Search result has more than 1 entry, we need to figure out which one we want.
    console.log(searchResults)
    for (let i = 0; i < searchResults.length; ++i) {
      alert("Option: " + i + "\n " + searchResults[i].firstName + " " + searchResults[i].lastName + "\n DoB: " + searchResults[i].dob + "\nGender: " + searchResults[i].gender );
    }
    let selectPersonFromConsole = promptFor('There are ' + (searchResults.length - 1) + ' entries found. \n Please select 0 -' + (searchResults.length - 1) + " to continue" , autoValid)
    if(selectPersonFromConsole > searchResults.length){
      selectPersonFromConsole = promptFor('Please select a number 0 - ' + searchResults.length, autoValid)
    }
    else{
      mainMenu(searchResults, people, selectPersonFromConsole);
    }
  }
  else{
    mainMenu(searchResults, people);
  }
  //display how many results and option to select 1
}

function findTraits() {
  console.log("hi");
  let printAllOccupation = data.occupation;
  console.log(printAllOccupation);

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people, z = 0){ //default 0 for first

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

//*********************** */
//they missed the index to display  the user
//****************** */

  let displayOption = promptFor("Found " + person[z].firstName + " " + person[z].lastName + " . \nDo you want to know their 'info', 'family', or 'descendants'? \nType the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      alert("Name: " + person[z].firstName + " " + person[z].lastName + " \nGender: " + person[z].gender + " \mDoB: " + person[z].dob + " \nheight:" + person[0].height + " \nweight:" + person[z].weight + "\neye color:" + person[z].eyeColor + "\noccupation: " + person[z].occupation, autoValid)
      // TODO: get person's info
      break;
    case "family":
      alert("Name: " + person[z].firstName + " " + person[z].lastName + "has parents: " + person[z].parents + " and a spouse: " + person[z].currentSpouse)
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get the guy/girls kids descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}


//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
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
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
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
  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundEyeColor);
  return foundEyeColor;
}
function searchGender(people){
  let genderNuetrality = promptFor("You want male or female?", autoValid);
  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === genderNuetrality){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundGender);
  return foundGender;
}
function searchByDoB(people){
  let dateOfBirth = promptFor("What date of birth are we looking for? dd/mm/yyyy format", autoValid);
  let founddateOfBirth = people.filter(function(potentialMatch){
    if(potentialMatch.dob === dateOfBirth){
      return true;
    }
    else{
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


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
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
function promptFor(question, valid){
  const response = prompt(question).trim();
  do{
    isValid = valid(response);
  } while(response === ""  ||  isValid === false){
    return response;
  }
}

// function promptFor(question, valid){
//   do{
//     var response = prompt(question).trim();
//     isValid = valid(response);
//   } while(response === ""  ||  isValid === false)
//   return response;
// }

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
 //we need to load the array optionsArray to compare our response
  if(input == "First name" || input == "Last name" || input == "Gender" || input == "Date of Birth" || input == "Height" || input == "Weight" || input == "Eye color" || input == "Occupation"){
    return true;
    }
  else{
    return false;
}
}

//#endregion

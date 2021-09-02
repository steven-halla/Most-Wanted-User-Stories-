"use strict"
let isValid = false;
let targetPerson = "";
let optionsArray = ["First name", "Last Name", "Gender", "Date of Birth", "Height", "Weight", "Eye color", "Occupation"]
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
            break;
          case 'Last Name':
            break;
          case 'Gender':
            break;
          case 'Date of Birth':
            break;
          case 'Height':
            break;
          case 'Weight':
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
  mainMenu(searchResults, people);
}

function findTraits() {
  console.log("hi");
  let printAllOccupation = data.occupation;
  console.log(printAllOccupation);

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

//*********************** */
//they missed the index to display  the user
//****************** */

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      console.log("Name: " + person[0].firstName + " " + person[0].lastName + " Gender: " + person[0].gender + " DoB: " + person[0].dob + " height:" + person[0].height + " weight:" + person[0].weight + " eye color:" + person[0].eyeColor + " occupation: " + person[0].occupation )
      // TODO: get person's info
      break;
    case "family":
      console.log("Name: " + person[0].firstName + " " + person[0].lastName + "has parents: " + person[0].parents + " and a spouse: " + person[0].currentSpouse)
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
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
  // TODO: find the person single person object using the name they entered.
  console.log(foundPerson)
  return foundPerson;

}

//finished function to search through an array of people to find matching eye colors. Use searchByName as reference.
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
    if(potentialMatch.dob === occupationSearch){
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
  for(let index = 0; index = optionsArray.length; index++){
    if(optionsArray[index].toLocaleLowerCase() == input.toLocaleLowerCase()){ //we will lowercase everything just in case SoMeoNe tYpeS fUnnY
        console.log('User has selected' + optionsArray[index])
        return true;
    }
    else{
      return false;
    }
}
}

//#endregion

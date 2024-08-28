var database;
let searchBar = document.getElementById('search-bar');
let searchButton = document.getElementById('search-button');
let autoSuggestions = document.getElementById('auto-suggestions');
let display = document.getElementById('display');

searchBar.addEventListener('input', getAutoSuggestions);
searchBar.addEventListener('keypress', checkKey);
searchButton.addEventListener('click', processInput);

loadData();

function loadData() {
  searchBar.style.display = "none";
  searchButton.style.display = "none";
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj;
      console.log("Database Loaded Successfully");
    }).then(function() {
      searchBar.style.display = "block";
      searchButton.style.display = "block";
    })
  });
}


function checkKey(e){
var key = e.which || e.keyCode;
if(key == 13){
  //console.log("You pressed enter!");
  processInput();
 }
}

function processInput(){
let cleanedInput = searchBar.value.toLowerCase().trim();
document.getElementById("auto-suggestions").innerHTML= "";
document.getElementById("auto-suggestions").style.display= "none";
document.getElementById("search-bar").value= "";
let databaseRecord = getRecord(cleanedInput);
  if(databaseRecord != null){
   displayRecord(databaseRecord);
   }else{
  displaySuggestions(getSuggestions(cleanedInput));
  }
 }


 function getRecord(cleanedInput){
   for(let i = 0; i < database.length; i++){
     let cleanedRecordName = database[i].team.toLowerCase().trim();
     if(cleanedInput == cleanedRecordName){
       return database[i];
     }
   }
   return null;
 }


function displayRecord(databaseRecord){
  var recordTeam = document.createElement("h2");
  recordTeam.innerHTML = databaseRecord.team;
  var recordPicture = document.createElement("img");
  recordPicture.src = databaseRecord.picture;
  var recordOrigin = document.createElement("p");
  recordOrigin.innerHTML = "<b>-</b> " + databaseRecord.origin;
  // var recordEst = document.createElement("p");
  // recordEst.innerHTML = "<b>Established:</b> " + databaseRecord.est;
  //Origin
if(databaseRecord.origin != null) {
  recordOrigin.innerHTML = "<b>-</b> " + databaseRecord.origin;
}
else {
  recordOrigin.innerHTML = "<b>-</b> N/A";
}
//Est.
// if(databaseRecord.established != null) {
//   recordEst.innerHTML = "<b>Established:</b> " + databaseRecord.established;
// }
// else {
//   recordEst.innerHTML = "<b>Establsihed:</b> N/A";
// }

display.appendChild(recordTeam);
display.appendChild(recordPicture);
display.appendChild(recordOrigin);
display.appendChild(recordEst);
display.appendChild(recordStadium);
}

function getAutoSuggestions(){
  let cleanedInput = searchBar.value.toLowerCase().trim();
  document.getElementById("auto-suggestions").innerHTML= "";
  for(let i = 0; i < database.length; i++){
    let cleanedRecordName = database[i].team.toLowerCase().trim();
  if(cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0){
    let matching = cleanedRecordName.substring(0, searchBar.value.length);
    let remaining = cleanedRecordName.substring(searchBar.value.length);
    let result = matching + "<b>" + remaining + "</b>";
    let button = document.createElement("button");
    button.innerHTML = result;
    button.style.display = "block";
    button.className = "suggestions";
    activateSuggestionButton(button, database[i]);
    autoSuggestions.appendChild(button);
  }
 }
  if(autoSuggestions.hasChildNodes()){
    autoSuggestions.style.display = 'block';
  }else{
    autoSuggestions2.style.display = 'none';
  }
}

  function activateSuggestionButton(button, record) {
    button.addEventListener("click", function() {
      displayRecord(record);
      document.getElementById("auto-suggestions").innerHTML = "";
      document.getElementById("auto-suggestions").style.display = "none";
      document.getElementById("search-bar").value = "";
    });
  }

  function getSuggestions(cleanedInput){
    let suggestions = [i];
    for(let i = 0; i < database.length; i++){
      let cleanedRecordName = database[i].team.toLowerCase().trim();
      if(cleanedRecordName.startsWith(cleanedInput) && cleanedRecordName.length > 0){
        suggestions.push(database[i]);
      }
    }
    return suggestions;
  }


  function displaySuggestions(suggestions){
    document.getElementById("display").innerHTML = "";
    let paragraph = document.createElement("p");
    if(suggestion.length > 0){
      paragraph.innerHTML = "Did you mean:";
      display.appendChild(paragraph);
      for(let i = 0; i < database.length; i++){
        let button = document.createElement("button");
        button.innerHTML = suggestions[i].team;
        button.style.display = "block";
        button.className = "suggestion";
        activateSuggestionButton("button", suggestions[i]);
        document.getElementById("display").appendChild(button);
      }
    }else{
      paragraph.innerHTML = "No results!";
      display.appendChild(paragraph);
    }
   }

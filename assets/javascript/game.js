console.log("star wars!!!")

//define player object:
var player = {isInitialized:false, isAttacking:false, wins:0, losses:0};
var enemyArray = [];
var enemyCharacter;
var userCharacter;

// define a character constructor:
// name: name of character, isUser:bool defining if this character was selected by user, isOption:  bool defining if character is available as an option for selection (user or enemy), health: character total health, attackBase: base of attack for character that adds to attackPower after every move, attackPower: character power that is used if userCharacter, counterAttack: character power that is used if enemyCharacter
function character(name, isUser, isOption, isEnemy, health, attackBase,attackPower, counterAttack){
  this.name = name;
  this.isUser = isUser;
  this.isOption = isOption;
  this.isEnemy = isEnemy;
  this.health = health;
  this.attackBase = attackBase;
  this.attackPower = attackPower;
  this.counterAttack = counterAttack;
};

// define all characters based on character constructor:
var darthVader = new character("Darth Vader", false, true, false, 200, 30, 30, 45);
var yoda = new character("Yoda", false, true, false, 100, 35, 35, 30);
var luke = new character("Luke", false, true, false, 150, 30, 30, 50);
var chewbacca = new character("Chewbacca", false, true, false, 250, 25, 25, 30);

//collect all character object in a character array so that we can dynamically call a character
charArray = [darthVader, yoda, luke, chewbacca];

$(document).ready(function () {
    displayCharacters();
});

// display available characters in id:"characters" and id:"char'i'" where i is 0 to charArray
function displayCharacters(){
  var characters = $("#characters");
  characters.append("<div class='col-md-2' id='charactersTitle'></div>");
  $("#characters #charactersTitle").append("<h2>Characters:</h2>")
  for (let i = 0; i < charArray.length; i++){
    characters.append("<div class='col-md-2' id='char" + i + "'></div>");
    var charDiv = $("#characters #char"+i);
    charDiv.append("<h2>"+charArray[i].name+"</h2>")
  }
}

// after character is selected display user character and hide all selections
function displayUserCharacter(){
  var userCharDiv = $("#userSelection");
  userCharDiv.append("<div class='col-md-3' id='userCharacterTitle'></div>");
  $("#userSelection #userCharacterTitle").append("<h2>User Character:</h2>");
  userCharDiv.append("<div class='col-md-3' id='userCharacter'></div>");
  
  $("#userSelection #userCharacter").append("<h2>"+userCharacter.name+"</h2>");
  $("#characters").hide();
}

// display available enemies in id:"enemies" and id:"enemy'i'" where i 0 to length of enemyArray.
function displayEnemies(){
  var enemy = $("#enemies");
  enemy.append("<div class='col-md-3' id='enemyTitle'></div>");
  $("#enemies #enemyTitle").append("<h2>Enemies:</h2>");
  for (let i = 0; i < enemyArray.length; i++){
    enemy.append("<div class='col-md-3 enemy' id='enemy" + i + "'></div>");
    var enemyDiv = $("#enemies #enemy"+i);
    enemyDiv.append("<h2>"+enemyArray[i].name+"</h2>")
  }
}

function displayEnemyCharacter(){
  var enemyCharDiv = $("#enemySelection");
  enemyCharDiv.append("<div class='col-md-3' id='enemyCharacterTitle'></div>");
  $("#enemySelection #enemyCharacterTitle").append("<h2>Enemy Character:</h2>");
  enemyCharDiv.append("<div class='col-md-3' id='enemyCharacter'></div>");
  $("#enemySelection #enemyCharacter").append("<h2>"+enemyCharacter.name+"</h2>"); 
}
//click event for all characters while isInitialized = false.  This is used for character selection (for now).  I use a for loop to find any of the characters in the array.
for (let i = 0; i < charArray.length; i++){
  $(document).on("click","#char"+i,function selectCharacter(){
  // $("#char" + i).click(function selectCharacter(){
    if (!player.isInitialized && !player.isAttacking){
    console.log("i selected character");
    userSelection(i);
    player.isInitialized = !player.isInitialized;
    }
  });
};

//click event for enemies after enemies are displayed and populated from userSelection().  for some reason I cannot use the for loop if i call displayEnemies(), from inside a function... However this works great!  
  $(document).on("click",".enemy",function selectEnemy(){
    if (player.isInitialized && !player.isAttacking){
      var selectedEnemy = $(this).attr("id");
      selectedEnemy = selectedEnemy.charAt(5);
      enemySelection(selectedEnemy);
    }
  });

function enemySelection(selectedEnemy){
  player.isAttacking = !player.isAttacking;
  enemyCharacter = enemyArray[selectedEnemy];
  enemyArray.splice(enemySelection,1);
  $("div").remove(".enemy");
  $("div").remove("#enemyTitle");
  displayEnemyCharacter();
  displayEnemies();
  console.log(enemyArray[selectedEnemy]);
}

// character selection function will turn isInitialized = true, then change the selected character's isUser = true and isOption = false.  for the rest of characters isEnemy = true. Then we populate an enemy array of objects from not selected characters.  This array will be used to select a random enemy for battle. 

function userSelection(i){
  userCharacter = charArray[i];
  userCharacter.isUser = !userCharacter.isUser;
  userCharacter.isOption = !userCharacter.isOption;

  charArray.splice(i,1);
  enemyArray = charArray;

  for (i = 0; i < enemyArray.length; i++){
    enemyArray[i].isEnemy = !enemyArray[i].isEnemy;
  }
  displayUserCharacter();
  displayEnemies();
}

//selects enemy from enemyArray sets it to enemyCharacter and removes from array.
// function selectEnemy(){
//   var rand = Math.floor(Math.random()*enemyArray.length);
//   enemyCharacter = enemyArray[rand];
//   enemyArray.splice(rand,1);
// }

$("#attackButton").click(function(){
  if(player.isAttacking){
    if(enemyCharacter.health >= 0){
      console.log("im attacking");
      attackLogic();
    }
  };
});

function attackLogic(){
  console.log("user attack power: " + userCharacter.attackPower);
  console.log("enemy counter attack power: " + enemyCharacter.counterAttack);
  enemyCharacter.health -= userCharacter.attackPower;
  userCharacter.health -= enemyCharacter.counterAttack;
  userCharacter.attackPower += userCharacter.attackBase;
  console.log("user health: " + userCharacter.health);
  console.log("enemy health: " + enemyCharacter.health);
  checkHealth();
  }

function checkHealth(){
  if (userCharacter.health <= 0){
    console.log("you lose");
    player.isAttacking = !player.isAttacking;
  }
  else if (enemyCharacter.health <= 0){
    console.log("you win");
    // player.isPlaying = !player.isPlaying;
    // selectEnemy();
  }
}
console.log("star wars!!!")

//define player object:
var player = {isInitialized:false, isAttacking:false, wins:0, losses:0};
var enemyArray = [];
var enemyCharacter;
var userCharacter;
// var selectedEnemy;

// define a character constructor:
// name: name of character, isUser:bool defining if this character was selected by user, isOption:  bool defining if character is available as an option for selection (user or enemy), health: character total health, attackBase: base of attack for character that adds to attackPower after every move, attackPower: character power that is used if userCharacter, counterAttack: character power that is used if enemyCharacter
function character(name, image, isUser, isOption, isEnemy, health, attackBase,attackPower, counterAttack){
  this.name = name;
  this.image = image;
  this.isUser = isUser;
  this.isOption = isOption;
  this.isEnemy = isEnemy;
  this.health = health;
  this.attackBase = attackBase;
  this.attackPower = attackPower;
  this.counterAttack = counterAttack;
};

// define all characters based on character constructor:
var darthVader = new character("Darth Vader", "assets/images/darth-vader.svg", false, true, false, 200, 30, 30, 45);
var bobaFett = new character("Boba Fett", "assets/images/boba-fett.svg", false, true, false, 100, 35, 35, 30);
var leia = new character("Leia", "assets/images/princess-leia.svg", false, true, false, 150, 30, 30, 50);
var chewbacca = new character("Chewbacca", "assets/images/chewbacca.svg", false, true, false, 250, 25, 25, 30);

//collect all character object in a character array so that we can dynamically call a character
charArray = [darthVader, bobaFett, leia, chewbacca];

$(document).ready(function () {
    displayCharacters();
});

// display available characters in id:"characters" and id:"char'i'" where i is 0 to charArray
function displayCharacters(){
  var selectCharacter = $("#selectCharacter");
  for (i = 0; i < charArray.length; i++){
    var newRowDiv = $("<div></div>").addClass("row");
    newRowDiv.attr("id", "availableCharacterRow" + i);
    newRowDiv.appendTo(selectCharacter);

    var newColDiv = $("<div></div>").addClass("col-md-6");
    newColDiv.attr("id","char" + i);
    newColDiv.appendTo(newRowDiv);

    var newImage = $("<img>");
    newImage.attr("src", charArray[i].image);
    newImage.appendTo(newColDiv);
  }
}


// function displayCharacters(){
//   var characters = $("#characters");
//   characters.append("<div class='jumbotron'><h1>Select a Character to Begin!</h1></div>")
//   for (i = 0; i < charArray.length; i++){
    
//     characters.append("<div class='row' id='char" + i + "Row'></div>");
//     var charactersRow = $("#char" + i + "Row");
//     charactersRow.append("<div class='col-md-6 characters' id='char" + i + "'></div>");
//     var charactersColumn = $("#char" + i);
//     charactersColumn.append("<img src=" + charArray[i].image + ">");
//     charactersColumn.append("<h2>" + charArray[i].name + "</h2>");
//   }
// }

// function displayCharacters(){
//   var characters = $("#characters");
//   characters.append("<div class='col-md-2' id='charactersTitle'></div>");
//   $("#characters #charactersTitle").append("<h2>Characters:</h2>")
//   for (i = 0; i < charArray.length; i++){
//     characters.append("<div class='col-md-2' id='char" + i + "'></div>");
//     var charDiv = $("#characters #char"+i);
//     charDiv.append("<img src="+charArray[i].image+">");
//     // charDiv.append("<h2>"+charArray[i].name+"</h2>");
//   }
// }

// after character is selected display user character and hide all selections

function displayUserCharacter(){
  var selectCharacter = $("#selectCharacter");
  $(selectCharacter).hide();

}

// function displayUserCharacter(){
//   var userCharDiv = $("#userSelection");
//   userCharDiv.append("<div class='col-md-3' id='userCharacterTitle'></div>");
//   $("#userSelection #userCharacterTitle").append("<h2>User Character:</h2>");
//   userCharDiv.append("<div class='col-md-3' id='userCharacter'></div>");
  
//   $("#userSelection #userCharacter").append("<h2>"+userCharacter.name+"</h2>");
//   $("#characters").hide();
// }

// display available enemies in id:"enemies" and id:"enemy'i'" where i 0 to length of enemyArray.
function displayEnemies(){
  var enemy = $("#enemies");
  enemy.append("<div class='col-md-3' id='enemyTitle'></div>");
  $("#enemies #enemyTitle").append("<h2>Enemies:</h2>");
  for (i = 0; i < enemyArray.length; i++){
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

function displayUserStatus(){
  $("#userStatus").append("<div class='col-md-3' id='userStatusTitle'></div>");
  $("#userStatus #userStatusTitle").append("<h2>User Status:</h2>");

  $("#userStatus").append("<div class='col-md-3' id='userHealth'></div>");
  $("#userStatus #userHealth").append("<h2>User Health: "+userCharacter.health+"</h2>");

  $("#userStatus").append("<div class='col-md-3' id='userAttack'></div>");
  $("#userStatus #userAttack").append("<h2>User Attack: "+userCharacter.attackPower+"</h2>");
}

function displayEnemyStatus(){
  $("#enemyStatus").append("<div class='col-md-3' id='enemyStatusTitle'></div>");
  $("#enemyStatus #enemyStatusTitle").append("<h2>Enemy Status:</h2>");

  $("#enemyStatus").append("<div class='col-md-3' id='enemyHealth'></div>");
  $("#enemyStatus #enemyHealth").append("<h2>Enemy Health: "+enemyCharacter.health+"</h2>");

  $("#enemyStatus").append("<div class='col-md-3' id='enemyCounterAttack'></div>");
  $("#enemyStatus #enemyCounterAttack").append("<h2>Enemy Attack: "+enemyCharacter.counterAttack+"</h2>");
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
      selectedEnemy = parseInt(selectedEnemy.charAt(5));
      console.log("enemyArray index: "+ selectedEnemy);
      enemySelection(selectedEnemy);
    }
  });

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
  console.log("original enemy array "+enemyArray[0].name,enemyArray[1].name,enemyArray[2].name)
  displayUserCharacter();
  displayEnemies();
  displayUserStatus();
}

function enemySelection(i){
  player.isAttacking = !player.isAttacking;
  enemyCharacter = enemyArray[i];
  enemyCharacter.isOption = !enemyCharacter.isOption;
  
  enemyArray.splice(i,1);
  console.log(enemyArray);
  $("div").remove(".enemy");
  $("div").remove("#enemyTitle");

  $("div").remove("#enemyStatusTitle");
  $("div").remove("#enemyHealth");
  $("div").remove("#enemyCounterAttack");
  displayEnemyCharacter();
  displayEnemies();
  displayEnemyStatus();
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
        
      $("div").remove("#userStatusTitle");
      $("div").remove("#userHealth");
      $("div").remove("#userAttack");

      $("div").remove("#enemyStatusTitle");
      $("div").remove("#enemyHealth");
      $("div").remove("#enemyCounterAttack");

      displayUserStatus();
      displayEnemyStatus();
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

    $("div").remove("#enemyCharacter");
    $("div").remove("#enemyCharacterTitle");
    player.isAttacking = !player.isAttacking;
  }
}

// update attack logic to first check health after one attack then after counter attack, then attack then counter... instead of after both
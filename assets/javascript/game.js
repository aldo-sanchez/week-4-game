console.log("star wars!!!")

//define player object:
var player = {isInitialized:false, isAttacking:false, wins:0, losses:0};
var enemyArray = [];
var enemyCharacter;
var userCharacter;
// var selectedEnemy;

// define a character constructor:
// name: name of character, isUser:bool defining if this character was selected by user, isOption:  bool defining if character is available as an option for selection (user or enemy), health: character total health, attackBase: base of attack for character that adds to attackPower after every move, attackPower: character power that is used if userCharacter, counterAttack: character power that is used if enemyCharacter
function character(name, image, isUser, isOption, isEnemy, staticHealth, health, attackBase,attackPower, counterAttack){
  this.name = name;
  this.image = image;
  this.isUser = isUser;
  this.isOption = isOption;
  this.isEnemy = isEnemy;
  this.staticHealth = staticHealth;
  this.health = health;
  this.attackBase = attackBase;
  this.attackPower = attackPower;
  this.counterAttack = counterAttack;
};

// define all characters based on character constructor:
var darthVader = new character("Darth Vader", "assets/images/darth-vader.svg", false, true, false, 200, 200, 30, 30, 45);
var bobaFett = new character("Boba Fett", "assets/images/boba-fett.svg", false, true, false, 100, 100, 35, 35, 30);
var leia = new character("Leia", "assets/images/princess-leia.svg", false, true, false, 150, 150, 30, 30, 50);
var chewbacca = new character("Chewbacca", "assets/images/chewbacca.svg", false, true, false, 250, 250, 25, 25, 30);

//collect all character object in a character array so that we can dynamically call a character
charArray = [darthVader, bobaFett, leia, chewbacca];

$(document).ready(function () {
    displayCharacters("user", charArray);
});

// display available characters in id:"characters" and id:"char'i'" where i is 0 to charArray

function displayCharacters(character, array){
  var column = $("#" + character + "Column");
  var row = $("<div></div>").addClass("row");
  row.attr("id", character + "Row");
  row.appendTo(column);

  var select = $("<div></div>").addClass("col-md-12");
  select.attr("id", "select" + character);
  select.appendTo(row);

  for (i = 0; i < array.length; i++){
    var newRowDiv = $("<div></div>").addClass("row");
    newRowDiv.attr("id", "available" + character + "Row" + i);
    newRowDiv.appendTo(select);

    var newColDiv = $("<div></div>").addClass("col-md-12 " + character);
    newColDiv.attr("id", character + i);
    newColDiv.appendTo(newRowDiv);

    var newImage = $("<img>");
    newImage.attr("src", array[i].image);
    newImage.appendTo(newColDiv);

    var characterTitle = $("<h2>" + array[i].name + "</h2>");
    characterTitle.appendTo(newColDiv);
  }
}

// after character is selected display user character and hide all selections
function displaySingleCharacter(character, charObject){
  var selectCharacter = $("#select" + character);
  $(selectCharacter).remove();

  var row = ("#" + character + "Row");

  var characterDiv = $("<div></div>").addClass("col-md-12");
  characterDiv.attr("id", character + "Character");
  characterDiv.appendTo(row);

  var characterImage = $("<img>");
  characterImage.attr("src", charObject.image);
  characterImage.appendTo(characterDiv);

  var characterTitle = $("<h2>" + charObject.name + "</h2>");
  characterTitle.appendTo(characterDiv);
}

function displayStatus(character, charObject){
  var row = ("#" + character + "Row");
  var statusCol = $("<div></div>").addClass("col-md-12"); 
  statusCol.attr("id", character + "StatusCol");
  statusCol.appendTo(row);

  var statusRow = $("<div></div>").addClass("row");
  statusRow.attr("id", character + "StatusRow");
  statusRow.appendTo(statusCol);

  var charAttack = $("<div></div>").addClass("col-md-12");
    charAttack.attr("id", character + "Attack");
    charAttack.appendTo(statusRow);

  if (character == "user"){
    var charAttackTitle = $("<h2></h2>");
    charAttackTitle.attr("id", character+"AttackTitle");
    charAttackTitle.text("Attack Power: " + charObject.attackPower);
  }else{
    var charAttackTitle = $("<h2></h2>");
    charAttackTitle.attr("id", character+"AttackTitle");
    charAttackTitle.text("Counter Attack Power: " + charObject.counterAttack);
  };

  charAttackTitle.appendTo(charAttack); 
  
  var charHealth = $("<div></div>").addClass("col-md-12");
  charHealth.attr("id", character + "Health");
  charHealth.appendTo(statusRow);
  var healthBar = $("<div></div>").addClass("progress-bar");
  healthBar.attr({
    id: character + "HealthBar",
    role: "progress-bar",
    ariavaluenow: charObject.health,
    ariavaluemin: "0",
    ariavaluemax: charObject.staticHealth, 
    });
    healthBar.css("width", (charObject.health/charObject.staticHealth)*100 + "%");
    healthBar.text(charObject.health);
    healthBar.appendTo(charHealth);   
}

//click event for all characters while isInitialized = false.  This is used for character selection (for now).  I use a for loop to find any of the characters in the array.
for (let i = 0; i < charArray.length; i++){
  $(document).on("click","#user"+i,function selectCharacter(){
  // $("#char" + i).click(function selectCharacter(){
    if (!player.isInitialized && !player.isAttacking){
    console.log("i selected character");
    userSelection(i);
    
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
  player.isInitialized = !player.isInitialized;
  userCharacter.isUser = !userCharacter.isUser;
  userCharacter.isOption = !userCharacter.isOption;
  
  enemyArray = charArray;
  enemyArray.splice(i,1);
  

  for (i = 0; i < enemyArray.length; i++){
    enemyArray[i].isEnemy = !enemyArray[i].isEnemy;
  }
  console.log("original enemy array "+enemyArray[0].name,enemyArray[1].name,enemyArray[2].name);
  displaySingleCharacter("user", userCharacter);
    displayStatus("user", userCharacter);
  displayCharacters("enemy", enemyArray);
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
  displaySingleCharacter("enemy", enemyCharacter);
  // displayEnemyCharacter();
  // displayEnemies();
  // displayEnemyStatus();
  displayStatus("enemy", enemyCharacter);
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
      // characterStatusUpdate();
    }
  };
});

function userAttackUpdate(){
  userCharacter.attackPower += userCharacter.attackBase;
  $("#userAttackTitle").text("Attack Power: " + userCharacter.attackPower);
}

function healthBarAnimation(character, charObject){
  var healthBar = $("#" + character + "HealthBar");

  healthBar.css("width", (charObject.health/charObject.staticHealth)*100 + "%");
  healthBar.text(charObject.health);

  if (charObject.health < 100){
    healthBar.addClass("progress-bar-warning");
  }
  if (charObject.health < 50){
    healthBar.removeClass("progress-bar-warning");
    healthBar.addClass("progress-bar-danger");
  }
  if (charObject.health <=10){
    healthBar.addClass("progress-bar-striped active")
  }
}


function attackLogic(){
  enemyCharacter.health -= userCharacter.attackPower;

  if(player.isAttacking){
    healthBarAnimation("enemy", enemyCharacter);
    checkHealth();
  }
  

  userCharacter.health -= enemyCharacter.counterAttack;
  
  if(player.isAttacking){
  healthBarAnimation("user", userCharacter);
  checkHealth();
  }
  
  userAttackUpdate();
  }

function checkHealth(){
  if (userCharacter.health <= 0){
    console.log("you lose");
    player.isAttacking = !player.isAttacking;
  }
  else if (enemyCharacter.health <= 0){
    console.log("you win");
    player.isAttacking = !player.isAttacking;
    restart();
  }
}

function restart(){
  $("#enemyRow").remove();
  displayCharacters("enemy",enemyArray);
}
// update attack logic to first check health after one attack then after counter attack, then attack then counter... instead of after both
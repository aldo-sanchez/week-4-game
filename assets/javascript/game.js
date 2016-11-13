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

// display available characters in id:"characters" and id:"char'i'" where i is 0 to charArray
for (let i = 0; i < charArray.length; i++){
  var characters = $("#characters");
  characters.append("<div class='col-md-3' id='char" + i + "'></div>");
  var charDiv = $("#characters #char"+i);
  charDiv.append("<h2>"+charArray[i].name+"</h2>")
}

function displayUserCharacter(){
  var userCharDiv = $("#userSelection");
  userCharDiv.append("<div class='col-md-3' id='userCharacter'></div>");
  var userCharDiv = $("#userSelection #userCharacter");
  userCharDiv.append("<h2>User Character: "+userCharacter.name+"</h2>");
  $("#characters").hide();
}

// display available enemies in id:"enemies" and id:"enemy'i'" where i 0 to length of enemyArray.
function displayEnemies(){
  for (let i = 0; i < enemyArray.length; i++){
    var enemy = $("#enemies");
    enemy.append("<div class='col-md-3' id='enemy" + i + "'></div>");
    var enemyDiv = $("#enemies #enemy"+i);
    enemyDiv.append("<h2>"+enemyArray[i].name+"</h2>")
  }
}

//click events for all characters while isInitialized = false.  This is used for character selection (for now)
for (let i = 0; i < charArray.length; i++){
  $("#char" + i).click(function selectCharacter(){
    if (!player.isInitialized && !player.isAttacking){
  // alert("you clicked " + i);
    userSelection(i);
    }
  });
};



// character selection function will turn isInitialized = true, then change the selected character's isUser = true and isOption = false.  for the rest of characters isEnemy = true. Then we populate an enemy array of objects from not selected characters.  This array will be used to select a random enemy for battle. 
function userSelection(i){
  player.isInitialized = !player.isInitialized;
  player.isAttacking = !player.isAttacking;
  userCharacter = charArray[i];
  userCharacter.isUser = !userCharacter.isUser;
  userCharacter.isOption = !userCharacter.isOption;

  switch(i){
    case 0:   
      charArray[1].isEnemy = !charArray[1].isEnemy;      
      charArray[2].isEnemy = !charArray[2].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[1], charArray[2],charArray[3]];
      // selectEnemy();
      console.log(charArray[0].name);
      break;

    case 1:    
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[2].isEnemy = !charArray[2].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[2], charArray[3]];
      // selectEnemy();
      console.log(charArray[1].name);
      break;

    case 2:
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[3]];
      // selectEnemy();
      console.log(charArray[2].name);
      break;

    case 3:
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[2].isEnemy = !charArray[2].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[2]];
      // selectEnemy();
      console.log(charArray[3].name);
      break;
  }
  displayUserCharacter();
  displayEnemies();
  // selectEnemy();
};



//selects enemy from enemyArray sets it to enemyCharacter and removes from array.
function selectEnemy(){
  var rand = Math.floor(Math.random()*enemyArray.length);
  enemyCharacter = enemyArray[rand];
  enemyArray.splice(rand,1);
}


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
    selectEnemy();
  }
}

// works with randomly selecting an enemy.  need to select the enemy on my own...
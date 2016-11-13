console.log("star wars!!!")

//define player object:
var player = {isInitialized:false, isPlaying:false, wins:0, losses:0};
var enemyArray = [];
var enemyCharacter;
var userCharacter;

// define a character constructor:
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
charArray = [darthVader, yoda, luke, chewbacca]

//click events for all characters while isInitialized = false.  This is used for character selection (for now)
for (let i = 0; i <= 3; i++){
  $("#char" + i).click(function(){
    if (!player.isInitialized && !player.isPlaying){
  // alert("you clicked " + i);
    userSelection(i);
    }
  });
};

// character selection function will turn isInitialized = true, then change the selected character's isUser = true and isOption = false.  for the rest of characters isEnemy = true. Then we populate an enemy array of objects.  This array will be used to select a random enemy for battle. 
function userSelection(i){
  player.isInitialized = !player.isInitialized;
  player.isPlaying = !player.isPlaying;
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
      console.log("darthVader");
      break;

    case 1:    
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[2].isEnemy = !charArray[2].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[2], charArray[3]];
      // selectEnemy();
      console.log("yoda");
      break;

    case 2:
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[3]];
      // selectEnemy();
      console.log("luke");
      break;

    case 3:
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[2].isEnemy = !charArray[2].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[2]];
      // selectEnemy();
      console.log("chewbacca");
      break;
  }
  selectEnemy();
};

//selects enemy from enemyArray sets it to enemyCharacter and removes from array.
function selectEnemy(){
  var rand = Math.floor(Math.random()*enemyArray.length);
  enemyCharacter = enemyArray[rand];
  enemyArray.splice(rand,1);
}


$("#attackButton").click(function(){
  if(player.isPlaying){
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
    player.isPlaying = !player.isPlaying;
  }
  else if (enemyCharacter.health <= 0){
    console.log("you win");
    // player.isPlaying = !player.isPlaying;
    selectEnemy();
  }
}

// works with randomly selecting an enemy.  need to select the enemy on my own...
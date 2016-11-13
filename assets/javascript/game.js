console.log("star wars!!!")

//define player object:
var player = {isPlaying:false, wins:0, losses:0};
var enemyArray = [];

// define a character constructor:
function character(name, isPlayer, isOption, isEnemy, health, attackBase,attackPower, counterAttack){
  this.name = name;
  this.isPlayer = isPlayer;
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

charArray = [darthVader, yoda, luke, chewbacca]

//click events for all characters
for (let i = 1; i <= 4; i++){
  $("#char" + i).click(function(){
    if (!player.isPlaying){
  // alert("you clicked " + i);
    characterSelection(i);
    }
  });
};

// function after initial click
function characterSelection(i){
  player.isPlaying = !player.Playing;
  switch(i){

    case 1:
      charArray[0].isPlayer = !charArray[0].isPlayer;
      charArray[0].isOption = !charArray[0].isOption;
      
      charArray[1].isEnemy = !charArray[1].isEnemy;      
      charArray[2].isEnemy = !charArray[2].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[1], charArray[2],charArray[3]];
      console.log("darthVader");
      break;

    case 2:
      charArray[1].isPlayer = !charArray[1].isPlayer;
      charArray[1].isOption = !charArray[1].isOption;
      
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[2].isEnemy = !charArray[2].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[2], charArray[3]];
      console.log("yoda");
      break;

    case 3:
      charArray[2].isPlayer = !charArray[2].isPlayer;
      charArray[2].isOption = !charArray[2].isOption;
      
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[3].isEnemy = !charArray[3].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[3]];
      console.log("luke");
      break;

    case 4:
      charArray[3].isPlayer = !charArray[3].isPlayer;
      charArray[3].isOption = !charArray[3].isOption;
      
      charArray[0].isEnemy = !charArray[0].isEnemy;      
      charArray[1].isEnemy = !charArray[1].isEnemy;
      charArray[2].isEnemy = !charArray[2].isEnemy;

      enemyArray = [charArray[0], charArray[1], charArray[2]];
      console.log("chewbacca");
      break;
  }
};
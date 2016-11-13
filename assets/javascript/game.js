console.log("star wars!!!")

//define player object:
var player = {isPlaying:false, wins:0, losses:0};

// define a character constructor:
function character(isPlayer, isOption, isEnemy, health, attackBase,attackPower, counterAttack){
  this.isPlayer = isPlayer;
  this.isOption = isOption;
  this.isEnemy = isEnemy;
  this.health = health;
  this.attackBase = attackBase;
  this.attackPower = attackPower;
  this.counterAttack = counterAttack;
};

// define all characters based on character constructor:
var darthVader = new character(false, true, false, 200, 30, 30, 45);
var yoda = new character(false, true, false, 100, 35, 35, 30);
var luke = new character(false, true, false, 150, 30, 30, 50);
var chewbacca = new character(false, true, false, 250, 25, 25, 30);

//click events for all characters

for (let i = 1; i <= 4; i++){
  $("#char" + i).click(function(){
    if (!player.isPlaying){
  // alert("you clicked " + i);
    playerChose(i);
    }
  });
}

// function after initial click
function playerChose(i){
  player.isPlaying = !player.Playing;
  switch(i){
    case 1:
      darthVader.isPlayer = !darthVader.isPlayer;
      darthVader.isOption = !darthVader.isOption;

      yoda.isPlayer = !yoda.isPlayer;
      yoda.isEnemy = !yoda.isEnemy;

      luke.isPlayer = !luke.isPlayer;
      luke.isEnemy = !luke.isEnemy;

      chewbacca.isPlayer = !chewbacca.isPlayer;
      chewbacca.isEnemy = !chewbacca.isEnemy;

      console.log("darthVader");
      break;

    case 2:
      darthVader.isPlayer = false;
      darthVader.isEnemy = true;
      darthVader.isOption = true;

      yoda.isPlayer = true;
      yoda.isEnemy = false;
      yoda.isOption = false;

      luke.isPlayer = false;
      luke.isEnemy = true;
      luke.isOption = true;

      chewbacca.isPlayer = false;
      chewbacca.isEnemy = true;
      chewbacca.isOption = true;
      console.log("yoda");
      break;

    case 3:
      darthVader.isPlayer = false;
      darthVader.isEnemy = true;
      darthVader.isOption = true;

      yoda.isPlayer = false;
      yoda.isEnemy = true;
      yoda.isOption = true;

      luke.isPlayer = true;
      luke.isEnemy = false;
      luke.isOption = false;

      chewbacca.isPlayer = false;
      chewbacca.isEnemy = true;
      chewbacca.isOption = true;
      console.log("luke");
      break;

    case 4:
      darthVader.isPlayer = false;
      darthVader.isEnemy = true;
      darthVader.isOption = true;

      yoda.isPlayer = false;
      yoda.isEnemy = true;
      yoda.isOption = true;

      luke.isPlayer = false;
      luke.isEnemy = true;
      luke.isOption = true;

      chewbacca.isPlayer = true;
      chewbacca.isEnemy = false;
      chewbacca.isOption = false;
    console.log("chewbacca");
    break;
  }
}


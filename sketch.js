var bunny, alien;
var alienWalkImg, alienDuckImg, alienHurtImg, alienJumpImg, alienStandImg;
var bunnyWalkImg, bunnyHurtImg, bunnyJumpImg, bunnyStandImg;
var blackBeeImg, yellowBeeImg, flyBotImg, spikeBotImg, wingBotImg, snailImg;
var coinImg, chocolateImg, medalImg, peppermintImg;
var desertImg, desert, beginnerImg, beginner;
var gameOverImg, nextImg, next1, next2, refreshimg;

var txt_instructionImg, txt_instruction;
var txt_tipImg, txt_tip;

var txt_characterChoose, txt_characterChooseImg, txt_notChosen;

var txt_nameImg, txt_name;

var gameState = "steps";
var player;

function preload() {
  alienWalkImg = loadAnimation("images/alien/alien-walk-1.png", "images/alien/alien-walk-2.png");
  alienDuckImg = loadImage("images/alien/alien-duck.png");
  alienHurtImg = loadImage("images/alien/alien-hurt.png");
  alienJumpImg = loadImage("images/alien/alien-jump.png");
  alienStandImg = loadImage("images/alien/alien-stand.png");

  bunnyWalkImg = loadAnimation("images/bunny/bunny-run-1.png", "images/bunny/bunny-run-2.png");
  bunnyHurtImg = loadImage("images/bunny/bunny-hurt.png");
  bunnyJumpImg = loadImage("images/bunny/bunny-jump.png");
  bunnyStandImg = loadImage("images/bunny/bunny-stand.png");

  blackBeeImg = loadAnimation("images/bees/black-grey-bee-1.png", "images/bees/black-grey-bee-2.png");
  yellowBeeImg = loadAnimation("images/bees/yellow-bee-1.png", "images/bees/yellow-bee-2.png");
  flyBotImg = loadAnimation("images/bots/fly-bot-1.png", "images/bots/fly-bot-2.png");
  spikeBotImg = loadAnimation("images/bots/spike-bot-1.png", "images/bots/spike-bot-2.png");
  wingBotImg = loadImage("images/bots/wing-bot.png");
  snailImg = loadImage("images/snail.png");

  coinImg = loadAnimation("images/coin/coin-1.png", "images/coin/coin-2.png", "images/coin/coin-3.png", "images/coin/coin-4.png", "images/coin/coin-5.png", "images/coin/coin-6.png");
  chocolateImg = loadImage("images/chocolate.png");
  medalImg = loadImage("images/medal.png");
  peppermintImg = loadImage("images/peppermint.png");

  desertImg = loadImage("images/desert_3.png");
  beginnerImg = loadImage("images/beginning_big.jpg");

  gameOverImg = loadImage("images/game-over.png");
  nextImg = loadImage("text/next.png");
  refreshimg = loadImage("images/refresh.png");

  txt_characterChooseImg = loadImage("text/character choose.png");
  txt_notChosen = loadImage("text/you didnt choose me.png");

  txt_nameImg = loadImage("text/title.png");

  txt_instructionImg = loadImage("text/instructions.png");
  txt_tipImg = loadImage("text/tips.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  desert = createSprite(width/2, 0, width, height);
  desert.addImage("desert", desertImg);
  desert.visible = false;

  beginner = createSprite(width/2, 0, width, height);
  beginner.addImage("starting image", beginnerImg);
  beginner.visible = false;
  beginner.scale = 1;

  next1 = createSprite(width/1.1, height/1.2);
  next1.addImage(nextImg);
  next1.scale = 0.3;

  txt_name = createSprite(width/2, height/2);
  txt_name.addImage("game title", txt_nameImg);
  txt_name.scale = 0.4;
  txt_name.visible = false;

  txt_instruction = createSprite(width/4, height/3);
  txt_instruction.addImage(txt_instructionImg);
  txt_instruction.scale = 0.3;
  txt_instruction.visible = false;

  txt_tip = createSprite(width/1.3, height/1.5);
  txt_tip.addImage(txt_tipImg);
  txt_tip.scale = 0.3;
  txt_tip.visible = false;

  next2 = createSprite(width/1.1, height/4);
  next2.addImage(nextImg);
  next2.scale = 0.3;
  next2.visible = false;
}

function draw() {
  background(255);

  drawSprites();

  if(gameState === "steps") {
    beginner.visible = true;
    beginner.x = beginner.width/2;

    txt_name.visible = true;
    
    if(mousePressedOver(next1)) {
      txt_name.destroy();
      gameState = "instructions";
    }


    console.log(gameState);
  } else if(gameState === "instructions") {
    next1.destroy();
    txt_name.visible = false;
    // next1.visible = false;

    txt_instruction.visible = true;

    txt_tip.visible = true;

    next2.visible = true;

    if(mousePressedOver(next2)) {
      gameState = "choose";
    }

  } else if(gameState === "choose") {
    txt_tip.destroy();
    beginner.destroy();
    txt_instruction.destroy();
    next2.destroy();

    desert.visible = true;
    desert.velocityX = -5;
    desert.x = desert.width/2;
    desert.scale = 1;

    bunny = createSprite(width/2-200, 500);
    bunny.addImage("bunnyStanding", bunnyStandImg);
    bunny.scale = 3;
  
    alien = createSprite(width/2+200, 500);
    alien.addImage("alienStanding", alienStandImg);
    alien.scale = 3;
  
    txt_characterChoose = createSprite(width/2, 200, 750, 100);
    txt_characterChoose.addImage("character choose text?", txt_characterChooseImg);
    txt_characterChoose.scale = 0.5;

    if (desert.x === 0) {
      desert.x = desert.width/2;
    }

    if(mousePressedOver(bunny)) {
      image(txt_notChosen, width/2+300, 300, 450, 300);
      bunny.visible = true;
      alien.visible = false;
      txt_characterChoose.visible = false;

      bunny.x = 75;
      bunny.y = height-150;
      bunny.scale = 1.5;

      player = "bunny";

      gameState = "start";

    }

    if(mousePressedOver(alien)) {
      image(txt_notChosen, width/2-750, 300, 450, 300);
      bunny.visible = false;
      alien.visible = true;
      txt_characterChoose.visible = false;

      alien.x = 75;
      alien.y = height-150;
      alien.scale = 1.5;

      player = "alien";

      gameState = "start";
    }
  } else if(gameState === "start") {
    if(player === "bunny") {
      bunny.velocityX = 5;

      spawnObstacles();
      spawnPrizes();

    } else if(player === "alien") {
      alien.velocityX = 5;

      spawnObstacles();
      spawnPrizes();
    }
    
  }

}

function spawnObstacles() {
  if (World.frameCount%60 === 0) {
    var obstacle = createSprite(400,0);
    obstacle.shapeColor = "red";
    obstacle.y = random(windowHeight,windowHeight);
    // obstacle.addImage(random(blackBeeImg, yellowBeeImg, flyBotImg, spikeBotImg, wingBotImg));
    // obstacle.scale = 0.5;
    obstacle.velocityX = -5;

    
     //assign lifetime to the variable
    obstacle.lifetime = 134;
  }
}

function spawnPrizes() {
  if (World.frameCount%80 === 0) {
    var prize = createSprite(400, 0);
    prize.shapeColor = "green";
    prize.y = random(windowHeight/1.5,windowHeight/4);
    // prize.setAnimation(random(blackBeeImg, yellowBeeImg, flyBotImg, spikeBotImg, wingBotImg));
    // prize.scale = 0.5;
    prize.velocityX = -5;
    
     //assign lifetime to the variable
    prize.lifetime = 134;
  }
}
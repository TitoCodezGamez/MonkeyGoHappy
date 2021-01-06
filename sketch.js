
//I added a different jumping mechanic that I thought would suit the game more. The longer you hold space the higher you jump but there is a limit to how high you can jump.


var monkey , monkey_running,monkey_not_running;
var banana ,bananaImage, obstacle, obstacleImage,BI,B;
var FoodGroup, obstacleGroup;
var score;
var ST;
var floor2;
var gameState,size;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_not_running = loadAnimation("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");

  BI = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,600);

  B = createSprite(300,300);
  B.addImage("biojnuijij",BI);
  B.scale = 2;

  monkey = createSprite(50,530);
  monkey.addAnimation("monkeyA",monkey_running);
  monkey.addAnimation("fgfdsf.png",monkey_not_running);
  monkey.scale = 0.15;
  
  ST = 1;
  
  gameState = "play";
  
  floor2 = createSprite(390,590,1000,20);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  score = 0;
  
  size = "play";

}


function draw() {
  background(255);
  
  if(gameState === "play"){

    B.velocityX = -8;
    if(B.x < 10){
      B.x = 600;
    }
  
    monkey.velocityY = monkey.velocityY + 0.4;
  monkey.collide(floor2);
    
  
  if(keyDown("space") && monkey.y > 370){
    monkey.velocityY = monkey.velocityY - 1;
  }                          

  spawnObstacles();  
  spawnBananas();

  if(monkey.isTouching(FoodGroup)){
    score = score + 1;
    FoodGroup.destroyEach();
  }   
    if(size === "play"){
      if(monkey.isTouching(obstacleGroup)){
        size = "end";
        monkey.scale = 0.12;
        obstacleGroup.destroyEach();
      }   
    }

    if(size === "end"){
      if(monkey.isTouching(obstacleGroup)){
        gameState = "end";
      }   
    }

    switch(score){
      case 10:monkey.scale=0.17;
      break
      case 20:monkey.scale=0.19;
      break
      case 30:monkey.scale=0.21;
      break
      case 40:monkey.scale=0.23;
      break
      case 50:monkey.scale=0.25;
      break
      case 60:monkey.scale=0.27;
      break
      default: break;
    }


  drawSprites();

  ST = Math.round(frameCount/frameRate());

  }

  else if(gameState === "end"){
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);   
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    B.velocityX = 0;

    monkey.velocityY = 0;
    
    monkey.changeAnimation("fgfdsf.png",monkey_not_running);
    
    ST = ST;

    drawSprites();
  
  }
  textSize(30);
  fill(0);
  text("survival Time: "+ST,10,30);
  text("Score: "+score,475,30);
}

function spawnObstacles(){
  if(frameCount%80===0){
    obstacle = createSprite(600,550);
    obstacle.addImage("obstasdfs",obstaceImage);
    obstacle.scale = 0.20;
    obstacle.velocityX = -(frameCount/80+8);   
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas(){
  if(frameCount%92===0){
    banana = createSprite(600,random(100,300));
    banana.addImage("obstasdf",bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -(frameCount/92+8);   
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}






var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, monkeyGroup;
var ground;
var bg,bgImage;
var gameover, gameoverImage;
var score=0;
var life=1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided=loadAnimation("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage=loadImage("background.png");
  gameoverImage=loadImage("gameover.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey=createSprite(50,300,30,30);
  monkey.addAnimation("monkeymoving",monkey_running);
  monkey.addAnimation("monkeycollided",monkey_collided);
  monkey.scale=0.1;
  
  bg=createSprite(200,200,400,400);
  bg.addImage("backgroundImage",bgImage);
  bg.scale=1.2;
  bg.velocityX=-4;
  bg.x = bg.width /2;
  
  bg.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
  ground=createSprite(200,330,400,10);
  ground.visible=false;
  
  gameover=createSprite(200,100,50,20);
  gameover.addImage("gameoverImage",gameoverImage);
  gameover.visible=false;
  gameover.scale=0.1;

  FoodGroup=new Group();
  obstacleGroup=new Group();
  monkeyGroup=new Group();
}


function draw() {
  background("white");
  
  if (bg.x < 30&&life!=0){
      bg.x = bg.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 240 && life===1) {
      monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  monkeyGroup.add(monkey);
  
  if(monkeyGroup.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    life=life-1;
  }
  if(life<=0){
    obstacleGroup.setVelocityXEach(0);
    monkeyGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.changeAnimation("monkeycollided",monkey_collided);
    gameover.visible=true;
    bg.velocityX=0;
  }
  
  if(monkeyGroup.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
  
  createFood();
  createObstacle();
  drawSprites();
  textSize(20);
  fill("white");
  text("Score : "+score,30,30);
}

function createFood(){
  if(frameCount%100===0&&life===1){
    makingFood();
  }
}

function makingFood(){
  banana=createSprite(400,random(140,190),20,20);
  banana.addImage("bananaImage",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  FoodGroup.add(banana);
}

function createObstacle(){
  if(frameCount%150===0&&life===1){
    makingObstacle();
  }
}

function makingObstacle(){
  obstacle=createSprite(400,307,50,50);
  obstacle.addImage("obstacleImage",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-4;
  obstacle.setCollider("circle",0,0,200);
  obstacleGroup.add(obstacle);
}







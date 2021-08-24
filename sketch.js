var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  groundImg=loadImage("gound.png");
  obstacleImg=loadImage("obstacle.png");
playerAnimation=loadAnimation("trex1.png","trex3.png","trex4.png","trex1.png");
player_Collided=loadImage("trex_collided.png");
enemyImg=loadImage("obstacle1.png");
pointImg=loadImage("point.png")


}


function setup() {
  createCanvas(700,300);
score=0;


  ground=createSprite(350, 200, 500, 50);
  ground.addImage(groundImg);
  ground.x=ground.width/2;

  invisibleGround=createSprite(350, 260, 5000, 10);
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible=false;

player=createSprite(50,250,20,20);
player.addAnimation("running",playerAnimation);
player.scale=0.4;

wall=createSprite(350, 2, 900, 5);
wall.visible=false;
wall1=createSprite(2, 2, 5, 900);
wall1.visible=false;
wall2=createSprite(698, 2, 5, 900);
wall2.visible=false;


obstaclesGroup = createGroup();
enemyGroup=createGroup();
}

function draw() {
  background("lightBlue");  


  fill("red")
  text("Score: "+ score, 500,50);

  text("Use Up,Left,Right Arrow To Move The Player",200,40)

  player.velocityX=0;
  player.velocityY=0;


  if (gameState===PLAY){
  ground.velocityX=-2

  if (ground.x < 350){
    ground.x = ground.width/2;
  }

  if (invisibleGround.x < 350){
    invisibleGround.x = invisibleGround.width/2;
  }


  score = score + Math.round(frameCount/350);
    
  
  
  if(keyDown(UP_ARROW)){
    player.velocityY=-12
  }
  if(keyDown(LEFT_ARROW)){
    player.velocityX=-12
  }
  if(keyDown(RIGHT_ARROW)){
    player.velocityX=+12
  }

  player.velocityY = player.velocityY+4.5;

  player.collide( invisibleGround)
  player.collide(obstaclesGroup)
  player.collide(wall)
  player.collide(wall1)
  player.collide(wall2)


  spawnObstacles();
spawnEnemy();


  if(player.isTouching(enemyGroup)){
   
    gameState=END;
  }
}
else if(gameState===END){
  player.changeAnimation("collided",player_Collided);

  ground.velocityX=0;
  player.velocityX=0;
  player.velocityY=0;

  obstaclesGroup.setLifetimeEach(-1);
  enemyGroup.setLifetimeEach(-1);

  obstaclesGroup.setVelocityXEach(0);
  enemyGroup.setVelocityXEach(0);


  fill("red")
  textSize(25)
  text("Press 'R' Key To Restart",250,80);
}

if(keyDown("R")){
  reset();
}


  drawSprites();
}

function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(700,200,80,20);
    obstacle.y=Math.round(random(80,200));
    obstacle.addImage(obstacleImg)
    obstacle.velocityX=-(4 + 3* score/100);
 
    obstacle.scale=0.5

    obstaclesGroup.add(obstacle);
  }
}

function spawnEnemy(){
  if(frameCount%100===0){
    var enemy=createSprite(700,250,20,20);
    enemy.addImage(enemyImg);
    enemy.scale=0.3
    enemy.y=Math.round(random(80,250));
    enemy.velocityX=-3;

    enemyGroup.add(enemy);
  }
}

function reset(){
  gameState=PLAY


  obstaclesGroup.destroyEach();
  enemyGroup.destroyEach();
  score=0; 
  player.x=50;
  player.y=250;
  player.changeAnimation("running", playerAnimation);
}
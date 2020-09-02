//Global Variables
var player,player_image;
var invisibleGround;
var banana_image,bananaGroup;
var obstacle_image,obstacleGroup;
var back,back_image;
var score = 0;

function preload(){
  back_image = loadImage("jungle.jpg");
  
  player_image =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
  banana_image = loadImage("Banana.png");
  
  obstacle_image = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_image);
  player.scale = 0.1;
  
  invisibleGround = createSprite(200,250,400,10);
  invisibleGround.visible = false;
  
  back = createSprite(300,10,10,30);
  back.addImage(back_image);
  back.x = back.width/2
  back.velocityX = -2;
}


function draw(){
 background(255); 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  
  if(invisibleGround.x<0) {
    invisibleGround.x = invisibleGround.width/2;
  }
  
  if(back.x<100){
    back.x = back.width/2;
  }
  
  if(bananaGroup.isTouching(player)) {
    score = score+2;
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(player)){
    player.scale=0.2;
  }
  
  player.collide(invisibleGround);
  
  spawnFood();
  
  spawnObstacles();
  
  drawSprites();
}
function spawnFood() {
  if(World.frameCount % 80 === 0) {
    var banana = createSprite(200,270,10,15);
    banana.y = random(120,270);
    banana.addImage(banana_image);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }
}
function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(230,320,30,10);
    obstacle.addImage(obstacle_image);
    obstacle.scale = 0.15;
    obstacle.velocityX = -2;
    switch(score){
      case 10: player.scale = 0.12;
              break;
      case 20: player.scale = 0.14;
              break;
      case 30: player.scale = 0.16;
              break;
      case 40: player.scale = 0.18;
              break;
      default: break;
    }
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}
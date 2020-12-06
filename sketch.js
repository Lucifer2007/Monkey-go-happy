var bg,bgimg;
var monkeyimg , monkey_collided;
var invisibleGround;
var y, bananaimg;
var s,stoneimg;
var SCORE;
var gamestate = "play";






function preload(){
  
  monkeyimg = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png")
  
  monkey_collided = loadAnimation("Monkey_01.png");
  
  bgimg = loadImage("jungle.jpg");
  
  bananaimg = loadImage("banana.png");
  
  stoneimg = loadImage("stone.png");
  
  
  
}






function setup() {
  createCanvas(600, 400);
  
  bananaGroup = createGroup();
  stoneGroup = createGroup();
  
  bg = createSprite(0,0,600,400);
  bg.addImage(bgimg);
  bg.scale = 1.2;
  bg.velocityX = -5;
  bg.x = bg.width/2;
  
  invisibleGround = createSprite(300,355,600,5);
 invisibleGround.visible = false;
  
  monkey = createSprite(30,320);
  monkey.addAnimation("run", monkeyimg);
  monkey.addAnimation("monkey_collided" , monkey_collided);
  monkey.scale = 0.1;
   
  SCORE = 0;
}

function draw() {
  background(220);
  createEdgeSprites();
  monkey.collide(invisibleGround);
  
  if(gamestate === "play"){
    
     if(bg.x < 0 ){
    
    bg.x = bg.width/2;
  }
      if(keyDown("space") && monkey.y >= 320) {
    monkey.velocityY = -20;
    
  }
  
  
  if(bananaGroup.isTouching(monkey)){
    
    SCORE = SCORE+1;
    bananaGroup.destroyEach();
  }
  
 monkey.velocityY = monkey.velocityY+0.8;
     
  banana();
  stone();
     if(stoneGroup.isTouching(monkey)){
       
       gamestate = "end";
       
     }
    
   
    
  }
  
 
     
     if(gamestate === "end"){
       
       monkey.changeAnimation( "monkey_collided" , monkey_collided);
       bg.velocityX = 0;
       bananaGroup.setVelocityXEach(0);
       stoneGroup.setVelocityXEach(0);
       monkey.velocityY = 0;
       
       
     }
     
   
    

  
  
  
  drawSprites();
  fill ("red");
  textSize(24);
  textFont("Georgia");
  text("SCORE : " + SCORE , 430,50);
}

function banana (){
  
  if( frameCount % 60 === 0){
     
    
    y =createSprite(600,0);
  y.y= Math.round(random(100,250)); 
     y.addImage(bananaimg);
    y.scale = 0.1;
    y.velocityX= -10;
    bananaGroup.add(y);
     }
}

function stone(){
  if(frameCount % 60 === 0){
    
    s = createSprite(0,320);

    s.addImage(stoneimg);
    s.x= Math.round(random(595,600));
    s.scale = 0.2;
    s.velocityX = -6;
  
    stoneGroup.add(s);
    
    
                    
    
    
    
    
    
    
  }
  
  
  
  
}
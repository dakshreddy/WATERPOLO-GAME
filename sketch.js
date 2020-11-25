var blueplayer1, blueplayer2, blueplayer3;

var blueplayerimg,redplayerimg;

var waterimg

var p1,p2,p3
var op1,op2,op3 

var edges,ball,ballimg

var gole1,gole2

var b1,b2,b3,b4

var br1,br2

var blueScore = 0;
var redScore = 0;

var gameState = "serve";

function preload() {
  ballimg = loadImage("ball.png")
  blueplayerimg = loadImage("blueplayer.png");
  redplayerimg = loadImage("redplayer.png");
  waterimg = loadImage("water.jpg");
}

function setup() {
  createCanvas(1200,500);

  stroke("black")
  strokeWeight(3)


  ball = createSprite(600, 250, 50, 50);
  ball.addImage("ball", ballimg);
  ball.scale = 0.1;

  p1 = createSprite(300, 100, 20, 20);
  p1.shapeColor = ("red")
  p1.addImage("p1",blueplayerimg)
  p1.scale = 0.2
  p2 = createSprite(300, 250, 20, 20);
  p2.shapeColor = ("red")
  p2.scale = 0.2
  p2.addImage("p2",blueplayerimg)
  p3 = createSprite(300, 400, 20, 20);
  p3.shapeColor = ("red")
  p3.scale = 0.2
  p3.addImage("p3",blueplayerimg)

  op1 = createSprite(900, 100, 20, 40);
  op1.shapeColor = ("blue")
  op1.addImage("op1",redplayerimg)
  op1.scale = 0.2
  op2 = createSprite(900, 250, 20, 20);
  op2.addImage("op2",redplayerimg)
  op2.shapeColor = ("blue")
  op2.scale = 0.2
  op3 = createSprite(900, 400, 20, 20);
  op3.addImage("p2",redplayerimg)
  op3.shapeColor = ("blue")
  op3.scale = 0.2
  gole1 = createSprite(50, 250, 20, 150);

  gole1.shapeColor = ("red")

  gole2 = createSprite(1150, 250, 20, 150);
  gole2.shapeColor = ("blue")

  b1 = createSprite(100, 175, 20, 5);
  b1.visible = false

  b2 = createSprite(100, 325, 20, 5);
  b2.visible = false

  b3 = createSprite(1100, 175, 20, 5);
  b3.visible = false

  b4 = createSprite(1100, 325, 20, 5);
  b4.visible = false

  br1 = createSprite(350,250,5,500)
  br1.visible = false
  br2 = createSprite(850,250,5,500)
  br2.visible = false


  edges = createEdgeSprites()

  textSize(25)


}
  function draw() {
  background(waterimg);  


  if(gameState === "serve"){
    textSize(20);
    fill("black");
    text("Press SPACE to start", 500, 200);
  }
  
  //for loop for mid line
  for(var i = 0; i<500; i = i+ 20){
    line(600, i, 600, i+10);
  }

  //controlloing op1 with up, down, left and right arrows

  if(keyDown("up")){
    op1.y -= 5;
  }

  if(keyDown("down")){
    op1.y += 5;
  }

  if(keyDown("left")){
    op1.x -= 5;
  }

  if(keyDown("right")){
    op1.x += 5;
  }
  

  if(ball.isTouching(op1)){
    ball.bounceOff(op1);
    console.log("ball touched the op1");
  }

  //start button with kickoff
  if(keyDown("space") && gameState === "serve"){
   kickoff();
   gameState = "play";
  }

  //ball bounces off edges
  ball.bounceOff(edges)

  //goalpost
  p2.bounceOff(b1)
  p2.bounceOff(b2)

  op2.bounceOff(b3)
  op2.bounceOff(b4)

  //ball bouncing from all players
  if(ball.isTouching(p2)){
    ball.bounceOff(p2);
  }
  if(op2.isTouching(ball)){
    op2.bounce(ball)  
  }
  if(p1.isTouching(ball)){

    p1.bounceOff(ball)
  }
  if(p3.isTouching(ball)){

    p3.bounceOff(ball)
  }
  
  if(op1.isTouching(ball)){

    op1.bounceOff(ball)
  }
  if(op3.isTouching(ball)){

    op3.bounceOff(ball)
  }
 

  //all players bouncing off edges
  p1.bounceOff(edges)
  p3.bounceOff(edges)
  op1.bounceOff(edges)
  op3.bounceOff(edges)

  //boundary limits for players on oppo ends
  p1.bounceOff(br2)  
  p3.bounceOff(br2)
  op1.bounceOff(br1)  
  op3.bounceOff(br1)




  if(ball.isTouching(gole1)){

    reset();
    gameState = "serve";
    blueScore ++;

  }

    

  if(ball.isTouching(gole2)){

    reset();
    gameState = "serve";
    redScore ++;
  }


  //score logic
  fill("blue")
  text(blueScore,620,40)
  fill("red")
  text(redScore,570,40)

  //game over state
  if(blueScore === 3 || redScore === 3){

    gameState ="over";
    text("GAME OVER", 525, 175);
    text("Press 'R' to restart", 500, 200)
    if(blueScore === 3){
      fill("blue");
      text("BLUE Team WON!" , 800, 40);
    }
    if(redScore === 3){
      fill("red");
      text("RED Team WON!" , 200, 40);
    }
  }

  //add the restart functionality
  if(keyDown('r') && gameState === "over"){

    gameState = "serve";
    blueScore = 0;
    redScore = 0;
  }

  drawSprites();


}

function kickoff(){

  ball.velocityX = 6;
  ball.velocityY = 5;

  //place the second players in front of the goalposts and moved them to and fro
  p2.x  = 100;
  op2.x = 1100;
  p2.velocityY = 5
  op2.velocityY = 5

  //p1 and p3 start moving with random velocities
  p1.setVelocity(Math.round(random(4, 6)), Math.round(random(4, 6)));
  p3.setVelocity(Math.round(random(4, 6)), Math.round(random(4, 6)));

  op3.setVelocity(Math.round(random(4, 6)), Math.round(random(4, 6)));
  
}

function reset(){
  ball.x = 600;
  ball.y = 250;
  ball.velocityX = 0;
  ball.velocityY = 0;

  p1.x = 300
  p1.y = 100
  p1.setVelocity(0,0);


  p2.x = 300
  p2.y = 250
  p2.setVelocity(0,0);

  p3.x = 300
  p3.y = 400
  p3.setVelocity(0,0);

  op1.x = 900
  op1.y = 100
  op1.setVelocity(0,0);

  op2.x = 900
  op2.y = 250
  op2.setVelocity(0,0);

  op3.x = 900
  op3.y = 400
  op3.setVelocity(0,0);

}


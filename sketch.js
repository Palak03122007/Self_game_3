var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distancey = 0;
var distancex = 0;
var database;

var form, player, game;
var cars, car1, car2;
var track, car1_img, car2_img;
var laserImg,laser1,laser2;
var bunk1,bunk2,bunk1Img,bunk2Img;

function preload(){
  track = loadImage("images/war.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  ground = loadImage("images/ground.png");
  laserImg = loadImage("images/laser.png");
  bunk1Img = loadImage("images/bunker.png");
  bunk2Img = loadImage("images/bunker2.png");
}

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight/1.2);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
    //game.displayRank();
  }
}

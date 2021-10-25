class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(displayWidth/2,displayHeight/2);
    car1.addImage("car1",car1_img);
    car1.scale = 0.2;
    car2 = createSprite(displayWidth/2,displayHeight/2);
    car2.addImage("car2",car2_img);
    car2.scale = 0.2;
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getfinished();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, -displayWidth/2,-displayHeight,displayWidth*2, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight/2 - allPlayers[plr].distancey;
        x = allPlayers[plr].distancex + displayWidth/20;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y;

          //A
          if(keyIsDown(65)){
            laser1 = createSprite(1,1,10,10);
            laser1.shapeColor = "red";
            laser1.x = cars[index-1].x;
            laser1.y = cars[index-1].y;
            laser1.velocityX = -30;
          }
          //D
          if(keyIsDown(68)){
            laser2 = createSprite(1,1,10,10);
            laser2.shapeColor = "red";
            laser2.x = cars[index-1].x;
            laser2.y = cars[index-1].y;
            laser2.velocityX = 30;
          }
        }
        
        
        bunk1 = createSprite(displayWidth/5,displayHeight/2,1,1);
        bunk1.addImage(bunk1Img);
        bunk1.scale=0.5;
        bunk2 = createSprite(displayWidth*4/5,displayHeight/2,1,1);
        bunk2.addImage(bunk2Img);
        bunk2.scale=1.5;
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distancey +=10;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distancey -=10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distancex +=10;
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distancex -=10;
      player.update();
    }

    

    if(player.distancex > 3860){
      gameState = 2;
      player.rank+=1;
      Player.updatefinished(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }

  //displayRank(){
    //car.hide();
    //track.hide();

    //text("Your Rank: "+player.rank,displayWidth/2 - 40 , displayHeight/2 - 80);
  //}
}
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

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    imageArray = [c1,c2,c3,c4]
    cars = [car1, car2, car3, car4];
    for(let i=0;i<cars.length;i++){
      cars[i].addImage(imageArray[i])
    }
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      image(track,0,-displayHeight*4,displayWidth,displayHeight*4)
      var index = 0;

      var x = 100;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>4000){
      gameState=2
    }
    drawSprites();
  }
  end=function(){
    console.log('game ended')
  }
}

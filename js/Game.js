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
    let xindex=0
    let yindex=0
    for(let i in allPlayers){
      xindex+=1
      cars[xindex-1].x=allPlayers[i].x
    }
    for(let y in allPlayers){
      yindex+=1
      cars[yindex-1].y=allPlayers[y].y
    }
  }

  play(){
    imageMode(CENTER)
    image(track,displayWidth/2,displayHeight/2,displayWidth-40,displayHeight*4)
    form.hide();

    Player.getPlayerInfo();
    let y
    if(allPlayers !== undefined){
      let index=0
      for(let i in allPlayers){
        index+=1
        y = displayHeight-allPlayers[i].distance
        cars[index-1].y=y
        if(index===player.index){
          fill('red')
          ellipse(cars[index-1].x,y,60)
          camera.position.x=cars[index-1].x
          camera.position.y=cars[index-1].y
        }
      }
      if(keyIsDown(UP_ARROW) && player.name!== null){
        player.distance+=12
        player.update()
        console.log(player.index)
      }
      for(let randomvar=0;randomvar<cars.length;randomvar++){
        ranks.push(cars[randomvar])
      }
      for(var t = 0;t<ranks.length;t++){
        for(var i =0;i<t;i++){
          if(ranks[i].y<ranks[i+1].y){
            var temp=ranks[i+1].y
            ranks[i].y=ranks[i+1].y
            temp=ranks[i].y
          }
        }
      }
      for(let index=0;index<ranks.length;index++){
        var initialHeight = 100
        text(index,displayWidth-90,initialHeight)
        initialHeight += 100
        console.log(ranks[0])
      }
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
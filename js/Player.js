class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
   getCarsAtEnd = function(){
    let b=database.ref('carsatend')
    b.on('value',(data)=>{
      this.rank = data.val()
    })
    
  }
  static updateCarsAtEnd(a){
    database.ref('/').update({
      carsatend:a
    })
  }

  update(){
    let x=300
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      x:x,
      y:displayHeight
    });
    x+=200
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  static updatePos=function(){
    let index=0
    for(let i in allPlayers){
      index+=1
    database.ref('players/'+i).update({
      x:cars[index-1].x,
      y:cars[index-1].y
    })
  }
}
}

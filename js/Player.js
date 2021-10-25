class Player {
  constructor(){
    this.index = null;
    this.distancey = 0;
    this.distancex = 0;
    this.name = null;
    this.rank = null;
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

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distancey:this.distancey,
      distancex:this.distancex
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getfinished(){
    database.ref('finished').on("value",(data)=>{
     this.rank=data.val();
    })
  }

  static updatefinished(rank){
    database.ref('/').update({
      finished:rank
    })
  }
}
$("document").ready( function(){
  //namespace PU = Powerup
  PU = {};

  PU.Powerup = function(x, y, img){
    this.size= 35;
    this.x = x;
    this.y = y;
    this.img = img;
  };


  PU.Powerup.prototype.draw = function (context) {
    //bounding box
    // context.fillShll();

    context.drawImage(this.img, this.x-this.img.width/2, this.y-this.img.height/2);
  };


  //SPEED
  PU.SpeedPowerup = function SpeedPowerup(x,y){
    var img = $("#SpeedPowerup")[0];

    //superclass constructor
    PU.Powerup.call(this,x,y, img);
  };

  //inherit proto
  PU.SpeedPowerup.prototype = Object.create(PU.Powerup.prototype);

  PU.SpeedPowerup.prototype.apply = function apply(){
    SW.movespeed +=5;
    console.log("movespeed buff");
    setTimeout(function debuff () {
      SW.movespeed -=5;
      console.log("debuff");
    }, 5000);
  };


  //HEALTH
  PU.HealthPowerup = function HealthPowerup(x,y){
    var img = $("#HealthPowerup")[0];

    //superclass constructor
    PU.Powerup.call(this,x,y, img);
  };
  PU.HealthPowerup.prototype = Object.create(PU.Powerup.prototype);

  PU.HealthPowerup.prototype.apply = function apply(){
    SW.player.hp +=2;
    if (SW.player.hp >10){
      SW.player.hp = 10;
    }
  };



})();

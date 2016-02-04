$("document").ready( function(){
  //namespace PU = Powerup
  PU = {};

  PU.Powerup = function(x, y, img){
    this.size= 50;
    this.x = x;
    this.y = y;
    this.img = img;
  };


  PU.Powerup.prototype.draw = function (context) {
    //bounding box
    context.fillStyle = "green";
    SW.context.beginPath();
    SW.context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    SW.context.fill();

    context.drawImage(this.img, this.x, this.y);
  };


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

})();

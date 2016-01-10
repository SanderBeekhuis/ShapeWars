$("document").ready(function() {
  var player = {"x": 100, "y":100};
  var mouse = {"x": 100, "y":100};
  var keys = {"w": false, "a": false, "s": false, "d": false};
  var firing = false;
  var reload = 0;
  var bullets = [];
  var bulletspeed = 20;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var movespeed = 5;

  var step = function(){
    var bullet, i;
    //update
    if (keys.w){
      player.y -= movespeed;
    }
    if(keys.s){
      player.y += movespeed;
    }
    if (keys.a) {
      player.x -= movespeed;
    }
    if (keys.d){
      player.x += movespeed;
    }

    //TODO player inside bounding box?
    //firing
    reload -= 1;
    if (firing && reload<=0) {
      reload = 5;
      fire();
    }

    //update bullet
    for(i=0; i<bullets.length; i++) {
      bullet = bullets[i];
      bullet.x += bullet.dx*bulletspeed;
      bullet.y += bullet.dy*bulletspeed;
    }

    //draw
    //background
    context.clearRect(0,0,1600,1000);

    //player
    context.beginPath();
    context.arc(player.x , player.y ,50, 0, 2*Math.PI );
    context.fill();

    //bullets
    for(i=0; i<bullets.length; i++) {
      bullet = bullets[i];
      context.beginPath();
      context.arc(bullet.x , bullet.y , 10, 0, 2*Math.PI );
      context.fill();
    }
  };

  var fire = function(){
    var dx = mouse.x-player.x;
    var dy = mouse.y-player.y;
    var radius = Math.sqrt(dx*dx+dy*dy);
    var bullet = {"x": player.x, "y": player.y, "dx": dx/radius, "dy": dy/radius};
    bullets.push(bullet);
  };

  setInterval(step, 1000/60); //60 fps

  document.onmousemove = function(evt){
    mouse.x = evt.pageX;
    mouse.y = evt.pageY;
  };

  $(document).on("keydown", function(evt){
    switch (evt.keyCode){
      case 87:
        keys.w=true;
        return;
      case 65:
        keys.a=true;
        return;
      case 83:
        keys.s=true;
        return;
      case 68:
        keys.d=true;
      }
    });

  $(document).on("keyup", function(evt){
    switch (evt.keyCode){
      case 87:
        keys.w=false;
        return;
      case 65:
        keys.a=false;
        return;
      case 83:
        keys.s=false;
        return;
      case 68:
        keys.d=false;
      }
    });

  $(document).on("mousedown", function(evt){
    firing = true;
    });
  $(document).on("mouseup", function(evt){
    firing = false;
    });


});

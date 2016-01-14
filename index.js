$("document").ready(function() {
  SW = {}; //Namespace

  SW.player = {"x": 100, "y":100, "reload":0};
  SW.mouse = {"x": 100, "y":100, "down":false};
  SW.keys = {"w": false, "a": false, "s": false, "d": false};
  SW.reload = 0;

  SW.bullets = [];
  SW.bulletspeed = 20;

  SW.canvas = document.getElementById("canvas");
  SW.context = canvas.getContext("2d");
  SW.movespeed= 5;

  SW.step = function(){
    var bullet, i;
    //update
    if (SW.keys.w){
      SW.player.y -= SW.movespeed;
    }
    if(SW.keys.s){
      SW.player.y += SW.movespeed;
    }
    if (SW.keys.a) {
      SW.player.x -= SW.movespeed;
    }
    if (SW.keys.d){
      SW.player.x += SW.movespeed;
    }

    //TODO keep player inside bounding box? or scrolling map

    //firing
    SW.player.reload -= 1;
    if (SW.mouse.down && SW.player.reload<=0) {
      SW.player.reload = 5;
      SW.fire();
    }

    //update bullet
    for(i=0; i<SW.bullets.length; i++) {
      bullet = SW.bullets[i];
      bullet.x += bullet.dx*SW.bulletspeed;
      bullet.y += bullet.dy*SW.bulletspeed;
    }

    //draw
    //background
    var img=document.getElementById("background");
    SW.context.drawImage(img,0,0);

    //player
    SW.context.beginPath();
    SW.context.arc(SW.player.x , SW.player.y ,50, 0, 2*Math.PI );
    SW.context.fill();



    //bullets
    for(i=0; i<SW.bullets.length; i++) {
      bullet = SW.bullets[i];
      SW.context.beginPath();
      SW.context.arc(bullet.x , bullet.y , 10, 0, 2*Math.PI );
      SW.context.fill();
    }
  };

  SW.fire = function(){
    var dx = SW.mouse.x-SW.player.x;
    var dy = SW.mouse.y-SW.player.y;
    var radius = Math.sqrt(dx*dx+dy*dy);
    var bullet = {"x": SW.player.x, "y": SW.player.y, "dx": dx/radius, "dy": dy/radius};
    SW.bullets.push(bullet);
  };

  setInterval(SW.step, 1000/60); //60 fps

  $(document).on("mousemove", function(evt){
    SW.mouse.x = evt.pageX;
    SW.mouse.y = evt.pageY;
  });

  $(document).on("keydown", function(evt){
    switch (evt.keyCode){
      case 87:
        SW.keys.w=true;
        return;
      case 65:
        SW.keys.a=true;
        return;
      case 83:
        SW.keys.s=true;
        return;
      case 68:
        SW.keys.d=true;
      }
    });

  $(document).on("keyup", function(evt){
    switch (evt.keyCode){
      case 87:
        SW.keys.w=false;
        return;
      case 65:
        SW.keys.a=false;
        return;
      case 83:
        SW.keys.s=false;
        return;
      case 68:
        SW.keys.d=false;
      }
    });

  $(document).on("mousedown", function(evt){
    SW.mouse.down = true;
    });
  $(document).on("mouseup", function(evt){
    SW.mouse.down = false;
  });
});

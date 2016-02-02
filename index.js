$("document").ready(function() {
  //Namespace
  if (SW === undefined){
    SW={};
  }

  SW.player = {"x": 100, "y":100, "reload":0};
  SW.mouse = {"x": 100, "y":100, "down":false};
  SW.keys = {"w": false, "a": false, "s": false, "d": false};
  SW.reload = 0;

  SW.bullets = [];
  SW.bulletspeed = 20;

  SW.score = 0;

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
    SW.context.clearRect(0,0,1600,1000);

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
<<<<<<< HEAD
=======

    //player
    SW.context.fillStyle = "#34495e";
    SW.context.beginPath();
    SW.context.arc(SW.player.x, SW.player.y, SW.player.size, 0, 2*Math.PI);
    SW.context.fill();

    //health container
    SW.context.beginPath();
    SW.context.fillStyle = "black";
    SW.context.rect(20,20, SW.player.maxhp * 20,20);
    SW.context.fill();

    //health
    SW.context.beginPath();
    SW.context.fillStyle = "#c0392b";
    SW.context.rect(20,20, SW.player.hp * 20,20);
    SW.context.fill();

    SW.context.fillStyle = "white";
    SW.context.font="14px arial";
    SW.context.fillText(SW.player.hp + "/" + SW.player.maxhp,50,35);


    //score
    SW.context.font="20px arial";
    SW.context.fillText(SW.score,300,35);





  }

  SW.collisionDetect = function(){
    var i,j;
    var removeEnemies = [];
    var removeBullets = [];
    for(i=0; i<SW.enemies.length; i++){
      // check player
      if(SW.collides(SW.enemies[i],SW.player)){
        removeEnemies.push(i);
        SW.player.hp -= 1;
        if (SW.player.hp<=0) {
          SW.player.size = 0;
        }
      }
      // check bullets
      for(j=0; j<SW.bullets.length; j++){
        if(removeBullets.indexOf(j)==-1){
          if(SW.collides(SW.enemies[i],SW.bullets[j])){
            SW.enemies[i].hp -= 1;
            removeBullets.push(j); // bullet is removed
            if(SW.enemies[i].hp<=0){ // enemy is dead
              SW.score ++;
              removeEnemies.push(i); // enemy is removed
              break; // don't need to check for other bullets
            }
          }
        }
      }
    }
    removeEnemies.sort(function(a, b){return b-a});
    removeBullets.sort(function(a, b){return b-a});
    for(i=0; i<removeEnemies.length; i++){
      SW.enemies.splice(removeEnemies[i],1);
    }
    for(i=0; i<removeBullets.length; i++){
      SW.bullets.splice(removeBullets[i],1);
    }
  }

  SW.collides = function(object1, object2){
    var dx = object1.x-object2.x;
    var dy = object1.y-object2.y;
    var radius = Math.sqrt(dx*dx+dy*dy);
    if(radius<object1.size+object2.size) {
      console.log("bots");
      return true;
    } else {
      return false;
    }
  }

  SW.moveEnemy = function(enemy){
    var dx = SW.player.x-enemy.x;
    var dy = SW.player.y-enemy.y;
    var radius = Math.sqrt(dx*dx+dy*dy);
    enemy.x += dx/radius*SW.enemySpeed;
    enemy.y += dy/radius*SW.enemySpeed;
  }

  SW.spawnEnemy = function(){
    var x = Math.random();
    var y = Math.random();
    if(x>0.75){ // right of the screen
      x = SW.canvas.width+20;
      y = y*SW.canvas.height;
    } else if(x>0.5) { // left of the screen
      x = -20;
      y = y*SW.canvas.height;
    } else if(x>0.25) { // top of the screen
      x = y*SW.canvas.width;
      y = -20;
    } else { // bottom of the screen
      x = y*SW.canvas.width;
      y = SW.canvas.height+20;
    }
    var enemy = {"x": x, "y": y, "hp": 5, "size": (Math.random()+1)*20};
    SW.enemies.push(enemy);
>>>>>>> origin/master
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

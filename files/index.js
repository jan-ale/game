var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var xpos = 0;
var ypos = 0;
var spawnx = 0;
var spawny = 0;
var size = 5;
var editmode = true;
var maze = [];
var boxes = [];
var archiveboxes = [];
var lava = [];
var archivelava = [];
window.addEventListener("keydown", async function(e) {
  e = e || window.event;
  var tempx = xpos;
  var tempy = ypos;
  switch(e.key) {
    case "w":
      ypos -= size;
      break;
    case "d":
      xpos += size;
      break;
    case "s":
      ypos += size;
      break;
    case "a":
      xpos -= size;
      break;
    case "b":
      if(editmode) {
        for(i in boxes) {
          if(boxes[i].toString() == [xpos/size,ypos/size].toString()){
            boxes = boxes.slice(0,i).concat(boxes.slice(parseInt(i)+1));
          }
        }
        boxes.push([xpos/size,ypos/size]);
      };
      break;
    case "x":
      if(editmode) {
        for(i in boxes) {
          if(boxes[i].toString() == [xpos/size,ypos/size].toString()){
            boxes = boxes.slice(0,i).concat(boxes.slice(parseInt(i)+1));
          }
        }
      };
      break;
    case "l":
      if(editmode) {
        for(i in lava) {
          if(lava[i].toString() == [xpos/size,ypos/size].toString()){
            lava = lava.slice(0,i).concat(lava.slice(parseInt(i)+1));
          }
        }
        lava.push([xpos/size,ypos/size]);
      };
      break;
    case "j":
      if(editmode) {
        for(i in lava) {
          if(lava[i].toString() == [xpos/size,ypos/size].toString()){
            lava = lava.slice(0,i).concat(lava.slice(parseInt(i)+1));
          }
        }
      };
      break;
    case "e":
      if(editmode) {
        for(i in maze) {
          if(maze[i].toString() == [xpos/size,ypos/size].toString()){
            maze = maze.slice(0,i).concat(maze.slice(parseInt(i)+1));
          }
        }
        maze.push([xpos/size,ypos/size]);
      } else {
        
      };
      break;
    case "q":
      if(editmode) {
        for(i in maze) {
          if(maze[i].toString() == [xpos/size,ypos/size].toString()){
            maze = maze.slice(0,i).concat(maze.slice(parseInt(i)+1));
          }
        }
      };
      break;
    case "o":
      spawnx = xpos/size;
      spawny = ypos/size;
      break;
    case "c":
      if(editmode) {
        try {
          [codemaze,codeboxes,codelava]=JSON.parse(prompt("Paste in the save code"))||[maze,boxes,lava];
        } catch(e) {
          alert("Sorry, your save code is incorrect.\nPlease make sure it is formatted correctly.\nIf you got this error from your own maze, click the page to make sure it copies it, go to the green square, and press P to get your code again.\nThis also could happen if you copied the code from somewhere, and it is missing brackets.");
        }
        if(codemaze) {
          if(Array.isArray(codemaze)) {
            var isValid = true;
            for(i in codemaze) {
              if(!Array.isArray(codemaze[i])) {
                alert("Error: Maze is not formatted correctly");
                isValid=false;
                break;
              } else {
                if(codemaze[i].length != 2) {
                  alert("Error: Maze contains "+codemaze[i].length+"d walls.");
                  isValid = false;
                  break;
                }
              }
            }
            if(isValid) maze=codemaze;
          } else {
            alert("Sorry, your save code may make the game unplayable.");
          }
          if(codeboxes) {
            if(Array.isArray(codeboxes)) {
              var isValid = true;
              for(i in codeboxes) {
                if(!Array.isArray(codeboxes[i])) {
                  alert("Error: Boxes are not formatted correctly");
                  isValid=false;
                  break;
                } else {
                  if(codeboxes[i].length != 2) {
                    alert("Error: Maze contains "+codeboxes[i].length+"d boxes.");
                    isValid = false;
                    break;
                  }
                }
              }
              if(isValid) boxes=codeboxes;
            } else {
              alert("Sorry, your save code may make the game unplayable.");
            }
            if(codelava) {
            if(Array.isArray(codelava)) {
              var isValid = true;
              for(i in codelava) {
                if(!Array.isArray(codelava[i])) {
                  alert("Error: Lava is not formatted correctly");
                  isValid=false;
                  break;
                } else {
                  if(codelava[i].length != 2) {
                    alert("Error: Maze contains "+codelava[i].length+"d lava.");
                    isValid = false;
                    break;
                  }
                }
              }
              if(isValid) lava=codelava;
            } else {
              alert("Sorry, your save code may make the game unplayable.");
            }
          xpos=0;
          ypos=0;
        }
      }
      }
      }
      break;
    case "p":
      editmode = false;
      archiveboxes = JSON.parse(JSON.stringify(boxes));//JAVASCRIPT! WHY?????
      archivelava = JSON.parse(JSON.stringify(lava));
      break;
    case "Escape":
      editmode = true;
      boxes = archiveboxes;
      lava = archivelava;
      break;
  }
  if(!editmode) {
    for(i in maze) {
      if(maze[i].toString() == [xpos/size,ypos/size].toString()){
        xpos=tempx;
        ypos=tempy;
      }
    }
    for(i in lava) {
      if(lava[i].toString() == [xpos/size,ypos/size].toString()){
        xpos=tempx;
        ypos=tempy;
      }
    }
    for(i in boxes) {
      if(boxes[i].toString() == [xpos/size,ypos/size].toString()){
        var pos = [xpos/size,ypos/size];
        var movexby = (xpos-tempx)/size
        var moveyby = (ypos-tempy)/size
        var moving = true;
        var backup = JSON.parse(JSON.stringify(boxes));
        while(moving) {
          boxes[i][0] += movexby;
          boxes[i][1] += moveyby;
          pos = boxes[i]
          for(j in maze) {
            if(maze[j].toString() == pos.toString()){
              xpos=tempx;
              ypos=tempy;
              boxes = backup;
              moving = false;
            }
          }
          for(j in lava) {
            if(lava[j].toString() == pos.toString()){
              lava = lava.slice(0,j).concat(lava.slice(parseInt(j)+1));
              boxes = boxes.slice(0,i).concat(boxes.slice(parseInt(i)+1));
            }
          }
          moving = false;
          for(j in boxes) {
            if((boxes[j].toString() == pos.toString())&&(i!=j)){
              pos = boxes[j]
              i=j;
              moving = true;
            }
          }
        }
      }
    }
    if((xpos==(canvas.width-size))&&(ypos==(canvas.height-size))) {
      alert("You win!\nPress C and paste in your code to load your level.");
      var copyText = document.createElement("input");
      copyText.value = JSON.stringify([maze,archiveboxes, archivelava, [spawnx, spawny]]);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      try {
        await navigator.clipboard.writeText(copyText.value);
      } catch(e) {
        alert("Copying failed!");
      }
      xpos = spawnx * size;
      ypos = spawny * size;
      boxes = archiveboxes
      lava = archivelava
      editmode = true;
    }
  }
})
function drawFrame(timestamp) {
  xpos = Math.min(Math.max(xpos, 0), canvas.width-size)
  ypos = Math.min(Math.max(ypos, 0), canvas.height-size)
  lastFrame = timestamp
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(i in maze) {
    context.fillStyle = "#808080"
    context.fillRect(maze[i][0]*size,maze[i][1]*size,size,size);
  }
  for(i in boxes) {
    context.fillStyle = "#FF8000"
    context.fillRect(boxes[i][0]*size,boxes[i][1]*size,size,size);
  }
  for(i in lava) {
    context.fillStyle = "#800000"
    context.fillRect(lava[i][0]*size,lava[i][1]*size,size,size);
  }
  if(editmode) {
    context.fillStyle = "#000000"
    context.fillRect(spawnx*size,spawny*size,size,size);
  }
  if(editmode) {
    context.fillStyle = "#FF0000"
  } else {
    context.fillStyle = "#0000FF"
  }
  context.fillRect(xpos,ypos,size,size);
  context.fillStyle = "#00FF00"
  context.fillRect(canvas.width-size,canvas.height-size,size,size);
  requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame)
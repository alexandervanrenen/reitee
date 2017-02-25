function onUserInput(e) {
    let key = e.keyCode ? e.keyCode : e.which;

    // Convert the code into internal naming
    switch (key) {
        case 37:
            key = "left_arrow";
            break;
        case 38:
            key = "up_arrow";
            break;
        case 39:
            key = "right_arrow";
            break;
        case 40:
            key = "down_arrow";
            break;
        case 32:
            key = "space";
            break;
        default:
            key = String.fromCharCode(key);
            key = key.toLowerCase();
    }

    let stop = e.type == 'keyup';
    let action = keyBindings[key];
    if (!(typeof action === 'undefined'))
        action(stop);
}

// Transforms mouse pos to local coords
function calcMouse(evt) {
    let rect = cr.canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;
    return {x: mouseX, y: mouseY};
}

function copyTouch(touch) {
   return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    let id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

var ongoingTouches = [];
var mouseDown = false;
var pos = {x: 0, y: 0};

function setUpInput() {
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;

    let root = document.getElementById("gc_wrapper");

   console.log("Modernizr.touchevents = '" + Modernizr.touchevents + "'");
   if(!Modernizr.touchevents) {
      root.addEventListener("mousedown", function (e) {
           console.log("mousedown");
           mouseDown = true;
           let res = calcMouse(e);
           pos.x = res.x;
           pos.y = res.y;
       });
       root.addEventListener("mouseup", function (e) {
           console.log("mouseup");
           mouseDown = false;
       });
       root.addEventListener("mousemove", function (e) {
           console.log("mousemove");
           let res = calcMouse(e);
           pos.x = res.x;
           pos.y = res.y;
       });
    } else {
       root.addEventListener("touchstart", function (e) {
           console.log("touchstart ");
          var touches = e.changedTouches;

          for (let i = 0; i < touches.length; i++) {
            console.log("touchstart:" + i + "...");
               console.log("left = " + cr.canvas.getBoundingClientRect().left);
               console.log("right = " + cr.canvas.width);
            ongoingTouches.push(copyTouch(touches[i]));
            console.log("touchstart:" + touches[i].pageX + "|" + touches[i].pageY);
          }
       });
       root.addEventListener("touchmove", function (e) {
           console.log("touchmove ");
           touches = e.changedTouches;
           for (let i = 0; i < touches.length; i++) {
               let idx = ongoingTouchIndexById(touches[i].identifier);
               if (idx >= 0) {
                  ongoingTouches[idx].pageX = touches[i].pageX;
                  ongoingTouches[idx].pageY = touches[i].pageY;
                  console.log("touch updated.");
               } else {
                  console.log("can't figure out which touch to continue");
               }
           }
       });
       root.addEventListener("touchend", function (e) {
           console.log("touchend ");
           var touches = e.changedTouches;

           for (let i = 0; i < touches.length; i++) {
             let idx = ongoingTouchIndexById(touches[i].identifier);

             if (idx >= 0) {
               ongoingTouches.splice(idx, 1);
               console.log("touch removed");
             } else {
               console.log("can't figure out which touch to end");
             }
           }
       });
    }
}

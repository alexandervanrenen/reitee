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

mouseDown = false;
pos = {x: 0, y: 0};

function setUpInput() {
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;

    let root = document.getElementById("gc_wrapper");

    root.addEventListener("mousedown", function (e) {
        mouseDown = true;
        let res = calcMouse(e);
        pos.x = res.x;
        pos.y = res.y;
    });
    root.addEventListener("mouseup", function (e) {
        mouseDown = false;
    });
    root.addEventListener("mousemove", function (e) {
        let res = calcMouse(e);
        pos.x = res.x;
        pos.y = res.y;
    });
}

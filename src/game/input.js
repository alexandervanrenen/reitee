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

mouseIsDown = false;

function onUserInputTouch(e) {
    // print(e.type);
    //
    // if (e.type == "click") {
    //     mouseIsDown = true;
    // }
    // alert("asd");
    map.name = "touched";
}

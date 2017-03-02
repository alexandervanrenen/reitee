class ContactPoint {
    constructor(id, x, y) {
        this.id = id;
        this.x = (x - cr.xOffset) / cr.scale;
        this.y = (y - cr.yOffset) / cr.scale;
    }

    moveTo(x, y) {
        this.x = (x - cr.xOffset) / cr.scale;
        this.y = (y - cr.yOffset) / cr.scale;
    }
}

class Input {

    constructor() {
        this.gamePad = new GamePadControls();
        this.keyBoard = new KeyBoardControls();
    };

    // This can not be done in constructor, needs to be a two step process: create, init .. ask Alex
    setUp() {
        window.onkeydown = (e) => { this.keyBoard.onUserKeyboardInput(e) };
        window.onkeyup = (e) => { this.keyBoard.onUserKeyboardInput(e) };

        if (Modernizr.touchevents) {
            console.log("Using touch input");
            this.hookUpTouchEvents();
        } else {
            console.log("Using mouse input");
            this.hookUpMouseEvents();
        }
    }

    hookUpTouchEvents() {
        let root = document.getElementById("gc_wrapper");

        root.addEventListener("touchstart", function (e) {
            let touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                input.gamePad.onStartContact(new ContactPoint(touches[i].identifier, touches[i].pageX, touches[i].pageY));
            }
        });
        root.addEventListener("touchmove", function (e) {
            let touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                input.gamePad.onMoveContact(touches[i].identifier, touches[i].pageX, touches[i].pageY);
            }
        });
        root.addEventListener("touchend", function (e) {
            let touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                input.gamePad.onStopContact(touches[i].identifier);
            }
        });
    };

    hookUpMouseEvents() {
        let root = document.getElementById("gc_wrapper");

        root.addEventListener("mousedown", function (e) {
            input.gamePad.onStartContact(new ContactPoint("mouse", e.clientX, e.clientY));
        });
        root.addEventListener("mousemove", function (e) {
            input.gamePad.onMoveContact("mouse", e.clientX, e.clientY);
        });
        root.addEventListener("mouseup", function (e) {
            input.gamePad.onStopContact("mouse");
        });
    };
}

var input;
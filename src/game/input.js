class ContactPoint {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Input {

    constructor() {
        this.ongoingContacts = [];
    };

    setUp() {
        window.onkeydown = (e) => this.onUserKeyboardInput(e);
        window.onkeyup = this.onUserKeyboardInput;

        if (Modernizr.touchevents) {
            console.log("Using touch input");
            this.setupTouchEvents();
        } else {
            console.log("Using mouse input");
            this.setUpMouseEvents();
        }
    }

    onUserKeyboardInput(e) {
        let key = e.keyCode ? e.keyCode : e.which;

        console.log(key);

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
    };

    getOngoingContactById(idToFind) {
        for (let i = 0; i < this.ongoingContacts.length; i++) {
            if (this.ongoingContacts[i].id == idToFind) {
                return i;
            }
        }
        return -1; // not found
    };

    setupTouchEvents() {
        let root = document.getElementById("gc_wrapper");

        root.addEventListener("touchstart", function (e) {
            let touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                input.ongoingContacts.push(new ContactPoint(touches[i].identifier, touches[i].pageX, touches[i].pageY));
                console.log("touchstart:" + touches[i].pageX + "|" + touches[i].pageY);
            }
        });
        root.addEventListener("touchmove", function (e) {
            console.log("touchmove ");
            touches = e.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                let idx = input.getOngoingContactById(touches[i].identifier);
                if (idx >= 0)
                    input.ongoingContacts[idx].moveTo(touches[i].pageX, touches[i].pageY);
            }
        });
        root.addEventListener("touchend", function (e) {
            console.log("touchend ");
            let touches = e.changedTouches;

            for (let i = 0; i < touches.length; i++) {
                let idx = input.getOngoingContactById(touches[i].identifier);
                if (idx >= 0)
                    input.ongoingContacts.splice(idx, 1);
            }
        });
    };

    setUpMouseEvents() {
        let root = document.getElementById("gc_wrapper");

        root.addEventListener("mousedown", function (e) {
            input.ongoingContacts.push(new ContactPoint("mouse", e.clientX, e.clientY));
        });
        root.addEventListener("mouseup", function (e) {
            let idx = input.getOngoingContactById("mouse");
            if (idx >= 0)
                input.ongoingContacts.splice(idx, 1);
        });
        root.addEventListener("mousemove", function (e) {
            let idx = input.getOngoingContactById("mouse");
            if (idx >= 0)
                input.ongoingContacts[idx].moveTo(e.clientX, e.clientY);
        });
    };
}

var input;
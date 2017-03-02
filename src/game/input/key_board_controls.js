
class KeyBoardControls {

    constructor() {
        this.keyBindings = {};

        this.keyBindings.w = function(stop) { player1.moveUp(stop); };
        this.keyBindings.a = function(stop) { player1.moveLeft(stop); };
        this.keyBindings.s = function(stop) { player1.moveDown(stop); };
        this.keyBindings.d = function(stop) { player1.moveRight(stop); };
        this.keyBindings.space = function(stop) { player1.moveTurbo(stop); };

        this.keyBindings.up_arrow = function(stop) { player2.moveUp(stop); };
        this.keyBindings.left_arrow = function(stop) { player2.moveLeft(stop); };
        this.keyBindings.down_arrow = function(stop) { player2.moveDown(stop); };
        this.keyBindings.right_arrow = function(stop) { player2.moveRight(stop); };
    }

    onUserKeyboardInput(e) {
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
        let action = this.keyBindings[key];
        if (!(typeof action === 'undefined'))
            action(stop);
    }
}

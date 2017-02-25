
function KeyBindings() {
    this.w = function(stop) { player1.moveUp(stop); };
    this.a = function(stop) { player1.moveLeft(stop); };
    this.s = function(stop) { player1.moveDown(stop); };
    this.d = function(stop) { player1.moveRight(stop); };
    this.space = function(stop) { player1.moveTurbo(stop); };

    this.up_arrow = function(stop) { player2.moveUp(stop); };
    this.left_arrow = function(stop) { player2.moveLeft(stop); };
    this.down_arrow = function(stop) { player2.moveDown(stop); };
    this.right_arrow = function(stop) { player2.moveRight(stop); };
}

var keyBindings = new KeyBindings();


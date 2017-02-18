class Level_4 {

    createMap() {
        let map = new Map();

        map.id = 4;
        map.name = "Level 4";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(11.5), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_5()
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {
                // Border
                if (x < 2 || x > 18 || y < 2 || y > 13) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.outside, arrow: null};
                    continue;
                }
                // Actual map
                if ((x < 3 || x > 17 || y < 3 || y > 12) || // Outer ring
                    (x > 8 && y == 5 && x != 15 && x != 17) || // Upper horizontal line
                    (x > 8 && y == 10 && x != 15 && x != 17) || // Lower horizontal line
                    ( x == 9 && y == 6 || x == 9 && y == 9) || // Gate
                    ( x == 14 && y > 5 && y < 10) || // Backwall 1
                    ( x == 16 && y > 5 && y < 10) // Backwall 2
                ) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                    continue;
                }

                map.fields[y][x] = {walkable: true, color: constants.fields.walkable, arrow: null};
            }
        }

        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 11), map.fp_to_rp(9.5, 13), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 3), map.fp_to_rp(9.5, 5), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(14.5, 11), map.fp_to_rp(14.5, 13), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(14.5, 3), map.fp_to_rp(14.5, 5), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 7), map.fp_to_rp(9.5, 9), "all"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(17, 11), map.fp_to_rp(18, 11), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(17, 5), map.fp_to_rp(18, 5), "player1"));

        map.switches.push(new Switch("push_once", map.f_to_r(11.66), map.f_to_r(3.66), 20, 20));
        map.switches.push(new Switch("push_once", map.f_to_r(11.66), map.f_to_r(11.66), 20, 20));
        map.switches.push(new Switch("push_once", map.f_to_r(16.15), map.f_to_r(12.15), 20, 20));

        map.addArrow(15, 5, "up");
        map.addArrow(15, 6, "up");
        map.addArrow(15, 7, "up");
        map.addArrow(15, 8, "up");
        map.addArrow(15, 9, "up");
        map.addArrow(15, 10, "up");

        map.addArrow(17, 5, "down");
        map.addArrow(17, 6, "down");
        map.addArrow(17, 7, "down");
        map.addArrow(17, 8, "down");
        map.addArrow(17, 9, "down");
        map.addArrow(17, 10, "down");

        map.onTick = function () {
        };

        return map;
    };

    createPlayer1() {
        return new Player("player1", new Point(map.f_to_r(4), map.f_to_r(7)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player("player2", new Point(map.f_to_r(4), map.f_to_r(9)), constants.player2.colorTable, constants.player2.name);
    }
}

class Level_3 {

    createMap() {
        let map = new Map();

        let level_3_data = [
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', '_', '_', 'X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', 'X', '_', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', 'X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', '_', 'X', '_', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', '_', 'X', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', '_', 'X', '_', 'X', '_', '_', '_', 'X', 'X', 'X', 'X', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', '_', '_', '_', 'X', '_', 'X', 'X', 'X', 'X', 'X', '_', '_', 'X', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', '_', '_', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', '_', '_', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],];

        map.id = 3;
        map.name = "Level 3";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(14), map.f_to_r(9.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_4()
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {
                // Border
                if (x < 1 || x > 22 || y < 2 || y > 13) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.outside, arrow: null};
                    continue;
                }

                if (level_3_data[y - 2][x - 1] == 'X') {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                } else {
                    map.fields[y][x] = {walkable: true, color: constants.fields.walkable, arrow: null};
                }
            }
        }

        map.addArrow(8, 12, "right");
        map.addArrow(8, 11, "right");
        map.addArrow(9, 12, "up");
        map.addArrow(9, 11, "up");
        map.addArrow(9, 10, "up");
        map.addArrow(9, 9, "up");
        map.addArrow(9, 8, "up");
        map.addArrow(9, 7, "up");
        map.addArrow(9, 6, "left");
        map.addArrow(8, 6, "up");
        map.addArrow(8, 5, "up");

        // Upper way
        map.electricLines.push(new ElectricLine(map.fp_to_rp(10.5, 3), map.fp_to_rp(10.5, 5), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(13.5, 3), map.fp_to_rp(13.5, 5), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(16.5, 3), map.fp_to_rp(16.5, 5), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(19.5, 3), map.fp_to_rp(19.5, 5), "player2"));

        map.switches.push(new Switch("stand_on", map.f_to_r(11.66), map.f_to_r(3.66), 20, 20));
        map.switches.push(new Switch("stand_on", map.f_to_r(17.66), map.f_to_r(3.66), 20, 20));

        // Middle way
        map.electricLines.push(new ElectricLine(map.fp_to_rp(17.5, 6), map.fp_to_rp(17.5, 8), "all"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(13.5, 6), map.fp_to_rp(13.5, 8), "none"));

        map.switches.push(new Switch("push_once", map.f_to_r(18.16), map.f_to_r(6.66), 20, 20));
        map.switches.push(new Switch("push_once", map.f_to_r(14.16), map.f_to_r(6.66), 20, 20));

        // Bottom way
        map.addArrow(11, 8, "down");
        map.addArrow(11, 9, "down");
        map.addArrow(11, 10, "down");
        map.addArrow(11, 11, "down");
        map.addArrow(11, 12, "right");
        map.addArrow(12, 12, "right");
        map.addArrow(13, 12, "right");
        map.addArrow(14, 12, "right");
        map.addArrow(15, 12, "right");
        map.addArrow(16, 12, "right");
        map.addArrow(17, 12, "right");
        map.addArrow(18, 12, "right");
        map.addArrow(19, 9, "left");
        map.addArrow(18, 9, "left");
        map.addArrow(17, 9, "left");
        map.addArrow(16, 9, "left");

        map.electricLines.push(new ElectricLine(map.fp_to_rp(19.5, 12), map.fp_to_rp(19.5, 13), "all"));
        map.switches.push(new Switch("push_once", map.f_to_r(17.66), map.f_to_r(11.16), 20, 20));

        map.onTick = function () {
            if (map.tick % 60 == 0) {
                map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(5.3), map.f_to_r(2.0)), new Point(0, 2.0), 9));
                map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(5.7), map.f_to_r(2.0)), new Point(0, 2.0), 9));
                map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(6.3), map.f_to_r(14.0)), new Point(0, -2.0), 9));
                map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(6.7), map.f_to_r(14.0)), new Point(0, -2.0), 9));
            }
        };

        map.onDraw = function () {
        };

        return map;
    };

    createPlayer1() {
        return new Player("player1", new Point(map.f_to_r(3.5), map.f_to_r(6.5)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player("player2", new Point(map.f_to_r(2.5), map.f_to_r(6.5)), constants.player2.colorTable, constants.player2.name);
    }
}

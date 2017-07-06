class Level_5 {

    createMap() {
        let map = new Map();

        map.id = 5;
        map.name = "Level 5";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(3.5), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
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
                if ((x < 3 || x > 17 || y < 3 || y > 12)) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                    continue;
                }

                // Upper wall
                if (2 < x && x < 8 && y == 5) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                    continue;
                }

                // Upper corner
                if ((x == 15 && y == 5) || (x == 16 && y == 4) || (x == 17 && y == 3)) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                    continue;
                }

                // Lower wall
                if (2 < x && x < 8 && y == 10) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                    continue;
                }

                map.fields[y][x] = {walkable: true, color: constants.fields.walkable, arrow: null};
            }
        }

        map.switches.push(new Switch("stand_on", map.f_to_r(16.66), map.f_to_r(7.66), 20, 20, Switch.invertTwisters));
        map.switches.push(new Switch("stand_on", map.f_to_r(4.66), map.f_to_r(7.66), 20, 20, Switch.invertTwisters));

        TwisterProjectile.createTwister(map, new Point(map.f_to_r(11.0), map.f_to_r(8)), 0.55, 4, 10, 0.025, 10);

        map.onTick = function () {
        };

        return map;
    };

    createPlayer1() {
        return new Player("player1", new Point(map.f_to_r(4), map.f_to_r(4)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player("player2", new Point(map.f_to_r(4), map.f_to_r(12)), constants.player2.colorTable, constants.player2.name);
    }
}

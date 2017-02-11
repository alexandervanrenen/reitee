class Level_1 {

    createMap() {
        let map = new Map();

        map.id = 1;
        map.name = "Level 1";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(14), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_2()
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {
                // Border
                if (x < 2 || x > 16 || y < 2 || y > 13) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.outside};
                    continue;
                }
                if (x < 3 || x > 15 || y < 3 || y > 12) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable};
                    continue;
                }

                // Actual map
                if (x == 7 && (y != 7 && y != 8)
                    || x == 10 && (y != 7 && y != 8)) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable};
                }
                else {
                    map.fields[y][x] = {walkable: true, color: constants.fields.walkable};
                }
            }
        }

        map.onTick = function () {
            if (map.tick % 60 == 0) {
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(8.5), map.f_to_r(3.0)), new Point(0, 2.0), 12));
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(9.0), map.f_to_r(3.0)), new Point(0, 2.0), 12));
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(9.5), map.f_to_r(3.0)), new Point(0, 2.0), 12));
            }
        };

        return map;
    };

    createPlayer1() {
        return new Player(new Point(map.f_to_r(4.5), map.f_to_r(6.5)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player(new Point(map.f_to_r(4.5), map.f_to_r(9.5)), constants.player2.colorTable, constants.player2.name);
    }
}

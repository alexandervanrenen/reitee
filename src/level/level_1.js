class Level_1 {

    createMap() {
        let map = new Map();

        let level_1_data = [
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', 'X', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', 'X', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', 'X', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', 'X', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],];

        map.id = 1;
        map.name = "Level 1";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(15.5), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_2()
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {
                // Border
                if (x < 4 || x > 17 || y < 4 || y > 11) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.outside, arrow: null};
                    continue;
                }

                if (level_1_data[y - 4][x - 4] == 'X') {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                } else {
                    map.fields[y][x] = {walkable: true, color: constants.fields.walkable, arrow: null};
                }
            }
        }

        map.onTick = function () {
            if ((map.tick + 30) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(13.0), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 45) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(12.5), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 60) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(12.0), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 75) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(11.5), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 90) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(11.0), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 105) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(10.5), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 120) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(10.0), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 135) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(9.5), map.f_to_r(5)), new Point(0, 1.0), 12));
            if ((map.tick + 150) % 200 == 0)
                map.gemos.push(new StraightProjectile(new Point(map.f_to_r(9.0), map.f_to_r(5)), new Point(0, 1.0), 12));
        };

        map.onDraw = function () {
        };

        return map;
    };

    createPlayer1() {
        return new Player("player1", new Point(map.f_to_r(5.5), map.f_to_r(7.5)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player("player2", new Point(map.f_to_r(5.5), map.f_to_r(8.5)), constants.player2.colorTable, constants.player2.name);
    }
}

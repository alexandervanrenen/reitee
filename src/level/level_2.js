class Level_2 {

    createMap() {
        let map = new Map();

        map.name = "Level 2";
        map.pos = {x: 20, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 16, y: 10};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(30 * 15 - 15, 30 * 4 + 15, 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_3()
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {

                // Vertical Line
                if (x == 8 && y != 1
                    || x == 10 && y != 8
                    || x == 6 && y != 8) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable};
                }
                else {
                    map.fields[y][x] = {walkable: true, color: constants.fields.walkable};
                }
            }
        }

        map.onTick = function () {
            if (map.tick % 60 == 0) {
                map.gemos.push(new StraightProjectile({x: map.fieldSize * 7.5, y: 299}, {x: 0, y: -2.0}, 12));
                map.gemos.push(new StraightProjectile({x: map.fieldSize * 9.5, y: 0}, {x: 0, y: 2.0}, 12));
            }
        };

        return map;
    };

    createPlayer1() {
        return new Player(new Point(60 - map.fieldSize / 2, 90 + map.fieldSize / 2), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player(new Point(60 - map.fieldSize / 2, 180 + map.fieldSize / 2), constants.player2.colorTable, constants.player2.name);
    }
}

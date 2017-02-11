class Level_2 {

    createMap() {
        let map = new Map();

        map.pos = {x: 20, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 16, y: 10};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.victory = {area: new Area(30 * 15 - 15, 30 * 4 - 15, 30, 60), color: "rgba(135, 206, 235, 0.7)", next: new Level_3()};

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

            if (map.victory.area.isPointInside(player1.pos.x, player1.pos.y) || map.victory.area.isPointInside(player2.pos.x, player2.pos.y)) {
                throw "Victory";
            }
        };

        return map;
    };

    createPlayer1() {
        return new Player(new Point(60 - map.fieldSize / 2, 90 + map.fieldSize / 2), constants.player1.colorTable);
    }

    createPlayer2() {
        return new Player(new Point(60 - map.fieldSize / 2, 180 + map.fieldSize / 2), constants.player2.colorTable);
    }
}

class Level_1 {

    createMap() {
        let map = new Map();

        map.pos = {x: 20, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 18, y: 10};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.victory = {area: new Area(30 * 17 - 15, 30 * 4 - 15, 30, 60), color: constants.colors.victoryArea, next: new Level_2()};

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {

                // Vertical Line
                if (x == 7 && (y != 4 && y != 5)
                    || x == 10 && (y != 4 && y != 5)) {
                    map.fields[y][x] = {walkable: false, color: 'brown'};
                }
                else {
                    map.fields[y][x] = {walkable: true, color: 'yellow'};
                }
            }
        }

        map.onTick = function (tick) {
            if (tick % 60 == 0) {
                map.gemos.push(new StraightProjectile({x: map.fieldSize * 9 - 18, y: 0}, {x: 0, y: 2.0}, 12));
                map.gemos.push(new StraightProjectile({x: map.fieldSize * 9, y: 0}, {x: 0, y: 2.0}, 12));
                map.gemos.push(new StraightProjectile({x: map.fieldSize * 9 + 18, y: 0}, {x: 0, y: 2.0}, 12));
            }

            if (map.victory.area.isPointInside(player1.pos.x, player1.pos.y) || map.victory.area.isPointInside(player2.pos.x, player2.pos.y)) {
                throw "Victory";
            }
        };

        return map;
    };

    createPlayer1() {
        return new Player(constants.colors.player.one, new Point(60 - map.fieldSize / 2, 90 + map.fieldSize / 2));
    }

    createPlayer2() {
        return new Player(constants.colors.player.two, new Point(60 - map.fieldSize / 2, 180 + map.fieldSize / 2));
    }
}

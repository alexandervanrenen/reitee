class Level_3 {

    createMap() {
        let map = new Map();

        map.id = 3;
        map.name = "Level 3";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(14), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
            next: new Level_3()
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
                if ((x < 3 || x > 15 || y < 3 || y > 12) || // Outer ring
                    (x > 8 && y == 5) || // Upper horizontal line
                    (x > 8 && y == 10) || // Lower horizontal line
                    ( x == 9 && y == 6 || x == 9 && y == 9) // Gate
                ) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable};
                    continue;
                }

                // Actual map
                map.fields[y][x] = {walkable: true, color: constants.fields.walkable};
            }
        }

        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 11), map.fp_to_rp(9.5, 13), constants.player1.color));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 3), map.fp_to_rp(9.5, 5), constants.player2.color));

        map.deathArea1 = new Area(map.electricLines[0].begin.x - 5, map.electricLines[0].begin.y, 10, Math.abs(map.electricLines[0].begin.y -  map.electricLines[0].end.y));
        map.deathArea2 = new Area(map.electricLines[1].begin.x - 5, map.electricLines[1].begin.y, 10, Math.abs(map.electricLines[1].begin.y -  map.electricLines[1].end.y));



        map.onTick = function () {
            if(map.deathArea2.isPointInside(player1.pos.x, player1.pos.y)) {
                player1.die();
            }
            if(map.deathArea1.isPointInside(player2.pos.x, player2.pos.y)) {
                player2.die();
            }
        };

        return map;
    };

    createPlayer1() {
        return new Player(new Point(map.f_to_r(4), map.f_to_r(7)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player(new Point(map.f_to_r(4), map.f_to_r(9)), constants.player2.colorTable, constants.player2.name);
    }
}

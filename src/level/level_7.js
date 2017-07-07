class Level_7 {

    createMap() {
        let map = new Map();

        let level_7_data = [
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['X', '_', '_', 'X', '_', '_', 'X', '_', '_', 'X', '_', '_', 'X', '_', '_', '_', '_', 'X', '_', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', 'X', '_', '_', '_', '_', '_', 'X', 'X', 'X', '_', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', '_', '_', '_', 'X', '_', 'X', '_', 'X', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X', '_', 'X', '_', '_', '_', 'X'],
            ['X', '_', '_', 'X', '_', '_', 'X', '_', 'X', '_', 'X', '_', 'X', '_', '_', 'X', '_', 'X', '_', '_', '_', 'X'],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],];

        map.id = 7;
        map.name = "Level 7";
        map.pos = {x: 40, y: 50};
        map.fieldSize = 30;
        map.fieldBounds = {x: 24, y: 16};
        map.bounds = {x: map.fieldBounds.x * map.fieldSize, y: map.fieldBounds.y * map.fieldSize};
        map.portal = {
            area: new Area(map.f_to_r(20.0), map.f_to_r(7.5), 30, 30),
            sprite: new Sprite(constants.portalSprite),
        };

        map.fields = new Array(map.fieldBounds.y);
        for (let y = 0; y < map.fieldBounds.y; y++) {
            map.fields[y] = new Array(map.fieldBounds.x);
            for (let x = 0; x < map.fieldBounds.x; x++) {
                // Border
                if (x < 1 || x > 22 || y < 4 || y > 11) {
                    map.fields[y][x] = {walkable: false, color: constants.fields.outside, arrow: null};
                    continue;
                }

                if (level_7_data[y - 4][x - 1] == 'X') {
                    map.fields[y][x] = {walkable: false, color: constants.fields.non_walkable, arrow: null};
                } else {
                    map.fields[y][x] = {walkable: true, color: constants.fields.walkable, arrow: null};
                }
            }
        }

        map.electricLines.push(new ElectricLine(map.fp_to_rp(4.5, 7), map.fp_to_rp(4.5, 9), "none"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(7.5, 6), map.fp_to_rp(7.5, 7), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(7.5, 9), map.fp_to_rp(7.5, 10), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(9.5, 9), map.fp_to_rp(9.5, 10), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(11.5, 9), map.fp_to_rp(11.5, 10), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(13.5, 9), map.fp_to_rp(13.5, 10), "player1"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(13.5, 6), map.fp_to_rp(13.5, 7), "player2"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(16.5, 7), map.fp_to_rp(16.5, 9), "all"));
        map.electricLines.push(new ElectricLine(map.fp_to_rp(18.5, 7), map.fp_to_rp(18.5, 9), "none"));

        map.switches.push(new Switch("stand_on", map.f_to_r(8.66), map.f_to_r(5.66), 20, 20, Switch.swapPolarityAction));
        map.switches.push(new Switch("stand_on", map.f_to_r(11.66), map.f_to_r(5.66), 20, 20, Switch.swapPolarityAction));
        map.switches.push(new Switch("push_once", map.f_to_r(17.16), map.f_to_r(5.16), 20, 20, Switch.swapPolarityAction));
        map.switches.push(new Switch("push_once", map.f_to_r(17.16), map.f_to_r(10.16), 20, 20, Switch.swapPolarityAction));
        map.switches.push(new Switch("stand_on", map.f_to_r(20.16), map.f_to_r(5.66), 20, 20, Switch.swapPolarityAction));
        map.switches.push(new Switch("push_once", map.f_to_r(20.16), map.f_to_r(9.66), 20, 20, Switch.swapPolarityAction));

        map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(8.5), map.f_to_r(8)), new Point(0, 1.0), 16, StraightProjectile.reSpawnOnCollision));
        map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(10.5), map.f_to_r(8)), new Point(0, 1.0), 16, StraightProjectile.reSpawnOnCollision));
        map.projectiles.push(new StraightProjectile(new Point(map.f_to_r(12.5), map.f_to_r(8)), new Point(0, 1.0), 16, StraightProjectile.reSpawnOnCollision));

        map.onTick = function () {
        };

        return map;
    };

    createPlayer1() {
        return new Player("player1", new Point(map.f_to_r(2.5), map.f_to_r(5.5)), constants.player1.colorTable, constants.player1.name);
    }

    createPlayer2() {
        return new Player("player2", new Point(map.f_to_r(2.5), map.f_to_r(10.5)), constants.player2.colorTable, constants.player2.name);
    }
}

function Utility() {
    this.printProperties = function Utility_printProperties(obj) {
        for (propName in obj) {
            // if (obj.hasOwnProperty(propName))
            print(propName);
        }
    };

    this.distance = function (pos1, pos2) {
        let a = pos1.x - pos2.x;
        let b = pos1.y - pos2.y;

        return Math.sqrt(a * a + b * b);
    }
}

util = new Utility();

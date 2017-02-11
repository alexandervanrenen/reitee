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
    };

    this.removeFromArray = function (arr, pos) {
        arr[pos] = arr[arr.length - 1];
        arr.pop();
    };

    this.cap = function (val, min, max) {
        if(val < min)
            return min;
        if(val > max)
            return max;
        return val;
    };
}

util = new Utility();

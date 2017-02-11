constants = {
    fps: 30,
    debug: true,
    playerStyleDragLength: 5,
    playerDragFade: [0.8, 0.6, 0.4, 0.2, 0.1],
    colors: {
        victoryArea: "rgba(135, 206, 235, 0.7)",
        player: {
            one: {
                main: "blue",
                border: "black",
                drag: function (alpha) {
                    return "rgba(135, 206, 235, " + alpha + ")"
                }
            },
            two: {
                main: "green",
                border: "black",
                drag: function (alpha) {
                    return "rgba(135, 206, 235, " + alpha + ")"
                }
            },
        },
    }
};

print = function (text) {
    console.log(text);
};

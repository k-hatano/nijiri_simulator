
var width = 16;
var height = 16;
var board;
var nijiris;

onload = function() {
    init();
    var canvas = document.getElementById('field');
    field.onmousedown=function(e){
        click(e);
        e.preventDefault();
        return false;
    }
    drawField();
    idle();
};

function idle() {
    for (var i = 0; i < nijiris.length; i++) {
        var nijiri = nijiris[i];
        switch (nijiri.direction) {
            case 0:
                nijiri.y--;
                break;
            case 1:
                nijiri.x--;
                break;
            case 2:
                nijiri.y++;
                break;
            case 3:
                nijiri.x++;
                break;
        }
        var x = Math.floor(nijiri.x / 32);
        var y = Math.floor(nijiri.y / 32);
        if (board[x][y] == 1) {
            switch (nijiri.direction) {
                case 0:
                    nijiri.y+=2;
                    break;
                case 1:
                    nijiri.x+=2;
                    break;
                case 2:
                    nijiri.y-=2;
                    break;
                case 3:
                    nijiri.x-=2;
                    break;
            }
            var r = Math.floor(Math.random() * 2);
            nijiris[i].direction = (nijiris[i].direction + r * 2 + 3) % 4;
        }
    }
    drawField();
    setTimeout(idle, 10);
}

function click(e) {
    var x = Math.floor(e.offsetX / 32);
    var y = Math.floor(e.offsetY / 32);
    board[x][y] = 0;
    var r = Math.floor(Math.random() * 4);
    var nijiri = {x: e.offsetX, y: e.offsetY, direction: r};
    nijiris.push(nijiri);
    drawField();
}

function init() {
    board = new Array(width);
    for (var x = 0; x < width; x++) {
        board[x] = new Array(height);
    }
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            board[x][y] = 1;
        }
    }
    nijiris = new Array();
}

function drawField() {
    var canvas = document.getElementById('field');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 500);

    ctx.fillStyle = "rgb(0, 0 ,0)";
    ctx.fillRect(0, 0, 512, 512);
    
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            switch (board[x][y]) {
                case 0:
                    ctx.fillStyle = "rgb(0, 0 ,0)";
                    break;
                case 1:
                    ctx.fillStyle = "rgb(128, 128 ,128)";
                    break; 
            }
            ctx.fillRect(x * 32, y * 32, 30, 30);
        }
    }

    for (var i = 0; i < nijiris.length; i++) {
        ctx.beginPath();
        ctx.arc(nijiris[i].x, nijiris[i].y, 8, 0, Math.PI * 2, true);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
}

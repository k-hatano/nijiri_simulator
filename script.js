
var width = 20;
var height = 20;
var board;
var nijiris;
var dragging = false;
var speed = 10;

onload = function() {
    init();
    var field = document.getElementById('field');
    field.onmousedown = function(e){
        dragging = true;
        click(e);
        e.preventDefault();
        return false;
    }
    field.onmouseup = function(e){
        dragging = false;
        return false;
    }
    field.onmouseout = function(e){
        dragging = false;
        return false;
    }
    field.onmousemove = function(e){
        if (dragging) {
            click(e);
        }
        return false;
    }
    document.getElementById('speed').onchange = function(e) {
        speed = 100 / e.target.value;
    }
    document.getElementById('reset').onclick = function(e) {
        init();
        drawField();
    }
    drawField();
    idle();
};

function getBoardPiece(x, y){
    if (x < 0 || y < 0 || x >= width || y >= height) {
        return 1;
    }
    return board[x][y];
}

function getHead(nijiri) {
    switch (nijiri.direction) {
        case 0:
            return {x:nijiri.x ,y:nijiri.y - 8};
        case 1:
            return {x:nijiri.x - 8 ,y:nijiri.y};
        case 2:
            return {x:nijiri.x ,y:nijiri.y + 8};
        case 3:
            return {x:nijiri.x + 8 ,y:nijiri.y};
        default:
            return {x:nijiri.x ,y:nijiri.y};
    }
}

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
        var x = Math.floor(getHead(nijiri).x / 32);
        var y = Math.floor(getHead(nijiri).y / 32);
        if (getBoardPiece(x, y) == 1) {
            switch (nijiri.direction) {
                case 0:
                    nijiri.y++;
                    break;
                case 1:
                    nijiri.x++;
                    break;
                case 2:
                    nijiri.y--;
                    break;
                case 3:
                    nijiri.x--;
                    break;
            }
            var r = Math.floor(Math.random() * 2);
            nijiris[i].direction = (nijiris[i].direction + r * 2 + 3) % 4;
        }
    }
    drawField();
    setTimeout(idle, speed);
}

function click(e) {
    var x = Math.floor(e.offsetX / 32);
    var y = Math.floor(e.offsetY / 32);
    if (getBoardPiece(x, y) > 0) {
        board[x][y] = 0;
        var r = Math.floor(Math.random() * 4);
        var nijiri = {x: e.offsetX, y: e.offsetY, direction: r};
        nijiris.push(nijiri);
        drawField();  
    }
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
    ctx.clearRect(0, 0, 640, 640);

    ctx.fillStyle = "rgb(0, 0 ,0)";
    ctx.fillRect(0, 0, 640, 640);
    
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            switch (getBoardPiece(x, y)) {
                case 0:
                    ctx.fillStyle = "rgb(0, 0 ,0)";
                    break;
                case 1:
                    ctx.fillStyle = "rgb(128, 128 ,128)";
                    break; 
            }
            ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
        }
    }

    for (var i = 0; i < nijiris.length; i++) {
        ctx.beginPath();
        ctx.arc(nijiris[i].x, nijiris[i].y, 8, 0, Math.PI * 2, true);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
}

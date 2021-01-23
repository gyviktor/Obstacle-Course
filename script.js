var gameArea;
var star;
var starPosStart;
var starPos;
var balls = [];
var ballPos = [];
var triangles = [];
var trianglePos = [];
var KEYLEFT = 37;
var KEYUP = 38;
var KEYRIGHT = 39;
var KEYDOWN = 40;
var x;
var y;
var deaths = 0;
var points = 0;
var level = 0;
var counter = 0;
var myInterval;
var ballAnimation;
var name;
var input, inputButton;
var music = new Audio("bg.mp3");
var sound = new Audio("point.mp3");
var death = new Audio("death.mp3");
music.loop = true;


function levelOne() {
    starPosStart = {x: 0, y: 0};
    starPos = {x: 0, y: 0};
    setStar();
    ballPos[0] = {x: 0, y: 100};
    ballPos[1] = {x: 450, y: 200};
    ballPos[2] = {x: 0, y: 300};
    ballPos[3] = {x: 450, y: 400};
    setBalls();
    trianglePos[0] = {x: 100, y: 100};
    trianglePos[1] = {x: 200, y: 200};
    trianglePos[2] = {x: 300, y: 300};
    trianglePos[3] = {x: 400, y: 400};
    setTriangles();
    x = 450;
    y = 0;
    ballAnimation = requestAnimationFrame(animateBalls);

}

function levelTwo() {
    starPos = {x: 0, y: 250};
    starPosStart = {x: 0, y: 250};
    setStar();
    ballPos[0] = {x: 350, y: 0};
    ballPos[1] = {x: 150, y: 450};
    ballPos[2] = {x: 150, y: 0};
    ballPos[3] = {x: 350, y: 450};
    setBalls();
    trianglePos[0] = {x: 150, y: 150};
    trianglePos[1] = {x: 350, y: 150};
    trianglePos[2] = {x: 150, y: 300};
    trianglePos[3] = {x: 350, y: 300};
    setTriangles();
    x = 0;
    y = 350;
    ballAnimation = requestAnimationFrame(animateBalls);

}

function levelThree() {
    starPos = {x: 230, y: 230};
    starPosStart = {x: 230, y: 230};
    setStar();
    ballPos[0] = {x: 0, y: 100};
    ballPos[1] = {x: 450, y: 350};
    ballPos[2] = {x: 100, y: 0};
    ballPos[3] = {x: 350, y: 450};
    setBalls();
    trianglePos[0] = {x: 150, y: 150};
    trianglePos[1] = {x: 300, y: 150};
    trianglePos[2] = {x: 150, y: 300};
    trianglePos[3] = {x: 300, y: 300};
    setTriangles();
    x = 350;
    y = 350;
    ballAnimation = requestAnimationFrame(animateBalls);

}

function setStar() {
    star.css({
        top: starPosStart.y,
        left: starPosStart.x
    })
}

function setTriangles() {
    for (var i = 0; i < 4; i++) {
        triangles[i].css({
            top: trianglePos[i].y,
            left: trianglePos[i].x
        })
        triangles[i].show();
    }
}

function setBalls() {
    for (var i = 0; i < 4; i++) {
        balls[i].css({
            left: ballPos[i].x,
            top: ballPos[i].y
        });
    }
}

function moveStar(e) {
    var key = e.which;

    switch (key) {
        case KEYDOWN:
            starPos.y += 10;
            break;
        case KEYUP:
            starPos.y -= 10;
            break;
        case KEYRIGHT:
            starPos.x += 10;
            break;
        case KEYLEFT:
            starPos.x -= 10;
            break;
        case 32:
            newLevel();

    }
    //Tartományok ellenőrzése

    if (starPos.x < 0) {
        starPos.x = 0;
    } else if (starPos.x > 460) {
        starPos.x = 460;
    } else if (starPos.y < 0) {
        starPos.y = 0;
    } else if (starPos.y > 460) {
        starPos.y = 460;
    } else {
        animateStar();
    }

}

function animateStar() {
    star.animate({
        top: starPos.y,
        left: starPos.x
    }, 1);
    checkCollision()
}

function distanceTo(obj1, obj2) {
    var dx = parseInt(obj2.x) - parseInt(obj1.x);
    var dy = parseInt(obj2.y) - parseInt(obj1.y);

    return Math.sqrt(dx * dx + dy * dy)
}


function checkCollision() {
    for (i = 0; i < 4; i++) {
        if (distanceTo({x: $('#star').css('left'), y: $('#star').css('top')}, {
            x: balls[i].css('left'),
            y: balls[i].css('top')
        }) < 40) {
            die();
            break;
        }

        if (distanceTo({x: $('#star').css('left'), y: $('#star').css('top')}, {
            x: triangles[i].css('left'),
            y: triangles[i].css('top')
        }) < 40) {
            triangles[i].hide();
            triangles[i].css({
                left: -50,
                top: -50
            });
            point();
            break;
        }
    }
}


function die() {
    starPos.x = starPosStart.x;
    starPos.y = starPosStart.y;
    star.css({
        left: starPosStart.x,
        top: starPosStart.y
    });
    death.play();
    deaths++;
    $("#deaths")[0].innerHTML = ("Deaths: " + deaths);
    setTriangles();
    points = 0;
}

function point() {
    sound.play();
    points++;
    if (points >= 4) {
        newLevel();
    }
}

function newLevel() {
    level++;
    points = 0;
    $('.ball').stop(true, true);
    cancelAnimationFrame(ballAnimation);
    if (level === 1) {
        levelTwo();
    } else if (level === 2) {
        levelThree();
    } else if (level > 2) {
        endGame();
    }
}

function endGame() {
    clearInterval(myInterval);
    $('#input').show();
    $(".ball").stop(true, true);
    cancelAnimationFrame(ballAnimation);
}

function addName() {
    name = $("#inputName").val();
    var table = document.getElementById("toplist");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = deaths;
    cell3.innerHTML = counter;
    sortTable();
    $('#input').hide();
    restart();
}


function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("toplist");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


function animateBalls() {
    for (var i = 0; i < 4; i++) {
        if (i == 0 || i == 2) {
            balls[i].animate({
                left: ballPos[i].x += x,
                top: ballPos[i].y += y
            }, 2000);
            balls[i].animate({
                left: ballPos[i].x -= x,
                top: ballPos[i].y -= y
            }, 2000);

        } else if (i == 1 || i == 3) {
            balls[i].animate({
                left: ballPos[i].x -= x,
                top: ballPos[i].y -= y
            }, 2000);
            balls[i].animate({
                left: ballPos[i].x += x,
                top: ballPos[i].y += y
            }, 2000);

        }
        checkCollision();
    }
    ballAnimation = requestAnimationFrame(animateBalls);
}


function addElements() {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');

    star = $('<img id="star"/>');
    star.appendTo(gameArea);

    for (var i = 0; i < 4; i++) {
        balls[i] = $('<img class="ball"/>');
        triangles[i] = $('<img class="triangle"/>');
        balls[i].appendTo(gameArea);
        triangles[i].appendTo(gameArea);
    }

    input = $('<div>Name: </div>');
    input.appendTo('body');
    input.attr('id', 'input');
    inputButton = $('<div id="inputButton">Enter</div>')
    inputButton.appendTo(input);
    $('<input id="inputName" type="text">').appendTo(input);
    $('#input').hide();

    timer();
}


function timer() {
    myInterval = setInterval(function () {
        ++counter;
        $("#counter")[0].innerHTML = ("Time: " + counter);
    }, 1000);

}


function restart() {
    level = 0;
    $('#input').hide();
    clearInterval(myInterval);
    $(".ball").stop(true, true);
    counter = 0;
    $("#counter")[0].innerHTML = ("Time: " + counter);
    deaths = 0;
    $("#deaths")[0].innerHTML = ("Deaths: " + deaths);
    points = 0;
    levelOne();
    timer();
}

$(function () {
    addElements();
    levelOne();
    music.play();
    $(this).on('keydown', moveStar);
    $("#deaths").html("Deaths: " + deaths);
    $("#counter").html("Time: " + counter);
    $("#restartButton").on("click", function () {
        restart();
    });
    $("#inputButton").click(function () {
        addName();
    });
});

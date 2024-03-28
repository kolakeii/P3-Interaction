var colors = ['red', 'blue', 'green',];
var assigned = [0, 0, 0,];
var squarecolors = [0, 0, 0, 0, 0, 0, 0];
var resolved = [0, 0, 0, 0, 0, 0, 0,];
var openSquares = 0;

function initGame() {
    document.getElementById('msg1').innerHTML="WELCOME - FIND THE COLOR PAIRS";
    openSquares = 0;
    for (i = 0; i < 3; i++) {
        assigned[i] = 0;
    }
    
    for (i = 1; i < 7; i++) {
        var theDiv = document.getElementById(i);
        var randomColorId = getRandomInt(3);
        if (assigned[randomColorId] > 1) {
            randomColorId = findFirstUnassignedColorId();
        }
        theDiv.innerHTML = "<img src='" + colors[randomColorId] + ".png' id='imgID_" + i + "' hidden='hidden'>"
        assigned[randomColorId] = assigned[randomColorId] + 1;
        squarecolors[i] = randomColorId;
        resolved[i] = 0;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function findFirstUnassignedColorId() {
    for (k = 0; k < 3; k++) {
        if (assigned[k] < 2) {
            return k;
        }
    }
    return 2;
}

function toggleSquare(theDiv) {
    if (resolved[theDiv.id] == 0) {
        let myImg = document.getElementById('imgID_' + theDiv.id);
        let hidden = myImg.getAttribute("hidden");
        if (hidden) {
            if (openSquares < 2) {
                openSquares ++;
                showImage(myImg.id);
                if (openSquares > 1) { 
                    checkForMatchesAndMarkResolved();
                }
            }
        } else {
            openSquares --;
            hideImage(myImg.id);
        }   
    }
}

function checkForMatchesAndMarkResolved() {
    let openones = [0,0]; // out of reach
    let opencolors = [7,7];
    let openindex = 0;
    for (i = 1; i < 7; i++) {
        let myImg = document.getElementById('imgID_' + i);
        let hidden = myImg.getAttribute("hidden");
        if(!hidden && resolved[i] == 0) {
            openones[openindex] = i;
            opencolors[openindex] = squarecolors[i];
            openindex ++;
        }
    }
    if (opencolors[0] == opencolors[1]) {
        // we have a match
        resolved[openones[0]] = 1;
        resolved[openones[1]] = 1;
        document.getElementById('msg1').innerHTML="MATCH - KEEP GOING!";
        openSquares = 0;

        // check if all are resolved
        let sum = 0;
        for (i = 1; i < 7; i++) {
            sum = sum + resolved[i];
        }
        if (sum > 5) {
            document.getElementById('msg1').innerHTML='YOU WIN!';
            setTimeout(initGame, 1000);
        }
    
    } else if (openindex > 1) {
        document.getElementById('msg1').innerHTML="NO MATCH";
        setTimeout(hideTwoSquares, 1000, 'imgID_' + openones[0], 'imgID_' + openones[1]);
    }
    
}

function hideTwoSquares(id1, id2) {
    hideImage(id1);
    hideImage(id2);
    openSquares = 0;
    document.getElementById('msg1').innerHTML="TRY AGAIN - FIND THE PAIRS";
}

function showImage(imgId) {
    var myImg = document.getElementById(imgId);
    myImg.removeAttribute("hidden");
}

function hideImage(imgId) {
    var myImg = document.getElementById(imgId);
    myImg.setAttribute("hidden", "hidden");
}
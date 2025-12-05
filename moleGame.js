let currZombTile;
let currBombTile;
let score = 0;
let gameOver = false;
window.onload = function() {
    setGame();
}
function setGame() {
    for (let i=0; i<9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setZomb, 1000);
    setInterval(setBomb, 2000)
}
function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}
function setZomb() {

    if (gameOver) {
        return;
    }
    if (currZombTile) {
        currZombTile.innerHTML = "";
    }

    let zomb = document.createElement("img");
    zomb.src = "./images/zombie.png";
    let num = getRandomTile();
    if (currBombTile && currBombTile.id == num) {
        return;
    }
    currZombTile = document.getElementById(num);
    currZombTile.appendChild(zomb);
}
function setBomb() {

    if (gameOver) {
        return;
    }
    if (currBombTile) {
        currBombTile.innerHTML = "";
    }

    let bomb = document.createElement("img");
    bomb.src = "./images/bomb.png";
    let num = getRandomTile();
     if (currZombTile && currZombTile.id == num) {
        return;
    }
    currBombTile = document.getElementById(num);
    currBombTile.appendChild(bomb);
}
function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currZombTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currBombTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        document.getElementById("board").style.backgroundImage = 'url("./images/red-ground.jpg")';

    }

}
/*function move(id){
  debugger;
  document.getElementById(id).style.position = "absolute";
  if(document.getElementById(id).style.top ==="") document.getElementById(id).style.top= "0px";
  var position = document.getElementById(id).style.top;
  var pos = parseInt(position.replace("px", ""));
  document.getElementById(id).style.top = pos+20 + "px";
  }
*/
const score = document.querySelector("span");
const result = document.querySelector(".result")
const marcianos = document.querySelectorAll(".Marcianos div")

let width = 15
let currentNaveIndex = 202
let currentMarcianoIndex = 0
let marcianoInvadersTakenDown = []
let points = 0
let direction = 1
let marcianoId;


const marcianoInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15
]

for (let i = 0; i < marcianoInvaders.length; i++) {
    marcianos[marcianoInvaders[i]].classList.add("marciano");
}

marcianos[currentNaveIndex].classList.add("nave");

const moveMarcianos = () => {
    let rightEdge = marcianoInvaders[marcianoInvaders.length-1] % width === width-1
    let leftEdge = marcianoInvaders[0] % width === 0

    if (rightEdge && direction === 1) {
        direction = width;
    } else if (rightEdge && direction === width) {
        direction = -1;
    } else if (leftEdge && direction === -1) {
        direction = width;
    } else if (leftEdge && direction === width) {
        direction = 1;
    }

    for (let i = 0; i < marcianoInvaders.length; i++) {
        marcianos[marcianoInvaders[i]].classList.remove("marciano");
    }
    for (let i = 0; i < marcianoInvaders.length; i++) {
        marcianoInvaders[i] += direction;
    }
    for (let i = 0; i < marcianoInvaders.length; i++) {
        if (!marcianoInvadersTakenDown.includes(i)) {
           marcianos[marcianoInvaders[i]].classList.add("marciano");
        }        
    }

    if (marcianos[currentNaveIndex].classList.contains("marciano", "nave")) {
        clearInterval(marcianoId);
        marcianos[currentNaveIndex].classList.add("meteorito")
        result.innerHTML = "GAME OVER"
    }

    if (marcianos[currentNaveIndex].classList.contains("marciano", "nave")) {
        clearInterval(marcianoId);
        marcianos[currentNaveIndex].classList.add("meteorito")
        result.innerHTML = "GAME OVER"
    }

    //touch bottom lose
    for (let i = 0; i <= marcianoInvaders.length - 1; i++){
        if(marcianoInvaders[i] > (marcianos.length - (width -1))){
          result.innerHTML = "GAME OVER"
          clearInterval(invaderId)
        }
    }

    //you win
    if (marcianoInvadersTakenDown.length === marcianoInvaders.length) {
        clearInterval(marcianoId);
        result.innerHTML = "GANADOR";
    }
}

marcianoId = setInterval(moveMarcianos,200)

const shoot = (e) => {
    let disparoId;
    let disparoIndex = currentNaveIndex;

    const moveDisparo = () => {
        marcianos[disparoIndex].classList.remove("disparo");
        disparoIndex -= width;
        marcianos[disparoIndex].classList.add("disparo");

        if(disparoIndex < width) {
            clearInterval(disparoId)
            setTimeout(() => squares[disparoIndex].classList.remove('disparo'), 100)
        }

        if (marcianos[disparoIndex].classList.contains("marciano")) {
            marcianoss[disparoIndex].classList.remove("disparo");
            marcianos[disparoIndex].classList.remove("marciano");
            marcianos[disparoIndex].classList.add("meteorito");
            setTimeout(()=>marcianos[disparoIndex].classList.remove("meteorito"),120);
            clearInterval(disparoId);

            marcianoInvadersTakenDown.push(marcianoInvaders.indexOf(disparoIndex)) //remember taken's position in its array
            points = marcianoInvadersTakenDown.length;
            score.innerHTML = points;
        }
    }

    if (e.keyCode === 32) {
        disparoId = setInterval(moveDisparo, 80)
    }
}

const moveNave = (e) => {
    marcianos[currentNaveIndex].classList.remove("nave")
    switch(e.keyCode) {
        case 37:
            if (currentNaveIndex % width !== 0) {
                currentNaveIndex--;
            }
            break;
        case 39:
            if (currentNaveIndex % width !== width-1) {
                currentNaveIndex++;
            }
            break;
    }
    squares[currentNaveIndex].classList.add("nave")
}

document.addEventListener("keydown",moveNave)
document.addEventListener("keyup",shoot)

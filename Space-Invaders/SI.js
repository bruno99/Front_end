const invaders = document.querySelectorAll(".pantalla div")
var nave_posicion = 300;
var disparoID;
var meteoritoID;
function moveMarciano(){
  var Marcianos = document.getElementById(marciano);
    let rightEdge = marciano[marciano.length-1] % width === width-1;
    let leftEdge = marciano[0] % width === 0;
//los marcianos van bajando y se mueven hacia los lados
    if (rightEdge && direction === 1) {
        direction = width;
    } else if (rightEdge && direction === width) {
        direction = -1;
    } else if (leftEdge && direction === -1) {
        direction = width;
    } else if (leftEdge && direction === width) {
        direction = 1;
    }  
}
function moveNave() {
   debugger;
   document.getElementById(nave).style.position = "absolute";
   invaders[nave_posicion].classList.remove("nave")
    switch(e.keyCode) {
        case 37://tecla izquierda
            if (nave_posicion % width !== 0) {//si no esta a la izquierda del todo de mueve
                document.getElementById(nave).style.top = pos-20 + "px";
            }
            break;
        case 39://tecla derecha
            if (nave_posicion % width !== width-1) {//si no esta a la derecha del todo de mueve
                document.getElementById(nave).style.top = pos+20 + "px";
            }
            break;
    }
}
function crearMeteorito(){
  let meteorito_posicion = marciano[0] % width; //el meteorito tiene que salir de los marcianos
  invaders[meteorito_posicion].Math.random().classList.add("meteorito");//crear meteorito de forma aleatoria
  
  
  if(meteorito_posicion > width){//si no se acierta el disparo desaparece
   clearInterval(meteoritoID);
   setTimeout(() => invaders[meteorito_posicion].classList.remove('meteorito'), 100);
    
    if (invaders[meteorito_posicion].classList.contains("nave")) {//si se acierta el disparo desaparecen ambos y sale la colision
            invaders[meteorito_posicion].classList.remove("disparo");
            invaders[meteorito_posicion].classList.remove("nave");
            invaders[meteorito_posicion].classList.add("colision");
            setTimeout(()=>invaders[meteorito_posicion].classList.remove("colision"),100);
            clearAll();//GAME OVER     
        }
    }
  
}
function disparar() {
   
        let disparo_posicion = nave_posicion;//el disparo tiene que salir desde la nave
        invaders[disparo_posicion].classList.remove("disparo");
        disparo_posicion -= width;
        invaders[disparo_posicion].classList.add("disparo");
  
        if(disparo_posicion < width) {//si no se acierta el disparo desaparece
            clearInterval(disparoID);
            setTimeout(() => invaders[disparo_posicion].classList.remove('disparo'), 100);
        }

        if (invaders[disparo_posicion].classList.contains("marciano")) {//si se acierta el disparo desaparecen ambos y sale la colision
            invaders[disparo_posicion].classList.remove("disparo");
            invaders[disparo_posicion].classList.remove("marciano");
            invaders[disparo_posicion].classList.add("colision");
            setTimeout(()=>invaders[disparo_posicion].classList.remove("colision"),100);
            clearInterval(disparoID);     
        }
    }

    if (e.keyCode === 32) {//barra espaciadora para disparar
        disparoID = setInterval(moveDisparo, 80)
    }
}

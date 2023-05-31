// Se definen variables, constantes
const puntaje=document.querySelector('.puntaje');
            const pantallaInicio=document.querySelector('.pantallaInicio');
            const areaJuego=document.querySelector('.areaJuego');
            startScreen.addEventListener('click',start);
            let player={speed:10,score:0}; /*velocidad*/
            let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}/*Se define false a las teclas*/

            /*cuando el usuario presiona una tecla, se activa la función keyDown y keyUp*/
            document.addEventListener('keydown',keyDown);
            document.addEventListener('keyup',keyUp);


            /*Con "preventDefault" se define una instruccion en el movimiento de la pagina al presionar la tecla */
            /*Con keys se actualiza el valor booleano indicando que se presiono */
            function keyDown(e){
                e.preventDefault();
            }
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
            }
            
            /*Se define la funcion para cuando hay un choque(a y b)*/
            /*Se definen como 2 rectangulos donde se evalua con booleanos al superponerse los coches*/
            /*El return evalua las condiciones booleanas cuando los bordes se pegan*/
            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
                
            }

            /*Se define variable lineas y se almacena en .lines */
            /*Para .lines se define su posicion vertical y limites */
            /*Se relaciona con la velocidad del carro asi da la sensacion de que se mueve*/
            /*y con style.top se relaciona con el HTML*/
            function moveLines(){
                let lines=document.querySelectorAll('.lines');
                lines.forEach(function(item){
                    if(item.y >=650){
                        item.y-=740;
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })

            /*Se define la funcion al finalizar el juego y se agrega un mensaje*/
            }
            function endGame(){
                player.start=false;
                startScreen.classList.remove('hide');
                startScreen.innerHTML="Fin del juego <br> Puntuación final:"+player.score+" "+"<br>Pulsa de nuevo para volver a empezar";
            /*Se selecciona la clase .enemy y con la funcion definida arriba se comprueba
            si chocaron, al chocar se ejecute la funcion de finalizar el juego
            Y se comprueba la posicion de item.y para que no este fuera del area establecida*/

            }
            function moveEnemy(car){
                let enemy=document.querySelectorAll('.enemy');
                enemy.forEach(function(item){

                    if(isCollide(car,item)){
                        console.log("Bang!");
                        endGame();
                    }
                    if(item.y >=750){
                        item.y=-300;
                        item.style.left=Math.floor(Math.random()*350)+"px";
                    }
                    else item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            /*Selecciona .car y se toma la variable road para limitar los movimientos y solo se mueva
            dentro del area establecida
            Si el condiciona es vedadero entonces se ejecuta las cosas del juego
            Y por ultimo se comprueba las teclas de las flechas para comprobar que los movimientos esten
            dentro del limite establecido */

            function gamePlay(){
                console.log("here we go");
                let car=document.querySelector('.car');
                let road=gameArea.getBoundingClientRect();
                if(player.start){
                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y>(road.top)){
                        player.y-=player.speed
                    }
                    if(keys.ArrowDown && player.y<(road.bottom)){
                        player.y+=player.speed
                    }
                    if(keys.ArrowLeft && player.x>0 ){
                        player.x-=player.speed
                    }
                    if(keys.ArrowRight && player.x<(road.width-70)){
                        player.x+=player.speed
                    }
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";
                    window.requestAnimationFrame(gamePlay);
                    console.log(player.score++);
                    player.score++;
                    let ps=player.score;
                    score.innerText="Score: "+ps;
                }
            }
            /*Se ejecuta al iniciar el juego cambiando el valor boleano a true
            se reinicia el score, y se llama a requestAnimationFrame para iniciar el ciclo
            de la animacion
            Con el FOR se  crean las lineas verticales de la calle
              */

            function start(){
                startScreen.classList.add('hide');
                gameArea.innerHTML="";
                player.start=true;
                player.score=0;
                window.requestAnimationFrame(gamePlay);

                for(x=0;x<8;x++){
                    let roadLine=document.createElement('div');
                    roadLine.setAttribute('class','lines');
                    roadLine.y=(x*150);
                    roadLine.style.top=roadLine.y+80;
                    gameArea.appendChild(roadLine);
                }

                /* Crea el div del coche del jugador y lo pone en el area donde empieza*/
                let car=document.createElement('div');
                car.setAttribute('class','car');
                gameArea.appendChild(car);

                player.x=car.offsetLeft;
                player.y=car.offsetTop+120;
                player.x=car.offsetWidth+120;


                /*Crea los elementos que seran los obstaculos
                Define la posicion y la cantidad*/
                for(x=0;x<3;x++){
                    let enemyCar=document.createElement('div');
                    enemyCar.setAttribute('class','enemy');
                    enemyCar.y=((x+1)*350)*-1;
                    enemyCar.style.top=enemyCar.y+"px";
                    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
                    gameArea.appendChild(enemyCar);
                }


            }
            
            
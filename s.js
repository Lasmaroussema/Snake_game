/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let dx, dy,a;

let lose = false;
dx = 0;
dy = 20;

let foodX, foodY;
let SnakeParts = [{x:200,y:200},{x:200,y:180},{x:200,y:160},{x:200,y:140}];


function randomFood()
{
   
        foodX = Math.floor((Math.random() * (canvas.width - 30)+20)/20)*20;
        foodY = Math.floor((Math.random() * (canvas.height - 30)+20)/20)*20;
    }

function generateFood()
{
    ctx.fillStyle = "green";
    ctx.fillRect(foodX, foodY, 20, 20);
}

function DrawSnake()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateFood();
    for (let index = 0; index < SnakeParts.length; index++)
    {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.fillRect(SnakeParts[index].x, SnakeParts[index].y, 20, 20);
        ctx.strokeRect(SnakeParts[index].x, SnakeParts[index].y, 20, 20);
        ctx.stroke();
    }
}

document.addEventListener("keydown", function (e)
{   
        if(e.keyCode== 40&&dy!=-20)
            {
                dy = 20;
                dx = 0;
                
            }
        if(e.keyCode== 39&&dx!=-20)
            {
                dy = 0;
                dx = 20;
                
            }
        if(e.keyCode== 38&&dy!=20)
            {
                dy = -20;
                dx = 0;
            }
        if(e.keyCode== 37&&dx!=20)
            {
                dy = 0;
                dx = -20;
            }
    })


function moveSnake()
{        
    console.log(dx, dy);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let index = SnakeParts.length-1; index >0; index--) {
                    SnakeParts[index].x = SnakeParts[index-1].x;
                    SnakeParts[index].y = SnakeParts[index-1].y;
                }
                SnakeParts[0].x += dx;
                SnakeParts[0].y += dy;
                DrawSnake();
                generateFood();
                eatFood();
                loseGame();     
    }




function eatFood()
{
    if (SnakeParts[0].x ==foodX&&SnakeParts[0].y==foodY)
    {
        ctx.clearRect(foodX, foodY, 20, 20);
        SnakeParts.unshift({ x:foodX+dx, y:foodY+dy});
        DrawSnake();
        randomFood();
        generateFood();
        document.querySelector(".score").innerHTML ++;
    }
}

function loseGame()
{
    let hitSelf;
    SnakeParts.slice(4,SnakeParts.length).forEach((e) => {
        if (e.x == SnakeParts[0].x && e.y == SnakeParts[0].y)
            hitSelf = true;
           })
    let hitUp = SnakeParts[0].y < 0;
    let hitDown = SnakeParts[0].y> canvas.height-20 ;
    let hitRight = SnakeParts[0].x > canvas.width-20;
    let hitLeft = SnakeParts[0].x < 0;
    if (hitDown || hitLeft || hitRight || hitSelf || hitUp)
    {
        clearInterval(a);
        document.querySelector(".ss").style.display = "none";
        document.querySelector(".score").innerHTML = "You Lose !";
    }

}
 
 function main()
 {
     randomFood();
     DrawSnake();
     generateFood();
     a=setInterval(() => {
         moveSnake();
     }, 100);
}
main();
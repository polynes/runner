let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 555;
canvas.height = 900;

let  life_count_box = document.getElementById("life_count");
let count_energy_box = document.getElementById("count_energy");


let StartGame = false;
let brheartStart=false;
let energyStart = false;
let lifeStart = false;

let frame = new Image();
frame.src="Frame 1.png";
let frameY = 0;
let runY =680;
let runX =205;
time=0;
move="none";

let run = new Image();
run.src="run.png";
let brheart = new Image();
brheart.src ="broken-heart.png";
let energy = new Image();
energy.src="energy.png";
let life = new Image();
life.src="life.png";

position=[45,205,365]
brheartX=0;
brheartY=0;
brheartStart=false;
lifeX=0;
lifeY=0;
lifeStart=false;
energyX=45;
energyY=0;
energyStart=true;
life_count=0;
count_energy=0;

window.onload=function(){

    ctx.drawImage(run,150,800);
    ctx.drawImage(frame,0, 0, 555, 900);
    ctx.font = '18px Arial Black';
    ctx.fillStyle = '#555';
    ctx.fillText('Нажмите ENTER для начала', 150, 160);
}

document.addEventListener("keydown", moveUp);

function moveUp(event){
    if (event.key =="Enter" && StartGame == false){
        StartGame = true;
        requestAnimationFrame(draw);}
    
    if (event.key=="ArrowRight") {
        runX+=160;
        if (runX>=365) runX=365;
    }
    if (event.key=="ArrowLeft") {
        runX-=160;
        if (runX<=45) runX=45;
    }
}

    
    function draw (){
        if (StartGame==true) requestAnimationFrame(draw); 
        ctx.clearRect (0, 0, 555,900);
        frameY -=2;
        if (frameY <=-900) {frameY = 0;}
        ctx.drawImage(frame,0, frameY);
        ctx.drawImage(run, runX,680);

    if (brheartStart==true) {
        brheartY += 6;
        if (brheartY >=800) 
            {brheartStart = false;
                brheartY=-100;}
     ctx.drawImage(brheart,brheartX, brheartY,100,100);
    }
    
    if (energyStart==true) {
        energyY += 6;
        if (energyY >=800) 
            {energyStart = false;
            energyY=-100;}
        ctx.drawImage(energy, energyX, energyY,100,100);
    }

    if (lifeStart==true) {
        lifeY += 6;
        if (lifeY >=800) 
            {lifeStart = false;
                lifeY=-100;}
        ctx.drawImage(life,lifeX, lifeY,100,100);
    }
    if (brheartX==runX && brheartY>=runY){
        console.log("no")
        StartGame=false;
     }
            
     if (runX==energyX && energyY>=runY-5 && energyY<=runY+5  ){
        console.log("sdsdsdssdd")
           energyStart=false;
           count_energy+=1;
           energyY=-100
    }
        count_energy_box.innerText=count_energy;
     
     
     if (lifeX==runX &&lifeY>=runY-5 &&lifeY<=runY+5){
        lifeStart=false;
        life_count+=1;
        lifeY=-100
     }
     life_count_box.innerText = life_count;

    if (StartGame==false){
        ctx.fillText('GAME OVER', 180, 300)
    }
}

    setInterval(() => {
        brheartY=0;
        brheartX = position[Math.floor(Math.random()*3)];   
        brheartStart=true;
    }, 8000)
    
    setInterval(() => {
        energyY=0;
        energyX = position[Math.floor(Math.random()*3)];   
        energyStart=true;
    }, 6000)
    
    setInterval(() => {
        lifeY=0;
        lifeX = position[Math.floor(Math.random()*3)];   
        lifeStart=true;
    }, 4000)



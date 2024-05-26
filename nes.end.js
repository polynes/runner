let  cvs = document.getElementById("canvas");
 ctx = cvs.getContext("2d");
cvs.width=500;
cvs.height=800;

let count_life_box = document.getElementById("count_life_box");
let count_energy_box = document.getElementById("count_energy_box");
let money_box_img = document.getElementById("money_box_img");
let count_fuel = 200;
count_fuel_box.style.width=count_fuel+"px";
let ground = new Image();
ground.src = "Frame 1.png";
let car = new Image();
car.src = "run.png";
let fuel = new Image();
fuel.src = "energy.png"
let stone = new Image();
stone.src = "broken-heart.png"
let money = new Image();
money.src = "life.png"

gameStart = false;
groundY=-800;
carX = 205;
position=[45,205,365];
fuelX=0;
fuelY=0;
fuelStart=false;
stoneX=0;
stoneY=0;
stoneStart=false;
moneyX=0;
moneyY=0;
moneyStart=false;
count_money=0;
ctx.font = '22px Arial Black';
window.onload = function () {
    ctx.drawImage(ground, 0, groundY);
    ctx.drawImage(car, carX, 620);
}
document.addEventListener("keydown", moveUp);

function moveUp(event) {
    if (event.key=="Enter" && gameStart == false) {
        gameStart = true;
        requestAnimationFrame(draw);}
    
    if (event.key=="ArrowRight") {
        carX+=160;
        if (carX>=365) carX=365;
    }
    if (event.key=="ArrowLeft") {
        carX-=160;
        if (carX<=45) carX=45;
    }
}
function draw(){
    if (gameStart==true){requestAnimationFrame(draw);ctx.clearRect (0, 0, 500, 800);}
    // АНИМАЦИЯ ФОНА
    groundY+=2
    if (groundY>=0) groundY=-800;
    // ОТРИСОВКА ОБЪЕКТОВ
    ctx.drawImage(ground, 0, groundY);
    ctx.drawImage(car, carX, 620);
    if (fuelStart==true) {
        fuelY += 6;
        if (fuelY >=800) 
            {fuelStart = false;
            fuelY=-100;}
        ctx.drawImage(fuel, fuelX, fuelY);
    }
    if (stoneStart==true) {
        stoneY += 6;
        if (stoneY >=800) 
            {stoneStart = false;
            stoneY=-100;}
        ctx.drawImage(stone, stoneX, stoneY,120,40);
    }
    if (moneyStart==true) {
        moneyY += 6;
        if (moneyY >=800) 
            {moneyStart = false;
                moneyY=-100;}
        ctx.drawImage(money, moneyX, moneyY,80,40);
    }
    // АНИМАЦИЯ Уровня топлива
    count_fuel-=0.1;
    if (carX==fuelX && fuelY>600 && fuelY<640 && fuelStart==true){
        count_fuel+=15;
        fuelStart=false;
    }
    count_fuel_box.style.width=count_fuel+"px";
    //правила пересечения с объектами
    if (count_fuel<=0){
        gameStart=false;
    }
    if (carX==stoneX && stoneY>600 && stoneY<640){
        gameStart=false;
    }
    if (carX==moneyX && moneyY>600 && moneyY<640){
        moneyStart=false;
        count_money+=1;
        money_box_img.style.animation = "bigmoney 2s 1";
        
    }
    count_money_box.innerText = count_money;
    
    if(gameStart==false){
        ctx.fillText('Game over', 150, 300);
    }
}
time=0
setInterval(() => {
     // ПОЯВЛЕНИЕ ТОПЛИВА
     fuelY=0;
     fuelX = position[Math.floor(Math.random()*3)];   
     fuelStart=true;
}, 8000)

setInterval(() => {
    // ПОЯВЛЕНИЕ камней
    stoneY=0;
    stoneX = position[Math.floor(Math.random()*3)];   
    stoneStart=true;
}, 6000)
setInterval(() => {
    // ПОЯВЛЕНИЕ денег
    moneyY=0;
    money_box_img.style.animation = "none";
    moneyX = position[Math.floor(Math.random()*3)];   
    moneyStart=true;
}, 4000)
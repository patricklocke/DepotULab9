/// <reference path="typings/browser.d.ts" /> 

let containerWidth = 800;
let containerHeight = 800;

let blinking = [];

interface IVehicle {
    damageTolerance: number;
    speed: number;   
    damagePoints: number
}

interface ICar extends IVehicle {
    reverse: boolean;  
}

interface ICruiser extends ICar {
    siren: boolean;
}

class Vehicle implements IVehicle{
    public damagePoints: number = 0 
    public damageTolerance: number;
    public speed: number;
    public className: string;
    public vehicleElement: any;//double check this!
    constructor(damageTolerance: number, speed: number){
        this.damageTolerance = damageTolerance,
        this.speed = speed
    }
 
    moveRight(): void{
    $(this.vehicleElement).animate({
            left: containerWidth
        }, {
            duration: this.speed,
            queue: false,
            complete: () => {
                $(this.vehicleElement).css({left: -50});
                this.moveRight();
            }
        }); 
    }
   moveLeft(): void {
        $(this.vehicleElement).animate({
            left: -50
        }, {
            duration: this.speed,
            queue: false,
            complete: () => {
                $(this.vehicleElement).css({left: containerWidth});
                this.moveLeft();
            }
        });
    }

    moveUp(): void {
        $(this.vehicleElement).animate({
            top: -50
        }, {
            duration: this.speed,
            queue: false,
            complete: () => {
                $(this.vehicleElement).css({top: containerHeight});
                this.moveUp();
            }
        });
    }

   moveDown():void {
        $(this.vehicleElement).animate({
            top: containerHeight
        }, {
            duration: this.speed,
            queue: false,
            complete: () => {
                $(this.vehicleElement).css({top: 0});
                this.moveDown();
            }
    });   
        
   }
    move(): void {
        console.log('forgot to implement move on child class');
    }
    
    damage(): void {
        this.damagePoints++;
        if (this.damagePoints >= this.damageTolerance) {
            this.remove();
        }
    }
    remove(): void {
        document.getElementById('battle-container').removeChild(this.vehicleElement);
        var target = vehicles.indexOf(this);
        if (target !== -1) {
            vehicles.splice(target, 1);
            }
    }
    add(): void {
        this.vehicleElement = document.createElement('div');
        this.vehicleElement.style.top = Math.floor(Math.random() * containerHeight);
        this.vehicleElement.style.left = Math.floor(Math.random() * containerWidth);
        this.vehicleElement.classList.add('vehicle', this.className);
        document.getElementById('crash_derby').appendChild(this.vehicleElement);
}
    collided(victim: Vehicle):boolean {
    var $thisDiv = $(this.vehicleElement);
    var $victimDiv = $(victim.vehicleElement);
    var thisTop = $thisDiv.position().top;
    var thisLeft = $thisDiv.position().left;
    var victimTop = $victimDiv.position().top;
    var victimLeft = $victimDiv.position().left;

    if (
            (thisTop !== victimTop && thisLeft !== victimLeft) &&
            !(
                ((thisTop + $thisDiv.height()) < victimTop) ||
                (thisTop > (victimTop + $victimDiv.height())) ||
                ((thisLeft + $thisDiv.width()) < victimLeft) ||
                (thisLeft > (victimLeft + $victimDiv.width()))
            )
        )
        {
            return true;
        } else {
            return false;
        }

    }
}

class Car extends Vehicle {
    isInReverse: boolean;
    constructor() {super(2, 500);
    this.className = 'car'
    this.isInReverse = false;
    }
    move(): void{
        this.moveRight();
    }
    reverse(): void{
        $(this.vehicleElement).stop();
        if (this.isInReverse) {
            this.move();
        } else {
            this.moveLeft();
        }
        this.isInReverse = !this.isInReverse;  
        }
}
class Cruiser extends Car {
    blinking: boolean;
    constructor()
    {super();
     this.damageTolerance = 3;
     this.className = 'cop';
    }
    move():void{
        this.moveDown();
    }
    reverse(): void{
        $(this.vehicleElement).stop();
        if (this.isInReverse) {
            this.move();
        } else {
            this.moveUp();
        }
        this.isInReverse = !this.isInReverse;  
    }
    startSiren(): void {
        this.vehicleElement.classList.add('blinking');    
    }
    stopSiren(): void {
        this.vehicleElement.classList.remove('blinking');
    }
    
}
class Motorcycle extends Vehicle {
    constructor(){
        super(1,2500)
        this.className = 'motorcycle'
    }
    move(){
        this.moveRight();
        this.moveDown();
    }
}
class Tank extends Vehicle {
    constructor(){
        super(10,10000);
        this.className= 'tank'
    }
    move(): void{
        this.moveUp();
        this.moveLeft();
    }

}
let vehicles: Array<Vehicle> = []
let sirensBlinking = false;

function createButtonClicked(type) {
    var vehicle: Vehicle;
    switch (type) {
        case 'car':
            vehicle = new Car();
            break;
        case 'cop':
            vehicle = new Cruiser();
            break;
        case 'moto':
            vehicle = new Motorcycle();
            break;
        case 'tank':
            vehicle = new Tank();
            break;
    }
    vehicle.add();
    vehicle.move();
    if (sirensBlinking && vehicle instanceof Cruiser) {
        vehicle.vehicleElement.classList.add('blinking');
    }
    vehicles.push(vehicle);
}

function shiftGears(){
    for (let i = 0; i < vehicles.length; i++) {
            let vehicle = vehicles[i];
            if (vehicle instanceof Cruiser) {
                if (sirensBlinking) {
                    vehicle.stopSiren();
                } else {
                    vehicle.startSiren();
                }
            }
        }
    sirensBlinking = !sirensBlinking;  
}
function toggleSirens() {
    for (let i = 0; i < vehicles.length; i++) {
        let vehicle = vehicles[i];
        if (vehicle instanceof Cruiser) {
            if (sirensBlinking) {
                vehicle.stopSiren();
            } else {
                vehicle.startSiren();
            }
        }
    }
    sirensBlinking = !sirensBlinking;
}

function checkCollisions() {
    for (let k = 0; k < vehicles.length; k++) {
        let vehicle = vehicles[k];
        // Check if this current vehicle has collided with any other vehicle in the game
        for (let m = 0; m < vehicles.length; m++) {
            let victim = vehicles[m];
            if (vehicle.collided(victim)) {
                vehicle.damage();
                victim.damage();
            }
        }
    }
}

setInterval(checkCollisions, 750);

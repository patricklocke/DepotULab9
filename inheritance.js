/// <reference path="typings/browser.d.ts" /> 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var containerWidth = 800;
var containerHeight = 800;
var vehicles = [];
var blinking = [];
var Vehicle = (function () {
    function Vehicle(damageTolerance, speed, className) {
        this.damageTolerance = damageTolerance,
            this.speed = speed,
            this.className = className;
    }
    return Vehicle;
}());
var Cars = (function (_super) {
    __extends(Cars, _super);
    function Cars(damageTolerance, speed, className, reverse) {
        _super.call(this, damageTolerance, speed, className);
        this.damageTolerance = damageTolerance;
        this.speed = speed;
        this.className = className;
        this.reverse = reverse;
    }
    return Cars;
}(Vehicle));
var Cruisers = (function (_super) {
    __extends(Cruisers, _super);
    function Cruisers(damageTolerance, speed, className, reverse, siren) {
        _super.call(this, damageTolerance, speed, className, reverse);
    }
    ;
    return Cruisers;
}(Cars));
function car() {
    new Cars(2, 1, 'car', true);
    this.className = 'car';
    this.add();
}
function cruiser() {
    new Cruisers(3, 1, 'cop', true, true);
    this.className = 'cop';
    this.add();
}
function motorcycle() {
    new Cars(1, 3, 'moto', false);
    this.className = 'moto';
    this.add();
}
function tank() {
    new Cars(10, 0.5, 'tank', false);
    this.className = 'tank';
    this.add();
}
function add() {
    var posx = (Math.random() * 450).toFixed();
    var posy = (Math.random() * 450).toFixed();
    this.div = document.createElement('div');
    this.div.classList.add(this.className, 'vehicle');
    $(this.div).css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px'
    });
    document.getElementById('battle-container').appendChild(this.div);
    vehicles.push(this);
}
function remove() {
    document.getElementById('battle-container').removeChild(this.vehicleElement);
    var target = vehicles.indexOf(this);
    if (target !== -1) {
        vehicles.splice(target, 1);
    }
}
function damage() {
    this.damagePoints++;
    if (this.damagePoints >= this.damageTolerance) {
        this.remove();
    }
}
// function collided(victim) {
//     var $thisDiv = $(this.vehicleElement);
//     var $victimDiv = $(victim.vehicleElement);
//     var thisTop = $thisDiv.position().top;
//     var thisLeft = $thisDiv.position().left;
//     var victimTop = $victimDiv.position().top;
//     var victimLeft = $victimDiv.position().left;
//     if (
//             (thisTop !== victimTop && thisLeft !== victimLeft) &&
//             !(
//                 ((thisTop + $thisDiv.height()) < victimTop) ||
//                 (thisTop > (victimTop + $victimDiv.height())) ||
//                 ((thisLeft + $thisDiv.width()) < victimLeft) ||
//                 (thisLeft > (victimLeft + $victimDiv.width()))
//             )
//         )
//         {
//             return true;
//         } else {
//             return false;
//         }
// }
// function collidedTracking() {
//     for (var k = 0; k < vehicles.length; k++) {
//         var vehicle = vehicles[k];
//         for (var m = 0; m < vehicles.length; m++) {
//             var victim = vehicles[m];
//             if (vehicle.hasCollidedWith(victim)) {
//                 vehicle.damage();
//                 victim.damage();
//             }
//         }
//     }
// }
// setInterval(collidedTracking, 750);   
//add()
// this.vehicleElement = document.createElement('div');
// this.vehicleElement.style.top = Math.floor(Math.random() * containerHeight);
// this.vehicleElement.style.left = Math.floor(Math.random() * containerWidth);
// this.vehicleElement.classList.add('vehicle', this.className);
// document.getElementById('battle-container').appendChild(this.vehicleElement);
// }
//  
//function newVehicleClick(type) {
//         var vehicle;
//         switch (type) {
//             case 'car':
//                 vehicle = new car();
//                 break;
//             case 'cop':
//                 vehicle = new cruiser();
//                 break;
//             case 'moto':
//                 vehicle = new motorcycle();
//                 break;
//             case 'tank':
//                 vehicle = new tank();
//                 break;
//         }
//        vehicles.push(this);
//         // this.move();
//         // if (sirensBlinking && vehicle instanceof Cruiser) {
//         //     vehicle.vehicleElement.classList.add('blinking');
//         // }
//         }

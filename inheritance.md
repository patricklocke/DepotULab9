### Instructions

Inheritance is the means in which javascript allows developers to give an object the same properties of another without excessive code duplication. Javascript does this by delegating failed look ups of an object up the [prototype chain (tree)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

There are multiple patterns, including: functional, prototypal and pseudoclassical.

Functional:
		~~~~~~
		var Person = function(name){
			var obj = {name: name};
			obj.greet = function(){
				return 'Hi, I am ' + obj.name + '.';
			};
			return obj;
		};

		var bob = Person('bob');
		bob.greet(); // 'Hi, I am bob.'

		(bob instanceof Person) //false

		~~~~~~

Prototypal:
		~~~~~~
		var Person = function(name){
			var obj = Object.create(Person.prototype);
			obj.name = name;
			return obj;
		};

		Person.prototype.greet = function(){
			return 'Hi, I am ' + this.name;
		}

		var bob = Person('bob');
		bob.greet()//'Hi, I am bob.'
		(bob instanceof Person) //true
		~~~~~~

Pseudoclassical:
		~~~~~~
		var Person = function(name){
			this.name = name;
		};

		Person.prototype.greet = function(){
			return 'Hi, I am ' + this.name;
		}
		//Uses the keyword new to instantiate an object
		var bob = new Person('bob');
		bob.greet()//'Hi, I am bob.'
		(bob instanceof Person) //true
		~~~~~~


### Further Reading
May be handy to create sub classes of Vehicle [fn.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

### Basic Req's
Create a mini motor vehicle game using the pseudo-classical pattern.

There should be 5 vehicle types:

Vehicle
Cars
Cop Car (A Cop Car should inherit from a Car)
Tank
Motorcycles

Use jquery to add animation and interact with the vehicles. The vehicles should have unique colors and and be displayed as `div`s on the page. The vehicles should be initially placed at random on the screen.

* Vehicle:
		-should be the super class all the other vehicles inherit from.
		-should have the shared methods move, damage and totaled.
			move - should move the car around the page
			damage - points a vehicle has accrues if it collides with another vehicle. Each vehicle can only get a certain amount of damage points before totaled
			remove - If totaled the should be removed from the dom
        -should have a speed property (think of it as a multiplier)

* Cars:
		-should be a sub class of vehicle with all shared properties
		-considered totaled once has 2 damage points
		-only moves horizontally across the browser
		-has a reverse function to reverse the direction of the car

* Cop Car:
		-should be a sub class of Car with all shared properties
		-considered totaled once has 3 damage points
		-only moves vertically across the browser
		-has a siren function which allows vehicle to blink at a set interval

* Motorcycles:
		-should be a sub class of vehicle with all shared properties
		-considered totaled after hit once (one damage point)
		-move diagonally
		-should set the speed property so that it moves twice as fast as normal vehicles

* Tank:
		-should be a sub class of vehicle with all shared properties
		-considered totaled once has 10 damage points
		-should set the speed property so that it moves half as fast as normal vehicles

**Hints/Suggestions**
* Before worrying about detecting whether vehicles have collided, just make it where when you click on a vehicle on the screen it calls `damage()` on that vehicle. Once you get that working (and the car is removed once the damage threshold is reached), then you can attempt having it automatically damage when Vehicles collide on the screen
* `damage()` can be a function on the Vehicle super class that just increments the damage value by 1, and checks to see if it should call `remove()`.

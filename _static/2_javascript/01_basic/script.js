
console.log("Hello World!")

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} je zvíře`);
    }
}

class Dog extends Animal {
    speak() {
        super.speak();
        console.log(`${this.name} štěká`);
    }
}
class Cat extends Animal {
    speak() {
        super.speak();
        console.log(`${this.name} mňouká`);
    }
}

const dog = new Dog("Pluto");
const cat = new Cat("Garfield");
dog.speak();
cat.speak();
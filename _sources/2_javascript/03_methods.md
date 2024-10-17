Funkce a třídy
==============

* [Tutoriál W3C - třídy](https://www.w3schools.com/js/js_classes.asp)
* [Referenční příručka W3C - třídy](https://www.w3schools.com/jsref/jsref_classes.asp)


Funkce
------

V JavaScriptu můžete definovat funkci pomocí klíčového slova `function`, následovaného názvem funkce, seznamem parametrů v závorkách a tělem funkce v závorkách `{}`. Parametry mohou mít výchozí hodnoty, které jsou použity, pokud nejsou při volání funkce poskytnuty žádné hodnoty.

```javascript
function greet(name = "anonyme") {
    console.log(`Ahoj, ${name}!`);
}

greet("Alice"); // Ahoj, Alice!
greet();        // Ahoj, anonyme!
```

Vzhledem k tomu, že je JavaScript dynamicky typovaný jazyk, nedefinuje se u funkcí ani typ návratové hodnoty. Pokud funkce neobsahuje žádnou návratovou hodnotu `return`, je výsledkem volání hodnota `undefined`:

```javascript
function a() {
    console.log("a")
    return 1
}

function b() {
    console.log("b")
}

console.log(a()) // 1
console.log(b()) // undefined
```

V JavaScriptu je možné použít i alternativní definici funkce:

```javascript
let add = function(x, y) { return x+y };
console.log(add(2,3));
```

Případně použít **arrow notaci**, `() => {}`:

```javascript
let add = (x, y) => { return x+y };
console.log(add(2,3));
```

Případně v ještě kratší variantě, kdy se tělo funkce vejde na jeden řádek a výsledek výrazu je zároveň výsledkem volání funkce

```javascript
let add = (x, y) => x+y;
console.log(add(2,3));
```

Tyto zkrácené konstrukce se jak uvidíme v JavaScriptu poměrně často vyskytují, umožňují definovat dynamicky funkce za běhu programu, tyto dynamicky definované funkce (uložené v proměnných, které se mohou stát parametry jiných funkcí a tak se skládat) jsou jedním ze základních nástrojů [funkcionálního paradigmatu](https://en.wikipedia.org/wiki/Functional_programming) programování, což je trochu jiný styl návrhu kódu oproti například [objektově orientovanému](https://en.wikipedia.org/wiki/Object-oriented_programming) návrhu.


Třídy
-----

JavaScript nabízí standardní způsob, jak definovat třídy. Proměnné třídy se definují v konstruktoru `constructor`, metody pak už bez klíčového slova `function`:

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Ahoj já jsem ${this.name} a je mi ${this.age} let.`);
    }
}

const alice = new Person("Alice", 30);
alice.greet(); // Ahoj já jsem Alice a je mi 30 let.
```


### Dědičnost, volání metody třídy předka

V JavaScriptu můžete použít klíčové slovo `extends` k vytvoření třídy, která dědí z jiné třídy. Metodu třídy předka můžete volat pomocí `super`:

```javascript
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
```

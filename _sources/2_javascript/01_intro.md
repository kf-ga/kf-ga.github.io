Seznámení s JavaScriptem
========================

* [Tutoriál JavaScriptu od W3C](https://www.w3schools.com/js/default.asp)
* [Referenční příručka od W3C](https://www.w3schools.com/jsref/default.asp)

JavaScript je vysokoúrovňový, interpretovaný programovací jazyk, který je nedílnou součástí moderních webových prohlížečů a umožňuje do webových stránek přidávat interaktivní prvky na webové stránky. Jeho běh zajišťuje přímo prohlížeč a tedy součástí klientské (nikoliv serverové) části webové aplikace.

```{admonition} ... i když ne tak docela!
:class: note

Dnes existují i možnosti, jak spouštět JavaScript mimo webový prohlížeč a dokonce v něm psát celé aplikace, včetně serverové části, např. [Node.js](https://nodejs.org/en). Zároveň existují i další, rozšířené varianty JavaScriptu např. [TypeScript](https://www.typescriptlang.org/), nebo [JSX](https://reactjs.org/docs/introducing-jsx.html), které přinášejí další možnosti pro tvorbu (nejen) webových aplikací.

V této kapitole se budeme věnovat základnímu, *klasickému* JavaScriptu, běžícímu přímo prohlížeči.
```

Podle názvu by se mohlo zdát, že JavaScript je varianta jazyka Java, ale ve skutečnosti se docela liší. Nicméně stejně jako Java patří do velké rodiny [C-jazyků](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) a jeho syntaxe je tak podobná Javě. 

Nyní se seznámíme s některými specifiky JavaScriptu, kterými se liší od jiných programovacích jazyků.

```{admonition} Verze JavaScriptu
:class: note

JavaScript standard se také někdy označuje jako **ECMAScript** a dále budu předpokládat verzi JavaScriptu minimálně ES6, nebo-li ECMAScript 2015, která je dostupná (téměř) ve všech dnešních prohlížečích.
```

Hello World!
------------

JavaScript nemá žádný standardní výstup (`stdout`), pokud chceme jednoduše vypsat nějakou informací, můžeme použít například funkci `console.log`. Ta vypisuje do konzole prohlížeče, kterou nalezneme ve vývojářských nástrojích. Pomocí `console.log` lze vypisovat i komplexní datové struktury a objekty.

```javascript
console.log("Hello, World!");
```

Do webové stránky je možné (podobně jako u CSS) vložit kód přímo do stránky:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>JavaScript Example</title>
    </head>
    <body>
        <script>
            console.log("Hello, World!");
        </script>
    </body>
</html>
```

Případně uložit kód v externím souboru a ten pak vložit do stránky:

```html
<!doctype html>
<html lang="en">
    <head>
        <title>JavaScript Example</title>
    </head>
    <body>
        <script src="script.js"></script>
    </body>
</html>
```

JavaScript nemá ani standardní vstup (`stdin`), uživatelský vstup je řešen interakcí uživatele s prvky stránky, jak si ukážeme v kapitole [](05_dom.md).

```{admonition} Pozor
:class: warning

V příkladech na JavaScript se často objevuje ještě funkce `document.write`, která vypisuje nikoliv do konzole, ale přímo do webové stránky. Její používání **se ale už nedoporučuje**, protože za určitých okolností může přepsat celý obsah stránky.
```

JavaScript je dynamicky typovaný
--------------------------------

JavaScript patří mezi [dynamicky typované jazyky](https://en.wikipedia.org/wiki/Type_system#DYNAMIC), to znamená, že v JavaScriptu se u proměnných nedefinují typy, typ proměnné je určen podle hodnoty, která je do ní uložena a může se během běhu programu dokonce měnit:

```javascript
a=2;
console.log(a);
a="Hello";
console.log(a+" "+5);
```


### Klíčová slova `let`, `const`

Při definici proměnné je možné ještě před názvem proměnné použít klíčová slova `let` a `const`:

- **`let`**: Umožňuje definovány proměnné s blokovým rozsahem, což znamená, že jsou přístupné pouze v bloku, ve kterém byly definovány:

    ```javascript
    {
        let a = 55;
        console.log(a); 
    }
    console.log(a); // Failure
    ```

- **`const`**: Umožňuje definovat proměnné, jejichž hodnotu nelze změnit po inicializaci. Podobně jako `let`, i `const` má blokový rozsah.

    ```javascript
    const a = 55;
    console.log(a);
    a = 66; // Failure
    ```

Použití `let` a `const` je doporučeno pro moderní JavaScriptový kód pro lepší správu proměnných a zabránění nechtěným chybám způsobeným nezamýšlenými změnami hodnot.

Dále JavaScript používá ještě klíčové slovo **`var`**, které umožňuje definici proměnné viditelné i mimo svůj blok. Je to nicméně zastaralá konstrukce a nemělo by se v moderním kódu používat.

```javascript
{
    var a = 55;
    console.log(a);
}
console.log(a); // OK
```


Ke zjištění aktuálního typu proměnné je možné použít operátor `typeof`, který vrátí řetězec s názvem typu proměnné:

```javascript
a=1;
b="Hello";
c=true;
console.log(typeof a); // "number"
console.log(typeof b); // "string"
console.log(typeof c); // "boolean"
```


Základní datové struktury
-------------------------

JavaScript podporuje v základu některé komplexnější datové struktury.


### Pole

**Pole** indexované celočíselnými hodnotami se v JavaScriptu zapisuje do hranatých závorek `[]`. Jeho velikost se alokuje dynamicky podle potřeby:

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[1]);
fruits[5] = "orange";
```

V JavaScriptu máte k dispozici řadu vestavěných funkcí pro práci s poli, které umožňují efektivní manipulaci s prvky pole a vytvářet tak komplexnější datové struktury založené na polích:

- **`push()`**: Přidá jeden nebo více prvků na konec pole.
   
    ```javascript
    let fruits = ["apple", "banana"];
    fruits.push("cherry");
    console.log(fruits); // ["apple", "banana", "cherry"]
    ```

- **`pop()`**: Odstraní poslední prvek z pole a vrátí ho.
 
    ```javascript
    let fruits = ["apple", "banana", "cherry"]
    let lastFruit = fruits.pop();
    console.log(lastFruit); // "cherry"
    console.log(fruits); // "["apple", "banana"]"
    ```
```{admonition} Zásobník
:class: tip

S funkcemi `push` a `pop` je možné realizovat zásobník.
```

- **`unshift()`**: Přidá jeden nebo více prvků na začátek pole.
    ```javascript
    let fruits = ["apple", "banana"];
    fruits.unshift("mango");
    console.log(fruits); // ['mango', 'apple', 'banana']
    ```
- **`shift()`**: Odstraní první prvek z pole a vrátí ho.
  
    ```javascript
    let fruits = ['mango', 'apple', 'banana'];
    let firstFruit = fruits.shift();
    console.log(firstFruit); // "mango"
    console.log(fruits); // ["apple", "banana"]
    ```

```{admonition} Fronta
:class: tip

S funkcemi `push` a `unshift` je možné realizovat frontu.
```

- **`slice()`**: Vrátí nové pole obsahující kopii části pole (**řez polem**). V parametrech ze zadá počáteční a koncový index prvku, který má nové pole obsahovat:
   
    ```javascript
    let fruits = ["apple", "banana", "cherry", "mango"];
    let someFruits = fruits.slice(1, 3);
    console.log(someFruits); // ["banana", "cherry"]
    ```

- **`splice()`**: Slouží k odstranění, přidání nebo nahrazení prvků v poli. V parametrech se zadá index, ze kterého se má odstranit, počet prvků, které se mají odstranit, a volitelně můžeme přidat nové prvky:
  
    ```javascript
     let fruits = ["apple", "banana", "cherry", "mango"];
     let someFruits = fruits.splice(1, 2, "orange");
     console.log(someFruits); // ["banana", "cherry"]
     console.log(fruits); // ["apple", "orange", "cherry"]
     ```

- **`indexOf()`**: Vrátí index prvního výskytu zadaného prvku v poli nebo -1, pokud pole prvek neobsahuje.

    ```javascript
    let fruits = ["apple", "banana", "cherry", "mango"];
    let index = fruits.indexOf("banana");
    console.log(index); // 1
    ```

- **`length`**: Vlastnost pole, která vrátí počet prvků v poli.

    ```javascript
    let fruits = ["apple", "banana", "cherry", "mango"];
    console.log(fruits.length); // 4
    ```

Úplný seznam funkcí JavaScript pole naleznete v [referenční příručce](https://www.w3schools.com/jsref/jsref_obj_array.asp).

### Slovník

**Slovník** (v JavaScriptu také označovaný jako **objekt**) je datové struktura obsahující páry `klíč:hodnota`, uzavřená ve složených závorkách `{}`. Je možné indexovat jak pomocí objektové notace `.`, tak pomocí notace pole `[]`:

```javascript
let person = {
    name: "John",
    age: 30,
};
console.log(person.name);  // "John"
console.log(person["age"]);  // 30
```

Do slovníku je možné dynamicky přidávat nové prvky, případně mazat pomocí operátoru `delete`:

```javascript
person.isStudent=true; // add
delete person.age;  // delete
console.log(person);  // { "name": "John", "isStudent": true }
```

Úplný seznam funkcí JavaScript objektu naleznete v [referenční příručce](https://www.w3schools.com/jsref/jsref_obj_object.asp).


### JSON

**JSON (JavaScript Object Notation)** je lehký formát pro výměnu dat. Je snadno čitelný pro lidi a snadno zpracovatelný pro počítače. Používá se například pro přenos dat mezi serverem a webovou aplikací jako alternativa k XML:

```javascript
// Objekt v JSON
{
    "name": "John",
    "age": 30,
    "isStudent": false
}
```

JSON objekt je možné převést na text a nazpět:

```javascript
// Převod objektu JavaScript na JSON
let obj = { name: "John", age: 30, isStudent: false };
let jsonString = JSON.stringify(obj);

// Převod JSON zpět na objekt JavaScript
let jsonObj = JSON.parse(jsonString);
console.log(jsonObj.name); // "John"
```

Na rozdíl od slovníku (objektu) má formát JSON striktnější pravidla, například klíče musí být uvedeny v uvozovkách. Objekt může obsahovat například i funkce, což v JSON nemůže.

### `null` a `undefined`

Kromě základní hodnoty `null`, kterou známe z jiných jazyků a označuje *prázdnou hodnotu* proměnné, pracuje JavaScript také z hodnotou `undefined`, která má trošku jiný význam. Zatímco `null` znamená že proměnná *existuje*, ale *nemá žádnou hodnotu*, `undefined` znamená, že proměnná *vůbec neexistuje*, *není definována*. Např.:

```javascript
console.log(typeof a) // undefined

arr=[1,2,3]
console.log(typeof arr[4]) // undefined

obj={a:1, b:2}
console.log(typeof obj.c) // undefined

```

Je také dobré mít na paměti, jak se chovají hodnoty `null` a `undefined` při porovnání mezi sebou a jinými hodnotami. Ne vždy je totiž porovnání intuitivní:

```javascript
console.log(null) // null
console.log(undefined) // undefined

console.log(typeof null) // object
console.log(typeof undefined) // undefined

console.log(null==undefined) // true
console.log(null===undefined) // false

console.log(0==undefined) // false
console.log(0==null) // false

console.log(false==undefined) // false
console.log(false==null) // false
```

````{admonition} Opravdu se to rovná
:class: note

Povšimněte si použití operátoru `===` označovaného jako **strict equal**, který se u dynamicky typovaných jazyků používá pro ověření nejen rovnosti dvou proměnných, ale také rovnosti jejich typů. V dynamicky typovaných jazycích jsou totiž některé proměnné různého typu považované za ekvivalentní, například:

```javascript
console.log(0==false); // true
console.log(1==true); // true
console.log(false==""); // true
console.log(false==[]); // true
```

Naopak, jindy se chová porovnávání poněkud neintuitivně:

```javascript
console.log(null==false); // false
console.log(null==0); // false
console.log(true=="a"); // false
```
    
````


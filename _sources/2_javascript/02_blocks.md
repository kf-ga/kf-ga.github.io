Řídící bloky
============

* [Referenční příručka W3C - řídící bloky](https://www.w3schools.com/jsref/jsref_statements.asp)

JavaScript nabízí obvyklou sadu řídících struktur, proto jen ve stručnosti jejich výčet:

Podmínky
--------

### Konstrukce `if` - `else if` - `else`

```javascript
let number = 10;

if (number > 10) {
    console.log("Číslo je větší než 10.");
} 
else if (number < 10) {
    console.log("Číslo je menší než 10.");
} 
else {
    console.log("Číslo je přesně 10.");
}
```


### Konstrukce `if` - `in`

Umožňuje otestovat, zdali se ve slovníku nachází zadaný klíč. 

```javascript
let obj = {a: 1, b: 2, c: 3};
if ("a" in obj) {
    console.log("Yes")
}
else {
    console.log("No")
}
```

```{admonition} Pozor
:class: warning
Operátor `in` testuje přítomnost **kliče**, nikoliv **hodnoty**.
```


Práce s výjimkami
-----------------

### Konstrukce `try` - `catch` - `finally`

```javascript
try {
    throw new Error("Chyba zde");
} 
catch (error) {
    console.log(error.message);
} 
finally {
    console.log("Vždy spustit");
}
```


Cykly
-----

### `for`

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```


### `while`

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```


### `for` - `of`

Tento cyklus je určen pro procházení hodnot seznamů (*enumerable*), například pole:

```javascript
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
    console.log(value);
}
```


### `for` - `in`

Tento cyklus je určen pro procházení iterovatelných objektů, například objektu:

```javascript
let obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
    console.log(key, obj[key]);
}
```

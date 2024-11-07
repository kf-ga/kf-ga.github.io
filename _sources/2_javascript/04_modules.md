Moduly v JavaScriptu
====================

* [Tutoriál od W3C - moduly](https://www.w3schools.com/js/js_modules.asp)

**Moduly** (někdy označované jako **ES6 moduly**, podle verze JavaScriptu, kdy byly standardizovány) v JavaScriptu umožňují rozdělit kód na menší, lépe spravovatelné části, které pak lze importovat a používat v jiných souborech. Moduly jsou izolovány, což znamená, že proměnné a funkce definované v modulu nejsou automaticky dostupné v jiných skriptech bez explicitního importu. To pomáhá předejít konfliktům jmen a usnadňuje udržovatelnost kódu.


Klíčová slova `export`, `import`
--------------------------------

Příkaz `export` slouží k označení proměnných, funkcí, tříd nebo jakýchkoliv jiných prvků, které mohou být použity v jiném modulu. Modul definující například třídu pro export může vypadat takto:

```javascript
class MyClass {
    // ...
}
export { MyClass };
```

V jiném souboru pak můžeme třídu importovat pomocí příkazu `import`:

```javascript
import { MyClass } from "./mymodule.js";

my = new MyClass();
```

Případně je možné importovat v tagu `<script>`, kde je potřeba nastavit atribut `type="module"`:


```html
<script type="module">
    import { MyClass } from "./mymodule.js";

    my = new MyClass();
</script>
```

````{admonition} Poznámka
:class: note

Moduly fungují pouze na HTTP/HTTPS protokolu, nelze je používat při použití `file://` protokolu. Pro testování můžete použít jednoduchý vývojový server Pythonu, který spustíte příkazem:
    
```python
python -m http.server
```
Skript vytvoří webserver na adrese `http://0.0.0.0:8000/`, který bude zobrazovat adresář, ve kterém byl server spuštěn.
````

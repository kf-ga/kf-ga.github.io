Document Object Model
=====================

* [Tutoriál W3C - DOM](https://www.w3schools.com/js/js_htmldom.asp)
* [Referenční příručka W3C - DOM](https://www.w3schools.com/jsref/dom_obj_document.asp)


Význam Document Object Model (DOM)
----------------------------------

Při načítání každé stránky prohlížeč parsuje zdrojové soubory HTML a CSS a vytváří si objektovou reprezentaci stránky, se kterou lze dále manipulovat pomocí JavaScriptu. Tato objektová reprezentace stránky se nazývá **Document Object Model**, zkráceně **DOM**.

```{mermaid}
graph LR
    A[HTML] --> G[Parser]
    B[CSS] --> G[Parser]
    C[JS] --> F[JS Interpreter]
    G[Parser] --> E[DOM]
    F<-->E

    subgraph Zdrojový kód
        A
        B
        C
    end
    subgraph Webový prohlížeč
        E
        F
        G
    end
```

DOM je stromová struktura objektů reprezentující HTML dokument. Každý uzel v DOM stromu odpovídá HTML elementu, atributům elementu a textu, který může obsahovat. Manipulací s DOM je možné dynamicky měnit elementy stránky, přidávat, mazat nebo je upravovat.


Základní funkce JavaScriptu na práci s DOM
------------------------------------------

JavaScript nabízí řadu funkcí pro práci s DOM. Kořenovým elementem ve stránce je `document`, což je globálně dostupná proměnná v rámci JavaScriptu.

### Nalezení elementu nebo množiny elementů

Abychom mohli s elementy na stránce pracovat, je nejprve nutné získat objekt elementů nebo jejich pole. K tomu slouží následující funkce:

- `document.getElementById('id')`: Najde element podle ID.
- `document.getElementsByClassName('class')`: Najde všechny elementy s danou třídou.
- `document.getElementsByTagName('tag')`: Najde všechny elementy určitého HTML tagu.
- `document.querySelector('.class')`: Najde první element odpovídající CSS selektoru.
- `document.querySelectorAll('.class')`: Najde všechny elementy odpovídající CSS selektoru.

Tyto funkce jsou dostupné jak v objektu `document`, kdy se vyhledává na celém DOMU, tak i na vnořených elementech v DOM kdy se vyhledává jen v rámci konkrétní větve DOMu (element a všechny jeho přímí či nepřímí potomci). 

Každý element domu obsahuje také atribut `parentNode`, která odkazuje na rodiče daného elementu a atribut `childNodes`, případně `children` ([s drobným významovým rozdílem](https://stackoverflow.com/questions/7935689/what-is-the-difference-between-children-and-childnodes-in-javascript)), která je pole obsahující všechny potomky daného elementu:

```javascript
let test = document.getElementById('test');
console.log(test.parentNode);
console.log(test.childNodes);
```


### Vytvoření a smazání elementu 

K vytvoření elementu se používá funkce `document.createElement('tag')`, kde tag je HTML tag elementu. Vytvořený element je třeba do stránky ještě umístit pomocí funkce `appendChild` u rodičovského elementu:

```javascript
let parent = document.getElementById('container');
let child = document.createElement('div');
parent.appendChild(child)
```

Funkce `appendChild` vloží element na poslední místo jako potomka rodičovského elementu. Pro vložení na specifické místo (pokud již rodič nějaké elementy obsahuje) lze použít funkci `parentNode.insertBefore(newNode, referenceNode)`.

Každý element může mít pouze jednoho rodiče. Pokud je zavolána funkce `appendChild` na element, který už v DOMu je umístěn, je element z původního umístění odstraněn a přesunut na nové místo.

Pro smazání elementu z DOM je určena funkce `removeChild`:

```javascript
let el = document.getElementById('test');
el.parentNode.removeChild(el);
```


### Nastavení stylu

Pomocí JavaScriptu lze měnit také konkrétní styly elementu. K tomu slouží atribut elementu `style`:

```javascript
let element = document.getElementById('id');
element.style.color = 'red'; 
```

```{admonition} Poznámka
class:note
Pokud nastavujete CSS styl, který obsahuje pomlčky `-`, používá se v JavaScriptu ekvivalentní zápis v [camelCase](https://cs.wikipedia.org/wiki/CamelCase). Například CSS vlastnost `background-color` se nastaví `element.style.backgroundColor = 'red';`
```


### Změna třídy elementu

Pro nastavování či změnu třídy elementu se používá vlastnost `classList`, která obsahuje seznam všech tříd, které jsou k elementu přiřazeny. Tento seznam lze modifikovat pomocí metod `add` (přidání třídy), `remove` (odebrání třídy) a `toggle` (přepnutí třídy):

```javascript
let element = document.getElementById('id');
element.classList.add('mine');
element.classList.toggle('highlight');
```

Někdy se setkáme ještě s použitím vlastnosti `className`, která přímo odpovídá atributu `class` elementu. Změna tříd pomocí `className` je méně praktická zejména pokud má element více tříd.

### Atributy elementu

Obecné atributy elementu lze měnit pomocí funkcí

- `element.getAttribute(attribute)`: Zjistí hodnotu atributu `attribute`
- `element.setAttribute(attribute, value)`: Nastaví atribut `attribute` na hodnotu `value`
- `element.removeAttribute(attribute)`: Odebere atribut `attribute`
- `element.hasAttribute(attribute)`: Zjistí, zda element obsahuje atribut `attribute`

Například:

```javascript
let element = document.getElementById('id');
console.log(element.getAttribute('href'));
element.setAttribute('href', 'http://example.com');
```


### Datasets

Někdy je praktické ukládat k elementům libovolné dodatečné hodnoty. HTML podporuje u elementů atributy `data-*`, které lze pak číst v JavaScriptu pomocí vlastnosti elementu `dataset`. Stejně tak je možné pomocí této vlastností hodnoty zapisovat:

```javascript
let element = document.getElementById('id');
element.dataset.value1=123;
element.dataset.value2="abc";
```

V DOM pak bude mít element následující strukturu:

```html
<div id="id" data-value1="123" data-value2="abc"> ... </div>
```

```{admonition} Poznámka
:class: note

Názvy vlastností v dataset jsou automaticky konvertovány z *camelCase* na *dash-style*. Například vlastnost `data-my-value` se v datasetu dostane pomocí `element.dataset.myValue`.
```


Události
--------

JavaScript nabízí také možnosti, jak reagovat na různé události, které na stránce mohou nastat. Typicky jsou to události vyvolané uživatelem, například kliknutí myší nebo změna obsahu formuláře.

JavaScript umožňuje přidat k elementu **event listener**, pomocí funkce elementu `addEventListener`. Jako parametr má pak název události a funkci, která se provede, pokud událost nastane:

```javascript
let element = document.getElementById('id');
element.addEventListener("click", (event) => {
    console.log("Klik!");
    console.log(event);
})
```

Parametr `event` obsahuje podrobnosti o události, která byla vyvolána (např. informace o pozici kurzoru, kde uživatel klikl).

```{admonition} Anonymní funkce
:class: note

Povšimněte si použití arrow operátoru v argumentu funkce `addEventListener` (argumentem funkce je jiná funkce). Je to funkce, která je vytvořena, aniž by měla nějaké jméno nebo identifikátor. Takovým funkcím říkáme **anonymní funkce**. 
```
V JavaScriptu je možné odchytit řadu různých událostí pomocí metody `addEventListener`:

1. **Mouse events**:
    - `click` - Uživatel klikne na prvek.
    - `dblclick` - Uživatel dvojitě klikne na prvek.
    - `mousedown` - Uživatel stiskne tlačítko myši nad prvkem.
    - `mouseup` - Uživatel uvolní tlačítko myši nad prvkem.
    - `mousemove` - Myš se pohybuje přes prvek.
    - `mouseover` - Myš přejde na prvek.
    - `mouseout` - Myš opustí prvek.
    - `mouseenter` - Myš vstoupí do prvku (nebublá).
    - `mouseleave` - Myš opustí prvek (nebublá).
    - `contextmenu` - Kliknutí pravým tlačítkem myši.

2. **Keyboard events**:
    - `keydown` - Uživatel stiskne klávesu.
    - `keyup` - Uživatel uvolní klávesu.
    - `keypress` - Uživatel stiskne klávesu a drží ji (dnes již méně používáno).

3. **Form events**:
    - `submit` - Formulář je odeslán.
    - `change` - Hodnota formulářového prvku se změnila.
    - `focus` - Prvek získá fokus.
    - `blur` - Prvek ztratí fokus.
    - `input` - Hodnota vstupního pole se změní.

4. **Window events**:
    - `resize` - Okno prohlížeče je změněno.
    - `scroll` - Okno prohlížeče nebo prvek se posune.
    - `load` - Stránka nebo obrázek je načten.
    - `unload` - Stránka se má zavřít.
    - `beforeunload` - Před uzavřením stránky.
    - `error` - Při chybě načítání.

A [celá řada dalších](https://www.w3schools.com/jsref/dom_obj_event.asp).

Pro zrušení event listeneru je možné použít metodu `removeEventListener`. Ta ovšem nefunguje, pokud byl jako listener použita anonymní funkce. Pokud tedy potřebujete v aplikaci rušit event listener, je potřeba použít funkci pojmenovanou:

```javascript
function clicked(event) {
    // code
}
let element = document.getElementById('id');
element.addEventListener("click", clicked);
// ...
element.removeEventListener("click", clicked);
```

V některých jednodušších případech je možné události psát také přímo do HTML stránky v atributech elementu:

```{myst-example}
:highlight: html

<div onclick="console.log('clicked');">
    Klikni na mě!
</div>
```


Manipulace s `window`
---------------------

V JavaScriptu je dostupný globální objekt `window` (přesněji řečeno, všechny globální proměnné jsou vlastností objektu `window`), který reprezentuje okno prohlížeče a nabízí také několik užitečných funkcí pro manipulaci se stránkou:

1. **Navigace a správa URL**:
    - `window.open(url)` - Otevírá nové okno prohlížeče nebo záložku s `url`.
    - `window.close()` - Zavírá aktuální okno.
    - `window.location` - Obsahuje informace o URL adresáři a umožňuje přesměrování.

2. **Časovače**:
    - `window.setTimeout(fn, timeout)` - Spustí po uplynutí `timeout` ms funkci `fn` po  (jednorázově). Vrací `id` časovače.
    - `window.setInterval(fn, interval)` - Opakuje volání funkce `fn` jednou za `interval` ms. Vrací `id` časovače.
    - `window.clearTimeout(id)` - Zruší časovač nastavený pomocí `setTimeout`.
    - `window.clearInterval(id)` - Zruší časovač nastavený pomocí `setInterval`.

3. **Dialogová okna**:
    - `window.alert(text)` - Zobrazí modální dialogové okno s textem `text` a tlačítkem OK.
    - `window.confirm(text)` - Zobrazí modální dialogové okno s otázkou `text` a tlačítky OK a Storno. Vrací `true` pokud uživatel klikl na OK, nebo `false` pokud na Storno.

4. **Manipulace s oknem**:
    - `window.resizeTo(width, height)` - Změní rozměry okna na zadané hodnoty.
    - `window.resizeBy(dx, dy)` - Změní rozměry okna o zadané hodnoty.
    - `window.moveTo(x, y)` - Přesune okno na zadané souřadnice.
    - `window.moveBy(dx, dy)` - Přesune okno o zadané hodnoty.
    - `window.scrollTo(x, y)`: Skrolování na určené pozice v okně.

5. **Získání informací o okně**:
    - `window.innerHeight` - Výška obsahu okna.
    - `window.innerWidth` - Šířka obsahu okna.
    - `window.outerHeight` - Celková výška okna prohlížeče.
    - `window.outerWidth` - Celková šířka okna prohlížeče.
    - `window.screenX` a `window.screenY` - Pozice okna vzhledem k obrazovce.
    - `window.scrollX` a `window.scrollY` - Pozice skrolu v okně.


XPath
-----

XPath (XML Path Language) je jazyk, který umožňuje vyhledávat a navigovat po uzlech v XML nebo HTML dokumentech pomocí cesty (path) k těmto uzlům.

### Nalezení elementu podle XPath

V prohlížečích můžete pro vyhledávání elementů podle XPath použít `document.evaluate()`:

```javascript
var xpath = "//a[@href='https://example.com']";
var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
var node = result.iterateNext();
```

Jednoduché lomítko `/` v XPath znamená, že hledáme pouze přímého potomka, dvojité lomítko `//` hledá všechny přímé či nepřímé potomky. Do hranatých závorek se zapisují podmínky `[]`, které musí element splňovat, aby byl vybrán.

### Základní pravidla psaní XPath

- **Výběr elementů podle tagu**: `/html/body/div` - Vybere všechny `div` elementy, které jsou přímými potomky `body`.
- **Výběr elementů podle atributu**: `//div[@class='example']` - Vybere všechny `div` elementy s třídou `example`.
- **Výběr elementů podle obsahu**: `//a[contains(text(),'Next')]` - Vybere všechny odkazy (`a`), které obsahují text "Next".

Více informací o XPath a naleznete v [tutoriálu od W3C](https://www.w3schools.com/xml/xpath_intro.asp).
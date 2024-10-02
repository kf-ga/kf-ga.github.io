CSS Layouty
===========

* [Video tutoriál pro CSS Flexbox](https://www.youtube.com/watch?v=Y8zMYaD1bz0&list=PL4cUxeGkcC9i3FXJSUfmsNOx8E7u6UuhG)
* [Video tutoriál pro CSS Grid](https://www.youtube.com/watch?v=x7tLPhnA06w&list=PL4cUxeGkcC9itC4TxYMzFCfveyutyPOCY)

Kromě vizuálního stylování elementů umožňuje CSS také měnit pozici a tok elementů na stránce, například vytvořit dvousloupcový layout, nebo skládat elementy vedle sebe nebo do dlaždic.

CSS vlastnosti pro řízení toku
------------------------------

Pro natavení jak se má element chovat vůči svým okolním elementům se používají zejména následující vlastnosti:

### `display`

Určuje způsob zobrazení elementu a může nabývat následujících hodnot:

- **`block`**: Oddělí element od okolního obsahu. Je to výchozí hodnota u elementů `<div>`, `<p>`, `<h1>` atd.
- **`inline`**: Element se zobrazí v toku okolního obsahu. Je to výchozí hodnota u elementů `<span>`, `<a>`, `<em>` atd.
- **`flex`**: Umožní skládat vnořené elementy vedle sebe, více informací níže.
- **`grid`**: Umožní skládat vnořené elementy do mřížky, více informací níže.
- **`none`**: Element se vůbec nezobrazí, což může být užitečné k dynamickému skrývání elementů, jak si ukážeme v pozdějších kapitolách.

Příklad `block` zobrazení, což je výchozí nastavení například pro `<div>`. 

```{myst-example}
:highlight: html
Text před <div style="color:red">block element</div> text za
```

Příklad `inline` zobrazení, což je výchozí nastavení například pro `<span>`.

```{myst-example}
:highlight: html

Text před <span style="color:red">inline element</span> text za
```

Výchozí chování lze samozřejmě změnit:
```{myst-example}
:highlight: html

Text před <span style="color:red; display:block;">block element</span> text za
```

### `display: flex;`

CSS vlastnost `display: flex;` se nastavuje pro element (takový element se pak označuje jako **kontejner**), který umožňuje skládat vnořené elementy (ty označujeme jako **položky**, nebo **items**) a nastavovat jim zarovnání a rozložení v prostoru kontejneru i když jejich velikost je neznámá nebo dynamická. Často se používá pro tvorbu responzivních designů.

```{admonition} Co je to responzivní design?
**Responzivní design** je přístup k webdesignu, který se snaží o optimalizaci webových stránek tak, aby byly snadno použitelné a vizuálně příjemné na širokém spektru zařízení, například desktopových počítačů, tabletů a mobilních telefonů. Cílem responzivního designu je zajistit, aby se obsah správně zobrazoval a byl snadno navigovatelný bez ohledu na velikost a rozlišení zařízení, na kterém je zobrazen. 

Historicky se k takovému úkolu přistupovalo tak, že vývojáři vyvíjeli dvě verze webu - jeden pro desktop a jeden pro mobilní zařízení. To sebou přináší řadu problémů, protože roste množství kódu, který je potřeba udržovat a který je navíc z velké části duplicitní. S masivním příchodem mobilů a tabletů s různými velikostmi a formáty displejů, rostla škála zařízení na které bylo nutné web adaptovat. Proto je nyní přístup k webdesignu takový, že se vyvíjí jen jedna verze webu, která se tvoří tak, aby se sama přizpůsobila zařízení na kterém je zobrazena. O takovém designu hovoříme jako o responzivním.
```

Kromě `display: flex;` se obvykle u kontejneru nastavují ještě další vlastnosti, které pak právě řídí tok a zarovnání položek.

- **`flex-direction`**: Určuje hlavní osu toku ve kontejneru `row` nebo `column`.
- **`flex-wrap`**: Určuje, zda položky v kontejneru mají být na jedné linii nebo mohou být zalomeny do více řádků. Povolené hodnoty jsou `nowrap`, `wrap`, `wrap-reverse`
- **`flex-flow`**: Je zkrácený zápis pro `flex-direction` a `flex-wrap`, například `flex-flow: row wrap;`
- **`justify-content`**: Definuje horizontální zarovnání položek - na střed `center`, na začátek `flex-start`, na konec `flex-end` nebo se jestli mají roztáhnout tak aby vyplnily celý kontejner `space-between` a `space-around`.
- **`align-items`**: Definuje vertikální zarovnání položek v rámci jednoho řádku kontejneru - na střed `center`, nahoru `flex-start`, dolů `flex-end` roztáhnout na celou výšku `stretch` nebo tak aby byly vzájemně zarovnány texty v položkách `baseline`.
- **`align-content`**: Zarovnává řádky flex items v rámci flex kontejneru, pokud je více než jeden řádek flex items. Povolené hodnoty jsou `flex-start`, `flex-end`, `center`, `space-between`, `space-around` a `stretch`.

Dále je možné nastavit následující vlastnosti u stylů položek:

- **`flex-basis`**: Určuje výchozí velikost položky.
- **`flex-grow`**, **`flex-shrink`**: Určují, jak se rozděluje dostupný prostor v kontejneru. Hodnota musí být číslo.
- **`align-self`**: Umožňuje přepsat hodnotu `align-items` pro individuální položku.
- **`order`**: Umožňuje změnit pořadí položek v flex kontejneru.

Položky se nejprve umístí do kontejneru, že mají svou `flex-basis` šířku či výšku (ve flex kontejneru je lepší používat `flex-basis` namísto `width` a `height`). Pokud nějaký prostor v kontejneru zbyde, rozdělí se poměrně položkám podle `flex-grow`, pokud naopak prostor v kontejneru schází, ubere se prostor položkám poměrně podle `flex-shrink`.

Příklad použití:

```{myst-example}
:highlight: html
<style>
    .container1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: mintcream;
    }
    .item1 {
        width: 150px; 
        height: 100%;
        background-color: lightcoral;
        margin: 10px;
    }
    .big1 {
        flex-grow:3;
    }

</style>
<div class="container1">
    <div class="item1">Box 1</div>
    <div class="item1 big1">Box 2</div>
    <div class="item1">Box 3</div>
</div>
```

Další ukázky jak pracovat s flex kontejnery naleznete v [CSS tutoriálu od W3C](https://www.w3schools.com/css/css3_flexbox.asp).


### `display: grid;`

CSS vlastnost `display: grid;` umožňuje definovat rozvržení stránky nebo části stránky pomocí dvourozměrné mřížky (**grid**). Grid systém umožňuje jak vertikální, tak horizontální zarovnání prvků a může řídit jejich rozmístění, velikost a prostor mezi nimi, podobně jako flex.

Pro element s `display: grid;` (**kontejner**) je možné také nastavit další vlastnosti, které řídí tok a zarovnání **položek** (**items**):

- **`grid-template-columns`**, **`grid-template-rows`**: Definuje velikost a počet sloupců a řádků. Hodnotou je sekvence velikostí (ve formě například `100px`, `10%` nebo `auto`) sloupců 
nebo řádků. Počet těchto hodnot určuje počet sloupců nebo řádků v tabulce.
- **`gap`**: Definuje velikost mezery mezi buňkami.
- **`justify-content`**: Určuje horizontální zarovnání obsahu v kontejneru - `space-evenly`, `space-around`, `space-between`, `center`, `start`, `end`.
- **`align-content`**: Určuje vertikální zarovnání obsahu v kontejneru - `space-evenly`, `space-around`, `space-between`, `center`, `start`, `end`.
- **`justify-items`**: Určuje horizontální zarovnání položky v rámci buňky - `center`, `start`, `end`, `stretch`.
- **`align-items`**: Určuje vertikální zarovnání  položky v rámci buňky - ``center`, `start`, `end`, `stretch`, `baseline`.

Dále je možné nastavit následující vlastnosti u položek:

- **`grid-column`** a **`grid-row`** a **`grid-area`**: Pomocí těchto vlastností je možné roztáhnout některé položky přes více buněk v gridu. Více v [tutoriálu](https://www.w3schools.com/css/css_grid_item.asp).


Příklad:

```{myst-example}
:highlight: html
<!doctype html>
<html lang="en">
    <head>
        <style>
            .container2 {
                display: grid;
                grid-template-columns: 100px auto 200px;
                grid-template-rows: 50px auto;
                gap:10px;
                background-color: oldlace;
            }
            .item2 {
                background-color: moccasin;
            }
        </style>
    </head>
    <body>
        <div class="container2">
            <div class="item2">Box 1</div>
            <div class="item2">Box 2</div>
            <div class="item2">Box 3</div>
            <div class="item2">Box 4</div>
            <div class="item2">Box 5</div>
            <div class="item2">Box 6</div>
        </div>
    </body>
</html>
```

Další ukázky jak pracovat s `display: grid;` naleznete v [CSS tutoriálu od W3C](https://www.w3schools.com/css/css_grid.asp).

```{admonition} Grid není tabulka!
:class: warning

Ačkoli může na první pohled vypadat, že CSS grid a HTML tabulky `<table>` mají podobné použití, ve skutečnosti slouží k zcela odlišným účelům. CSS grid je moderní layoutová technologie, která poskytuje vysoce flexibilní řízení zobrazení pro responzivní designy.

Na druhé straně, HTML `<table>` byl původně navržen pro zobrazování tabulkových dat — tedy informací, které logicky patří do řádků a sloupců, jako jsou statistiky nebo výsledky. Používání tabulek pro layout stránky je zastaralou praxí.
```

```{admonition} Noty
:class: tip

S CSS Grid se dají dělat divy, třeba i [sázet noty](https://cruncher.ch/blog/printing-music-with-css-grid/).
```


### `position`

Vlastnost `position` v CSS určuje, jak je element umístěn v dokumentu. Tato vlastnost může ovlivnit, jak je sám umístěn vůči svému normálnímu toku nebo vůči rodičovskému elementu. Vlastnost `position` může mít následující hodnoty:

- **`static`**: Výchozí hodnota. Element je umístěn podle normálního toku dokumentu.
- **`relative`**: Element je umístěn relativně vůči jeho normální pozici.
- **`absolute`**: Element je umístěn absolutně vůči nejbližšímu umístěnému předkovi (tj. ten co má `position` jinou než `static`).
- **`fixed`**: Element je umístěn relativně vůči viewportu (oknu prohlížeče) a nebude ho ovlivňovat scrolování stránky.
- **`sticky`**: Kombinace `relative` a `fixed`. Element je umístěn jako `relative`, dokud není dosaženo určitého bodu při rolování, na kterém se začne chovat jako `fixed`.


#### `position: relative;`

```{myst-example}
:highlight: html
<!doctype html>
<html lang="en">
    <head>
        <style>
            .rel1 {
                position: relative;
                left: 500px;
                top: -100px;
                width: 200px;
                height: 100px;
                padding: 10px;
                background-color: khaki;
            }
        </style>
    </head>
    <body>
        <div class="rel1">
            Tento box je posunut relativně mimo svůj tok.
        </div>
    </body>
</html>
```

Pozice elementu je možné upravit pomocí css vlastností `top`, `bottom`, `left`, `right` a určují relativní pozici vůči okraji rodičovského elementu. Hodnoty pozice mohou být i záporné. Povšimněte si, že v místě, kde by původně element byl zůstává prázdný prostor.


#### `position: absolute;`

Element je vyjmut z toku a umístí se relativně vůči nejbližšímu elementu, který je napozicován (má vlastnost `position` jinou než výchozí `static`. Pokud takový není, tak se bere element `<body>`).

```{myst-example}
:highlight: html
<!doctype html>
<html lang="en">
    <head>
        <style>
            .rel2 {
                position: relative;
                background-color: ivory;
            }
            .abs2 {
                position: absolute;
                left: 450px;
                top: -200px;
                width: 200px;
                height: 100px;
                background-color: orchid;
            }
        </style>
    </head>
    <body>
        <div class="rel2">
            Toto je relativně umístěný element
            <div class="abs2">
                A toto je absolutně umístěný element
            </div>
        </div>
    </body>
</html>
```

Povšimněte si, že v místě, kde by původně byl element `<div class="abs2">` umístěn, je nyní prázdný prostor. Může se stát, že při větším používání pozicování se některé elementy začnou překrývat. Vlastnosti `z-index` umožňuje nastavit číslo (prioritu zobrazení). Elementy s vyšším `z-index` ze zobrazí přes elementy s nižším `z-index`.

Mírnou úpravou předchozího kódu můžeme vyrobit element, který se zobrazuje až pokud se na něj najede myší:

```{myst-example}
:highlight: html
<!doctype html>
<html lang="en">
    <head>
        <style>
            .rel3 {
                position: relative;
                background-color: ivory;
            }
            .abs3 {
                position: absolute;
                display:none;
                left: 50px;
                top: -200px;
                font-size:10em;
                background-color: tomato;
                color: gold;
            }
            .rel3:hover .abs3 {
                display:block;
            }
        </style>
    </head>
    <body>
        <div class="rel3">
            Najeď na mě myší!
            <div class="abs3">
                BAF!
            </div>
        </div>
    </body>
</html>
```

```{admonition} Chování :hover
:class: note

Všimněte si, že ačkoliv je pseudotřída `:hover` nastavena u elementu `<div class="rel3">` vztahuje se na celý element (včetně všech vnořených elementů). Element `<div class="abs3">` nezmizí i pokud myš posunete mimo element `<div class="rel3">`, stačí že budete v elementu `<div class="abs3">`.
```


#### `position: fixed;`

Element je vyjmut z toku a umístí se relativně vůči viewportu (oknu prohlížeče).

```{myst-example}
:highlight: html
<!doctype html>
<html lang="en">
    <head>
        <style>
            .fix {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 250px;
                background-color: lavender;
            }
        </style>
    </head>
    <body>
        <div class="fix">
            Fixně napozicovaný element
        </div>
    </body>
</html>
```

Element naleznete na obrazovce vpravo dole.


#### `position: sticky;`

CSS vlastnost `position: sticky;` umožňuje prvkům zůstat "přilepeným" na určitém místě při scrolování stránky, až do doby, kdy jejich rodičovský kontejner zůstane viditelný na obrazovce. Tato vlastnost je velmi užitečná pro hlavičky tabulek, navigační lišty a jakékoli prvky, které chcete udržet viditelné, zatímco uživatel prochází obsahem stránky.

Bohužel šablona této dokumentace nedovoluje vytvoření sticky ukázky přímo zde, ale chování sticky elementu si můžete prohlédnout [například zde](https://www.w3schools.com/howto/howto_css_sticky_element.asp).


Media Queries
-------------

CSS **Media Queries** jsou dalším z nástrojů, které CSS nabízí pro vytváření responzivních designů webových stránek. Umožňují měnit sadu aplikovaných stylů specificky pro různé podmínky, jako jsou velikost obrazovky, rozlišení a orientace zařízení (landscape nebo portrait) nebo formátování pro tisk stránky. 

Media Queries se zapisují pomocí `@media` pravidla, které se vkládá do CSS kódu. Následuje typ média `screen` (zařízení s obrazovkou), `print` (tiskárna) nebo `all` a poté logické výrazy testující vlastnosti média `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height` a `orientation`.

Příklad:

```css
/* Základní styl kontejneru */
.container {
    width: 100%;
    background-color: azure;
}

/* Pro zařízení větší než 1000px omezíme šířku kontejneru na 1000px */
@media screen and (min-width: 1000px) {
    .container {
        width: 1000px;
    }
}
/* A pro tiskárnu vynecháme barvu pozadí, ať se šetří toner*/
@media print {
    .container {
        background-color: none;
    }
}
```

````{admonition} Nastavení viewportu
:class: warning
Aby media queries správně fungovaly, je potřeba nastavit v záhlaví HTML stránky následující hlavičku:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Parametr `width=device-width` nastaví výchozí šířku stránky odpovídající šířce displeje zařízení, a parametr `initial-scale=1.0` nastaví výchozí zvětšení (zoom).

````

Pravá síla Media Queries je pak v možnosti modifikovat chování elementů s `display: flex;` a `display: grid;`, tak aby se stránka zobrazila ideálně na všech zařízeních. Upravme si předchozí příklad s `display: flex;` tak, aby se na úzkých zařízeních zobrazily položky v kontejneru pod sebou:


```{myst-example}
:highlight: html
<style>
    .container3 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: mistyrose;
    }
    .item3 {
        width: 150px; 
        height: 100%;
        background-color: orchid;
        margin: 10px;
    }
    .big3 {
        flex-grow:3;
    }
    @media screen and (max-width: 600px) {
        .container3 {
            flex-direction: column;
        }
        .item3 {
            width: auto; 
            height: auto;
        }
     }
</style>
<div class="container3">
    <div class="item3">Box 1</div>
    <div class="item3 big1">Box 2</div>
    <div class="item3">Box 3</div>
</div>
```

Zkuste si zmenšit velikost okna prohlížeče a sledujte, jak se změní zarovnání.



```{admonition} Složité? Ano, ale...
:class: note

Používání Media Queries a vlastností `display`, `position` se může zdát na první pohled složité, zmatené a můžete mít pocit, že nevíte co, kdy a jak použít. CSS stylování prostě vyžaduje praxi, aby se vám všechny mechaniky dostaly jak se říká *pod kůži*. A než se tak stane stačí mít na pamětí, že takové možnosti v CSS **jsou**, vědět **přibližně** jak fungují a v případě potřeby konzultovat [dokumentaci](https://www.w3schools.com/css/) nebo sáhnout po [jiných nástrojích](https://chat.openai.com).

```

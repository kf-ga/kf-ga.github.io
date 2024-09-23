CSS
===

* [CSS Tutoriál od W3C](https://www.w3schools.com/css/default.asp)
* [CSS Referenční příručka](https://www.w3schools.com/cssref/index.php)
* [CSS Validátor](https://jigsaw.w3.org/css-validator/)

* Vzorový HTML dokument pro testování CSS: 
{download}`sandbox.html<../../examples/1_static/02_css/index.html>`

Co je to CSS
------------

**CSS** (**Cascading Style Sheets**) je jazyk, který se používá k definování vzhledu a formátování dokumentů napsaných v HTML.

CSS bylo vytvořeno v roce 1996 organizací W3C (World Wide Web Consortium) s cílem oddělit obsah webu (HTML) od jeho vzhledu (designu), což usnadňuje úpravy designu bez změny samotného kódu stránky.


Syntaxe CSS
-----------

Syntaxe CSS stylu se skládá ze **selektorů** a **deklarací stylů**. Deklarace stylu pak obsahuje páry **vlastnost** a **hodnota**:

```css
selektor {
    vlastnost:hodnota;
}
```

Selektor určuje, na které HTML elementy se daná deklarace stylů vztahuje a deklarace stylů pak popisuje jak se tyto elementy mají zobrazit. CSS vlastnost se v angličtině označuje jako **CSS property**. 

Příklad: 

```css
p {
    color: red;
    font-size: 14px;
}
```

CSS styly je možné psát i bez odsazování: 

```css
p { color: red; font-size: 14px; }
```


Vložení CSS do stránky
----------------------

Aby se CSS styly na HTML stránku aplikovaly, je třeba je do HTML stránky vložit. To lze udělat třemi způsoby:

### Vložení stylu přímo do HTML

CSS lze vložit přímo do HTML souboru pomocí `<style>` tagu, který se obvykle umisťuje v hlavičce dokumentu `<head>`:

```html
<!doctype html>
<html lang="cs">
    <head>
        <style>
            h1 { color: blue; }
            p { color: red; font-size: 14px; }
        </style>
    </head>
    <body>
        <h1>Já jsem modrej</h1>
        <p>A já červenej</p>
    </body>
</html>
```

### Vložení pomocí externího souboru

CSS styly lze také uložit do externího souboru a ten pak vložit na stránku pomocí `<link>` tagu:

```html
<!doctype html>
<html lang="cs">
    <head>
        <link rel="stylesheet" type="text/css" href="styles.css"/>
    </head>
    <body>
        <h1>Já jsem modrej</h1>
        <p>A já červenej</p>
    </body>
</html>
```

### Vložení stylu přímo k elementu

Téměř každý HTML element má také volitelný atribut style, kterým je možné upravit styl konkrétního elementu:

```{myst-example}
:highlight: html
<h1 style="color: blue;">Já jsem modrej</h1>
<p style="color: red;">A já červenej</p>
```

```{admonition} Co je lepší?
:class: note
Všechny tři způsoby jsou funkčně ekvivalentní, obvykle ale bývá preferované ukládání CSS do externího souboru z důvodu lepší přehlednosti a organizace projektu. Znamená to ale, že prohlížeč musí udělat nový dotaz na server a stáhnout CSS soubor. Za některých situací, kdy je třeba CSS stylů málo může být vloženo CSS přímo do stránky a urychlit tak načítání stránky.

*Rule of thumb:* Pokud si nejste jistí, vkládejte CSS jako externí soubor.
```


Základní možnosti CSS selektorů
-------------------------------

CSS selektory definují, které HTML elementy budou ovlivněny deklarovanými styly. Zde je přehled základních typů CSS selektorů a jejich použití.


### Selektor na jméno elementu

Selektor na jméno elementu umožňuje stylovat všechny elementy daného jména:

```css
p { /*...*/ }
```

Styl se v tomto případě aplikuje na všechny `<p>` elementy.


### Selektor na třídu

Selektor na třídu umožňuje stylovat všechny elementy, které mají přiřazenou specifickou třídu. Selektory na třídu začínají tečkou `.`, následovanou názvem třídy:

```css
.my_class { /*...*/ }
```

Tento styl se aplikuje na všechny elementy, které mají nastaven atribut `class` na hodnotu `my_class`. Tedy třeba `<div class="my_class"> ... </div>`


### Selektor na id

Selektor na id cílí na konkrétní element, který má přiřazené unikátní id. Selektory na id začínají křížkem `#` následovaným id:

```css
#my_id { /*...*/ }
```

Tento styl se aplikuje na element s id `my_id` , například `<div id="my_id"> ... </div>`


### Pseudotřídy

*Pseudotřídy* se používají k definování speciálního stavu elementu. Příkladem může být pseudotřída `:hover`, která aplikuje styl až když uživatel najede myší na element:

```css
a { color: green; }
a:hover { color: red; } 
```

Tento styl změní barvu textu všech odkazů na zelenou, když na ně ale uživatel najede myší, změní barvu na červenou. CSS nabízí celou řadu pseudotříd jejich seznam naleznete v [CSS Tutoriálu](https://www.w3schools.com/css/css_pseudo_classes.asp)


### Kombinace selektorů

Selektory je možné kombinovat, například:

```css
p.my_class { /*...*/ }
```

cílí na všechny elementy `<p>` a které mají vlastnost `class` nastaven na hodnotu `my_class`. Zacílí tedy třeba na `<p class="my_class"> ... </p>` ale už ne na `<div class="my_class"> ... </div>`.

Podobně lze dělat selektory `div#my_id` (element `div` mající `id` `my_id`), nebo `div.my_class:hover` (elementy `div` mající `class` nastavenu na `my_class` po najetí myší)


### Selektory vnořených elementů

Pomocí **descendant selektor**u ` ` (mezera) je možné také přesněji adresovat konkrétní vnořené elementy. Například:

```css
.article p { color: red; }
```

Adresuje všechny `<p>` elementy, které jsou vnořené do elementu s třídou `article` a to ať už jako přímý nebo nepřímý potomek. Například:

```html
    <div class="article">
        <p>jsem červenej</p>
    </div>
```

ale i

```html
    <div class="article">
        <div class="in">
            <p>já taky</p>
        </div>
    </div>
```

Pomocí **child selektor**u `>` lze adresovat **přímé** potomky elementu. Selektor

```css
.article > p { color: red; }
```

aplikuje styl na všechny elementy `<p>`, které jsou přímo vnořené do elementu s třídou `article`. Například

```html
    <div class="article">
        <p>jsem červenej</p>
    </div>
```

ale už ne zde:

```html
    <div class="article">
        <div class="in">
            <p>ale já už nejsem</p>
        </div>
    </div>
```

Adresování je možné kombinovat, například `div.menu > ul > li a` vybere všechny odkazy `<a>` umístěné v elementu `<li>`, jež je přímo umístěn v `<ul>`, který je přímo umístěn v elementu `<div>` mající vlastnost `class` nastavenu na `menu` (tudíž už třeba ne ve vnořeném seznamu).


### Adresování více selektory

V jedné definici stylů je možné také použít více selektorů najednou oddělených čárkou `,`. Styl se pak aplikuje na všechny elementy, které vyhovují některému ze selektorů. Například:

```css
.article p, h1, .red { 
    color: red; 
}
```

Styl se aplikuje na všechny elementy `<p>` vnořené do elementu s třídou `article` dále na `<h1>` a všechny elementy s třídou `red`.


Základní CSS styly
------------------

### Barva textu `color`

Vlastnost `color` definuje barvu textu. V CSS je povoleno několik způsobů zadávání barev (nejen v `color` ale i v dalších vlastnostech pracujících s barvou):

* Hexadecimální hodnoty: `#FFCC33` (složení hexadecimálního zápisu složek RRGGBB), případně ve zkrácené verzi #FC3 (což odpovídá #FFCC33)
* RGB: `rgb(250, 100, 50)` 
* RGBA (s alfa kanálem pro průhlednost): `rgba(250, 100, 50, 0.5)` (poloprůhledná)
* HSL (odstín, sytost, jas): `hsl(0, 100%, 50%)` (červená)
* HSLA: `hsla(0, 100%, 50%, 0.5)` (poloprůhledná červená)
* Slovním zápisem barev: `red`, `blue`, `green`, atd. Úplný seznam dovolených barev naleznete [zde](https://www.w3schools.com/cssref/css_colors.php).

### Pozadí `background`

Vlastnost `background` umožňuje definovat pozadí. Jeho hodnota může být buď CSS barva, například:

```css
body { background: #FFCC99; }
```

případně odkaz na obrázek, který je vhodné doplnit o informaci o tom, jak se má obrázek na pozadí opakovat (tiling), případně jak se má napozicovat. Například:

```css
body { background: #FFCC99 url("image.png") repeat-y right top; }
```

vytvoří pozadí stránky, které se bude vertikálně (`repeat-y`) opakovat obrázek (`image.png`) vodorovně, přičemž první obrázek bude umístěn v pravém horním rohu stránky (`right top`). Na ploše, kde obrázek nebude ze zobrazí barva `#FFCC99`. Každá ze složek hodnoty vlastnosti background je nepovinná, a pokud není uvedena, použije se výchozí hodnota. Více o vlastnosti `background` naleznete v [referenční příručce](https://www.w3schools.com/cssref/css3_pr_background.php).

V CSS je také možné použít odvozené vlastnosti pro specifikaci pozadí. Tento příklad je ekvivalentní výše uvedenému zápisu:

```css
body { 
  background-color: #FFCC99;
  background-image: url("image.png");
  background-repeat: repeat-y;
  background-position: right top;
}
```


### Font `font`

Vlastnost `font` popisuje styl písma. Zahrnuje opět řadu odvozených vlastností, zejména:

* `font-style`: `normal`, `italic` (kurzíva) nebo `oblique` (taky kurzíva, ale trochu [jinak](https://stackoverflow.com/questions/1680624/font-style-italic-vs-oblique-in-css).)
* `font-weight`: `normal`, `bold` (tučně) nebo číslo, např `900`
* `font-size`: Velikost fontu, buď velikost v pixelech (`12px`), procentech(`90%`), em (`1.2em`), nebo [klíčové slovo](https://www.w3schools.com/cssref/pr_font_font-size.php).
* `font-family`: Název písma, např. `Arial`, `Times New Roman`, `Courier New`, atd.

Všechny výše uvedené lze zapsat i inline pouze do vlastnosti `font`. Pro správné pořadí zápisu jednotlivých hodnot konzultujte referenční [příručku](https://www.w3schools.com/cssref/pr_font_font.php).


### Formátování textu

* `text-align`: Zarovnání textu v rámci bloku  (`left`, `right`, `center`, `justify`).
* `text-transform`: Transformace textu na velká/malá písmena (`uppercase`, `lowercase`, `capitalize`)
* `text-indent`: Odsazení prvního řádku textu (např. `50px`) 
* `line-height`: Výška řádku 
* `text-decoration`: Dekorace textu (`underline`, `line-through`, `overline`)


CSS box model
-------------

CSS box model je základní koncept, který definuje rozměry a umístění jednotlivých elementů. Každý element představuje obdélníkový box, u kterého lze nastavit vlastnosti `width` a `height`. Dále lze u boxu nastavit vlastnost `padding`, která definuje odsazení dovnitř elementu a `margin`, která definuje vnější odsazení. Dále do box modelu spadá vlastnost `border`, která definuje rámeček elementu.

```{mermaid}
flowchart TD
    subgraph Margin [Margin]
        style Margin fill:#FF3, stroke-width:0px
        subgraph Border [Border]
            style Border fill:#9F3,stroke-width:0px
            subgraph Padding [Padding]
                style Padding fill:#FF3, stroke-width:0px
                Content[Obsah elementu]
            end
        end
    end
```

Způsob, jak je box model počítán lze také explicitně změnit pro konkrétní elementy pomocí vlastnosti `box-sizing`.

### `width` a `height`

Základními vlastnostmi, které lze nastavit je výška a šířka elementu. Hodnoty se mohou zadávat v několika jednotkách

- `px`: pixely, například `100px`
- `em`: násobky velikosti písma rodičovského elementu, například `1.2em`
- `%`: procenta rozměru rodičovského elementu, například `50%`
- `vw`, `vh`: procenta z šířky/výšky viewportu, např. `80vw`


### `margin` a `padding`

U vlastností `padding` a `margin` můžeme nastavit buď jednu hodnotu, která se pak aplikuje na všechny strany boxu, dvě hodnoty, kde se první hodnota použije na horní `top` a dolní `bottom` odsazení a druhá hodnota na levé `left` a pravé `right` odsazení. Dále je možné zapsat čtyři hodnoty, které se pak aplikují odsazení shora `top`, zprava `right`, odspodu `bottom` a zleva `left`.

Je možné také použít odvozené vlastnosti `margin-left`, `margin-right`, `margin-top` a `margin-bottom` a analogicky pro `padding` `padding-left`, `padding-right`, `padding-top` a `padding-bottom`. Zápis:

```css
.box { margin: 12px 14px 16px 18px; }
```

je ekvivalentní zápisu

```css
.box { 
    margin-top: 12px; 
    margin-right: 14px; 
    margin-bottom: 16px; 
    margin-left: 18px; 
}
```

```{admonition} Margin collapse
:class: note

**Margin collapse** (kolaps okrajů) je termín v CSS, který popisuje princip, kdy se vertikální okraje (margins) dvou sousedních elementů sloučí do jednoho okraje, který je roven většímu z obou původních okrajů. Tento jev se vyskytuje pouze u vertikálních okrajů a neovlivňuje horizontální okraje.
```

### `border`

Definuje okraj kolem elementu. Lze specifikovat 
- `border-width`: šířku rámečku
- `border-style`: styl okraje, povoleny hodnoty `solid`, `dotted`, `dashed`, `double`, `groove`, `ridge`, `inset` a `outset`
- `border-color`: barva rámečku 


```{admonition} Skutečná velikost
:class: note

Atributy `width` a `height` definují velikost samotného obsahu elementu. Element ale bude ve skutečnosti větší o `padding`, `border` a `margin` (pokud tedy nedojde *margin collapse*). Pokud se Vám stane, že element nemá přesně takovou velikost, jakou si myslíte, že by měl mít, můžete si ve vývojářské konzoli u každého elementu nechat tento box model zobrazit a uvidíte přesně jak prohlížeč dospěl k rozměrům vybraného elementu.
```


Výchozí styly prohlížeče
------------------------

Výchozí styly prohlížeče jsou základní styly, které každý webový prohlížeč aplikuje na HTML dokumenty před jakoukoliv další CSS definicí. Tyto styly slouží k zajištění základního vzhledu webových stránek, pokud stránka žádné styly nemá, nebo nejsou definovány vývojářem. Například, většina prohlížečů přidává `margin` a `padding` k elementům jako `<body>` a `<p>`, nastaví velikost u titulků `<h1>` až `<h6>` atd. Výchozí styly si lze představit jako CSS soubor, který je implicitně vložen do každé stránky. Ukázka takového výchozího stylu pro prohlížeč [Firefox](https://searchfox.org/mozilla-central/source/layout/style/res/html.css) nebo [Chrome](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css).


Priorita stylů
--------------

Pokud jsou pro jeden element definovány styly ve více zdrojích, obecně se rozhoduje se podle následujícího pořadí:

1. **Inline styly**: Styly přímo ve vlastnost `style` u HTML elementu mají nejvyšší prioritu.
2. **Externí a interní CSS**: Styly definované v externích nebo interních CSS. Přičemž platí, že styly definované později (v rámci jednoho souboru, nebo v souboru, který je vložen později) přepisují styly definované dříve.
3. **Výchozí styly prohlížeče**: Základní styly, které používá prohlížeč.

Dále ovšem vstupuje do hry tzv. [specificita selektoru](https://www.w3schools.com/css/css_specificity.asp), kde se pracuje s tzv. *váhou* selektoru. To celý systém poněkud zesložiťuje a je obecně lepší pracovat se styly tak, aby se předešlo nejednoznačnostem.


### Použití `!important`

V CSS se setkáme ještě s klíčovým slovem `!important`, které je možné použít za každou CSS vlastnost. Pravidlo s `!important` má vyšší prioritu než pravidla bez `!important`, i když jsou méně specifická nebo později definovaná:

```{myst-example}
:highlight: html
<!doctype html>
<html lang="cs">
    <head>
        <style>
            .blue {
                color: blue !important;
            }
            .red {
                color: red;
            }
        </style>
    </head>
    <body>
        <div class="red">červenej</div>
        <div class="blue red">modrej</div>
    </body>
</html>

```

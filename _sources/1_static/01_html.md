HTML formátování
================

* [HTML Tutoriál](https://www.w3schools.com/html/default.asp)
* [HTML Validátor](https://validator.w3.org)


Co je HTML?
-----------

**HTML** (HyperText Markup Language) je značkovací jazyk používaný k vytváření webových stránek a dokumentů. Používá se k popisu struktury a obsahu webových stránek, umožňuje organizaci informací a formátování textu, obrázků a multimédií. HTML definuje jednotlivé části obsahu pomocí značek (**HTML tag**), které jsou interpretovány webovými prohlížeči.

Kořeny jazyka HTML sahají až do osmdesátých let minulého století, kdy byl vyvinut v [CERNU](https://home.cern) za účelem sdílení informací mezi vědeckými pracovišti.


Syntaxe HTML
------------

Základní syntaxe HTML vychází z XML (eXtensible Markup Language), což je obecný značkovací jazyk pro vytváření datových struktur. Syntaxe HTML se skládá z tagů (značek), které obklopují obsah:

```html
<p>Toto je odstavec</p>
```

V HTML existuje otevírací značka (např. `<p>`) a uzavírací značka (např. `</p>`), které dohromady definují **HTML element**. Ačkoliv to HTML specifikace ne vždy striktně vyžaduje je dobré každý HTML tag uzavřít, i když nemá žádný obsah:

```html
<div></div>
```

Dále je možné k HTML tagům připojit **HTML atributy**:

```html
<div class="mydiv" id="main"></div>
```

Atributy slouží k detailnější specifikaci vlastností elementu nebo k jejich identifikaci, ale nejsou přímo zobrazované.

```{admonition} HTML element a HTML tag
:class: note

Označení *HTML tag* nebo jen *tag* (česky značka) se používá pro označení značky v HTML, například `<h1>`, `<div>` atd., nebo také *ukončovací tag*, například `</h1>`, `</div>`.

Naproti tomu, *HTML element* zahrnuje nejen samotnou značku, ale také všechno uvnitř této značky, včetně obsahu, vnořených elementů a dalších atributů. Takže zatímco "tag" je pouze samotná značka, *element* zahrnuje celou strukturu, kterou HTML tag definuje. 
```

Značky je možné do sebe libovolně vnořovat, je však důležité zachovat správné párování otevíracích a uzavíracích značek. Pro přehlednost kódu je pak dobré používat odsazování:

```{myst-example}
:highlight: html

<div class="mydiv" id="main">
    <p>
        První odstavec
    </p>
    <p>
        Druhý odstavec
    </p>
</div>
```


Základní struktura HTML
-----------------------

HTML souboru se skládá z několika hlavních elementů, které definují základní strukturu HTML dokumentu:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Název stránky</title>
</head>
<body>
    Obsah stránky
</body>
</html>
```

- **`<!DOCTYPE html>`**: Tato deklarace by měla být na začátku každého HTML dokumentu a označuje, že dokument je typu HTML5.
- **`<html>`**: Toto je kořenový element celého HTML dokumentu.
- **`<head>`**: Tento element obsahuje meta informace o dokumentu, které nejsou viditelné na samotné stránce. Sem patří například linky na externí CSS soubory, skripty, znakovou sadu, atd.
- **`<title>`**: Tento element specifikuje název dokumentu, který je zobrazen v záložce prohlížeče.
- **`<body>`**: Všechna viditelná data na webové stránce, jako jsou grafika, texty, odkazy, menu atd., se umístí do tohoto elementu. 

Každá webová stránka by měla mít alespoň tyto základní elementy pro správnou funkčnost a kompatibilitu s webovými prohlížeči.


Základní tagy pro formátování textu
-----------------------------------

### Nadpisy `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 

Tyto značky slouží k označení titulků úrovně 1-6:

```{myst-example}
:highlight: html
<h1>Heading 1<h1>
<h2>Heading 2<h2>
<h3>Heading 3<h3>
<h4>Heading 4<h4>
<h5>Heading 5<h5>
<h6>Heading 6<h6>
```

Tag `<h1>` by měla být použita pro hlavní nadpis stránky a to maximálně jednou na stránce. Méně důležité nadpisy se pak označují pomocí `<h2>` až `<h6>`.

### Odstavec `<p>`

Tag označuje odstavec textu *(paragraph)*, který je pak zpravidla vykreslen jako blok textu s odsazením na začátku a konci odstavce.

```{myst-example}
:highlight: html
<p>První odstavec<p>
<p>Druhý odstavec<p>
```

### Seznamy `<ol>`, `<ul>`, `<li>`

#### Neuspořádaný seznam `<ul>`

Tag `<ul>` *(unordered list)* se používá k vytvoření neuspořádaného seznamu, ve kterém jsou položky označeny pomocí odrážek. Pomocí `<li>` *(list item)* se pak označují jednotlivé položky seznamu:

```{myst-example}
:highlight: html
<ul>
  <li>První položka</li>
  <li>Druhá položka</li>
  <li>Třetí položka</li>
</ul>
```


#### Uspořádaný seznam `<ol>` 

Tag `<ol>` *(ordered list)* se používá k vytvoření očíslovaného seznamu. Tagy `<li>` opět označují jednotlivé položky

```{myst-example}
:highlight: html
<ol>
    <li>První položka</li>
    <li>Druhá položka</li>
    <li>Třetí položka</li>
</ol>
```


#### Vnořování seznamu 

Stejně jako u většiny ostatních tagů lze i seznamy vnořovat, např

```{myst-example}
:highlight: html
<ol>
    <li>První položka</li>
    <li>Druhá položka
        <ul>
            <li>První položka</li>
            <li>Druhá položka</li>
            <li>Třetí položka</li>
        </ul>
    </li>
    <li>Třetí položka</li>
</ol>
```

### Zalomení řádku `<br>`

HTML si automaticky řídí tok textu a zalamování textu a ve většině případů nezachovává nové řádky tak, jak jsou ve zdrojovém kódu. Pro explicitní vložení nového řádku vložte tag `<br>` (break): 

```{myst-example}
:highlight: html
První řádek<br>Druhý řádek
```

Bez vložení `<br>` se text nezalomí, i když ve zdrojovém kódu nový řádek je.

```{myst-example}
:highlight: html
První řádek
Druhý řádek
```

```{admonition} Neukončený
:class: note

Povšimněte si, že tag `<br>` je jedním z tagů, které není potřeba ukončovat, nicméně často se v kódu setkáte i se **self-closing** variantou tohoto tagu `<br/>`, která zachovává kompatibilitu s jazykem XML.
```

### Odkaz `<a>`

Tag `<a>` zobrazí text uvedený mezi otevírací a uzavírací značkou jako odkaz na url uvedenou v atributu `href`.

```{myst-example}
:highlight: html
<a href="https://dev.w3.org/html5/spec-LC/">HTML5 specifikace</a>
```

### Obrázek `<img>`

Tento tag se používá pro vložení obrázků na webovou stránku.

```{myst-example} html
<img src="https://www.w3.org/html/logo/downloads/HTML5_Logo.svg" alt="HTML 5 Logo">
```

Tag `<img>` má následující důležité atributy:

- **`src`**: Určuje cestu k obrázku.
- **`alt`**: Používá se pro textový popis obrázku, který se zobrazí v případě, že se obrázek nemůže načíst nebo pro účely zpřístupnění webu například pro nevidomé. Až na [výjimky](https://dev.w3.org/html5/spec-LC/embedded-content-1.html#alt) by měl být vždy vyplněn.


### Tabulka `<table>`, `<tr>`, `<td>`, `<th>`

Tyto tagy se používají pro vytváření tabulek na webové stránce. Příklad

```{myst-example}
:highlight: html
<table>
    <tr>
        <th>Hlavička 1</th>
        <th>Hlavička 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
```
- **`<table>`** je kontejnerový prvek, který definuje tabulku.
- **`<tr>`** definuje řádek tabulky.
- **`<th>`** a **`<td>`** definují jednotlivé buňky tabulky, s tím, že `<th>` označuje záhlaví tabulky (názvy sloupců) a je obvykle zobrazeno tučně.


### Společné atributy

Kromě atributů specifických pro konkrétní značky existuje další sada atributů, které můžeme použít u všech HTML značek. Z nejdůležitějších jsou to tyto:
    
- **`class`**: Označuje třídu HTML elementu, slouží především při aplikaci (CSS stylů)[02_css.md], ale lze ho využívat při práci s (JavaScriptem)[javascript/01_intro.md]
- **`id`**: Označuje jedinečný identifikátor HTML elementu, na rozdíl od `class` by na jedné HTML stránce nemělo být více elementů se stejným `id`. Slouží především k jednoznačné identifikaci elementu při práci s (JavaScriptem)[javascript/01_intro.md], ale lze pomocí něj také adresovat pomocí (CSS stylů)[02_css.md].
- **`style`**: Do tohoto atributu je možné vložit (CSS styly)[02_css.md], které se aplikují na element. Ačkoliv je preferované mít CSS styly oddělené od HTML, mohou nastat situace, kdy je užitečné vložit styly přímo k elementu. Příklad `<div style="color: red;"> ... </div>`.


Tagy pro obecné formátování
---------------------------

Kromě tagů, které se používají pro formátování textu a mají zpravidla typickou formátovací funkci, existují i tagy, které se používají pro obecné formátování a strukturování větších celků stránky.


### Tagy `<div>`, `<span>`

Tagy `<div>` a `<span>` slouží k logickému seskupování obsahu. 

- **`<div>`** je blokový (`block`) element, který vytváří oddělení svého obsahu od okolního obsahu. Často se používá pro rozvržení stránky do logických sekcí, například menu, článek, záhlaví stránky apod.
- **`<span>`** je řádkový (`inline`) element, který v základu nijak neodděluje svůj obsah. Používá se pro zvýraznění nebo označení částí textu. 


### Sémantické tagy

Sémantické tagy popisují význam části dokumentu, nikoli jeho vzhled. Usnadňují orientaci v kódu a jeho správnou interpretaci prohlížeči i vyhledávači. 

Příklady sémantických tagů:

- `<header>` - záhlaví stránky nebo sekce
- `<nav>` - navigace/menu
- `<main>` - hlavní obsah stránky
- `<article>` - samostatný článek
- `<aside>` - postranní sloupec (doplňující obsah)  
- `<footer>` - zápatí stránky
- `<section>` - tematická sekce stránky


Časté chyby při psaní HTML
--------------------------

Zde je několik příkladů běžných chyb v syntaxi HTML:

### Neukončené tagy

Správně: 

```html
<div>Toto je odstavec.</div>
```

Chybně:

```html
<div>Toto je odstavec.
```

### Nesprávně vnořené tagy

Správně: 
```html
<strong><em>Tento text je tučný a kurzíva.</em></strong>
```

Chybně:
```html
<strong><em>Tento text je tučný a kurzíva.</strong></em>
```

```{admonition} Fail silently
:class: note
Ačkoliv moderní prohlížeče jsou proti chybám v HTML syntaxi poměrně dost odolné a dokáží zobrazit i kód s velkým množstvím chyb, je dobré tyto chyby nedělat. Chyby v HTML syntaxi mohou způsobit nečekané chování ve složitějších aplikacích. Pro kontrolu je vhodné používat [HTML5 Validátor](https://validator.w3.org).

Toto chování se označuje jako **fail silently** a často se objevuje v různých webových aplikacích. Místo toho aby se běh aplikace (nebo zobrazování stránky) ihned zastavil při první chybě, snaží se prohlížeč dál kód "*nějak*" interpretovat.
```
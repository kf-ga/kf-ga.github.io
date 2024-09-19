HTML
====

* [HTML Tutoriál](https://www.w3schools.com/html/default.asp)
* [HTML Validátor](https://validator.w3.org)


Co je HTML?
-----------

**HTML** (HyperText Markup Language) je značkovací jazyk používaný k vytváření webových stránek a dokumentů. Používá se k popisu struktury a obsahu webových stránek, umožňuje organizaci informací a formátování textu, obrázků a multimédií. HTML definuje jednotlivé části obsahu pomocí značek (**HTML tag**), které jsou interpretovány webovými prohlížeči.

Kořeny jazyka HTML sahají až do osmdesátých let minulého století, kdy byl vyvinut v [CERNu](https://home.cern) za účelem sdílení informací mezi vědeckými pracovišti.


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

Značky je možné do sebe (až na výjimky) vnořovat, je však důležité zachovat správné párování otevíracích a uzavíracích značek. Pro přehlednost kódu je pak dobré používat odsazování:

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

Při vnořování značek platí určitá omezení. Nelze například vkládat `block` značky do `inline` značek. Je třeba také dodržovat strukturu značek například u seznamu, nebo tabulky. Pokud si nejste jistí, využijte pro kontrolu HTML validátor.


Základní struktura HTML
-----------------------

HTML souboru se skládá z několika hlavních elementů, které definují základní strukturu HTML dokumentu:

```html
<!DOCTYPE html>
<html lang="cs">
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


Základní HTML tagy
------------------

### Nadpisy `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 

Tyto značky slouží k označení titulků úrovně 1-6:

```{myst-example}
:highlight: html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

Tag `<h1>` by měla být použita pro hlavní nadpis stránky a to maximálně jednou na stránce. Méně důležité nadpisy se pak označují pomocí `<h2>` až `<h6>`.

### Odstavec `<p>`

Tag označuje odstavec textu *(paragraph)*, který je pak zpravidla vykreslen jako blok textu s odsazením na začátku a konci odstavce:

```{myst-example}
:highlight: html
<p>První odstavec</p>
<p>Druhý odstavec</p>
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

Tag `<ol>` *(ordered list)* se používá k vytvoření očíslovaného seznamu. Tagy `<li>` opět označují jednotlivé položky:

```{myst-example}
:highlight: html
<ol>
    <li>První položka</li>
    <li>Druhá položka</li>
    <li>Třetí položka</li>
</ol>
```


#### Vnořování seznamu 

Stejně jako u většiny ostatních tagů lze i seznamy vnořovat, např.:

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


### Odkaz `<a>`

Tag `<a>` *(anchor)* zobrazí text uvedený mezi otevírací a uzavírací značkou jako odkaz na url uvedenou v atributu `href`.

```{myst-example}
:highlight: html
<a href="https://dev.w3.org/html5/spec-LC/">HTML5 specifikace</a>
```

### Obrázek `<img>`

Tento tag se používá pro vložení obrázků na webovou stránku:

```{myst-example}
:highlight: html
<img src="https://www.w3.org/html/logo/downloads/HTML5_Logo.svg" alt="HTML 5 Logo">
```

Tag `<img>` má následující důležité atributy:

- **`src`**: Určuje cestu k obrázku.
- **`alt`**: Používá se pro textový popis obrázku, který se zobrazí v případě, že se obrázek nemůže načíst nebo pro účely zpřístupnění webu například pro nevidomé. Až na [výjimky](https://dev.w3.org/html5/spec-LC/embedded-content-1.html#alt) by měl být vždy vyplněn.


### Tabulka `<table>`, `<tr>`, `<td>`, `<th>`

Tyto tagy se používají pro vytváření tabulek na webové stránce:

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
- **`<tr>`** *(table row)* definuje řádek tabulky.
- **`<th>`** a **`<td>`** *(table heading, table data)* definují jednotlivé buňky tabulky, s tím, že `<th>` označuje záhlaví tabulky (názvy sloupců) a je obvykle zobrazeno tučně.


### Formátování textu

Pro různé formy zvýraznění a formátování textu můžeme použít následující značky:

- **`<strong>`**, **`<em>`**: Text, který by měl být považován za důležitý (pojem, klíčové slovo apod.), obvykle zobrazen tučně (`<strong>`), případně kurzívou (`<em>`).
- **`<b>`**: Tučný text (bold), ale bez zvláštního sémantického významu
- **`<i>`**: Kurzíva (italic), bez zvláštního sémantického významu
- **`<u>`**: Podtržený text (undeline), bez zvláštního sémantického významu
- **`<small>`**: Text, který by měl být zobrazen menším písmem, například pro poznámky.
- **`<mark>`**: Text zobrazený s pozadím (jakoby označen zvýrazňovačem)
- **`<sub>`**, **`<sup>`**: Značky označují text, který bude zobrazen jako horní (`<sup>`), resp. dolní index (`<sub>`).

Příklad:

```{myst-example}
:highlight: html
Důležitý <strong>pojem</strong>, nebo jinak důležitá <em>informace</em>. <br>
Text <b>tučně</b>, <i>kurzívou</i> a <u>podtržený</u>. <br>
Text <small>malý a nedůležitý</small>. <br>
Naopak <mark>velmi důležitý</mark> text. <br>
A ukázka <sup>horního</sup> a také <sub>dolního</sub> indexu. <br>
```

### Společné atributy

Kromě atributů specifických pro konkrétní značky existuje další sada atributů, které můžeme použít u všech HTML značek. S jejich použitím se seznámíme v dalších kapitolách. Z nejdůležitějších jsou to tyto:
    
- **`class`**: Označuje třídu HTML elementu, slouží především při aplikaci CSS stylů, ale lze ho využívat při práci s JavaScriptem.
- **`id`**: Označuje jedinečný identifikátor HTML elementu, na rozdíl od `class` by na jedné HTML stránce nemělo být více elementů se stejným `id`. Slouží především k jednoznačné identifikaci elementu při práci s JavaScriptem, ale lze pomocí něj také adresovat pomocí CSS stylů.
- **`style`**: Do tohoto atributu je možné vložit CSS styly, které se aplikují na element. Ačkoliv je preferované mít CSS styly oddělené od HTML, mohou nastat situace, kdy je užitečné vložit styly přímo k elementu. Například: 

```{myst-example}
:highlight: html
<div style="color: red;"> Červený text </div>
```


Zobrazení `inline` a `block`
----------------------------

HTML si automaticky řídí tok textu a zalamování textu a ve většině případů nezachovává nové řádky tak, jak jsou ve zdrojovém kódu.

Příklad:

```{myst-example}
:highlight: html
<p>
První řádek
Druhý řádek
</p>
```

V HTML se pracuje s konceptem tzv. `inline` a `block` elementů. 

**`inline` elementy** zaberou pouze tolik místa, kolik je potřeba k zobrazení jejich obsahu. Nezačínají na novém řádku a nezaberou celou šířku. Používají se především pro **formátování v rámci odstavce textu**. Příklady inline elementů: `<span>`, `<a>`, `<strong>`, `<em>`, `<b>`, `<i>` atd.


Naproti tomu **`block` elementy** zaberou celou šířku dostupného prostoru na stránce a zobrazují na novém řádku. Jsou určeny pro **strukturování obsahu**. Příklady block elementů: `<div>`, `<p>`, `<h1>` až `<h6>`, `<ul>`, `<ol>`, `<li>`,  `<section>`, `<header>`, `<footer>` atd.

### Zalomení řádku `<br>`

 Pro explicitní vložení nového řádku vložte tag `<br>` (break): 

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

Tagy pro obecné formátování
---------------------------

Kromě tagů, které se používají pro formátování textu a mají zpravidla typickou formátovací funkci, existují i tagy, které se používají pro obecné formátování a strukturování větších celků stránky.


### Tagy `<div>`, `<span>`

Tagy `<div>` a `<span>` slouží k logickému seskupování obsahu. 

- **`<div>`** je blokový (`block`) element, který vytváří oddělení svého obsahu od okolního obsahu. Často se používá pro rozvržení stránky do logických sekcí, například menu, článek, záhlaví stránky apod.
- **`<span>`** je řádkový (`inline`) element, který v základu nijak neodděluje svůj obsah. Používá se pro zvýraznění nebo označení částí textu. 

### Komentáře

Jako komentář se v HTML považuje text uzavřený mezi `<!--` a `-->`:

```html
<!-- Komentář  -->
```

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


HTML Entity
-----------

**HTML Entity** je nástroj, jak zobrazit znaky vyhrazené pro HTML, například znaky `<`, `>`, `&` a další.

HTML Entita se zapisuje ve tvaru

```html
&entity_name;
```

kde `entity_name` je název znaku, nebo

```html
&#entity_number;
```

kde `entity_number` je číslo znaku v [unicode tabulce](https://symbl.cc/en/unicode-table/). Pomocí HTML Entit lze zapsat jakýkoliv znak, nicméně díky široké podpoře unicode kódování vystačíme zpravidla s následujícími znaky:

| Znak | Jméno                          | name     | number   |
|------|--------------------------------|----------|----------|
| &    | **amp**ersand                  | `&amp;`  | `&#38;`  |
| <    | **l**ower **t**han             | `&lt;`   | `&#60;`  |
| >    | **g**reater **t**han           | `&gt;`   | `&#62;`  |
| "    | **quot**ation math             | `&quot;` | `&#34;`  |
| '    | **apos**trophe                 | `&apos;` | `&#39;`  |
|      | **n**on-**b**eakable **sp**ace | `&nbsp;` | `&#160;` |

Je pohodlnější si zapamatovat kódování pomocí `entity_name` a i v kódu je to pak lépe čitelné, než kódování číslem:

```{myst-example}
:highlight: html
<img src="quote.jpg" alt="Meme saying &quot;Live together, die alone&quot;">
<p>
Pro porovnání máme znaky &lt; a &gt;
</p>
```

Nepoužití entit v tomto příkladu by mělo za následek nevalidní HTML kód. Entita `&nbsp;` je *nezalomitelná mezera*, kterou můžeme vložit na místo, kde nechceme, aby se nám tok textu zalomil: 

```{myst-example}
:highlight: html
Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.
```

Meta informace
--------------

Do sekce <head> lze vložit meta informace o stránce, které se nezobrazují přímo v obsahu stránky, ale lze pomocí nich specifikovat dodatečné informace o stránce. Zde jsou uvedeny některé nejčastější meta parametry.

### Kódování stránky

Ačkoliv je dnes běžným standardem kódování unicode (utf-8) a obvykle je to výchozí nastavení všech prohlížečů, je dobré kódování stránky explicitně specifikovat:

```html
<meta charset="utf-8">
```

### Favicon

Favicon (zkratka z favorite icon) je ikonka stránky, která se zobrazuje v záložce stránky, v oblíbených apod.

```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

Podporované jsou různé formáty ikonky, nejčastěji `.ico`, `.png` a `.svg`.

### Název, popis a klíčová slova

Trojice meta informací title, description, keywords specifikuje název stránky, stručný popis obsahu stránky a klíčová slova stránky. Jejich význam sloužil hlavně k tomu, aby vyhledávače stránku lépe zaindexovaly, nicméně dnes už vyhledávače obsah techto informací spíše ignorují (přesné algoritmy řazení ve vyhledávačích jsou přísným tajemstvím), nicméně se tyto meta informace stále často na stránkách objevují.

```html
<meta name="title" content="W3Schools.com">
<meta name="description" content="Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, Python, PHP, Bootstrap, Java, XML and more.">
<meta name="keywords" content="HTML, Python, CSS, SQL, JavaScript, How to, PHP, Java, C, C++, C#, jQuery, Bootstrap, Colors, W3.CSS, XML, MySQL, Icons, NodeJS, React, Graphics, Angular, R, AI, Git, Data Science, Code Game, Tutorials, Programming, Web Development, Training, Learning, Quiz, Exercises, Courses, Lessons, References, Examples, Learn to code, Source code, Demos, Tips, Website">
```

### Informace pro sociální sítě

Při sdílení stránky na sociálních sítích mohou sociální sítě využít následující meta informace k zobrazení náhledu stránky.

```html
<meta property="og:title" content="Title of the page">
<meta property="og:description" content="Description of the page">
<meta property="og:image" content="image.jpg">
<meta property="og:url" content="https://www.example.com/page-url">
```

Některé sociální sítě mají i vlastní sadu meta informací, například Twitter/X: 

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Title of the page">
<meta name="twitter:description" content="Description of the page">
<meta name="twitter:image" content="image.jpg">
```


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

### Chybný kontext tagů

Některé složitější struktury (např. tabulka a seznam) vyžadují dodržování struktury a nedovolují v této struktuře umisťovat jiné značky.

Správně: 
```html
<table>
    <tr>
        <td><mark>Sloupec 1</mark></td>
        <td><mark>Sloupec 2</mark></td>
    </tr>
    <tr>
        <td>123</td>
        <td>456</td>
    </tr>
</table>
```

Chybně: 
```html
<table>
    <tr>
        <mark><td>Sloupec 1</td></mark>
        <mark><td>Sloupec 2</td></mark>
    </tr>
    <tr>
        <td>123</td>
        <td>456</td>
    </tr>
</table>
```

U tabulek je nutné dodržovat přímé vnoření tagů `<table>` - `<tr>` - `<td>` (nebo `<th>`). Veškeré další formátování musí být buď vně tabulky (`<table>`) nebo až uvnitř buňky (`<td>`, `<th>`).

Obdobně to platí u seznamů.

Správně: 
```html
<ul>
    <li><b>Položka 1</b></li>
    <li>Položka 2</li>
</ul>
```

Chybně: 
```html
<ul>
    <b><li>Položka 1</li></b>
    <li>Položka 2</li>
</ul>
```

Také chybně: 
```html
<ul>
    <h1>Nadpis</h1>
    <li>Položka 1</li>
    <li>Položka 2</li>
</ul>
```

U seznamů je nutné dodržovat přímé vnoření tagů `<ul>` - `<li>`, nebo. `<ol>` - `<li>`, další formátování musí být buď vně seznamu (`<ul>`, `<ol>`) nebo až uvnitř položky (`<li>`).

### Nevyplněné povinné atributy

Některé elementy vyžadují mít povinně vyplněné některé atributy, např.: `<img>` vyžaduje atribut `src` a `alt`, kořenový element `<html>` vyžaduje atribut `lang`. Povinných atributů je více, je proto dobré vždy zkontrolovat stránku pomocí HTML validátoru. Jednotlivé atributy je také vždy nutné oddělovat mezerou.


Správně: 
```html
<img src="photo.jpg" alt="moje fotka">
```

Chybně: 
```html
<img src="photo.jpg"alt="moje fotka">
```

### `block` element v `inline` elementu 

V HTML není povoleno vkládat `inline` HTML element do `block` elementu:

Správně: 
```html
<h1><i>Nadpis</i></h1>
```

Chybně: 
```html
<i><h1>Nadpis</h1></i>
```

### HTML značka v chybném kontextu

Každá HTML značka má omezení na to v jakém kontextu může být, např. žádné formátovací ani sémantické značky nemohou být umístěny v `<head>` části dokumentu:

Chybně: 
```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Název stránky</title>
    <h1>Titulek</h1>
</head>
<body>
    Obsah stránky
</body>
</html>
```

Pravidel je více a je proto vždy dobré zkontrolovat HTML stránku pomocí validátoru.


```{admonition} Fail silently
:class: note
Ačkoliv moderní prohlížeče jsou proti chybám v HTML syntaxi poměrně dost odolné a dokáží zobrazit i kód s velkým množstvím chyb, je dobré tyto chyby nedělat. Chyby v HTML syntaxi mohou způsobit nečekané chování ve složitějších aplikacích. Pro kontrolu je vhodné používat [HTML5 Validátor](https://validator.w3.org).

Toto chování se označuje jako **fail silently** a často se objevuje v různých webových aplikacích. Místo toho aby se běh aplikace (nebo zobrazování stránky) ihned zastavil při první chybě, snaží se prohlížeč dál kód "*nějak*" interpretovat.
```
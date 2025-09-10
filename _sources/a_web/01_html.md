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
<div class="my_div" id="main"></div>
```

Atributy slouží k detailnější specifikaci vlastností elementu nebo k jejich identifikaci, ale nejsou přímo zobrazované.

Značky je možné do sebe (až na výjimky) vnořovat, je však důležité zachovat správné párování otevíracích a uzavíracích značek. Pro přehlednost kódu je pak dobré používat odsazování:

```{myst-example}
:highlight: html

<div class="my_div" id="main">
    <p>
        První odstavec
    </p>
    <p>
        Druhý odstavec
    </p>
</div>
```

Při vnořování značek platí určitá omezení. Nelze obvykle například vkládat `block` značky do `inline` značek (až na výjimky, například značka `<a>`, která byť je inline, může obsahovat block elementy). Je třeba také dodržovat strukturu značek například u seznamu, nebo tabulky. Pokud si nejste jistí, využijte pro kontrolu HTML validátor.


Základní struktura HTML
-----------------------

HTML souboru se skládá z několika hlavních elementů, které definují základní strukturu HTML dokumentu:

```html
<!doctype html>
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

````{admonition} Automatické ukončování
:class: warning
Pokud značka `<p>` obsahuje `block` element, [dokumentace HTML5](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags) praví, že je automaticky ukončena před začátkem tohoto elementu. Kód:

```html
<p>
    Odstavec textu 
    <div>Vnořený text</div>
</p>
```

Je dle specifikace interpretován jako 

```html
<p>
    Odstavec textu 
</p>
<div>
    Vnořený text
</div>
</p>
```

Což způsobí chybu kvůli nesprávnému párování ukončovací značky `</p>`.

**Značka `<p>` by měla být chápána skutečně jako odstavec textu a obsahovat pouze `inline` formátovací značky**.
````

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
- **`<u>`**: Podtržený text (underline), bez zvláštního sémantického významu
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

Nepoužití entit v tomto příkladu by mělo za následek nevalidní HTML kód. Entita `&nbsp;` je *nezlomitelná mezera*, kterou můžeme vložit na místo, kde nechceme, aby se nám tok textu zalomil: 

```{myst-example}
:highlight: html
Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.&nbsp;Hodně&nbsp;moc&nbsp;dlouhý&nbsp;řádek.
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
<!doctype html>
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
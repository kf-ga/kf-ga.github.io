Algoritmizace
=============

Algoritmizace je proces navrhování a popisování kroků, které je třeba vykonat k dosažení konkrétního cíle nebo vyřešení problému. Tento proces můžeme přirovnat k receptu na vaření: pokud máte dobře napsaný recept, víte přesně, jaké kroky a v jakém pořadí máte vykonat, abyste dosáhli požadovaného výsledku. Stejně tak algoritmus popisuje konkrétní posloupnost kroků, které je třeba provést, aby program správně fungoval.


Základní vlastnosti algoritmů
-----------------------------

* **Opakovatelnost:** Algoritmus je sekvence kroků, které lze opakovat a aplikovat na různé vstupy.
* **Determinismus:** Každý krok algoritmu musí být jednoznačně definován, což znamená, že pro stejný vstup bude algoritmus vždy vykonávat stejné kroky a dávat stejný výstup.
* **Konečnost:** Algoritmus by měl mít konečný počet kroků a musí skončit po provedení všech operací.

Příkladem mohou být například algoritmy na sčítání, násobení a dělení "na papíře". Tyto algoritmy mají jasný opakovatelný postup, pro stejná vstupní čísla dávají vždy stejný výsledek (determinismus) v konečném počtu kroků.


Potřeba programovacího jazyka
-----------------------------

Pro popis algoritmu lze použít sice přirozený jazyk (čeština, angličtina), nicméně tyto jazyky jsou často nejednoznačné, popis některých kroků může být velmi zdlouhavý a často také pracují s implicitním kontextem, u kterého se předpokládá, že ho čtenář zná, nicméně každý může pracovat s trochu jinou verzí toho kontextu. 

Proto abychom mohli algoritmus zapsat a nechat počítač, aby jej vykonal, potřebujeme **programovací jazyk**. Tyto jazyky jsou navrženy tak, aby jejich zápis měl vždy jednoznačnou interpretaci. Programovací jazyk musí být srozumitelný jak pro člověka, který píše kód, tak pro počítač, který jej vykoná a slouží tak jako "komunikační můstek" mezi člověkem a počítačem.

Nejčastěji používané programovací jazyky
----------------------------------------

### JavaScript
JavaScript je jazyk používaný především pro vývoj webových aplikací. Umožňuje vytvářet interaktivní prvky na webových stránkách, jako jsou animace, formuláře nebo dynamický obsah. Setkáme se s ním v prohlížečích a při vývoji front-endu i back-endu (např. pomocí Node.js).

### Java
Java je univerzální programovací jazyk, který se často používá pro vývoj podnikových aplikací, mobilních aplikací (zejména pro Android) a serverových aplikací. Díky své přenositelnosti je oblíbený v různých prostředích.

### C++
C++ je výkonný jazyk používaný pro vývoj softwaru, který vyžaduje vysoký výkon, jako jsou hry, operační systémy nebo vestavěné systémy. Je známý svou rychlostí a kontrolou nad hardwarovými prostředky.

### C#
C# je jazyk vyvinutý společností Microsoft, který se používá pro vývoj aplikací na platformě .NET. Často se s ním setkáme při vývoji desktopových aplikací, her (pomocí Unity) a webových aplikací.

### PHP
PHP je skriptovací jazyk používaný především pro vývoj webových stránek a aplikací na straně serveru. Je populární díky své jednoduchosti a širokému využití v systémech pro správu obsahu, jako je WordPress.

### Go
Go (nebo Golang) je jazyk vyvinutý společností Google, který je známý svou jednoduchostí, rychlostí a podporou paralelního zpracování. Používá se pro vývoj serverových aplikací a cloudových služeb.

### Kotlin
Kotlin je moderní jazyk, který je plně kompatibilní s Javou. Používá se především pro vývoj aplikací pro Android a získává stále větší popularitu díky své jednoduchosti a expresivní syntaxi.

```{admonition} Co to je syntaxe?
:class: note
**Syntaxe** je pravidlo nebo sada pravidel, která určují, jak správně sestavit věty, slova nebo příkazy v daném jazyce. V kontextu programování syntaxe definuje, jaké kombinace symbolů a klíčových slov jsou povoleny a jaký mají význam. Podobně jako v přirozených jazycích, i v programovacích jazycích je syntaxe klíčová pro správné porozumění a interpretaci. I přirozené jazyky mohou mít velmi odlišnou syntaxi, například arabština nebo japonština.
```

Programovací jazyk Python
-------------------------

Jedním z nejlepších jazyků pro začátečníky je **Python**. Je známý svou jednoduchostí, čitelností a širokým využitím. Python se používá pro webové aplikace, datovou analýzu, strojové učení a mnoho dalších oblastí. Python je také dynamicky typovaný jazyk, což znamená, že nemusíme předem specifikovat typy proměnných.

### Stručný popis jazyka

Python je **vysoký jazyk**, což znamená, že se zaměřuje na jednoduchost a srozumitelnost, místo toho, aby se zabýval detaily, jak počítač provádí operace. Díky jeho jednoduché syntaxi a velkému množství knihoven je Python vhodný pro začátečníky, kteří chtějí začít s programováním.

### Standardní výstup: `print()`

V Pythonu používáme funkci `print()`, abychom poslali nějaký text nebo hodnotu na obrazovku, tedy **výstup** programu. Je to základní nástroj pro komunikaci s uživatelem.

Příklad použití:

```python
print("Ahoj světe!")
```

Tento program vypíše na obrazovku text:

```
Ahoj světe!
```

### Hello World program

Nejjednodušší způsob, jak začít s programováním v jakémkoli jazyce, je napsat program, který vypíše text "Hello, World!" na obrazovku. V Pythonu to vypadá takto:

```python
print("Hello, World!")
```


Práce s chybami
---------------

Při programování je důležité naučit se číst a rozumět chybovým hláškám. Tyto hlášky nám poskytují informace o tom, kde a jaká chyba nastala, což nám pomáhá rychleji problém vyřešit.

Pokud zapomeneme použít závorky u funkce `print`, Python nám zobrazí chybu:

```python
print "Hello, World!"
```

Chybová hláška:

```
File "hello.py", line 1
    print "Hello, World!"
          ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Hello, World!")?
```


Pokud uděláme překlep v názvu funkce, Python nám oznámí, že taková funkce neexistuje:

```python
pritn("Hello, World!")
```

Chybová hláška:

```
File "hello.py", line 1, in <module>
    pritn("Hello, World!")
NameError: name 'pritn' is not defined
```

### Jak pracovat s chybami

1. **Pečlivě čtěte chybové hlášky** – většinou obsahují informace o tom, kde a proč chyba nastala.
2. **Zkontrolujte kód na uvedeném řádku** – chyba se často nachází na řádku uvedeném v chybové hlášce nebo těsně před ním.
3. **Používejte online zdroje** – pokud si s chybou nevíte rady, zkuste hledat řešení na internetu podle textu chybové hlášky.

Práce s chybami je důležitou součástí programování a zejména v začátcích se budete s nejrůznějšími chybovými hláškami setkávat velmi často. Je proto důležité se naučit s chybovými hláškami pracovat a postupem času se tak zlepšíte v rychlém odhalování a opravování chyb.

Algoritmizace
=============

- [Python](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com)

Algoritmizace je proces navrhování a popisování kroků, které je třeba vykonat k dosažení konkrétního cíle nebo vyřešení problému. Tento proces můžeme přirovnat k receptu na vaření: pokud máte dobře napsaný recept, víte přesně, jaké kroky a v jakém pořadí máte vykonat, abyste dosáhli požadovaného výsledku. Stejně tak algoritmus popisuje konkrétní posloupnost kroků, které je třeba provést, aby program správně fungoval.

Další příklady algoritmů:
- Matematické operace: sčítání, odčítání, násobení, dělení, řešení kvadratické rovnice apod.
- Hledání nejkratší cesty mezi dvěma body.
- Seřazení jmen podle abecedy.

Základní vlastnosti algoritmů
-----------------------------

- **Opakovatelnost:** Algoritmus je sekvence kroků, kterou lze opakovaně aplikovat na různé vstupy.
- **Determinismus:** Každý krok algoritmu musí být jednoznačně definován, což znamená, že pro stejný vstup bude algoritmus vždy vykonávat stejné kroky a dávat stejný výstup. Algoritmus v sobě může mít prvky náhodnosti (např. simulace hodu kostkou); ty jsou však explicitně definovány a taková náhodnost se chápe jako součást vstupu algoritmu.
- **Konečnost:** Algoritmus musí být popsatelný konečným počtem kroků. To ale nutně neznamená, že algoritmus musí někdy skončit. Kroky se mohou opakovat v nekonečné smyčce (například text běžící na LED panelu).

Potřeba programovacího jazyka
-----------------------------

Pro popis algoritmu lze sice použít přirozený jazyk (čeština, angličtina), avšak tyto jazyky jsou často nejednoznačné, popis některých kroků může být velmi zdlouhavý a často také pracují s implicitním kontextem (kulturním, společenským nebo i jiným), o němž se předpokládá, že jej čtenář zná; každý však může pracovat s trochu jinou verzí tohoto kontextu. To vede k nejednoznačnostem v interpretaci přirozeného jazyka a narušuje tak požadavek na determinismus algoritmu.

Abychom mohli algoritmus zapsat a nechat počítač, aby jej vykonal, potřebujeme **programovací jazyk**. Programovací jazyky jsou navrženy tak, aby jejich zápis měl vždy jednoznačnou interpretaci. Programovací jazyk musí být srozumitelný jak pro člověka, který píše kód, tak pro počítač, který jej vykoná, a slouží tak jako „komunikační můstek“ mezi člověkem a počítačem.

Nejčastěji používané programovací jazyky
----------------------------------------

- **Python**

    Python je moderní, vysoce čitelný a snadno naučitelný programovací jazyk, kterému se dále budeme podrobně věnovat.

- **JavaScript**

    JavaScript je jazyk používaný především pro vývoj webových aplikací. Umožňuje vytvářet interaktivní prvky na webových stránkách, jako jsou animace, formuláře nebo dynamický obsah.

- **Java**

    Java je univerzální programovací jazyk, který se často používá pro vývoj podnikových aplikací, mobilních aplikací (zejména pro Android) a serverových aplikací.

- **C++**

    C++ je výkonný jazyk používaný pro vývoj softwaru, který vyžaduje vysoký výkon, jako jsou hry, operační systémy nebo vestavěné systémy. Je známý svou rychlostí a kontrolou nad hardwarovými prostředky.

- **C#**

    C# (C-sharp) je jazyk vyvinutý společností Microsoft, který se používá pro vývoj aplikací na platformě .NET. Často se s ním setkáme při vývoji desktopových aplikací, her (pomocí Unity) a webových aplikací.

- **PHP**

    PHP je skriptovací jazyk používaný především pro vývoj webových stránek a aplikací na straně serveru. Je populární díky své jednoduchosti a širokému využití v systémech pro správu obsahu, jako je WordPress.

Programovacích jazyků jsou [stovky](https://en.wikipedia.org/wiki/List_of_programming_languages); kromě několika málo desítek mainstreamových jazyků existují i jazyky určené pro velmi specifické účely, jiné jsou spíše [obskurními experimenty](https://en.wikipedia.org/wiki/Esoteric_programming_language) než praktickými jazyky.

```{admonition} Co to je syntaxe?
:class: note
**Syntaxe** je sada pravidel, která určují, jak správně sestavit slova, věty nebo příkazy v daném jazyce.

V kontextu programování syntaxe definuje, jaké kombinace symbolů a klíčových slov jsou povoleny a jaký mají význam. Podobně jako v přirozených jazycích, i v programovacích jazycích je syntaxe klíčová pro správné porozumění a interpretaci.
```

Programovací jazyk Python
-------------------------

Jedním z nejlepších programovacích jazyků pro začátečníky je **Python**. Je známý svou jednoduchostí, čitelností a širokým využitím. Nabízí obrovský ekosystém komunitně spravovaných balíčků pro nejrůznější aplikace od práce s obrazem, zvukem a textem přes webové nástroje, datovou analytiku, strojové učení a mnoho dalších oblastí.

### Hello, World !

Nejjednodušší způsob, jak začít s programováním v jakémkoli jazyce, je napsat program, který vypíše text "Hello, World!" na obrazovku.

V Pythonu program vypadá takto:

```python
print("Hello, World!")
```

Program „Hello, World!“ je nejjednodušší možný spustitelný program, který slouží hlavně k tomu, abyste si otestovali, zda máte správně nastaveno vývojové prostředí.

Práce s chybami
---------------

Při programování je důležité naučit se číst a rozumět chybovým hláškám. Tyto hlášky nám poskytují informace o tom, kde a jaká chyba nastala, což nám pomáhá rychleji problém vyřešit.

Pokud zapomeneme použít závorky u funkce `print`, Python nám zobrazí chybu:

```python
print "Hello, World!"
```

Chybová hláška:

```python
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
3. **Používejte online zdroje** – pokud si s chybou nevíte rady, zkuste hledat řešení na Internetu podle textu chybové hlášky.

Práce s chybami je důležitou součástí programování a zejména v začátcích se budete s nejrůznějšími chybovými hláškami setkávat velmi často. Je proto důležité se chybových hlášek nebát a naučit se je číst.

Úlohy
-----

1) Vyzkoušejte napsat a spustit program Hello, World.

2) Zkuste záměrně vytvořit v programu následující chyby a sledujte, jaké chybové hlášky to způsobí:
    ```python
    print("Hello, World)

    prin("Hello, World")

    print"Hello, World")
    ```

3) Vyzkoušejte do funkce `print` vložit algebraické výrazy. Otestujte, co se stane, pokud zadáte např.:
    ```python
    print(7+2)

    print(3*2)

    print(15/2)

    print(4**2)

    print(2*(1-5))

    print(4/0)
    ```


4) Vypište více hodnot v jednom volání a experimentujte s parametry `sep` a `end`. Předpovězte výstup.
    
    ```python
    print("A", "B", 1, 2+3)

    print("A", "B", sep="-")

    print("A", end="")

    print("jablko", "hruška", "švestka", sep=", ", end=".\n")
    ```
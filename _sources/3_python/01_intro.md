Seznámení s jazykem Python
==========================

* [Tutoriál od W3C](https://www.w3schools.com/python/default.asp)
* [Domovská stránka Pythonu](https://www.python.org)

**Python** je populární programovací jazyk, známý pro svůj důraz na čitelnost a jednoduchost kódu. Zde najdete klíčové aspekty jeho syntaxe a filozofie pro ty, kdo přecházejí z jiných jazyků.

Spustitelný pseudokód
---------------------

Python je navržen tak, aby byl co nejvíce čitelný a srozumitelný. Python se dokonce někdy označuje jako spustitelný pseudokód.

````{admonition} Co je to pseudokód?
:class: note

Pseudokód je zjednodušený způsob zápisu algoritmů, který používá strukturu a terminologii podobnou programovacím jazykům, ale zároveň je dostatečně volný a čitelný pro člověka, který nemusí být obeznámen s konkrétním programovacím jazykem. Příklad pseudokódu pro nalezení největšího čísla v seznamu:

```text
nastav MAX na první hodnotu v seznamu
pro každé číslo v seznamu:
    pokud číslo > MAX:
        nastav MAX na toto číslo
```
````

Minimalistická syntaxe
----------------------

Python používá minimalistickou syntaxi, bez nadbytečných elementů, což přispívá k zlepšení čitelnosti. 

Na rozdíl od jiných jazyků, kde se příkazy zpravidla oddělují středníkem `;` a umisťování příkazů na nové řádky je spíše kvůli čitelnosti a nemá na běh kódu vliv, v Pythonu obecně platí, že co řádek, to právě jeden příkaz a rozdělení kódu na řádky je přímo součástí syntaxe jazyka:

```python
a=1
print("Hello World!")
```

Příkazy jsou jednoduše ukončovány koncem řádku, což vede ke konzistentní a lépe čitelné struktuře kódu.

V Pythonu se bloky kódu označují pomocí odsazení, což je jedna z jeho základních a nejvýznamnějších vlastností oproti jiným jazykům, kde se blok kódu označuje např. složenými závorkami `{}`. Nový blok kódu je uveden dvojtečkou `:`:

```python
if x>10:
    print("Větší než 10")
    return x
return 0
```

Konec bloku je určen snížením úrovně odsazení na úroveň předchozího bloku.

Odsazení se provádí pomocí mezer nebo tabulátorů. Standardní doporučení je používat čtyři mezery pro jednu úroveň odsazení. Pokud jsou v jednom bloku různě odsazené příkazy, je to považováno za syntaktickou chybu.

```python
    print("One")
     print("Two") # chyba
    print("Three")
```
Konec bloku je určen snížením úrovně odsazení na úroveň předchozího bloku nebo na začátek kódu.

```{admonition} Tabulátor nebo mezera
:class: warning

Pozor na míchání mezer a tabulátorů v jednom Python souboru, které se obvykle bere jako chyba. Takže dobré se při psaní kódu rozhodnout, jestli [budete v táboře mezerníků nebo tabulátorů](https://insanelab.com/blog/notes/spaces-vs-tabs/).
```

Dynamické typování
------------------

Na rozdíl od Javy, Python používá dynamické typování podobně jako JavaScript, což znamená, že typ proměnné je určen za běhu a nemusí být explicitně deklarován:

```python
a=1 # a je odteď proměnná typu int, i když není typ explicitně definován
s="abc" # string proměnná
```

Ačkoliv Python s typy nepracuje explicitně, proměnné i tak typ mají a v některých situacích je potřeba proměnné přetypovat, jinak může dojít k chybě nebo neočekávanému chování:

```python
a=2 # integer 
b="2" # string
print(a*int(b))  # 4
print(a*b) # 22
```

Ke zjištění typu proměnné je možné použít funkci `type`:

```python
a = 10.5
print(type(a))  # <class 'float'>

b = "Hello"
if type(b)==str:
    print("B is string")
```

Případně testovat pomocí funkce `isinstance`

```python
a = 10
print(isinstance(a, int))  # True
print(isinstance(a, float))  # False
```
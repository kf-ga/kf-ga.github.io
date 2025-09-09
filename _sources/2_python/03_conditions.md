Podmínky
========

Podmínky nám umožňují rozhodovat, jakým směrem se program vydá na základě určitých hodnot nebo vstupů. Říká se tomu **větvení programu** – podle splnění nebo nesplnění podmínky se vykoná jiný kód.


Konstrukce `if` - `elif` - `else`
---------------------------------

Větvení v Pythonu se dělá pomocí konstrukce `if` - `elif` - `else`, která má následující syntaxi:

```python
if condition1:
    # kód, který se provede pokud je podmínka condition1 pravdivá
elif condition1:
    # kód, který se provede pokud je podmínka condition2 pravdivá
else:
    # kód, který se provede pokud neplatí žádná z výše uvedených podmínek
```
Podmínku `elif` je možné opakovat vícekrát. V konstrukci `if` - `elif` - `else` se provede vždy jen jeden z bloků a to první z bloků, jehož podmínka je vyhodnocena jako pravdivá (`True`), případně blok `else`, pokud žádná z podmínek u `if`, `elif` nebyla splněna.

### Příklad:

```python
temp = int(input("Zadej teplotu: "))

if teplota > 30:
    print("Je horko.")
elif teplota > 20:
    print("Je příjemně.")
else:
    print("Je zima.")
```

Bloky `elif` a `else` jsou nepovinné a není tedy vždy nezbytně nutné je použít:

```python
vek = 17
if vek >= 18:
    print("Dospělý")
else:
    print("Nezletilý")
```


Odsazování
----------

**Odsazování** v Pythonu je klíčovou součástí syntaxe, která určuje strukturu kódu a definuje bloky kódu. Python spoléhá na odsazení (mezery nebo tabulátory) k označení hierarchie a logických bloků.


```python
num = 10
x = 1
if num > 5:
    print("Větší než pět")  # provede se, pokud je num větší ne 5
    x = 2 # toto také
y = 3 # tento příkaz se už provede vždy
```

Blok kódu následující po `if`, `elif`, `else` (a dalších konstrukcích) musí vždy obsahovat alespoň jeden příkaz.Pokud zatím nemáme hotový blok kódu, ale přesto chceme zachovat větvení (například pro doplnění kódu v budoucnu) můžeme použít klíčové `pass`, což je příkaz, který nevykoná nic, ale umožní zachovat hierarchii odsazování v Python kódu:

```python
x = 5
if x > 0:
    pass  # blok zatím prázdný, neobsahuje žádné příkazy, ale syntaxe je správná
```

Co je pravda?
-------------

V Pythonu se v podmínkách nepoužívají jen booleovské hodnoty `True` a `False` nebo logické operátory vracející booleovské hodnoty. Každý objekt v Pythonu má svou "pravdivostní hodnotu". Obecně lze říci, že objekty prázdné nebo nulové se vyhodnotí jako `False`, neprázdné nebo nenulové jako `True` .


| Hodnota                               | Vyhodnotí se jako |
| ------------------------------------- | ----------------- |
| `0`, `0.0`                            | `False`           |
| `1`, `2.1`                            | `True`            |
| `""` (prázdný řetězec)                | `False`           |
| `"abc"`                               | `True`            |

To umožňuje zapisovat zkrácené podmínky a kód je pak čitelnější a přehlednější.

### Příklad:

```python
name = input("Zadej jméno: ")

if name:
    print("Ahoj,", name)
else:
    print("Jméno nebylo zadáno.")
```


Úlohy k procvičení
------------------

### 1. **Porovnání čísel**

Zeptej se uživatele na dvě čísla a vypiš, které je větší, nebo zda jsou stejná.

### 2. **Klasifikace známky**

Na vstupu zadej číslo 1–5 a vypiš slovní hodnocení (např. 1 = výborný, 5 = nedostatečný). Ošetři vstupy mimo rozsah.

### 3. **Přestupný rok**

Zeptej se na rok a rozhodni, zda je přestupný:

* je dělitelný 4 a není dělitelný 100, nebo je dělitelný 400.

### 4. **Řešení kvadratické rovnice**

Načti koeficienty `a`, `b`, `c` a rozhodni podle diskriminantu:

* D < 0: žádné reálné řešení
* D = 0: jedno řešení
* D > 0: dvě řešení

(Diskriminant D = b² - 4ac)

### 5. **Parita čísla**

Zeptej se na číslo a vypiš, zda je **sudé** nebo **liché**.

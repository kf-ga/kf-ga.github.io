Podmínky
========

Podmínky nám umožňují rozhodovat, jakým směrem se program vydá na základě určitých hodnot nebo vstupů. Říká se tomu **větvení programu** – podle splnění nebo nesplnění podmínky se vykoná jiný kód.


Konstrukce `if` - `elif` - `else`
---------------------------------

Větvení v Pythonu se dělá pomocí konstrukce `if` - `elif` - `else`, která má následující syntaxi:

```python
if condition1:
    # kód, který se provede pokud je podmínka condition1 pravdivá
    print("Podmínka první splněna")
elif condition2:
    # kód, který se provede pokud je podmínka condition2 pravdivá
    print("Podmínka druhá splněna")
else:
    # kód, který se provede pokud neplatí žádná z výše uvedených podmínek
    print("Žádná podmínka nebyla splněna")
```
Podmínku `elif` je možné opakovat vícekrát. V konstrukci `if` - `elif` - `else` se provede vždy jen jeden z bloků a to první z bloků, jehož podmínka je vyhodnocena jako pravdivá (`True`), případně blok `else`, pokud žádná z podmínek u `if` nebo `elif` nebyla splněna.

*Příklad:*

```python
temp = int(input("Zadej teplotu: "))

if temp > 30:
    print("Je horko.")
elif temp > 20:
    print("Je příjemně.")
else:
    print("Je zima.")
```

Bloky `elif` a `else` jsou nepovinné a není tedy vždy nezbytně nutné je použít:

```python
age = 17
if age >= 18:
    print("Dospělý")
else:
    print("Nezletilý")
```

### Porovnávací operátory

| Operátor | Význam           | Příklad  |
| -------- | ---------------- | -------- |
| `==`     | Rovná se         | `a == b` |
| `!=`     | Nerovná se       | `a != b` |
| `>`      | Větší než        | `a > b`  |
| `<`      | Menší než        | `a < b`  |
| `>=`     | Větší nebo rovno | `a >= b` |
| `<=`     | Menší nebo rovno | `a <= b` |


### Logické operátory

| Operátor | Popis          | Příklad             |
| -------- | -------------- | ------------------- |
| `and`    | Logické A      | `a > b and a <= 10` |
| `or`     | Logické NEBO   | `a > b or b == 1`   |
| `not`    | Logická negace | `not b > 5`         |


Odsazování
----------

**Odsazování** v Pythonu je klíčovou součástí syntaxe, která určuje strukturu kódu a definuje **bloky kódu**. Python spoléhá na odsazení (mezery nebo tabulátory) k označení hierarchie a logických bloků.


```python
num = 10
x = 1
if num > 5:
    print("Větší než pět")  # provede se, pokud je num větší ne 5
    x = 2 # toto také
y = 3 # tento příkaz se už provede vždy
```

Blok kódu následující po `if`, `elif`, `else` (a dalších konstrukcích) musí vždy obsahovat alespoň jeden příkaz. Pokud zatím nemáme hotový blok kódu, ale přesto chceme zachovat větvení (například pro doplnění kódu v budoucnu) můžeme použít klíčové `pass`, což je příkaz, který nevykoná nic, ale umožní zachovat hierarchii odsazování v Python kódu:

```python
x = 5
if x > 0:
    pass  # blok zatím prázdný, neobsahuje žádné příkazy, ale syntaxe je správná
```

Co je pravda?
-------------

V Pythonu se v podmínkách používají booleovské hodnoty `True` a `False` nebo logické operátory vracející booleovské hodnoty. Každý objekt v Pythonu má svou *pravdivostní hodnotu*. Obecně lze říci, že objekty prázdné nebo nulové se vyhodnotí jako `False`, neprázdné nebo nenulové jako `True` .


| Hodnota                               | Vyhodnotí se jako |
| ------------------------------------- | ----------------- |
| `0`, `0.0`                            | `False`           |
| `1`, `2.1`                            | `True`            |
| `""` (prázdný řetězec)                | `False`           |
| `"abc"`                               | `True`            |

To umožňuje zapisovat zkrácené podmínky a kód je pak čitelnější a přehlednější.

*Příklad:*

```python
name = input("Zadej jméno: ")

if name:
    print("Ahoj,", name)
else:
    print("Jméno nebylo zadáno.")
```


Úlohy k procvičení
------------------

1) **Porovnání čísel**

    Zeptejte se uživatele na dvě čísla a vypište, které je větší, nebo zda jsou stejná.

2) **Největší a nejmenší**
  
    Uživatel zadá tři čísla. Vypište nejmenší a největší z nich.

3) **Seřazení čísel**
   
    Uživatel zadá tři čísla. Vypište čísla seřazená vzestupně podle velikosti.

4) **Parita čísla**

    Zeptejte se na číslo a vypište, zda je **sudé** nebo **liché**.

5) **Klasifikace známky**

    Na vstupu načtěte číslo 1–5 a vypište slovní hodnocení (např. 1 = výborný, 5 = nedostatečný). Ošetřete vstupy mimo rozsah.

6) **Přestupný rok**

    Načtěte rok a rozhodněte zda-li je to přestupný rok nebo ne.

7) **Řešení kvadratické rovnice**

    Načtěte koeficienty $a$, $b$, $c$ kvadratické rovnice ($ax^2 + bx + c = 0$) a rozhodněte podle diskriminantu kolik má řešení a dále vypište všechna řešení rovnice.


Řídící bloky
============

* [Tutoriál od W3C - Bloky](https://www.w3schools.com/python/python_conditions.asp)

Podmínky
--------

### Blok `if` - `elif` - `else`

Umožňuje provádění podmíněných operací. `if` zahajuje blok, `elif` poskytuje další podmínky (volitelně), `else` pokrývá všechny ostatní případy (volitelně).

```python
if a == 1:
    # ...
elif a == 2:
    # ...
else:
    # ...
```

````{admonition} pass
:class: note
Občas se stává, že potřebujeme blok kódu, ve kterém není žádný příkaz. Protože Python definuje blok odsazováním, je nutné aby každý blok měl alespoň jeden příkaz. Pro takové případy má Python klíčové slovo `pass`, nebo-li příkaz, který nic nedělá, ale jen "drží místo" v toku odsazování bloků:

```python
if a==1:
    pass
else:
    print("No one")
```
````

````{admonition} not
:class: note
Pro negaci logického výrazu používá python klíčové slovo `not`:

```python
if not a==1:
    print("No one")
```
````


### Blok `match` - `case`

Blok `match` - `case` připomíná blok `switch` - `case`, který známe z jazyka Java a jiných C-like jazyků:

```python
match expression:
    case pattern1:
        # Code block for pattern1
    case pattern2 :
        # Code block for pattern2
    case _:
        # Default case if no pattern matches
```

Zde `expression` je výraz, na kterém chcete provádět vzorové porovnání. Může to být jakýkoliv výraz, který lze vyhodnotit na nějakou hodnotu. Každý `case` definuje jeden možný vzor, který se pokouší s hodnotou `expression` najít shodu. Vzory mohou být konstanty, proměnné, složitější struktury nebo wildcard `_` pro zachycení všech ostatních případů.

Blok `case` je možné ještě podmínit výrazem `if condition`, který umožňuje specifikovat podmínku, kterou musí vzor splňovat, aby byl vybrán.

```python
# ...
case pattern3 if condition:
    # ...
# ...
```

Také je možné definovat blok, který bude testovat více výrazů najednou. Blok se vybere, pokud alespoň jeden výraz vyhovuje.

```python
case pattern4 | pattern5 | pattern6:
    # ...
```

### Příklad použití `match` - `case`:

```python
def classify(x):
    match x:
        case 0:
            print("Zero")
        case 1:
            print("One")
        case 2 | 3 | 4:
            print("Small number")
        case n if type(n)==int and n > 10:
            print("Large number")
        case _:
            print("Other")

classify(0)  # Zero
classify(2)  # Small number
classify(15)  # Large number
classify("Hello")  # Other
```

Blok `match` - `case` toho ale nabízí mnohem více a všechny možnosti naleznete v [dokumentaci Pythonu](https://docs.python.org/3/tutorial/controlflow.html#match-statements).


Cykly
-----

### Cyklus `for`

`for` iteruje přes pole, n-tici, řetězec nebo jiné (iterovatelné) struktury. Pro procházení přes číselný rozsah se v Pythonu obvykle používá funkce `range`:

```python
for i in range(0, 5):
    print(i) # 0, 1, 2, 3, 4
```

Funkce `range(start, stop, step)` generuje čísla od `start` (včetně) do `stop` (výlučně) s krokem `step` v každém kroku.

For může procházet i seznamy:

```python
my_list = ["a", 1, 2]
for i in my_list:
    print(i) 
```

Případně může for cyklus procházet i slovníky. Je ale mít na pamětí, že for cyklus iteruje ve slovníku přes klíče: 

```python
my_dict = {"a":1, "b":2}
for key in my_dict:
    print(f"key: {key}, value: {my_dict[key]}")
```

Případně je možné použít funkci slovníku `items`, která transformuje slovník na seznam n-tic klíč, hodnota:

```python
for key, value in my_dict.items():
    print(f"{key}: {value}")
```

### Cyklus `while`

Cyklus while provádí kód, dokud je splněna podmínka:

```python
a=1
while a < 100:
    print(a)
    a+=1
```

### Klíčová slova `break`, `continue`

Python podporuje tyto dvě direktivy pro řízení běhu cyklů for a while: 

- `break`: Přeruší nejbližší obklopující cyklus.
- `continue`: Přeskočí zbytek kódu v cyklu a pokračuje další iterací.

Práce s výjimkami
-----------------

### Blok `try` - `except` - `finally`

Zachycuje a řeší výjimky. `try` blok obsahuje kód, který může vyvolat výjimku. `except` zachycuje výjimky. `finally` se vykoná vždy.

```python
try:
    # kód, který může vyvolat výjimku
except Exception:
    # kód, který se vykoná, pokud dojde k výjimce Exception
finally:
    # kód, který se vykoná try/except, bez ohledu jestli výjimka nastala
```

Výjimky v Pythonu dědí ze základní třídy Exception a definuje se podobně jako třída:

```python
class MyException(Exception):
    pass
```

Výjimka se vyvolává klíčovým slovem `raise`:

```python
raise MyException{"Details about exception"}
```

Při odchytu výjimek je možné také získat objekt výjimky:

```python
# ...
except Exception as e:
    print(str(e))
# ...
```

Nebo lze odchytit více tříd výjimek najednou: 

```python
# ...
except (MyException, OtherException) as e:
    print(str(e))
# ...
```

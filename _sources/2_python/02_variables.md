Proměnné
========

**Proměnná** je pojmenované místo v paměti, do kterého můžeme uložit hodnotu. Tu hodnotu můžeme později přečíst, změnit nebo s ní dále pracovat. Můžeme si ji představit jako krabičku s nálepkou (jménem), do které vložíme nějaký obsah.

V Pythonu se proměnná vytvoří automaticky při prvním přiřazení pomocí operátoru přiřazení `=`:

```python
name = "Petr"
age = 25
```

Zde jsme vytvořili dvě proměnné:

* `name` obsahuje text
* `age` obsahuje číslo

Proměnnou můžeme použít jako parametr funkce `print`, což zobrazí její aktuální hodnotu:

```python
print(name)
print(age)
```


Formátování řetězců
-------------------

Často je potřeba zobrazit hodnotu proměnné, která je součástí delšího textového řetězce nebo informační hlášky. V Pythonu je nejmodernější a doporučený způsob formátování řetězců pomocí tzv. **f-strings** (formatted string literals). Tyto f-stringy jsou uvedeny znakem `f` a umožňují vkládání hodnot proměnných přímo do řetězce s pomocí závorek `{}`:

```python
print(f"Ty jsi {name} a je ti {age} let")
```

F-string nabízí široké možnosti formátování, například zaokrouhlování desetinných čísel a další operace s proměnnými. Úplný seznam možností formátování naleznete například v [referenční příručce od W3C](https://www.w3schools.com/python/python_string_formatting.asp).


Datové typy v Pythonu
---------------------

Jako **datový typ** označujeme v programovacích jazycích typ hodnoty, se kterou pracujeme. Mezi základní datové typy v pythonu patří:

| Typ     | Název           | Příklad         |
| ------- | --------------- | --------------- |
| `int`   | Celé číslo      | `42`            |
| `float` | Desetinné číslo | `3.14`          |
| `str`   | Textový řetězec | `"ahoj"`        |
| `bool`  | Pravda/Nepravda | `True`, `False` |

Python je **dynamicky typovaný jazyk**, což znamená, že nemusíme předem určovat datový typ proměnné (což je nutné v některých jazycích například Java nebo C++) – Python si ho zjistí sám na základě typu hodnoty, kterou do proměnné uložíme.


Načtení proměnné ze vstupu
--------------------------

Python umožňuje načítat vstup od uživatele pomocí funkce `input`:

```python
name = input("Zadej své jméno: ")
print(f"Ahoj, {name}!")
```

Vstup z `input` je vždy typu `str` (řetězec). Pokud potřebujeme číslo (hodnotu typu `int`), musíme ho **přetypovat** pomocí volání `int`:

```python
vek = int(input("Zadej svůj věk: "))
print(f"Za rok ti bude {vek + 1}")
```

Operátory v Pythonu
-------------------

Operátory slouží k provádění výpočtů a porovnání.

### Aritmetické operátory

Výsledkem aritmetické operace je opět 
| Operátor | Popis                     | Příklad       |
| -------- | ------------------------- | ------------- |
| `+`      | Sčítání                   | `a + b`       |
| `-`      | Odčítání                  | `a - b`       |
| `*`      | Násobení                  | `a * b`       |
| `/`      | Dělení (výsledek `float`) | `a / b`       |
| `//`     | Celočíselné dělení        | `a // b`      |
| `%`      | Zbytek po dělení          | `a % b`       |
| `**`     | Umocnění                  | `a ** b`      |

Příklad:

```python
sirka = 5
vyska = 10

obvod = 2 * (sirka + vyska)
obsah = sirka * vyska

print(f"Obvod obdélníku je {obvod}")
print(f"Obsah obdélníku je {obsah}")
```

Datový typ proměnné může mít vliv na to, jak je operace interpretována, např.:

```python
a = 5
s = "5"

print(a*3) # 15
print(s*3) # 555
```

A některé operace nejsou povoleny a vyhodí chybu:

```python
s = "abc" / 5
```

```python
Traceback (most recent call last):
  File "test.py", line 1, in <module>
    s = "abc" / 5
        ~~~~~~^~~
TypeError: unsupported operand type(s) for /: 'str' and 'int'
```


### Porovnávací operátory:

| Operátor | Význam           | Příklad  |
| -------- | ---------------- | -------- |
| `==`     | Rovná se         | `a == b` |
| `!=`     | Není rovno       | `a != b` |
| `>`      | Větší než        | `a > b`  |
| `<`      | Menší než        | `a < b`  |
| `>=`     | Větší nebo rovno | `a >= b` |
| `<=`     | Menší nebo rovno | `a <= b` |


### Logické operátory:

| Operátor | Popis          | Příklad          |
| -------- | -------------- | ---------------- |
| `and`    | Logické A      | `True and False` |
| `or`     | Logické NEBO   | `True or False`  |
| `not`    | Logická negace | `not True`       |

Úlohy
-----

**Zadání:**
Zeptej se uživatele na jeho jméno, věk a město. Poté vypiš zprávu ve formátu:


**Zadání:**
Uživatel zadá počet minut. Vypočítej, kolik je to **celých hodin a zbytek minut**, a výsledek pěkně vypiš.


Úloha: vyzkoušet přetypovat hodnoty "abc", 3, 3.14, True na různé typy


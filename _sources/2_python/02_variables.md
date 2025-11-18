Proměnné
========

**Proměnná** je pojmenované místo v paměti, do kterého můžeme uložit hodnotu. Tu hodnotu můžeme později přečíst, změnit nebo s ní dále pracovat. Můžeme si ji představit jako buňku v tabulkovém procesoru nebo jako krabičku s nálepkou (jménem), do které vložíme nějaký obsah.

V Pythonu se proměnná definuje automaticky při prvním přiřazení pomocí **operátoru přiřazení `=`**:

```python
name = "Petr"
age = 25
```

Zde jsme vytvořili dvě proměnné:

* `name` obsahuje textovou hodnotu `"Petr"`
* `age` obsahuje číslo `25`

Proměnnou můžeme použít jako parametr funkce `print`, což zobrazí její aktuální hodnotu:

```python
print(name)
print(age)
```

Názvy proměnných
----------------

Pojmenování proměnných má Pythonu svá pravidla:

- Proměnná může obsahovat písmena (`A–Z`, `a–z`), číslice `0–9` a podtržítko `_`.
- Nesmí začínat číslicí.
- Může obsahovat i například české znaky (Unicode), jejich používání se ale nedoporučuje.
- Nesmí obsahovat mezery a speciální znaky jako `- + * / . , ; : ! ? @ # $ % ^ & ( ) [ ] { } ' " \ | < >`, které mají v Pythonu jiný význam.
- Nesmí být klíčové slovo Pythonu (`for`, `if`, `class`, `True`, `None` atd.).
- Rozlišují se velká a malá písmena. Proměnná `name` a `Name` jsou dvě různé proměnné.

*Příklady:*

```python
# Platné
jmeno = "Petr"
vek1 = 25
first_name = "Anna"
_cache = "lokální"
průměr = 3.5 # platné (Unicode), ale diakritiku raději ne

# Neplatné
# 1vek = 25
# moje-jmeno = "Petr"
# moje jmeno = "Petr"
# class = 1
# cena$ = 10
```

Obecně platí v Pythonu doporučení používat pro názvy proměnných pouze malá písmena anglické abecedy, číslice a znak `_`. Pokud má proměnná víceslovný název, je konvencí v Python **snake_case** zápis, kdy jednotlivá slova jsou oddělena podtržítkem `_`, např.:

```python
first_name = "Linus"
last_name = "Torvalds"
```


```{admonition} Cases
:class: note
Kromě snake_case stylu se občas setkáme i se styly **camelCase** (`firstName`, `lastName`), **kebab-case** (`first-name`, `last-name`), **CapitalCammelCase** (`FirstName`, `LastName`) nebo **UPPER_CASE** (`FISRT_NAME`, `LAST_NAME`), které se používají buď v jiných jazycích, nebo i v Pythonu, pokud má proměnná nebo jiný objekt specifický význam.
```


Formátování řetězců
-------------------

Často je potřeba zobrazit hodnotu proměnné jako součástí delšího textu nebo informační hlášky. V Pythonu je nejmodernější a doporučený způsob formátování textů pomocí **f-strings** (formatted string literals). Tyto f-stringy jsou uvedeny znakem `f` a umožňují vkládání hodnot proměnných přímo do textu s pomocí závorek `{}`:

```python
name = "Petr"
age = 25
print(f"Jmenuješ se {name} a je ti {age} let")
```

F-stringy je možné také použít na formátování čísel, například přidáním nul na začátek:

```python
order_no = 7
print(f"{order_no:03}")              # 007

minutes, seconds = 3, 5
print(f"{minutes:02}:{seconds:02}")  # 03:05
```

Nebo specifikací kolik desetinných míst se má zobrazovat:

```python
price = 123.4567
print(f"{price:.2f}")                # 123.46
```

Případně kombinace obojího:

```python
value = 3.1
print(f"{value:08.2f}")              # 00003.10
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

Datový typ proměnné je možné zjistit pomocí funkce `type`:

```python
a = 5
s = "5"

print(type(a)) # <class 'int'>
print(type(s)) # <class 'str'>

```


Úlohy
-----

1) Definujte celočíselné proměnné `a` a `b` (strany obdélníku) a vypište obsah obdélníku.
2) Načtěte ze vstupu dvě číselné (desetinná čísla) proměnné `r` a `h` (poloměr a výška válce) a vypíše povrch a objem válce. Zaokrouhlete výpis hodnot na jedno desetinné místo.
3) Vyzkoušejte použit proměnnou, která není v programu vůbec definována. Co se stane?
4) Uživatel zadá počet minut. Vypište kolik je to celých hodin a zbylých minut.
5) Uživatel zadá počet sekund. Převeďte je na hodiny, minuty a sekundy do tvaru `hh:mm:ss`.
6) Uživatel zadá dvě čísla. Vypište součet, rozdíl, součin a podíl (podíl na 2 desetinná místa).
7) Uživatel zadá tři čísla. Vypočtěte aritmetický průměr a vypište na 2 desetinná místa.
8) Uživatel zadá teplotu ve °C. Přepočítejte na °F a vypište s přesností na 1 desetinné místo.
9) Co se stane, pokud chcete ze vstupu načíst celočíselnou proměnnou, ale uživatel zadá text?
10) Napište program, který načte číslo ze vstupu (předpokládejte, že bude tříciferné) a vypíše jeho ciferný součet.
11) Doplňte následující tabulku s výsledky operací a chování zdůvodněte:

| Výraz       | Výsledek | Typ výsledku  |
| ----------- | -------- | ------------- |
| `3 + 4`     |          |               |
| `3 + "4"`   |          |               |
| `3 * 4`     |          |               |
| `3 * "4"`   |          |               |
| `"3" * 4`   |          |               |
| `"3" * "4"` |          |               |
| `3 * 4.5`   |          |               |
| `3 * "4.5"` |          |               |
| `"3" * 4.5` |          |               |


12) Spočítejte výsledky výrazů a u každého vypište i typ výsledku: 

| Výraz      | Výsledek | Typ výsledku  |
|------------|----------|---------------|
| `7/2`      |          |               |
| `7//2`     |          |               |
| `7%2`      |          |               |
| `7/2.0`    |          |               |
| `7//2.0`   |          |               |



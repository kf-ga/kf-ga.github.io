Funkce
======

**Funkce** jsou bloky kódu, které můžeme znovu použít. Pomáhají:

* rozdělit program na menší části (modularita),
* vyhnout se opakování kódu (DRY – *Don't Repeat Yourself*),
* zlepšit čitelnost a udržovatelnost kódu.

Představ si funkci jako **stroj** – dáš mu vstupy (argumenty), funkce něco provede a může ti vrátit výsledek (výstup).


Definice vlastní funkce
-----------------------

Funkce se v Pythonu definuje pomocí klíčového slova `def`. Následuj **tělo funkce**, vlastní kód, který se má po zavolání funkce provést. Tělo funkce je blok kódu a musí tak být odsazen podobně jako například při psaní podmínek:

```python
def pozdrav():
    print("Ahoj!")
```

Funkci poté zavoláme:

```python
pozdrav()  # vypíše: Ahoj!
```


Argumenty funkce
----------------

Funkce může přijímat **argumenty**, nebo-li **parametry** – hodnoty, které do ní při volání předáme a se kterými funkce může pracovat:

```python
def pozdrav(jmeno):
    print("Ahoj,", jmeno)

pozdrav("Eliška")
```

Výstup:

```
Ahoj, Eliška
```

Výchozí hodnoty argumentů
-------------------------

Argumenty mohou mít **výchozí hodnoty**. Pokud je při volání neuvedeme, použije se výchozí hodnota:

```python
def pozdrav(jmeno="příteli"):
    print("Ahoj,", jmeno)

pozdrav()          # Ahoj, příteli
pozdrav("Martin")  # Ahoj, Martin
```

Pojmenované argumenty při volání
--------------------------------

Při volání můžeme argumenty pojmenovat – to je užitečné hlavně pokud má funkce více parametrů:

```python
def info(jmeno, vek):
    print(jmeno, "je mu/ji", vek, "let")

info(vek=25, jmeno="Petr")  # pořadí už není důležité
```

Úlohy
-----

### 1. Funkce pro výpočet obvodu a obsahu obdélníku

```python
def obdelnik(sirka, vyska):
    obvod = 2 * (sirka + vyska)
    obsah = sirka * vyska
    print("Obvod:", obvod)
    print("Obsah:", obsah)
```

### 2. Funkce na výpočet faktoriálu

```python
def faktorial(n):
    vysledek = 1
    for i in range(1, n + 1):
        vysledek *= i
    return vysledek

print(faktorial(5))  # 120
```

### 3. Funkce na řešení kvadratické rovnice

```python
import math

def kvadraticka(a, b, c):
    D = b**2 - 4*a*c
    if D < 0:
        return "Žádné reálné řešení"
    elif D == 0:
        x = -b / (2*a)
        return f"Jedno řešení: x = {x}"
    else:
        x1 = (-b + math.sqrt(D)) / (2*a)
        x2 = (-b - math.sqrt(D)) / (2*a)
        return f"Dvě řešení: x1 = {x1}, x2 = {x2}"
```

---

### 4. Funkce pro převod teploty (°C → °F)

```python
def celsius_na_fahrenheit(c):
    return c * 9 / 5 + 32
```

---

### 5. Funkce pro kontrolu, zda je číslo prvočíslo

```python
def je_prvocislo(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
```

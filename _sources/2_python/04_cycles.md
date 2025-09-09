Cykly v Pythonu
===============

**Cykly** (**loop**) umožňují opakovat určitou část kódu. Místo toho, abychom psali stejný kód několikrát, použijeme cyklus a Python ho provede tolikrát, kolikrát chceme, nebo dokud platí určitá podmínka.

Cyklus `for`
------------

Cyklus **`for`** (**for loop**) slouží k opakování přes sekvence (např. seznamy) nebo přes rozsah čísel pomocí funkce `range()`.

### Použití `range()`

Funkce `range()` generuje posloupnost čísel:

```python
range(start)            # od 0 do end - 1
range(start, end)       # od start do end - 1
range(start, end, step) # od start do end, s krokem step
```

### Příklad: výpis čísel od 0 do 4

```python
for i in range(5):
    print(i)
```

### Příklad: výpis sudých čísel od 2 do 10

```python
for i in range(2, 11, 2):
    print(i)
```

Cyklus `while`
--------------

Cyklus **`while`** (**wile loop**) opakuje blok kódu **dokud platí podmínka**. Pokud je podmínka nepravdivá (`False`), cyklus skončí.

### Příklad: opakuj dokud uživatel nezadá „ano“

```python
test = "ano"
answer = ""
while answer != test:
   answer = input(f"Zadej '{test}' pro ukončení: ")
   if answer != test:
      print("Špatná odpověď, zkus to znovu.")

print("Správně, konec programu.")
```


```{admonition} Zacyklení
:class: note
Při použití cyklu `while` se vám snadno může stát, že program nechtěně napíšete tak, že podmínka nebude splněna nikdy a cyklus tak poběží stále a program nikdy neskončí. V programátorské hantýrce se tomu říká, že se program **zacyklil**. V takovém případě je nutné program násilně ukončit, například klávesovou zkratkou `Ctrl+C`.
```

Vnořování cyklů
---------------

Cyklus může být uvnitř jiného cyklu – tomu říkáme **vnořený cyklus**. To je užitečné např. při práci s tabulkami, maticemi nebo kreslením vzorů.

### Příklad: výpis 3×5 hvězdiček

```python
for i in range(3):
    for j in range(5):
        print("*", end=" ")
    print()  # nový řádek
```

Povšimněte si opět odsazování při vnořování cyklů. Každý blok musí být správně odsazen, jinak Python vyhodí chybu nebo se cyklus bude chovat jinak než by měl.


Úlohy k procvičení
------------------

1. **Výpis čísel od 1 do 10**

   * Použij `range(1, 11)`, vypiš každé číslo.

2. **Výpočet faktoriálu čísla**

   * Načti číslo a vypočítej n! pomocí cyklu `for`.

3. **Tabulka násobků čísla**

   * Načti číslo `n` a vypiš jeho násobky od 1 do 10.


1. **Hádej číslo**

   * Program má „tajné číslo“ a uživatel hádá, dokud ho netrefí. 
   * Rozšiřte program tak, aby program při neúspěšném pokusu hráči vždy napověděl, jestli je hledané číslo větší nebo menší.
   * Přidejte počítání celkového počtu pokusů. Počet pokusů pak nakonec zobrazte.

2. **Součet zadaných čísel**

   * Uživatel zadává čísla, dokud nezadá `0`. Na konci se vypíše jejich součet.

3. **Počítadlo pokusů**

   * Opakuj dotaz, dokud uživatel nezadá heslo. Po zadání vypiš, kolikrát se spletl.

1. **Násobilka 1–10**

   * Vypiš tabulku násobků čísel 1 až 10.

2. **Obdélník z hvězdiček**

   * Načti šířku a výšku a vypiš odpovídající obdélník složený z `*`.

3. **Pravoúhlý trojúhelník**

   * Vypiš trojúhelník z hvězdiček podle zadaného počtu řádků:

     ```
     *
     * *
     * * *
     ...
     ```

---

V další kapitole se naučíme používat **seznamy**, které nám umožní uchovávat více hodnot v jedné proměnné. To se výborně hodí v kombinaci s cykly!

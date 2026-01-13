Cykly
=====

**Cykly** (**loops**) umožňují opakovat určitou část kódu. Místo toho, abychom psali stejný kód několikrát, použijeme cyklus a Python ho provede tolikrát, kolikrát chceme, nebo dokud platí určitá podmínka.

Cyklus `for`
------------

Cyklus **`for`** (**for loop**) slouží k opakování přes sekvence (např. seznamy) nebo přes rozsah čísel například pomocí funkce `range()`.

### Použití `range()`

Funkce `range()` generuje posloupnost čísel:

```python
range(stop)             # od 0 do stop - 1
range(start, stop)      # od start do stop - 1
range(start, stop, step) # od start do stop, s krokem step
```

*Příklad:* Program vypíše čísla od 0 do 4.

```python
for i in range(5):
    print(i)
```

*Příklad:* Program vypíše sudá čísla od 2 do 10.

```python
for i in range(2, 11, 2):
    print(i)
```

### Procházení řetězců

Protože textový řetězec (`str`) je v Pythonu sekvence znaků, můžeme ho také procházet pomocí `for` cyklu po jednotlivých znacích.

*Příklad:* Program vypíše jednotlivá písmena slova "Python" pod sebe.

```python
word = "Python"
for letter in word:
   print(letter)
```

Cyklus `while`
--------------

Cyklus **`while`** (**while loop**) opakuje blok kódu **dokud platí podmínka**. Pokud je podmínka nepravdivá (`False`), cyklus skončí.

*Příklad:* Program bude opakovaně vyzývat k zadání vstupu, dokud uživatel nezadá „yes“.

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

Cyklus může být uvnitř jiného cyklu – tomu říkáme **vnořený cyklus**. To je užitečné např. při práci s tabulkami, maticemi nebo procházení složitějších struktur.

*Příklad:* Program vypíše obdélník z hvězdiček o rozměrech 3x5.

```python
for i in range(3):
    for j in range(5):
        print("*", end=" ")
    print()  # nový řádek
```


```{admonition} Odsazování
:class: note
Povšimněte si opět odsazování při vnořování cyklů. Každý blok musí být správně odsazen, jinak Python vyhodí chybu nebo se cyklus bude chovat jinak než by měl.
```


Úlohy k procvičení
------------------

1. **Výpis čísel od 1 do 10**

   Použij `range(1, 11)`, vypiš každé číslo.

2. **Výpočet faktoriálu čísla**

   Načti číslo a vypočítej n! pomocí cyklu `for`.

3. **Tabulka násobků čísla**

   Načti číslo `n` a vypiš jeho násobky od 1 do 10.

4. **Hádej číslo**

   Program má „tajné číslo“ a uživatel hádá, dokud ho netrefí. 
   Rozšiřte program tak, aby program při neúspěšném pokusu hráči vždy napověděl, jestli je hledané číslo větší nebo menší.
   Přidejte počítání celkového počtu pokusů. Počet pokusů pak nakonec zobrazte.

5. **Součet zadaných čísel**

   Uživatel zadává čísla, dokud nezadá `0`. Na konci se vypíše jejich součet.

6. **Počítadlo pokusů**

   Opakuj dotaz, dokud uživatel nezadá heslo. Po zadání vypiš, kolikrát se spletl.

7. **Malá násobilka**

   Vypiš tabulku násobků čísel 1 až 10.

8. **Obdélník z hvězdiček**

   Načti šířku a výšku a vypiš odpovídající obdélník složený z `*`.

9. **Pravoúhlý trojúhelník**

   Vypiš trojúhelník z hvězdiček podle zadaného počtu řádků:
   ```
   *
   * *
   * * *
   ...
   ```

10. **Ciferný součet**

   Napište program, který načte číslo ze vstupu (libovolně veliké) a vypíše jeho ciferný součet.


11. **Leet speak**

   Napište program, který převede zadané slovo do leet speak, tedy například slovo `HESLO` převede na `H35L0`.

   Převodní tabulka:

   | Písmeno | Znak |
   |:-------:|:----:|
   |    A    |  4   |
   |    B    |  8   |
   |    E    |  3   |
   |    G    |  6   |
   |    I    |  1   |
   |    O    |  0   |
   |    S    |  5   |
   |    T    |  7   |
   |    Z    |  2   |


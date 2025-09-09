Balíčky
=======

Každý Python soubor se nazývá modul (**module**). Balíčky (**package**) umožňují organizovat moduly do adresářů pro snadnější správu a opětovné použití kódu. Balíčky pomáhají rozdělit projekt do logických částí a poskytují mechanismus pro zapouzdření různých funkcí, tříd a proměnných.

Fungování balíčků jako adresářů
-------------------------------

Balíček v Pythonu je v podstatě adresář obsahující jeden nebo více modulů (souborů `.py`) a soubor `__init__.py`. Tento soubor `__init__.py` může být prázdný, ale jeho přítomnost označuje, že daný adresář by měl být považován za Python balíček.

```{admonition} Poznámka
:class: note

Ve verzích Pythonu 3.3 a vyšších není soubor `__init__.py` nutný pro rozpoznání adresářů jako balíčků, ale stále se používá pro výše uvedené účely.
```

### Struktura importů

Rozdělení na balíček a modul slouží ke strukturování projektu v adresářové struktuře. Při importování se oba chovají prakticky stejně a není praktický rozdíl, jestli importujete modul nebo balíček.

Python poskytuje několik způsobů, jak importovat kód:

- **`import modul`**: Importuje celý modul. Po importu se odkazuje na proměnné, funkce a třídy (**symboly**) plnou cestou, včetně názvu modulu, například `modul.my_function()`.

- **`import modul as m`**: Importuje modul pod alternativním jménem (aliasem), což je užitečné pro zkrácení názvu nebo při řešení konfliktů jmen dvou modulů. K symbolům modulu se pak přistupuje přes alias, například `m.my_function()`.
  
- **`from modul import my_function`**: Importuje specifický symbol z modulu, umožňuje používat importovaný symbol přímo bez prefixu modulu, například `my_function()`.
  
- **`from modul import *`**: Importuje všechny symboly. Tato praxe není doporučena pro většinu případů, protože snižuje čitelnost kódu a může vést k nechtěným konfliktům jmen.


### Příklady použití v kódu

```python
import math
print(math.sqrt(4))  # Použití funkce sqrt z modulu math

from math import sqrt
print(sqrt(4))  # Přímé použití funkce sqrt bez prefixu

import math as m
print(m.sqrt(4))  # Použití funkce sqrt s aliasem modulu
```

### Spouštění skriptu z konzole

Některé moduly dovolují nejen používání v importu, ale mohou být spouštěny přímo z konzole. Pro rozlišení, zda je balíček (.py soubor) importován nebo přímo spouštěn použijte test:

```python
if __name__ == "__main__":
    print("Launching from console")
```

Pokud je skript spuštěn přímo z konzole, například příkazem:

```sh
python test.py
```

nebo 

```sh
python -m test.py
```

Bude proměnná `__main__` mít hodnotu `__main__`. Pokud bude stejný modul importován z jiného modulu pomocí `import`, bude mít proměnná `__name__` jako hodnotu název importovaného modulu. 

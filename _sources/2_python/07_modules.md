Moduly a balíčky
================

Každý Python soubor se nazývá modul (**module**). Balíčky (**package**) umožňují organizovat moduly do adresářů pro snadnější správu a opětovné použití kódu. Balíčky pomáhají rozdělit projekt do logických částí a poskytují mechanismus pro zapouzdření různých funkcí, tříd a proměnných.

Importování modulů
------------------

Python poskytuje několik způsobů, jak importovat kód z jiných modulů:

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

Užitečné standardní moduly
--------------------------

Python má rozsáhlou standardní knihovnu modulů, které můžete okamžitě používat.

### Modul `math`

Obsahuje matematické funkce a konstanty.

```python
import math

print(math.pi)          # Matematická konstanta π
print(math.sqrt(16))    # Odmocnina (zkratka ze square root)
print(math.ceil(3.2))   # Zaokrouhlení nahoru
print(math.floor(3.8))  # Zaokrouhlení dolů
print(math.sin(math.pi / 2)) # Funkce sinus
```

Další funkce naleznete v [oficiální dokumentaci Pythonu](https://docs.python.org/3/library/math.html).

### Modul `random`

Slouží pro generování náhodných čísel a výběr náhodných prvků. 

```python
import random

print(random.randint(1, 10))      # Náhodné celé číslo od 1 do 10
print(random.random())            # Náhodné desetinné číslo od 0.0 do 1.0
print(random.choice(["a", "b", "c"])) # Náhodný prvek ze seznamu

cards = [1, 2, 3, 4, 5]
random.shuffle(cards)             # Zamíchá seznam na místě
print(cards)
```
Další funkce naleznete v [oficiální dokumentaci Pythonu](https://docs.python.org/3/library/random.html).


```{admonition} Náhodné a pseudonáhodné
:class: note
Počítače jsou deterministické stroje, což znamená, že pokud jim zadáte stejný vstup a stejné instrukce, vždy vyprodukují stejný výstup. Proto je poměrně obtížné na u klasických počítačů generovat skutečně náhodná čísla (jako je hod kostkou v reálném světě).

Místo toho se používají **pseudonáhodná čísla**. Ta jsou generována matematickým algoritmem (v Python modulu `random` se používá algoritmus [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister)), který vytváří dlouhou posloupnost čísel, jež vypadají náhodně, ale jsou ve skutečnosti předem určená počáteční hodnotou, tzv. **seed** (semínko). Pokud nastavíte stejný seed, dostanete vždy stejnou posloupnost čísel. To je užitečné například při ladění programu (debugging), kdy potřebujete reprodukovat stejné chování.

Pro kryptografické účely (hesla, šifrování) byste modul `random` neměli používat, protože jeho výstupy lze předvídat.

```

### Modul `time`

Poskytuje funkce pro práci s časem, měření času a pozastavení programu. 

```python
import time

print("Start")
time.sleep(2)       # Počká 2 sekundy
print("End")

start = time.time() # Aktuální čas v sekundách (timestamp)
# ... nějaký kód ...
end = time.time()
print(f"Duration: {end - start} seconds")
```

Další funkce naleznete v [oficiální dokumentaci Pythonu](https://docs.python.org/3/library/time.html).

### Modul `datetime`

Pro pokročilejší práci s datem a časem. 

```python
from datetime import datetime

now = datetime.now()
print(now)                  # 2023-10-27 15:30:45.123456
print(now.year)             # 2023
print(now.strftime("%d.%m.%Y %H:%M")) # Formátovaný výpis: 27.10.2023 15:30
```

Další funkce naleznete v [oficiální dokumentaci Pythonu](https://docs.python.org/3/library/datetime.html).

Úlohy k procvičení
------------------

1. **Výpočet přepony**

   Pomocí modulu `math` vypočítejte délku přepony pravoúhlého trojúhelníku, pokud znáte délky odvěsen `a=3` a `b=4`.

2. **Hod kostkou**

   Napište program, který simuluje hod šestistěnnou kostkou (vygeneruje náhodné číslo 1–6) pomocí modulu `random`.

3. **Odpočet**

   Napište program, který vypíše čísla od 3 do 1 a mezi každým výpisem počká 1 sekundu (modul `time`). Nakonec vypíše "Start!".

4. **Aktuální datum**

   Vypište aktuální datum ve formátu "D. M. Y" (např. "1. 1. 2024") pomocí modulu `datetime`.

5. **Náhodný výběr**

   Máte seznam jmen `names = ["Petr", "Jan", "Eva", "Jana"]`. Vyberte náhodně jedno jméno a vypište ho.

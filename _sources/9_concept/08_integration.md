Další metody integrace
======================

Díky rozsáhlému množství knihoven, které komunita Python vývojářů spravuje, je možné snadno rozšířit webové stránky o pestrou škálu funkcionality. 

Jako jednoduchou ukázku pro integraci knihovny použijeme knihovnu `pyfiglet`, která je wrapperem pro program `figlet`. `Figlet` umožňuje vytvářet velké ASCII art nápisy z obyčejného textu s různými styly písma. 

```{admonition} Instalace balíčků
:class: tip
Pro instalaci dalších knihoven pro použijeme nástroj pro správu python balíčků PIP:
    ```
    $ pip install pyfiglet
    ```
```

Poté můžete vytvořit Django view. V tomto příkladu vytvoříme jednoduché view, které přijímá GET parametry `text` a `font` pro generování ASCII art nápisu:

```python
from django.http import HttpResponse
from pyfiglet import Figlet

def ascii_art_view(request):
    # Získání parametrů z URL
    text = request.GET.get('text', 'Hello World')  # Výchozí hodnota, pokud není text zadán
    font = request.GET.get('font', 'standard')  # Výchozí font, pokud není zadán
    
    # Generování ASCII art
    figlet = Figlet(font=font)
    ascii_art = figlet.renderText(text)
    
    # Vrácení ASCII art jako plain text odpovědi
    return HttpResponse(ascii_art, content_type="text/plain")
```

Tento kód definuje Django view nazvané `ascii_art_view`, které generuje ASCII art z textu získaného z GET parametru `text`, používající font specifikovaný v GET parametru `font`. Pokud nejsou parametry zadány, použije se výchozí text "Hello World" a výchozí font "standard".

Pro přístup k této view musíte přidat URL mapování ve vašem `urls.py` souboru aplikace:

```python
from django.urls import path
from .views import ascii_art_view  # Předpokládá se, že view je definována v views.py

urlpatterns = [
    path('ascii-art/', ascii_art_view, name='ascii-art'),
]
```

Nyní můžete ve svém prohlížeči navštívit `http://127.0.0.1:8000/ascii-art/?text=Your+Text&font=ghost`.

Povšimněte si, že Django view nemusí nutně vždy pracovat s modely, konkrétní požadovanou funkcionalitu je možné zařídit jinými nástroji.


```{admonition} Cvičení
:class: note
Rozšiřte aplikaci pro tvorbu ASCII art nápisů o modelovou vrstvu, kde bude ukládat historii zobrazovaných nápisů a tuto historii bude možné procházet. Zajistěte aby se v historii nápisy neduplikovaly za sebou napři. při opakovaném obnovení stránky.

```

Další tipy pro knihovny
-----------------------

### Manipulace s obrázky

#### `Pillow`

Rozáhlá knihovna pro práci s obrázky, která nabízí mnoho možností pro zpracování obrázků od základních operací otočení, změny velikosti, aplikaci různých filtrů, přidání textů do obrázku atd.

##### Ukázka kódu: Změna velikosti obrázku

Níže je ukázka kódu, která ukazuje, jak změnit velikost obrázku pomocí knihovny Pillow. Předpokládejme, že máme obrázek s názvem `original.jpg` a chceme ho změnit na nové rozměry 300x300 pixelů.

```python
from PIL import Image

# Načtení původního obrázku
original_image = Image.open("original.jpg")

# Změna velikosti obrázku
resized_image = original_image.resize((300, 300))

# Uložení upraveného obrázku
resized_image.save("resized.jpg")
```

Tento kód nejprve načte obrázek `original.jpg` z vašeho souborového systému. Poté použije metodu `resize()` k nastavení nových rozměrů obrázku. Nakonec upravený obrázek uloží pod novým názvem `resized.jpg`.

Úplnou dokumentaci knihovny Pillow naleznete na oficiálních stránkách:
[Pillow - Python Imaging Library (Fork)](https://pillow.readthedocs.io/en/stable/)

Tato dokumentace obsahuje kompletní přehled všech funkcí a možností, které Pillow nabízí, včetně pokročilých technik práce s obrázky.


### Matematické knihovny

#### `SymPy`
 
SymPy je knihovna pro symbolické matematické výpočty v Pythonu, která umožňuje práci s algebrou, řešení rovnic, práce s vektory a maticemi, limity, integrace, derivace atd.

##### Ukázka kódu: Řešení algebraického výrazu

```python
from sympy import symbols, Eq, solve

# Definice symbolu
x = symbols('x')

# Definice rovnice
equation = Eq(x**2 - 4, 0)

# Řešení rovnice
solutions = solve(equation, x)

print(solutions)
```

Tento kód nejprve importuje potřebné funkce z knihovny SymPy, definuje proměnnou `x` jako symbol, nastaví rovnici \(x^2 - 4 = 0\), a pak použije funkci `solve` k nalezení řešení této rovnice. Výsledek bude seznam řešení rovnice, tj. \[2, -2\].


Úplnou dokumentaci knihovny SymPy a další příklady použití naleznete na oficiálních stránkách:
[SymPy Documentation](https://docs.sympy.org/latest/index.html)

#### `matplotlib`

Matplotlib je knihovna pro vizualizaci dat v Pythonu, která umožňuje tvorbu široké škály grafů a diagramů. Je to jedna z nejpopulárnějších knihoven pro datovou vizualizaci v Pythonu a slouží jako základ pro mnoho dalších vizualizačních knihoven. Zde je stručný přehled některých základních funkcí, které Matplotlib nabízí:

Ukázka kódu

```python
import matplotlib.pyplot as plt
import numpy as np

# Rozsah hodnot x
x = np.linspace(0, 2 * np.pi, 100)

# Výpočet hodnot y pro sin(x) a cos(x)
y_sin = np.sin(x)
y_cos = np.cos(x)

# Vytvoření grafů pro sin(x) a cos(x)
plt.plot(x, y_sin, label='sin(x)')
plt.plot(x, y_cos, label='cos(x)')

# Přidání legendy
plt.legend()

# Přidání titulku a popisků os
plt.title("Grafy funkcí sin(x) a cos(x)")
plt.xlabel("x")
plt.ylabel("y")

# Uložení grafu do souboru
plt.savefig("sin_cos_graph.png")

```

Tento kód nejprve importuje potřebné knihovny `matplotlib.pyplot` pro vizualizaci a `numpy` pro matematické operace. Pomocí `numpy.linspace` generuje rozsah hodnot `x` od 0 do \( 2\pi \) (což odpovídá 360 stupňům ve stupních), které jsou použity pro výpočet hodnot funkcí \( \sin(x) \) a \( \cos(x) \). Poté vytvoří dva grafy, jeden pro každou funkci, s příslušnými legendami. Nakonec graf uloží do souboru `sin_cos_graph.png` voláním `plt.savefig`.

Úplnou dokumentaci knihovny Matplotlib a další příklady použití naleznete na oficiálních stránkách:
[Matplotlib Documentation](https://matplotlib.org/stable/contents.html)


Cvičení
-------

```{admonition} Jednoduchý obrázkový editor
:class: hint
Vytvořte webový nástroj na základní manupulaci s obrázky (otočení, aplikace filtrů). Uživatel nahraje obrázek a poté může pomocí lišty nástrojů s obrázkem provádět potřebné operace.

```

```{admonition} Kalkulačka
:class: hint
Vytvořte webový nástroj pro řešení algebraických výrazů a rovnic. Uživatel zadá do textového vstupu rovnici k vyřešení a aplikace mu zobrazí výsledek. Použijte JavaScriptovou knihovnu `MathJax` pro pěkné zobrazení řešení rovnice (včetně zadání).

```


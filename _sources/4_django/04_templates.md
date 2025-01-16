Šablony
=======

* [Tutoriál Django - šablony](https://docs.djangoproject.com/en/5.0/intro/tutorial03/)
* [Dokumentace Django - šablony](https://docs.djangoproject.com/en/5.0/topics/templates/)
* [Dokumentace Django - referenční příručka](https://docs.djangoproject.com/en/5.0/ref/templates/)
* [Vkládání statických souborů](https://docs.djangoproject.com/en/5.0/howto/static-files/)


Šablony (templates) v Django jsou způsob, jak generovat dynamický HTML kód. Pomocí šablon je možné lépe oddělit aplikační logiku od prezentace a vzhledu a zpřehlednit tak složitější projekty. Využívají kombinaci statického HTML a **[Django Template Language (DTL)](https://docs.djangoproject.com/en/5.0/ref/templates/language/)**, který umožňuje provádět komplexnější operace jako vkládání proměnných, logické operace, cykly a další.


Práce se šablonami v Django
---------------------------

Pro napojení šablony na pohled v Django je potřeba:

1. **Vytvoření šablony** 

    V adresáři aplikace `my_project/my_app/templates/my_app/` vytvořte soubor, například `hello.html`.

2. **Napojení šablony v pohledu**

    V souboru `views.py` importujte funkci `render` z balíčku `django.shortcuts`:
    
    ```python
    # my_app/views.py
    
    from django.shortcuts import render
    ```

    V rámci view funkce spusťte `render` funkci a její obsah vraťte jako výstup. Funkce `render` dostane jako parametr šablonu, která se použije a volitelně také slovník (`dict`) proměnných `context`, které budou v šabloně dostupné:
    
    ```python
    # my_app/views.py

    def hello(request):
        return render(request, 'my_app/hello.html', context={"title": "Hello world!", "items": ["one", "two", "three"]})
    ```

4. **Upravení šablony**

    Vlastní šablona `hello.html` je pak v podstatě HTML soubor, který obsahuje navíc speciální značky DTL:

    ```html
    <!-- my_project/my_app/templates/my_app/hello.html -->

    <!doctype html>
    <html lang="en">
        <head>
            <title>{{ title }}</title>
        </head>
        <body>
            <h1>{{ title }}</h1>
            <ol>
            {% for item in items %}
                <li>{{ item }}</li>
            {% endfor %}
            </ol>
        </body>
    </html>
    ```

    V tomto příkladě vidíme dvě základní značky DTL:

    - **`{{ title }}`**: Dvojité složené závorky vloží na místo obsah proměnné `title`, která byla předána jako `context` šablony.
    - **`{% for ... %}`**: Do značek `{% ... %}` se vkládají [DLT tagy](https://docs.djangoproject.com/en/5.0/topics/templates/#tags). Tag `for` je analogií for cyklu pro iteraci přes seznamy, slovníky atd..

```{admonition} Duplicitní cesta?
:class: note
Umístění souboru v adresáři `my_project/my_app/templates/my_app/index.html` se může na první pohled zdát jako duplicitní označení v cestě (`my_app/`), nicméně to má svou vnitřní logiku, která začne být jasnější jak se váš projekt bude rozšiřovat. Pomáhá například předcházet kolizím v názvu, pokud je šablona se stejným názvem ve více aplikacích.
```

````{admonition} Šablona nenalezena?
:class: warning

Pokud Django hlásí, že nemůže šablonu nalézt, ujistěte se, že máte vaši aplikaci zahrnutou v `INSTALLED_APPS` v konfiguračním souboru `settings.py`:

```python
# my_project/settings.py

INSTALLED_APPS = [
    # ...
    'my_app.apps.MyAppConfig',
    # ...
]

```
````

Proměnné a filtry
-----------------

Proměnné se v šabloně zobrazují pomocí dvojitých složených závorek: `{{ variable_name }}`. Django vyhledá proměnné ve slovníku kontextu (`context`) poskytnutém jako parametr funkce `render`. 

Filtry umožňují upravit zobrazení proměnných a jsou aplikovány pomocí znaku `|`. Příklady filtrů:

### `add`

Přidá hodnotu k číslu, nebo řetězci.

```django
{{ variable | add:"2" }}
```

### `join`

Spojí seznam řetězců do jednoho řetězce s uvedeným oddělovačem.

```django
{{ list_variable | join:", " }}
```

### `length`

Vrátí délku řetězce nebo počet položek seznamu.

```django
{{ string | length }}
```

### `date`

Filtr na formátování data (Python objektu `datetime`):

```django
{{ date_variable | date:"d.m.Y H:i:s" }}
```

Úplný seznam zástupných znaků použitelných při formátování data naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/#date).

### `safe`

Pokud proměnná obsahuje HTML značky, Django je ve výchozí konfiguraci escapuje. Pokud chcete, aby se HTML značky aplikovaly, použijte filtr `safe`:

```django
{{ html_code | safe }}
```

```{admonition} Pozor!
:class: warning

Filtr `safe` použijte, pouze pokud jse si absolutně jisti, že obsah proměnné je bezpečný a neobsahuje škodlivý kód. Zejména dávejte pozor, pokud takto zobrazujete obsah, který pochází od uživatele, který by tak mohl vložit například tag `<script>` nebo `<iframe>` a spustit tak na Vaší stránce kód z cizí stránky. Tento typ útoku se nazývá [Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting).
```

### Řetězení

```django
{{ my_list | join:", " | add:" or more..." }}
```

Kompletní seznam vestavěných filtrů naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/#ref-templates-builtins-filters) a kromě toho je také možné [definovat vlastní filtry](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/).

Tagy
----

Tagy se používají pro provádění logiky v šabloně a jsou obklopeny znaky `{%` a `%}`. Základními tagy jsou:

### `{% for %}`

Iteruje přes seznam, slovník nebo jiný iterovatelný objekt:

```django
{% for item in list %}
  {{ item }}
{% endfor %}
```

Iterace přes slovník:

```django
{% for key, value in dict.items %}
  {{ key }} : {{ value }}
{% endfor %}
```

Ve `for` cyklu je možné v šabloně použít také čítače aktuální položky:

- `{{ forloop.counter }}` počítá od 1.
- `{{ forloop.counter0 }}` počítá od 0.
    

### `{% if %}`

Tag pro podmíněné zobrazování obsahu na základě podmínky. Obsahuje stejnou logiku větvení if - else if - else jakou známe z Pythonu a jiných jazyků:

```django
{% if variable < 0 %}
    Hodnota je menší než nula
{% elif variable == 0 %}
    Hodnota je nula
{% else %}
    Hodnota je větší než nula
{% endif %}
```

V podmínkách je také možné používat filtry jako součástí podmínky:

```django
{% if label|length > 5 %}
    Délka nadpisu je větší než 5 znaků
{% endif %}
```

### `{% url %}`

Pokud máte pojmenované pohledy v souboru `urls.py`, lze jej jednoduše sestavovat pomocí tagu `{% url app_name:view_name %}`. Je to analogie pro volání funkce `reverse`:

```django
<a href="{% url 'my_app:index' %}">Homepage</a>
```

Pro dynamické URL lze předat tagu `url` i parametry:

```django
<a href="{% url 'my_app:say' 'John' %}">Are you John?</a>
```

Dědění šablon
-------------

Šablony mohou také dědit (rozšiřovat, doplňovat) jiné šablony. To je užitečné například pro případy, kdy máme část HTML kódu sdíleno mezi více šablonami (stránkami), jako třeba HTML hlavičky, záhlaví stránky, apod.. Abychom se vyhnuli opakování kódu (DRY!), vytvoříme například jednu základní šablonu `base.html`, kde definujeme bloky pomocí tagu `{% block %}`:


```html
<!-- my_project/my_app/templates/my_app/base.html -->

<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}{% endblock %}</title>
    </head>
    <body>
        {% block content %}{% endblock %}
    </body>
</html>
```

Dále vytvoříme druhou šablonu `hello.html`, která bude dědit ze základní šablony `base.html`. Toho docílíme pomocí tagu `{% extends %}` a pomocí tagu `{% block %}` pak definujeme obsah jednotlivých bloků:

```html
<!-- my_project/my_app/templates/my_app/hello.html -->

{% extends "my_app/base.html" %}

{% block title %}Homepage{% endblock %}

{% block content %}
  <p>Obsah stránky</p>
{% endblock %}
```

V pohledu pak ve funkci `render` odkážeme na děděnou šablonu:

```python
# my_app/views.py

def about(request):
    return render(request, 'my_app/hello.html')
```

```{admonition} Django debug-toolbar
:class: tip

Pokud chcete zobrazit na vaší stránce užitečnou debug lištu, a získat přehled o tom, co se ve vaší aplikaci přesně děje, nainstalujte si balíček `[django-debug-toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html)`.
```


Vkládání statických souborů
---------------------------

Práce se statickými soubory (CSS, JavaScript, obrázky) má svá specifika (jak si později ukážeme) v produkčním prostředí. Django proto nabízí nástroje pro správu statických souborů, které nám celý proces zjednoduší. Postup vložení například CSS souboru je následující:

1. **Konfigurace**
    
    Ujistěte se, že máte v souboru `settings.py` v `INSTALLED_APPS` balíček `django.contrib.staticfiles`:

    ```python
    # my_project/settings.py

    INSTALLED_APPS = [
        # ...
        'django.contrib.staticfiles',
        # ...
    ]
    ```

2. **Adresář pro statické soubory**

    Vytvořte adresář pro statické soubory v adresáři aplikace `my_app/static/my_app/` a umístěte do něj požadované statické soubory, například `style.css`. Duplicitní označení adresáře aplikace (`my_app`) má podobnou logiku jako u šablon a pomáhá předcházet případným konfliktům v názvu souborů z různých aplikací.

   
3. **URL adresa pro statické soubory**
    
    V souboru `settings.py` se ujistěte, že máte konfiguraci pro URL cestu, ze které se budou statické soubory načítat. Obvykle se používá adresář `static/`:
    
    ```python
    # my_project/settings.py

    STATIC_URL = "static/"
    ```

4. **Použití v šabloně**
    
    V šabloně je třeba nejprve načíst tag `static` (na začátku šablony) pomocí `{% load static %}` a poté už vkládat soubory pomocí tagu `static`:
    
    ```html
    {% load static %}
    <!-- ... -->
    <link rel="stylesheet" href="{% static 'my_app/style.css' %}">
    ```

Podrobný návod na vkládání statických souborů a práce s nimi naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.0/howto/static-files/).

V souboru `settings.py` je možné také nastavit proměnnou `STATICFILES_DIRS`, která obsahuje seznam adresářů, ve kterých se mají statické soubory vyhledávat. Takto je například možné přidat adresář `static` přímo v kořenovém adresáři projektu, pokud nechceme oddělovat statické soubory pro jednotlivé aplikace, nebo přidat statické soubory, které jsou společné pro celý projekt:

```python
# my_project/settings.py

STATICFILES_DIRS = [
    BASE_DIR / "static/",
]
```

Další možnosti, jak pracovat v Django se šablonami naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.0/topics/templates/).
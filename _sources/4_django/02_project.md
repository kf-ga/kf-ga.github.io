Seznámení s Django
==================

* [Django tutoriál](https://docs.djangoproject.com/en/5.1/intro/tutorial01/)


Nový Django projekt
-------------------
    
Pokud ještě nemáte nainstalované Django, můžete jej nainstalovat pomocí nástroje `pip`:

```sh
pip install django
```

Dále použijte následující příkaz pro vytvoření nového projektu s názvem `my_project`:

```sh
django-admin startproject my_project
```

Tento příkaz vytvoří nový adresář `my_project` s několika soubory uvnitř. Struktura vytvořených souborů a adresářů bude vypadat takto:

```
my_project/
├── manage.py
└── my_project/
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

- `manage.py`: Nástroj příkazového řádku, který umožňuje interakci s Django projektem. Pomocí tohoto souboru můžete například spouštět vývojový server, vytvářet aplikace a provádět databázové změny.
- `my_project/`: Adresář obsahující váš projekt.
    - `__init__.py`: Prázdný soubor, který říká Pythonu, že adresář by měl být považován za Python balíček.
    - `asgi.py`: Vstupní bod pro ASGI-kompatibilní webové servery pro nasazení projektu.
    - `settings.py`: Konfigurační soubor pro Django projekt, obsahuje nastavení, jako jsou konfigurace databáze, jazykové nastavení atd..
    - `urls.py`: Soubor definující URL adresy pro tento Django projekt.
    - `wsgi.py`: Vstupní bod pro WSGI-kompatibilní webové servery pro nasazení projektu.


Vytvoření aplikace
------------------

Django aplikace je komponenta Django projektu, která provádí určitou funkcionalitu nebo sadu funkcionalit. Aplikace je navržena tak, aby byla co nejvíce znovupoužitelná, ideálně ve více projektech. Jeden projekt má jednu či více aplikací.

Pro vytvoření aplikace v rámci projektu použijte nástroj `manage.py` s příkazem `startapp`:

```sh
cd my_project
python manage.py startapp my_app
```

To vytvoří v adresáři projektu nový adresář `my_app` s několika soubory:

```
my_app/
├── __init__.py
├── admin.py
├── apps.py
├── migrations/
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
```

- `admin.py`: Soubor pro konfiguraci administračního rozhraní.
- `apps.py`: Konfigurace aplikace, může obsahovat nastavení specifické pro aplikaci.
- `migrations/`: Adresář pro migrace databáze, pomáhá Django sledovat změny ve vašich modelech.
- `models.py`: Definuje strukturu databáze - modely.
- `tests.py`: Soubor pro testy aplikace.
- `views.py`: Obsahuje pohledy, což jsou funkce nebo třídy, které v závislosti na URL zobrazí konkrétní obsah.

Nově nainstalovanou aplikaci je třeba zahrnout v seznamu `INSTALLED_APPS` v konfiguračním souboru `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'my_app.apps.MyAppConfig',
    # ...
]
```

Vývojový server
---------------

Vývojový server je vestavěný nástroj Django, který umožňuje vývojářům snadno spustit webovou aplikaci na lokálním počítači pro účely vývoje a testování. Server sleduje změny v souborech projektu a automaticky je znovu v případě potřeby načítá, což umožňuje vývojářům vidět své změny v reálném čase. Není určen pro produkční použití, ale je velmi užitečný během vývoje aplikace.

Pro spuštění vývojového serveru použijte následující příkaz v terminálu z kořenového adresáře vašeho Django projektu (`my_project`):

```bash
python manage.py runserver
```

Tento příkaz spustí vývojový server na `localhost` s výchozím portem `8000`. Webovou aplikaci pak můžete prohlížet otevřením `http://localhost:8000/` ve webovém prohlížeči.

```{admonition} Co je to development a produkční prostředí?
:class: tip
Při vývoji webových aplikací se často setkáme s pojmy **development prostředí** (nebo server) a **produkční prostředí** (nebo server). Toto rozlišování pramení z různých požadavků při vývoji projektu (**development**) a při nasazení v ostrém provozu (**production**).

Při vývoji aplikace potřebuje vývojář obvykle jednoduše měnit kód aplikace a vidět okamžitě změny, které provedl. Nejsou zde obvykle vysoké nároky na výkon (k aplikaci ve vývoji v danou chvíli přistupuje vývojář sám) nebo na bezpečnost, neboť se při vývoji nepracuje s ostrými daty. Také má například při vývoji zapnuto zobrazování detailních chybových hlášek, aby v případě chyby mohl snadno a rychle diagnostikovat problém. Vývojový server běží obvykle na doméně `localhost` (zpravidla odpovídá IP adrese `127.0.0.1`), což je označení pro lokální počítač. Webový prohlížeč se tedy nepřipojuje k Internetu, ale k počítači, na kterém běží.

V produkčním prostředí, (nebo-li v ostrém provozu) je naopak kladen velký důraz na výkon a stabilitu, protože k webové aplikaci může přistupovat v jednu chvíli velké množství uživatelů. Jsou zde také kladeny velké požadavky na bezpečnost, neboť aplikace pracuje s reálnými daty. Rovněž chybové hlášky je dobré vypnout, neboť by mohly případnému útočníkovi prozradit detaily o fungování aplikace. Mohou být zapnuty také další optimalizační nástroje, cache apod.
```

Hello World!
------------

Ukážeme si základní postup jak zobrazit v prohlížeči pomocí Django "Hello World!":

1. **Upravte `views.py` ve vaší aplikaci**

    Otevřete soubor `views.py` v adresáři `my_app` a definujte funkci `hello`, která vrátí HTTP odpověď s textem "Hello World!":

    ```python
    #my_app/views.py

    from django.http import HttpResponse

    def hello(request):
        return HttpResponse("Hello World!")
    ```

2. **Nastavení URL směrování** 

    Aby bylo možné funkci `hello` z `views.py` přiřadit k URL adrese, musíte přidat směřování (někdy označované jako **route**, nebo **routing**) v souboru `urls.py` v adresáři vašeho projektu (`my_project/urls.py`):

    ```{code-block} python
    :linenos:
    :emphasize-lines: 5, 9
    #my_project/urls.py

    from django.contrib import admin
    from django.urls import path
    from my_app.views import hello

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('hello/', hello),
    ]
    ```
    Příkaz `path('hello/', hello)`, řekne frameworku Django, aby adresu `/hello/` "nasměroval" na funkci `hello`, jejíž návratová hodnota bude obsahem zobrazené stránky. Při zobrazení adresy `http://localhost:8000/hello/` ve webovém prohlížeči by se měl nyní ukázat text "Hello World!".

    Příkaz `path('admin/', admin.site.urls)` slouží k nastavení cesty k admin rozhraní, kterému se budeme věnovat později.


Debugging ve VSCode
-------------------

IDE Vscode umožňuje vestavěné ladění projektů na Django frameworku. Pokud ho chcete zapnout, přidejte do souboru `.vscode/launch.json` následující profil:

```json
    {
        "name": "Django debug server",
        "type": "debugpy",
        "request": "launch",
        "stopOnEntry": false,
        "program": "${workspaceRoot}/manage.py",
        "args": [
            "runserver",
            "--noreload"  // nedělat autoreload serveru, může způsobit problémy s debugováním
        ]
    }  
```

Po spuštění tohoto profilu spustí VSCode vývojový Django server a propojí ho s IDE, takže vám budou fungovat breakpointy, inspektor proměnných apod.
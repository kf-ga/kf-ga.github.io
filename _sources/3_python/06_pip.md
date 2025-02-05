PIP, Python Virtual Environment
===============================

PIP (Python Package Index)
--------------------------

PIP je nástroj pro správu balíčků v Pythonu. Jeho hlavní funkcí je instalace a správa balíčků z Python Package Index (PyPI), kde naleznete nepřebernou sadu hotových balíčků pro použití ve vašich projektech.

PIP se primárně ovládá přes příkazový řádek. Můžete instalovat, aktualizovat a odinstalovat balíčky.

Typické příkazy:
- `pip install package_name`: Instaluje balíček `package_name`.
- `pip install -r requirements.txt`: Instaluje všechny balíčky uvedené v `requirements.txt`.
- `pip uninstall package_name`: Odinstaluje balíček `package_name`.
- `pip freeze`: Vypíše všechny nainstalované balíčky a jejich verze.


Python Virtual Environment
--------------------------

Python Virtual Environment (**venv**) je izolované prostředí, které umožňuje instalovat balíčky Pythonu pro konkrétní projekt odděleně od ostatních projektů. Základní postup pro práci s venv ve vašem projektu:

1. **Vytvoření virtuálního prostředí:**

    ```sh
    python -m venv .venv
    ```

    Tento příkaz vytvoří nový adresář `.venv`, který obsahuje izolované prostředí Pythonu. V tomto adresáři budou také umístěny balíčky instalované pomocí nástroje `pip`.

2. **`.venv` adresář v `.gitignore`:**

    Je důležité přidat adresář `.venv/` do `.gitignore`, aby se tento adresář neukládal do systému Git.

3. **Aktivace venv:**

    Po vytvoření prostředí je potřeba ho ještě aktivovat. To je obecně potřeba udělat v každém novém okně konzole, nebo po novém přihlášení k počítači.

    - **Pro Linux:**
    
    ```bash
    source .venv/bin/activate
    ```

    - **Pro Windows:**
    
    Pokud používáte PowerShell na Windows, příkaz bude:
    
    ```bash
    .venv\Scripts\Activate.ps1
    ```

    Pro Git Bash:

    ```bash
    source .venv/Scripts/activate
    ```

### Soubor requirements.txt

Soubor `requirements.txt` je textový soubor, ve kterém jsou po řádcích uvedeny všechny balíčky Pythonu a jejich verze, které jsou potřeba pro váš projekt. Na rozdíl od adresáře `.venv` by naopak soubor `requirements.txt` měl být součástí repozitáře Vašeho projektu aby kdokoliv bude repozitář chtít použít mohl na základě souboru `requirements.txt` snadno nainstalovat všechny závislosti projektu.

Pro instalaci balíčků uvedených v `requirements.txt` použijeme příkaz:

```bash
pip install -r requirements.txt
```

Tento příkaz projde soubor `requirements.txt` a nainstaluje všechny balíčky uvedené v tomto souboru do aktivovaného virtuálního prostředí.

### Podpora venv ve VSCode

IDE VSCode má vestavěnou podporu pro virtuální prostředí. Detaily o jeho fungování naleznete v [dokumentaci VSCode](https://code.visualstudio.com/docs/python/environments).
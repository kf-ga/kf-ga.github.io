Admin rozhraní
==============

* [Django dokumentace - admin rozhraní](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/)

**Django admin** je automaticky generované rozhraní, které umožňuje uživatelům snadno spravovat obsah databáze spojené s Django projektem. Toto rozhraní je velmi užitečné pro administraci databázových modelů a poskytuje bohatou sadu nástrojů pro správu bez nutnosti psaní dodatečného kódu. Je to vlastně inspektor databáze obohacený o objektovou logiku a další funkce.

Nastavení Django Admin
----------------------

Django admin rozhraní je vlastně již hotovou Django aplikací, kterou lze vložit do jakéhokoliv Django projektu. Pro zapojení je třeba udělat několik kroků:

1. **Konfigurace**

    Ujistěte se, že máte `django.contrib.admin` v seznamu `INSTALLED_APPS` ve vašem `settings.py` souboru.


    ```python
    # my_project/settings.py

    INSTALLED_APPS = [
        # ...
        'django.contrib.admin',
        # ...
    ]
    ```

2. **Nastavení URL admin rozhraní**
    
    V `urls.py` vašeho Django projektu namapujte admin rozhraní, obvykle se mapuje do adresáře `admin/`:

    
    ```python
    # my_project/urls.py
    
    from django.contrib import admin
    # ...

    urlpatterns = [
        path('admin/', admin.site.urls),
        # ...
    ]
    ```

3. **Aktualizace databáze**

    Proveďte aktualizaci databáze:

    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

4. **Vytvoření uživatele**

    Vytvořte superuser uživatele, který bude mít přístup k admin rozhraní:

    ```
    python manage.py createsuperuser
    ```

    Během procesu budete vyzváni k zadání uživatelského jména, e-mailové adresy a hesla, kterým se do admin rozhraní budete přihlašovat.


5. **Modely k administraci**
    
    Modely, které chcete mít dostupné v admin rozhraní, je nutné explicitně zaregistrovat. To se dělá v souboru `admin.py` v adresáři vaší aplikace:

    ```python
    # my_app/admin.py

    from django.contrib import admin
    from .models import Author, Book

    admin.site.register(Author)
    admin.site.register(Book)
    ```


6. **Přihlášení k admin rozhraní** 

    Nyní spusťte vývojový server:

    ```
    python manage.py runserver
    ```

    Po zobrazení adresy `http://127.0.0.1:8000/admin` by se vám mělo zobrazit přihlášení do admin rozhraní.
    

Přizpůsobení zobrazení
----------------------

Django admin umožňuje přizpůsobit zobrazení modelů, například jaké atributy se mají zobrazit v seznamu, podle čeho lze vyhledávat apod.. To můžete provést opět v souboru `admin.py` vytvořením třídy odvozené od `admin.ModelAdmin`:

```python
#my_app/admin.py

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    list_filter = ('first_name', 'last_name', 'born')
    search_fields = ['first_name','last_name', 'born']

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')
    list_filter = ('title', 'author')
    search_fields = ['title'] 

admin.site.register(Author, AuthorAdmin)
admin.site.register(Book, BookAdmin)
```

Třída `admin.ModelAdmin` má celou řadu atributů, které umožňují přizpůsobit admin rozhraní:

- **`list_display`**: Seznam atributů modelu, které se zobrazí ve výpisu objektů.
- **`search_fields`**: Přidá vyhledávací pole nad výpisem objektů, které umožňuje hledat v zadaných atributech.
- **`list_filter`**: Přidá filtrační nabídku na boční straně stránky s možností filtrace podle zadaných atributů.
- **`ordering`**: Určuje výchozí pořadí objektů ve výpisu. Je to seznam atributů modelu, podle kterých se bude řadit, např. `ordering = ('title')`.
- **`list_editable`**: Umožňuje upravovat vybrané atributy přímo ve výpisu objektů., např. `list_editable = ('title',)`
- **`list_per_page`**: Určuje určit objektů zobrazených na jedné stránce výpisu, např. `list_per_page = 20`
- **`fields`**: Seznam atributů modelu, které se zobrazí ve formuláři pro přidání nebo úpravu objektu.
- **`exclude`**: Seznam atributů modelu, které se nezobrazí ve formuláři pro přidání nebo úpravu objektu.
- **`readonly_fields`**: Určuje, které atributy modelu jsou pouze pro čtení ve formuláři pro přidání nebo úpravu objektu.

Úplný seznam možností konfigurace pomocí `ModelAdmin` naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/#modeladmin-options).

### Názvy modelů a atributů

Zpravidla se hodí zobrazovat uživateli přívětivější název pro atributy modelu, než jak jsou v kódu pojmenovány. K tomu je možné v třídě modelu nastavit u jednotlivých atributů parametr `verbose_name`:

```python
#my_app/admin.py

class Author(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Křestní jméno")
    last_name = models.CharField(max_length=100, verbose_name="Příjmení")
    born = models.DateField(verbose_name="Datum narození")
```

Tyto názvy se pak budou zobrazovat v admin rozhraní. Pro nastavení názvu pro celý model se v Django používá třída `Meta` a její atributy `verbose_name` a `verbose_name_plural`:

```python
#my_app/admin.py

class Author(models.Model):
    class Meta:
         verbose_name = "Autor"    
         verbose_name_plural = "Autoři"

    first_name = models.CharField(max_length=100, verbose_name="Křestní jméno")
    last_name = models.CharField(max_length=100, verbose_name="Příjmení")
    born = models.DateField(verbose_name="Datum narození")
```

### Inlines

Často se hodí mít možnost editovat související objekty přímo v editačním formuláři pro přidání nebo úpravu objektu. To lze v Django provést pomocí **inlines**:

```python
#my_app/admin.py

class BookInline(admin.TabularInline):
    model = Book
    extra = 3

class AuthorAdmin(admin.ModelAdmin):
    # ...
    inlines = [BookInline]
    # ...
```

Tento kód vytvoří v editačním formuláři pro autora dynamickou tabulku, kde je možné rovnou editovat i autorovy knihy. Kromě základní třídy `admin.TabularInline`, které formátuje jednotlivé položky (knihy) do tabulky, je možné alternativně použít i třídu `admin.StackedInline`, která zobrazí jednotlivé záznamy pod sebou. Parametr `extra` určuje kolik prázdných položek má být po zobrazení formuláře k dispozici.

Pokud je vztah složitější (například `ManyToManyField` pomocí vazební tabulky `Authorship` z [minulé kapitoly](05_models.md)), je možné relaci editovat přidáním vazebního modelu do admin rozhraní:

```python
#my_app/admin.py

# ...
admin.site.register(Authorship)
```

Nebo vytvořením inline nad vazebním modelem:

```python
#my_app/admin.py

class AuthorshipInline(admin.TabularInline):
    model = Authorship
    extra = 3

class AuthorAdmin(admin.ModelAdmin):
    # ...
    inlines = [AuthorshipInline]

class BookAdmin(admin.ModelAdmin):
    # ...
    inlines = [AuthorshipInline]
```

### Název aplikace

Pro zobrazení lepšího názvu aplikace v admin rozhraní můžete v souboru `apps.py` nastavit atribut `verbose_name` v `AppConfig` třídy vaší aplikace:

```python
#my_app/admin.py

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'my_app'
    verbose_name = 'Knihovna'
```

Další možnosti konfigurace Django admin rozhraní naleznete [Django dokumentaci](https://docs.djangoproject.com/en/5.1/ref/contrib/admin/).
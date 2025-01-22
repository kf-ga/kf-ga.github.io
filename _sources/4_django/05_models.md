Modely a ORM
============

* [Dokumentace Django - modely](https://docs.djangoproject.com/en/5.1/topics/db/models/)
* [Dokumentace Django - dotazy](https://docs.djangoproject.com/en/5.1/topics/db/queries/)
* [Dokumentace Django - field types](https://docs.djangoproject.com/en/5.1/ref/models/fields/#model-field-types)
* [Dokumentace Django - queryset reference](https://docs.djangoproject.com/en/5.1/ref/models/querysets/)


Databáze je základním stavebním kamenem pro ukládání a práci s daty v mnoha (nejen) webových aplikacích. Databázi můžeme chápat jako organizovanou kolekci tabulek. Databáze mohou být velmi rozsáhlé, u větších internetových projektů mohou snadno dosahovat desítek až stovek gigabajtů dat, často i více. Nelze tedy počítat s tím, že má aplikace všechna data ihned k dispozici (např. v RAM). Existují proto databázové nástroje, které řeší, jak takto velmi objemná data ukládat a jak s nimi efektivně manipulovat a vyhledávat v nich. 


Základní pojmy
--------------

Často používaný typ databází je rodina **SQL** databází ([MySQL](https://www.mysql.com), [MariaDB](https://mariadb.org), [PostgreSQL](https://www.postgresql.org), [SQLite](https://www.sqlite.org/index.html) aj.) se kterými umí pracovat i framework Django. Někdy se těmto databázím také říká relační databáze (mezi tabulkami databáze existují relace - vztahy) a jazykem pro komunikaci s těmito databázemi je SQL (**Structured Query Language**). Framework Django vytváří nad SQL databází objektovou reprezentaci. Nemusíme tak komunikovat přímo s databází pomocí jazyka SQL, ale s daty v databázi pracujeme jako s Python objekty. Této objektové nadstavbě nad relační databází se říká **ORM** (**Object-relational mapping**).

Tabulka v databázi je v ORM reprezentována třídou, která definuje strukturu (atributy) objektů, které korespondují se sloupci v relační databázi. Každý řádek v tabulce je pak reprezentován instancí této třídy, tedy konkrétní objekt s konkrétními hodnotami atributů. 

Objekty mezi sebou mohou mít vztah (relaci), například *autor* může mít relaci *napsal* s objektem *kniha*. V databázích se relace mezi objekty obvykle realizují pomocí **cizích klíčů**, které odkazují na **primární klíče** jiných tabulek.


### Ukázka tabulky

Pro lepší pochopení si ukážeme, jak by mohly vypadat tabulky `Author` a `Book` v databázi, kde každý autor může napsat jednu nebo více knih a každá kniha má právě jednoho autora:

Tabulka `Author`:

| id | first_name | last_name | born |
|----|------------|-----------|------|
| 1  | John       | Doe       | 1950 |
| 2  | George     | Orwell    | 1903 |


Tabulka `Book`:

| id | author_id | name        | published |
|----|-----------|-------------|-----------|
| 1  | 2         | Animal Farm | 1945      |
| 2  | 2         | 1984        | 1949      |
| 3  | 1         | Foo         | 1999      |

V této ukázce `author_id` ve tabulce `Book` je cizím klíčem, který odkazuje na primární klíč `id` v tabulce `Author` a vytváří vztah (relaci) mezi řádky (objekty).


Typy databázových relací
------------------------

Existují tři základní typy relací: **1:N** (**One to Many**), **1:1** (**One to One**), a **M:N** (**Many to Many**). Každý typ relace slouží k reprezentaci různých druhů vztahů mezi objekty.

### 1:N (One to Many)

Tento typ relace popisuje situaci, kdy jeden objekt (na straně "one") může mít vztah s více objekty (na straně "many"), ale každý z těchto objektů na straně "many" má vztah pouze s jedním objektem na straně "one". Příklad výše je ukázkou relace 1:N. Jeden autor (`Author`) může napsat více knih (`Book`), ale každá kniha má pouze jednoho autora. (Pomiňme pro tuto chvíli stranou knihy, které mají autorů více.)

Další příklady:

- **Vydavatelství a časopisy**: Jedno vydavatelství může vydávat mnoho různých časopisů. Každý časopis má jednoho vydavatele, který se stará o jeho publikaci.
- **Auto a vlastník auta**: Každé auto má právě jednoho vlastníka, ale jedna osoba může vlastnit více aut.

### 1:1 (One to One)

Vztah 1:1 znamená, že jeden objekt na jedné straně má vztah pouze s jedním objektem na druhé straně, a naopak. Vazba nemusí být nutně povinná, za 1:1 vztah lze považovat i vztah "1:0".

- **Osoba a řidičský průkaz**: Každá osoba může mít maximálně jeden řidičský průkaz a každý řidičský průkaz je přiřazen právě jedné osobě. Ne každý musí ale nutně mít řidičský průkaz.
- **Manželé / partneři**: Každá osoba může mít maximálně jednu jinou osobu jako svého manžela/manželku nebo partnera. Alespoň tedy v naší kultuře, v jiných kulturách může tato relace vypadat jinak.

### M:N (Many to Many)

Relace M:N umožňuje, aby mnoho objektů na jedné straně mělo vztahy s mnoha objekty na straně druhé. 

- **Studenti a předměty**: Studenti mohou navštěvovat více předmětů a každý předmět může být navštěvován více studenty.
- **Zboží a kategorie**: Zboží v eshopu může být v umístěno ve více kategoriích a každá kategorie eshopu může v sobě mít více zboží.

```{admonition} Poznámka
:class: note

Objekt může mít vztah k jinému objektu stejné třídy. Například každý objekt třídy "Osoba" může (musí?) mít relaci "Otec" a "Matka" na jiný objekt třídy "Osoba". 
```

Django ORM
----------

Django framework používá ORM techniky pro práci s databázemi. Vývojáři mohou vytvářet, číst, aktualizovat a mazat databázové záznamy bez nutnosti psát SQL dotazy. Django ORM převede Python kód na SQL dotazy za běhu aplikace. Django ORM umožňuje aplikaci také být nezávislou na konkrétním databázovém systému. Podporuje populární databáze jako PostgreSQL, MySQL, SQLite, Oracle a další. Ke změně databázového úložiště stačí změna v konfiguračním souboru. Také poskytuje nástroje pro automatickou změnu struktury databáze (migraci), což usnadňuje aktualizace databáze během vývoje.

### Konfigurace databáze

Prvním krokem k použití Django ORM je jeho konfigurace. Do souboru `settings.py` v adresáři projektu přidejte následující řádky:


```python
# my_project/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

Tento kód nastaví jako databázové úložiště [SQLite](https://www.sqlite.org/index.html), což je velmi jednoduchá SQL databáze, která ukládá všechna data do jednoho souboru, v tomto případě to bude soubor `db.sqlite3` v adresáři projektu. Databáze SQLite je vhodná pro vývojové prostředí, neboť nevyžaduje žádnou další konfiguraci. Má ale velká výkonnostní omezení a proto se jako produkční databáze obvykle volí robustnější řešení, například [PostgreSQL](https://www.postgresql.org) nebo [MariaDB](https://mariadb.org).

### Definice Modelu

V Django je základním konceptem ORM **Model**, což je třída Pythonu, která definuje strukturu databázové tabulky (její sloupce). Každá instance modelu reprezentuje řádek v této tabulce. Definice modelů se píší do souboru `models.py` v adresáři příslušné aplikace. Model definujeme rozšířením základní třídy `django.db.models.Model`:


```python
# my_app/models.py

from django.db import models

class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    born = models.DateField()
```

Definuje třídu `Author` (která se díky ORM automaticky mapuje na databázovou tabulku) se třemi atributy (v Django ORM **fields**, tedy sloupci v příslušné databázové tabulce) `first_name`,`last_name` a `born`. 

```{admonition} Poznámka
:class: note

Povšimněte si, že třída se jmenuje `Author`, nikoliv `Authors`. Ačkoliv se může na první pohled zdát logické, že třída (tabulka) reprezentuje všechny autory a tudíž by měla být v množném čísle, zpravidla se používá číslo jednotné. Když se pak v kódu vytváří instance třídy (`a = Author()`), vím pak hned, že `a` je právě jeden autor. Výraz `a = Authors()` by mohl naznačovat, že `a` nějakým způsobem obsahuje více autorů. Proto (pokud k tomu není opravdu důvod) volíme jako název třídy modelu **jednotné číslo**.
```

#### Základní typy atributů

Django poskytuje různé typy atributů (fields) pro modely, každý odpovídá určitému typu dat v databázi. Základní typy zahrnují:

- **`CharField`** - Krátký textový řetězec.
- **`TextField`** - Dlouhý textový řetězec.
- **`IntegerField`** - Celé číslo.
- **`BooleanField`** - Pravda/Nepravda (`True`/`False`).
- **`DateField`** - Datum.
- **`ForeignKey`** - Vytváří vazbu mezi modely (pro relace 1:N).
- **`ManyToManyField`** - Vytváří vazbu mezi modely (pro relace M:N).

Některé fields mají také možnost konfigurace, například u `CharField` je možné specifikovat maximální délku řetězce pomocí parametru `max_length=100`. Dále se často používá parametr `null=True`, který říká, že pole může být prázdné (resp `NULL`).

Úplný seznam všech typů a jejich možností konfigurace naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/ref/models/fields/#model-field-types).

#### Ukázka kódu s 1:N vazbou

Takto by mohla vypadat již zmíněná relace s knihou, která má právě jednoho autora:

```python
# my_app/models.py

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    published = models.DateField()
```

V tomto příkladu, `ForeignKey` ve modelu `Book` vytváří vazbu 1:N s modelem `Author`. Parametr `on_delete=models.CASCADE` znamená, že když je objekt třídy `Autor` smazán, všechny jeho knihy budou také smazány. Pokud by totiž smazány nebyly, zůstaly by v databázi záznamy knih, odkazující na již neexistující záznam o autorovi, což znamená, že **data v databázi jsou nekonzistentní**.

Místo kaskádového mazání je možné zvolit jiné chování, například `on_delete=models.SET_NULL`, které nastaví příslušný cizí klíč v databázi na `NULL` nebo `on_delete=models.PROTECT`, což zabrání smazání Autora (nejprve je nutné smazat všechny jeho knihy) případně [jiné chování](https://docs.djangoproject.com/en/5.1/ref/models/fields/#django.db.models.ForeignKey.on_delete) dle potřeby.

V aplikaci (například v pohledech) pak stačí do kódu importovat třídu modelu a můžeme s nimi pracovat:

```python
from my_app.models import Author, Book
```

### Migrace

Pokud máme definované modely, je potřeba ještě vytvořit odpovídající tabulky v databázi. K tomu má Django nástroj nazvaný **migrace**, což je proces automatického vytváření a aktualizace databázových tabulek. V Django se chápe jako autoritativní struktura ta, která je popsána v souborech `models.py`. Pokud dojde ke změně modelů v těchto souborech (úprava položek, přidání modelu nebo odebrání modelu), je potřeba provést migraci, aby se změny propsaly i do samotné databáze databáze. To se děje ve dvou krocích pomocí nástroje `manage.py`.

1. **Příprava migrace**

    ```sh
    python manage.py makemigrations
    ```

Tento příkaz analyzuje změny v definicích modelů a **připraví** migrace. V adresáři aplikace `migrations` vytvoří soubory (např. `0001_initial.py`), které popisují změny, které je potřeba v databázi provést. Změny se zatím připraví, ale do databáze se zatím nezasahuje.

2. **Provedení migrace**

    ```sh
    python manage.py migrate
    ```
    Tento příkaz přečte samotné soubory z adresáře `migrations` a **skutečně provede** změny v databázi. Django přitom automaticky hlídá, které změny byly v databázi provedeny a aplikuje jen ty, které jsou pro aktuální databázi nové. Migrace jsou v podstatě obdobou verzování kódu aplikace pro strukturu databáze a udržují přehled o tom, v jakém stavu aktuální databáze je a jaké změny je potřeba provést aby struktura databáze odpovídala projektu.


### Vytvoření objektu

Pro vytvoření instance modelu v Django je potřeba vytvořit instanci třídy a poté zavolat metodu `save()`, která model permanentně uloží do databáze:

```python
author = Author(first_name='Joanne K.', last_name='Rowling', born="1965-07-31")
author.save()

book = Book(title='Harry Potter and the Philosopher\'s Stone', published="1997-06-26", author=author)
book.save()
```

Nebo alternativní zápis:

```python
book = Book()
book.title="Harry Potter and the Chamber of Secrets"
book.published="1998-12-25"
book.author=author
book.save()
```

```{admonition} Poznámka
:class: note
Vytvořením nové instance třídy se ještě nevytvoří příslušný záznam (řádek v příslušné tabulce) v databázi. Ten se vytvoří až po zavolání metody `save()`.

Povšimněte si také, že vytvoření relace mezi autorem a knihou stačí pouze přiřazení instance třídy `Author` k atributu `author` u třídy `Book`. 
```

````{admonition} Interaktivní konzole
:class: note
Pro jednoduché testování modelů a jejich chování si můžete pustit Django interaktivní konzoli pomocí příkazu

```sh
python manage.py shell
```

Ta vám umožní psát a rovnou spouštět Python kód.
````

Načítání objektů z databáze
---------------------------

Django nabízí velmi flexibilní rozhraní pro dotazování v databází a načítání objektů z databáze na objektové úrovni.

### Načtení jednoho objektu

Pro načtení jednoho objektu z databáze můžete použít metodu `get()`, která očekává, že dotaz vrátí přesně jeden objekt. Pokud objekt není nalezen nebo je nalezeno více objektů, vyvolá výjimku: 

```python
try:
    author = Author.objects.get(pk=1) 
except Author.DoesNotExist:
    print("Autor nebyl nalezen")
except Author.MultipleObjectsReturned:
    print("Nalezeno více autorů")
```

Parametr `pk=1` odkazuje na primární klíč tabulky. Příkaz `Author.objects.get(pk=1)` tedy načte z tabulky autorů jeden řádek, jehož primární klíč je 1 a vrátí objekt třídy `Author`. Jako parametr metody `get` je možné použít [celou řadu nejrůznějších filtrů](https://docs.djangoproject.com/en/5.1/ref/models/querysets/#id4), které Django automaticky překládá do SQL dotazu.

```{admonition} objects
:class: note
Povšimněte si také použití atributu `objects`. Ten má automaticky k dispozici každá třída modelu a slouží právě k vytváření dotazů nad celou tabulkou. V kódu pak spojení `Author.objects` můžeme číst jako operaci *nad všemi objekty třídy `Author`*.
```

````{admonition} get_object_or_404
:class: tip

Funkce `get_object_or_404` z balíčku `django.shortcuts` je užitečná pro načítání objektů v pohledech, pokud chcete rovnou vrátit HTTP chybu 404 Not Found (stránka nenalezena), pokud objekt v databázi neexistuje:

```python
from django.shortcuts import get_object_or_404
# ...

def author(request, id):
    author = get_object_or_404(Author, pk=id)
    return render(request, 'bookshelf/author.html', {'author': author})
```

Pohled `author` se pokusí načíst objekt `Author` s primárním klíčem `id` a zobrazit ho pomocí šablony. Pokud objekt neexistuje, vrátí chybu 404.
````

### Načtení více objektů

Metoda `filter` se používá k načtení více objektů, které odpovídají zadaným kritériím. Vrací **[queryset](https://docs.djangoproject.com/en/5.1/ref/models/querysets/)**, který může obsahovat žádnou, jednu, nebo více položek:

```python
authors = Author.objects.filter(born__lte="1970-01-01")
for author in authors:
    print(f"{author.first_name} {author.last_name}")
```

Oproti metodě `get` nevyvolá metoda `filter` výjimku, pokud žádný objekt s danou podmínkou neexistuje (vrátí prázdný queryset), nebo pokud je objektů více (vrátí queryset všech objektů). Jako parametr je zde použit filtr `born__lte="1970-01-01"`, který vybere autory narozené před 1.1.1970. Notace s dvěma podtržítky `__` se v Django používá právě ke specifikaci filtrů a spojuje atribut modelu (`born`) a funkci (`lte` - lower than or equal) použitou k porovnání. Více o filtrech naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/ref/models/querysets/#id4).

```{admonition} Co to je queryset?
:class: note
Pojem queryset se může zdát matoucí, když se chová podobně jako seznam objektů. Proč se vlastně zavádí tento pojem?

Queryset ve skutečnosti není to samé co prostý seznam objektů, ale je to nástroj Django ORM, který reprezentuje dotaz do databáze (nikoliv samotná data). Teprve pokud nad queryset začneme iterovat se dotaz skutečně provede, načte řádky z databáze a začne vracet jednotlivé objekty. Díky tomu lze konstruovat složitější dotazy a zatěžovat databázi až když je to skutečně potřeba.
```

### Vyřazení objektů

Pomocí metody `exclude` je možné naopak vyřadit z querysetu některé objekty, které splňují podmínky:

```python
authors = Author.objects.exclude(first_name__startswith="A")
for author in authors:
    print(f"{author.first_name} {author.last_name}")
```

Zde se vyřadí z querysetu všichni autoři, jejichž křestní jméno začíná na "A".

### Načtení všech objektů

Metoda `all` vrátí queryset obsahující všechny instance modelu:

```python
authors = Author.objects.all()
```

```{admonition} Význam volání all()
:class: note

Ve většině praktických případů není rozdíl mezi voláním `Author.objects.all().filter()` a `Author.objects.filter()`. Použití metody `all` je spíše z důvodů lepší čitelnosti a srozumitelnosti kódu, kdy volání `all()` značí, že začínáme se všemi instancemi modelu.
```

### Řazení

Metoda `order_by` umožňuje řadit queryset podle jednoho nebo více sloupců:

```python
authors = Author.objects.all().order_by("-born", "first_name")
```

Jako parametr přebírá jeden nebo více sloupců, podle kterých se má řadit (řadí se podle prvního sloupce, pokud je shoda, řadí se podle druhého sloupce atd.). Výchozí řazení je vzestupné, znaménko `-` označuje sestupné řazení.

### Řetězení

Metody `filter`, `exclude`, `order_by` a [další](https://docs.djangoproject.com/en/5.1/ref/models/querysets/#methods-that-return-new-querysets) je možné libovolně řetězit. Každé zřetězené volání vytvoří novou instanci queryset:

```python
authors = Author.objects.all().filter(born__lte="1970-01-01").exclude(first_name__startswith="A").order_by("first_name")
```

### Metoda `create`

Metoda `create` umožňuje v jednom řádku vytvořit nový objekt v databázi:

```python
author = Author.objects.create(first_name="John", last_name="Doe", born="1940-08-07")
```

### Metoda `get_or_create`

Praktická metoda `get_or_create` umožňuje načíst objekt z databáze nebo vytvořit nový, pokud není nalezen:

```python
author, created = Author.objects.get_or_create(first_name="Jane", last_name="Bar", defaults={"born": "1940-08-07"})
```

Argumenty funkce jsou atributy, podle kterých se má Django pokusit objekt najít. Volitelný argument `defaults` obsahuje slovník (`dict`) atributů, které se použijí k naplnění dat nového objektu, pokud Django hledaný objekt nenalezne (neslouží tedy k vyhledávání). Tato metoda vrací dvojici (`tuple`) hodnot, první je samotný objekt a druhá hodnota je `True`, pokud byl objekt nově vytvořen, `False` pokud byl nalezen. 


Práce s relacemi
----------------

Django nabízí také velmi praktické rozhraní pro práci s relacemi mezi modely.

### Přiřazování relace do databáze

Pro nastavení relace mezi dvěma objekty v databázi jednoduše přiřaďte atributu typu `ForeignKey` objekt se kterým se má propojit:

```python
author = Author.objects.get(pk=1)
book = Book()
book.title = "Stories from nowhere"
book.author = author
book.published = "1930-12-13"
book.save()
```

Tento kód uloží do databáze vazbu primární - cizí klíč. Při načtení objektu z databáze je možné s relacemi pracova zase na objektové úrovni, Django se postará o správné načítání dat z databáze na pozadí:

```python
book = Book.objects.get(pk=1)
print(book.title)
print(book.author.first_name)
print(book.author.last_name)
```

### Načítání objektů přes `_set`

Na objektové úrovni funguje relace také z "druhé strany". Pokud má třída `Book` atribut typu `ForeignKey` na `Author`, Django automaticky vytvoří také u třídy `Author` vlastnost `book_set`, pomocí které je možné přistupovat k objektům `Book`, které patří k danému objektu třídy `Author`.

```python
author = Author.objects.get(pk=1)
books = author.book_set.all()
for book in books:
    print(book.title)
```

Atribut `book_set` se chová analogicky jako atribut `objects` a je možné s ním dále pracovat, používat funkce jako `filter()`, `exclude()`, `order_by()` atd.

### Práce s M:N relacemi

V Django typicky reprezentujete M:N (many-to-many) relaci mezi modely pomocí atributu `ManyToManyField`. Pojďme si modifikovat příklad s knihami a autory tak, aby kniha mohla mít více autorů:

```python
# my_app/models.py

class Book(models.Model):
    authors = models.ManyToManyField(Author)
    title = models.CharField(max_length=100)
    published = models.DateField()
```

Po provedení migrace Django automaticky v pozadí vytvoří **propojovací tabulku** (`book_author`) a namísto atributu `author` u třídy `Book` obsahující přímo objekt autora, bude možné pomocí atributu `authors` pracovat se všemi autory dané knihy:

```python
book = Book.objects.get(pk=1)
authors = book.authors.all()
for author in authors:
    print(book.title)
```

Vlastnost `authors` se chová podobně jako vlastnost modelu `objects`, je možné s ní pracovat jako s querysetem a použít na ni filtry `filter(...)`, řazení `order_by(...)` atd..

```{admonition} Pozor na data!
:class: warning

Při migraci buďte opatrní, neboť je možné, že změna struktury modelů vyvolá takové změny v databázi, které povedou ke ztrátě dat, nebo ztrátě informací o relacích mezi objekty. Obecně platí, že před každou aktualizací databáze (zvláště v produkčním prostředí) by měla být databáze zazálohována, aby bylo možné data případně obnovit.
```

Pomocí `ManyToManyField` vlastností lze M:N vztahy také modifikovat pomocí následujících funkcí:

- **`add`**: Přidá jeden nebo více objektů do relace.
- **`remove`**: Odebere jeden nebo více objektů z relace.
- **`set`**: Nahradí všechny aktuální relace novou sadou.
- **`clear`**: Odstraní všechny relace z dané knihy.

Například:

```python
author_1 = Author.objects.get(pk=1)
author_2 = Author.objects.get(pk=2)
book = Book.objects.get(pk=1)

book.authors.add(author_1)
book.authors.remove(author_2)
```

nebo:

```
book.authors.set([author_1, author_2])
```

````{admonition} Pojmenování relace
:class: tip

Relace M:N také funguje z "druhé strany" a objekty třídy `Author` budou mít automaticky vlastnost `book_set`, kde budou dostupné všechny knihy autora. Často je šikovné nastavit u `ForeignKey`, `ManyToManyField` a případně i `OneToOneField` relace parametr `related_name`, kterým je možné změnit název této vlastnosti:

```python
# my_app/models.py

class Book(models.Model):
    authors = models.ManyToManyField(Author, related_name="books")
    title = models.CharField(max_length=100)
    published = models.DateField()
```

Knihy autora budou pak dostupné ne přes vlastnost `book_set`, ale přes vlastnost `books`, což zlepší čitelnost a konzistenci kódu:

```python
author = Author.objects.get(pk=1)
books = author.books.all()
```

````

### Konfigurace relační tabulky

Pokud potřebujete uložit další informace o samotném vztahu (např. datum, kdy autor začal na knize pracovat), můžete definovat tzv. **`through` model**. Tím předefinujete standardní propojovací tabulku a můžete si do vztahu přidat vlastní pole:

```python
# my_app/models.py

class Book(models.Model):
    authors = models.ManyToManyField(
        Author,
        through='Authorship',
        related_name='books'
    )
    title = models.CharField(max_length=100)
    published = models.DateField()

class Authorship(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_joined = models.DateField()
```

Pak vytváříte a spravujete vztahy skrze model `Authorship`, místo abyste přímo používali `book.authors.add(...)`:

```python
author = Author.objects.get(pk=1)
book = Book.objects.get(pk=1)

Authorship.objects.create(author=author, book=book, date_joined="1995-01-01")
```

Případě dále pracovat s funkcemi `add`, `remove`, `set` a `clear`. Při přidávání nových vztahů (pomocí `add` nebo `set`) je možné pomocí parametru `through_defaults` definovat hodnoty pro propojovací model:

```python
author = Author.objects.get(pk=1)
book = Book.objects.get(pk=1)

author.books.add(book, through_defaults={"date_joined":"2005-01-01"})
```

Další možnosti, jak pracovat v Django se šablonami naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/db/models/).
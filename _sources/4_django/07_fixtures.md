Fixtures
========

* [Django dokumentace - Fixtures](https://docs.djangoproject.com/en/5.0/topics/db/fixtures/)
* [Django dokumentace - Výchozí data](https://docs.djangoproject.com/en/5.0/howto/initial-data/)


**Fixtures** v Django jsou soubory, které obsahují data ve formátu, který Django umí načíst, a která lze použít k naplnění databáze. Jsou užitečné pro vytváření výchozích dat pro aplikace, testování aplikací nebo plnění databáze daty pro vývojové účely.

Jak vytvořit fixtures
---------------------

Fixtures soubory lze vytvořit ručně, nebo použít příkaz `./manage.py dumpdata`, který vyexportuje data aktuální databáze. Fixtures v Django můžete vytvářet v různých formátech, ale nejběžnější jsou JSON a YAML. Zde jsou příklady pro oba formáty:

### JSON

```json
// my_app/fixtures/books.json
[
    {
        "model": "my_app.author",
        "pk": 1,
        "fields": {
            "first_name": "John",
            "last_name": "Doe",
            "born": "1920-01-01",
        }
    },
    {
        "model": "my_app.book",
        "pk": 1,
        "fields": {
            "author": 1,
            "title": "First book",
        }
    },
    {
        "model": "my_app.book",
        "pk": 2,
        "fields": {
            "author": 1,
            "title": "Second book",
        }
    }
]
```

### YAML

```yaml
# my_app/fixtures/books.yaml
- model: my_app.author
    pk: 1
    fields:
        first_name: John Doe
        last_name: John Doe
        born: '1920-01-01'
- model: my_app.book
    pk: 1
    fields:
        author: 1
        title: First book
- model: my_app.book
    pk: 2
    fields:
        author: 1
        title: Second book
```

Atribut `model` obsahuje název modelu, který se má vytvářet ve formátu `<název aplikace>.<třída modelu>`. Atribut `pk` obsahuje primární klíč, který se má pro objekt nastavit a pomocí kterého se pak budou další objekty odkazovat. Atribut `fields` obsahuje hodnoty, které se mají objektu nastavit.

Fixtures soubory by měly být umístěny v adresáři `fixtures` a to buď v kořenovém adresáři projektu, nebo v adresáři aplikace.

Načtení fixtures do databáze se provádí pomocí příkazu `./manage.py loaddata`, s parametrem názvu fixtures souboru, který se má načíst:

```bash
python manage.py loaddata books
```

Povšimněte si, že není potřeba uvádět celý název souboru, Django automaticky hledá soubory s příponou `.json` nebo `.yaml`.
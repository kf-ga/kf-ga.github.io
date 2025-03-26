Práce se soubory
================

* [Django dokumentace - soubory](https://docs.djangoproject.com/en/5.1/topics/files/)

Ve webových aplikacích je práce se soubory běžnou součástí funkcionality, například při nahrávání obrázků, dokumentů nebo jiných médií. Soubory se neukládají přímo do databáze, neboť by to vedlo velkému nárůstu velikosti databáze, což by způsobovalo problémy s jejím výkonem a údržbou (škálování, zálohování atd.). Místo toho se soubory ukládají na disk a databáze ukládají pouze metadata, jako je cesta k souboru, jeho název, případně velikost souboru.

Práce se soubory v Django
-------------------------

Django poskytuje robustní podporu pro práci se soubory prostřednictvím polí  **`FileField`** a **`ImageField`**, které lze použít v modelech.

- **`FileField`**: je pole modelu určené k ukládání souborů. Umožňuje specifikovat cestu kam se má soubor ukládat a poskytuje API pro práci s tímto souborem.
- **`ImageField`**: rozšiřuje funkcionalitu `FileField` tím, že kontroluje, zda nahraný soubor je platný obrázek.
 
Django ukládá soubory do adresáře `MEDIA_ROOT`, specifikovaného v konfiguračním souboru settings.py v projektu:

```python
# my_project/settings.py

# ...
MEDIA_ROOT = BASE_DIR / 'media'
```

A dále je potřeba ještě nastavit `MEDIA_URL`, což je url adresa, pod kterou budou soubory dostupné:

```python
# my_project/settings.py

# ...
MEDIA_URL = 'media/'
```

```{admonition} Poznámka
:class: note

Pole typu `ImageField` vyžaduje Python balíček `Pillow`, který lze nainstalovat pomocí `pip install Pillow` nebo přidáním do `requirements.txt` a instalací pomocí `pip install -r requirements.txt`.
```

Dále je potřeba namapovat url směřující na `MEDIA_URL` do adresáře `MEDIA_ROOT`, kde jsou soubory skutečně uloženy:

```python
# my_project/urls.py
from django.conf import settings
from django.conf.urls.static import static
# ...
if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

```{admonition} Vývojový server
:class: note

Podmíněné mapování pomocí `if settings.DEBUG` je kvůli tomu, aby soubory byly takto dostupné jen v rámci vývojového prostředí. V produkčním prostředí mapování kvůli rychlosti řeší přímo na webovém serveru, jak si ukážeme v pozdějších kapitolách.
```


### Použití v modelu

Upravme si model Book z minulých kapitol tak, aby umožňoval přidání obrázku přebalu knížky:

```python
class Book(models.Model):
    # ...
    cover = models.ImageField(upload_to="books/cover")
```

Parametr `upload_to` u `ImageField` pole (stejně tak u `FileField`) určuje, kam se budou soubory v rámci adresáře `MEDIA_ROOT` ukládat.

Když do modelu přidáte `FileField` nebo `ImageField`, Django admin automaticky poskytne rozhraní pro nahrání souborů.


### Zobrazení souboru ve view

Chcete-li zobrazit soubor v pohledu, můžete použít cestu `url` uloženou v poli `FileField` nebo `ImageField`:

```python
book = Book.objects.get(pk=1)
if book.cover:
    html = f'<img src="{book.cover.url}" alt="{book.title}">'
```

Nebo v šabloně:

```django
<img src="{{ book.cover.url }}" alt="{{ book.title }}">
```

Testování `if book.cover` je vhodné k ověření, že nějaký soubor je k objektu skutečně nahrán. Kromě atributu `url` mají pole `FileField` nebo `ImageField` dostupné také další atributy:

- **`path`**: úplná cesta k souboru
- **`size`**: velikost k souboru v bajtech

Pole `ImageField` mají ještě navíc atributy `width` a `height`, které obsahují rozměry obrázku.


### Nahrání souboru

Pokud chceme vytvořit stránku, kde budou moci návštěvníci nahrávat soubory, které budeme následně ukládat, je potřeba nejprve vytvořit formulář pro nahrání souborů a ten zobrazit na stránce:

```python
class FileUploadForm(forms.Form):
    file = forms.FileField()
```

Formulář pak zpracujeme stejně jako jiné formuláře:

```python
# ...
def upload(request):
    if request.method=="POST":
        form=FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file=request.FILES['file']
            return HttpResponse(f"File {file.name} ({file.size} bytes) uploaded")
    else:
        form=FileUploadForm()
    return render(request, "my_app/upload.html", {"form": form})
```

Další informace o tom, jak pracovat se soubory naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/files/).
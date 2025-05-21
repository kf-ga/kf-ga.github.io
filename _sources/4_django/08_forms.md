Formuláře
=========

* [Návody Django - Formuláře](https://docs.djangoproject.com/en/5.1/topics/forms/)
* [Referenční dokumentace Django - Forms API](https://docs.djangoproject.com/en/5.1/ref/forms/api/)
* [Referenční dokumentace Django - Form fields](https://docs.djangoproject.com/en/5.1/ref/forms/fields/)


Formuláře v Django přinášejí bohatou podporu pro celý životní cyklus formuláře, od vytvoření HTML kódu formuláře po zpracování a kontrolu odeslaných dat.

Třída `forms.Form`
------------------

Třída `forms.Form` v Django je základní třídou pro vytváření formulářů. Odvozením z této třídy a přidáním položek formuláře definujete vlastní formulář (podobně jako se definují v Django modely):

Třídy formulářů se obvykle ukládají do souboru `forms.py` v adresáři aplikace.

```python
# my_app/forms.py
from django import forms

class CommentForm(forms.Form):
    name = forms.CharField(max_length=100)
    rating = forms.IntegerField()
    comment = forms.CharField(widget=forms.Textarea)
```

Django přináší pestrou sadů typů položek formuláře (**fields**), které se hodí pro většinu situací:

- **`CharField`**: vstup pro krátký textový řetězec
- **`IntegerField`**: celočíselný vstup
- **`EmailField`**: vstup pro e-mailové adresy
- **`DateField`**: vstup pro výběr data
- **`BooleanField`**: výběr ano/ne (zaškrtávací políčko)
- **`ChoiceField`**: pro výběr z pevně daných možností

Všechny Fields je možné dále konfigurovat, například u `CharField` je možné [nastavit](https://docs.djangoproject.com/en/5.1/ref/forms/fields/#charfield) `max_length` určující maximální délku zadávaného řetězce, nebo u `IntegerField` je možné [nastavit](https://docs.djangoproject.com/en/5.1/ref/forms/fields/#integerfield) `min_value` a `max_value` definující povolený rozsah hodnot.

Úplný seznam možných položek formuláře, včetně možností jejich konfigurace naleznete v [dokumentaci].(https://docs.djangoproject.com/en/5.1/ref/forms/fields/).

### Společné parametry

Krom parametrů specifických pro každý typ položky [existují parametry](https://docs.djangoproject.com/en/5.1/ref/forms/fields/#core-field-arguments) nastavitelné pro všechny typy. Jsou to zejména:

- **`required`**: zda je pole povinné (výchozí hodnota je `True`)
- **`label`**: popisek pole, který se bude zobrazovat uživateli
- **`initial`**: počáteční hodnota pole
- **`help_text`**: pomocný text, který se zobrazí uživateli

Příklad:

```python
# my_app/forms.py
from django import forms

class CommentForm(forms.Form):
    name = forms.CharField(max_length=100, label="Vaše jméno")
    rating = forms.IntegerField(min_value=1, max_value=10, initial=5, label="Vaše hodnocení")
    comment = forms.CharField(widget=forms.Textarea, label="Váš komentář")
```

Zobrazení formuláře
-------------------

Pro zobrazení formuláře je potřeba vytvořit instanci třídy formuláře, který jsme definovali a vložit ji jako kontext do pohledu:

```python
def book(request, book_id):
    form = CommentForm()
    return render(request, 'comment.html', {'form': form})
```

V šabloně se pak formulář vloží jednoduše jako proměnná kontextu:

```html
<form method="post" action="{% url 'my_app:book' book.id %}">
    {% csrf_token %}
    {{ form.as_div }}
    <button type="submit">Odeslat</button>
</form>
```

Funkce `as_div` transformuje položky formuláře, do HTML kódu, kdy jednotlivé položky jsou odděleny `<div>` elementy. Šablona pak vygeneruje HTML kód, který vypadá nějak takto:

```html
<!-- ... -->
    <div>
        <label for="id_name">Vaše jméno:</label>
        <input type="text" name="name" maxlength="100" required id="id_name">
    </div>
    <div>
        <label for="id_rating">Vaše hodnocení:</label>
        <input type="number" name="rating" value="5" min="1" max="10" required id="id_rating">
    </div>
<!-- ... -->
```

Krom `as_div` je možné použít [další styly formátování](https://docs.djangoproject.com/en/5.1/ref/forms/api/#output-styles).
Značka `{% csrf_token %}` vloží do formuláře speciální token, který slouží k ověření původu formuláře a k ochraně proti útokům typu *[Cross-site request forgery](https://cs.wikipedia.org/wiki/Cross-site_request_forgery)*.


Zpracování formuláře
--------------------

Posledním úkolem v životním cyklu formuláře je zpracování odeslaných dat. To se v Django realizuje v pohledu, kde se přidá větev programu. Vytvořme nejprve model pro ukládání odeslaných dat do databáze:

```python
# my_app/models.py

class Comment(models.Model):
    name = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
```

A následně upravíme kód pohledu tak, aby odeslaná data z formuláře ukládal do databáze. V případě, že uživatel odeslal formulář na dané url (pohled), bude metoda požadavku `POST`, což nám umožní zpracovat odeslaná data:

```python
# my_app/views.py

def book(request, id):
    book = get_object_or_404(Book, id=id)

    if request.method == "POST":
        review_form = ReviewForm(request.POST)
        if review_form.is_valid():
            review = Review()
            review.name = review_form.cleaned_data["name"]
            review.rating = review_form.cleaned_data["rating"]
            review.comment = review_form.cleaned_data["comment"]
            review.book = book
            review.save()
            return HttpResponseRedirect(reverse("my_app:book", args=[book.id]))

    review_form=ReviewForm()
    return render(request, "my_app/book.html", {"book": book, "review_form": review_form})

```
Do formuláře se předá struktura `request.POST`, obsahující "syrová" data požadavku. Třída formuláře tato data načte a ověří. Pokud správně projde validace odeslaných dat formuláře (`form.is_valid()`), bude v objektu formuláře atribut `cleaned_data`, což je slovník s hodnotami formuláře, které uživatel odeslal a se kterými je možné dále nakládat dle potřeby, například je uložit do databáze.

Po úspěšném zpracování následuje zpravidla přesměrování na další stránku (pomocí `HttpResponseRedirect`), například s potvrzením či jinou informací pro uživatele. Přesměrování je nezbytné proto, aby se zabránilo nechtěnému opakovanému odeslání formuláře. Pokud by totiž uživatel dal po odeslání formuláře obnovit stránku v prohlížeči, znamenalo by to opětovné odeslání dat formuláře. Prohlížeče na toto opakované odesílání sice upozorňují ("Confirm form resubmission"), nicméně dobrá webová aplikace by měla takových hlášek uživatele preventivně ušetřit,

### Třída `forms.ModelForm`

Poměrně často se formuláře používají k editaci instance modelu. Pro tyto případy má Django třídu `forms.ModelForm`, kde stačí definovat model (třídu), který chceme editovat a Django už sestaví celý formulář:

```python
class ReviewModelForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'rating', 'comment']
        labels = {
            'name': "Vaše jméno",
            'rating': "Vaše hodnocení",
            'comment': "Váš komentář"
        }
        help_texts = {
            'rating': "Hodnocení musí být celé číslo mezi 1 a 10"
        }
        error_messages = {
            'name': {
                'required': "Jméno je povinné pole"
            }
        }
```

Formulář je možné konfigurovat pomocí vnořené třídy `Meta`, která může mít následující atributy:

- **`fields`** definuje seznam atributů modelu, které chceme zahrnout ve formuláři (ne vždy chceme mít ve formuláři všechny)
- **`exclude`** definuje seznam atributů modelu, které chceme z formuláře vyloučit
- **`labels`** definuje slovník, kde klíče jsou názvy atributů modelu a hodnoty jsou popisky, které se zobrazí ve formuláři
- **`help_texts`** definuje slovník, kde klíče jsou názvy atributů modelu a hodnoty jsou pomocné texty, které se zobrazí ve formuláři
- **`error_messages`** definuje slovník, kde klíče jsou názvy atributů modelu a hodnoty jsou slovníky s chybovými zprávami, které se zobrazí ve formuláři

Následná obsluha formuláře v pohledu se pak zjednoduší:

```python
# my_app/views.py

# ...
    if request.method == "POST":
        review_form = ReviewModelForm(request.POST)
        if review_form.is_valid():
            review = review_form.save(commit=False)
            review.book = book
            review.save()
            return HttpResponseRedirect(reverse("my_app:book", args=[book.id]))
# ...
```

Funkce `review_form.save` uloží obsah formuláře do objektu a vrátí uložený objekt.  Její parametr `commit=False`, že nechceme objekt ještě uložit do databáze, abychom mu mohli nejprve nastavit atribut `book`.


````{admonition} Editační formulář
:class: tip

Formuláře třídy `forms.ModelForm` je možné elegantně využít také k editaci již existujících objektů předáním parametru `instance` při vytváření formuláře:

```python
review=Review.objects.get(pk=review_id)
form = ReviewModelForm(request.POST or None, instance=review)
if request.POST and form.is_valid():
    review=form.save()
    # ...
```

Takto vytvořený formulář bude mít svá pole již předvyplněna hodnotami existujícího objektu. Po odeslání formuláře se existující objekt aktualizuje.
````

Všechny možností práce se třídou `forms.ModelForm` naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/forms/modelforms/).


### Práce s relacemi ve formulářích

Django umožňuje snadno pracovat s databázovými relacemi i ve formulářích. Pro tyto účely se používají formulářová pole `ModelChoiceField`, která umožňují vybrat jednu instanci modelu a hodí se pro 1:N relace, a pole `ModelMultipleChoiceField`, které umožňuje vybrat více instancí modelu v případě relací M:N.

Pro ukázku si můžeme vytvořit formulář pro přidání knihy:

```python
class BookEditForm(forms.Form):
    title = forms.CharField()
    author = forms.ModelChoiceField(queryset=Author.objects.all())
```

Nebo v případě, že chceme vybírat více autorů:

```python
class BookEditForm(forms.Form):
    title = forms.CharField()
    authors = forms.ModelMultipleChoiceField(queryset=Author.objects.all())
```

Formulářová pole `ModelChoiceField` a `ModelMultipleChoiceField` berou parametr `queryset`, což je queryset objektů, který má uživatel na výběr. V querysetu je možné provádět filtrování, řazení a další operace, jak je popsáno v kapitole [](05_models.md).

Na straně zpracování formuláře pak v atributu `cleaned_data` nalezneme rovnou vybraný objekt, který je možné přiřadit jako relaci.

```python
def new_book(request):
    if request.method == 'POST':
        form = BookEditForm(request.POST)
        if form.is_valid():
            book = Book()
            book.title = form.cleaned_data["title"]
            book.published = form.cleaned_data["published"]
            book.author = form.cleaned_data["author"]
            book.save()
            return HttpResponseRedirect(reverse("my_app:books"))
    else:
        form = BookEditForm()

    return render(request, 'my_app/new_book.html', {'form': form})
```

Nebo v případě pole `ModelMultipleChoiceField` pro vybrání více autorů:

```python
    # ...
    book.save()
    book.authors.set(form.cleaned_data["authors"])
    # ...
```

````{admonition} Vytváření relací
:class: warning
Všimněte si, že funkce `book.authors.set` je volána až po zavolání `book.save`. To je kvůli tomu, že relace k objektu lze vytvářet až poté, co je objekt uložen v databázi a má své id. Pokud se pokusíte vytvořit relaci před uložením objektu do databáze, Django vyhodí výjimku.
````

Balíček Crispy Forms
--------------------

Balíček Crispy Forms je oblíbený nástroj v Django pro zobrazování esteticky příjemných a uživatelsky přívětivých formulářů. Tento balíček umožňuje rychlé stylování formulářů a podporuje různé frontend frameworky jako Bootstrap.

### Instalace

Nejprve je potřeba nainstalovat balíček `django-crispy-forms` pomocí nástroje `pip`. Zároveň také nainstalujeme balíček `crispy-bootstrap5`, který umožňuje stylovat formulářové prvky ve frameworku [Bootstrap 5](https://getbootstrap.com):

```bash
pip install django-crispy-forms crispy-bootstrap5
```

Poté je třeba přidat `crispy_forms` a `crispy_bootstrap5` do seznamu `INSTALLED_APPS` ve `settings.py` souboru Django projektu:

```python
# my_project/settings.py

INSTALLED_APPS = [
    # ...
    'crispy_forms',
    'crispy_bootstrap5',
    # ...
]
```
Dále je potřeba v souboru `settings.py` nastavit výchozí šablonu:

```python
# my_project/settings.py

# ...
CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = 'bootstrap5'
```

### Třída `FormHelper`

`FormHelper` je třída v Crispy Forms, která umožňuje konfiguraci zobrazení formulářů. Pomocí ní lze definovat layout, styly, a další vlastnosti formulářů. Nabízí několik základních konfiguračních proměnných:

- **`form_method`**: Určuje HTTP metodu formuláře (např. `'post'`, `'get'`).
- **`form_action`**: Url formuláře, kam mají být data odeslána. Odpovídá atributu `action` u tagu `<form>`, může být prázdný; formulář se pak odesílá na stejnou url, na které je zobrazen.
- **`form_tag`**: Boolean hodnota určující, zda má být formulář obalen tagem `<form>`.
- **`layout`**: Objekt, který definuje, jak jsou pole formuláře uspořádány.

```python
# my_app/forms.py

# ...
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Row, Field, Submit

class CommentForm(forms.Form):
    name = forms.CharField(max_length=100)
    rating = forms.IntegerField()
    comment = forms.CharField(widget=forms.Textarea)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        
        self.helper.layout = Layout(
            Row(
                Field('name'),
                Field('rating'),
                Field('comment'),
            ),
            Submit('submit', 'Submit', css_class='btn-primary')
        )        
```

V šabloně se pak formulář zobrazí pomocí tagu `{% crispy form form.helper %}`, který je ale potřeba nejprve načíst pomocí `{% load crispy_forms_tags %}` na začátku šablony:

```django
{% load crispy_forms_tags %}

<!-- ... -->

{% crispy form form.helper %}

<!-- ... -->
```

Povšimněte si, že není potřeba obalovat celý formulář do `<form>` tagu. Rovněž CSRF token je přidán automaticky.

Balíček `crispy_forms` nabízí celou řadu možností jak jak formulář konfigurovat. Jejich úplný výčet naleznete v [dokumentaci](https://django-crispy-forms.readthedocs.io/en/latest/).
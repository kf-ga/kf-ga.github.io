Pohledy
=======

* [Django tutoriál](https://docs.djangoproject.com/en/5.1/intro/tutorial01/)
* [Django dokumentace - pohledy](https://docs.djangoproject.com/en/5.1/topics/http/views/)
* [Django dokumentace - url](https://docs.djangoproject.com/en/5.1/topics/http/urls/)


Architektura Django aplikace
----------------------------

**MVC** (**Model-View-Controller**) je architektonický návrhový vzor používaný zejména pro tvorbu webových stránek pro rozdělení aplikace do tří hlavních logických komponent:

- **Model** reprezentuje strukturu dat, pravidla a logiku aplikace. Zpravidla implementován jako třída. Model může být například uživatel nebo článek.
- **View** je část zodpovědná za prezentaci dat a interakci s uživatelem.
- **Controller** řídí interakci mezi Model a View, zpracovává vstupy uživatele a volá aktualizace Model a View.

V Django přebírá velkou část roli komponenty Controller samotný Django framework. V Django frameworku proto hovoříme o architektuře **MVT** (**Model-View-Template**):

- **Model** zůstává stejný, reprezentuje data a jejich logiku.
- **View** (pohled) v Django přebírá některé role komponenty Controller z MVC a reprezentuje pohled na na data (na Model).
- **Template** (šablona) je textový soubor, který definuje strukturu stránky nebo její části obvykle pomocí HTML rozšířených o speciální značky.

Rozdělení projektu na tyto logické části umožňuje jednodušší správu a údržbu kódu při vývoji webové aplikace. Každá komponenta má svůj specifický účel a mění se nezávisle na ostatních. Usnadňuje také práci na projektu pro větší týmy, kdy se část týmu může věnovat vnitřní logice aplikace (Model), část způsobu prezentace uživateli (View) a část vizuální stránce a designu aplikace (Template). Díky rozdělení může každá část pracovat více nezávisle na zbytku týmu.


View a URL
----------

Views jsou definovány v souboru `views.py` každé Django aplikace. Z hlediska frameworku Django je pohled (View) funkcí, která převezme jako parametr objekt `request` (instance třídy `HttpRequest`), který obsahuje detailní informace o HTTP požadavku (jeho použití si probereme později) a vrací objekt třídy `HttpResponse` (případně třídy z ní odvozené), který obsahuje data, která se budou prezentovat uživateli a další metadata HTTP protokolu, které si také probereme později. Dva jednoduché pohledy `index` a `hello` mohou vypadat například takto:

```python
# my_app/views.py

from django.http import HttpResponse

def index(request):
    return HttpResponse("Homepage")

def hello(request):
    return HttpResponse("Hello, World!")
```

```{admonition} Co to je HTTP?
:class: note
Detailům **HTTP** protokolu se budeme věnovat v pozdějších kapitolách, pro začátek stačí vědět, že HTTP (**HyperText Transfer Protocol**) je základní protokol pro komunikaci na webu. Umožňuje přenos dat mezi webovými prohlížeči (klienty) a servery.

Funguje na principu **HTTP požadavků** (**HTTP Request**) a **HTTP odpovědí** (**HTTP Response**). Klient (např. webový prohlížeč) pošle HTTP požadavek na server, který zpracuje tento požadavek a pošle zpět odpověď obsahující požadované informace (např. HTML stránku, obrázky, data apod.).
```

Pro mapování pohledů na URL používá Django soubor `urls.py`, kde se každé URL adrese přiřadí pohled, který má HTTP požadavek na toto URL zpracovat. Spojování URL adres s obslužnou funkcí se také někdy označuje jako **routing**.

Vzhledem k tomu, že aplikace by měly být v Django frameworku navrhovány tak, aby byly případně znovupoužitelné v jiném projektu (což se týká i struktury URL dané aplikace), obvykle se se definují URL specifické pro aplikaci v souboru `urls.py` aplikace (tento soubor není automaticky vytvořen):


```python
# my_app/urls.py

from django.urls import path
from . import views

app_name="my_app"
urlpatterns = [
    path('', views.index, name='index'),
    path('hello/', views.hello, name='hello'),
]
```

Tyto URL se pak jako celek namapují na jedno konkrétní URL v rámci celého Django projektu v hlavním souboru `urls.py` projektu:

```python
# my_project/urls.py

from django.urls import include, path

urlpatterns = [
    path("my_app/", include("my_app.urls")),
]
```

Takto vzniknou v projektu `my_project` dvě URL:

- `/my_app/` které se mapuje na funkci `index`
- `/my_app/hello/` které se mapuje na funkci `hello`

Pokud chcete změnit "adresář", kde se celá aplikace v rámci projektů nachází, stačí tak udělat na jednom místě. 

```{admonition} Projekt a aplikace
:class: warning
Připomeňme si rozdíl mezi **Django projektem** a **Django aplikací**. Django aplikace je část Django projektu, která řeší nějakou část vaší webové aplikace a v zásadě je navržena tak, aby mohla být použita ve více projektech. Django projekt je kolekcí jedné či více Django aplikací.
```

### Parametrizace pohledu

Často je ve webové aplikaci nutné mít nějakou část URL dynamickou, například pokud chcete zobrazit jeden konkrétní článek, nebo zobrazit kalendář pro konkrétní datum. Bylo by nepraktické definovat explicitně všechny možné kombinace URL a proto nabízí Django framework možnost URL parametrizovat speciálními argumenty v ostrých závorkách `<>`:

```python
# my_app/urls.py

urlpatterns = [
    # ...
    path('say/<str:my_name>', views.say, name='say'),
    # ...
]
```

Tyto parametry v URL Django automaticky zpracuje a předá jako další argument do funkce pohledu:

```python
# my_app/views.py

def say(request, my_name):
    return HttpResponse(f"You are {my_name}")
```

Pokud tedy zobrazíte url např. `/say/John` v prohlížeči, Django automaticky předá argument `"John"` funkci `say` a vrátí odpověď `"You are John"`.

Django podporuje několik datových typů v URL:

- **`str`**: Textový řetězec, kromě znaku `/`.
- **`int`**: Celé číslo.
- **`slug`**: "Slug" řetězec, tedy řetězec alfanumerických znaků, pomlčky `-` a podtržítka `_`. Tyto řetězce se často používají v URL kvůli snadné čitelnosti URL.

Jejich úplný seznam a návod jak definovat vlastní typy parametrů naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/http/urls/).


### Reverzní sestavení URL

V aplikaci často potřebujete vytvořit URL, odkazující na jinou stránku aplikace. Django framework umožňuje snadno vytvářet tyto URL pomocí funkce `reverse` (reverzní sestavení URL):

```python
from django.urls import reverse

# ...
url = reverse('my_app:hello')
link = f'<a href="{url}">Say hello</a>'
# ...
```

To je užitečné, protože pokud změníte mapování URL v aplikaci, nebo přesunete celou aplikaci na jiné URL, stačí to změnit jen na jednom místě v souboru `urls.py` a nemusíte procházet celý projekt a zjišťovat kde všude se URL vyskytuje. Argumentem funkce `reverse` je identifikátor URL, což je pár `app_name` (v souboru `views.py` aplikace) a jména URL (parametr `name` funkce `path` ve `views.py` aplikace) spojených dvojtečkou `:`.

Pokud jsou URL parametrizované, musíte funkci `reverse` předat také parametry, které se do URL dosadí:

```python
# ...
url = reverse('my_app:say', args=["John"])
link = f'<a href="{url}">Are you John?</a>'
# ...
```

### Výchozí parametry

Parametry v pohledu je možné doplnit o výchozí hodnotu:

```python
def say(request, my_name=None):
    if my_name:
        return HttpResponse(f"You are {my_name}")
    else:
        return HttpResponse(f"I don't know who you are")
```
V souboru `urls.py` je pak možné stejným pohledem obsluhovat i URL, které parametr nemá:

```python
    path("say/", views.say),
    path("say/<str:my_name>/", views.say),
```

Další možnosti, jak pracovat v Django s pohledy naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/http/views/).
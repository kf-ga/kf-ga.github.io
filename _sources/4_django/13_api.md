API
===

API (Application Programming Interface) je sada pravidel a rozhraní, která umožňuje komunikaci mezi aplikacemi. API poskytuje definovaný způsob, jak mohou aplikace požadovat a získávat data nebo funkce od jiné aplikace, služby nebo systému. API nepoužívají přímo lidé, ale jiné aplikace nebo software, což umožňuje propojení různých systémů a aplikací do komplexnějších celků.

API zpřístupňuje vaši aplikaci, její funkcionalitu a/nebo data dalším vývojářům, a mohou tak vaši aplikaci dále rozvíjet. API je dnes nezbytnou součástí většiny moderních webových služeb.

Klasické webové stránky jsou optimalizovány k tomu, aby se v nich dobře a intuitivně orientovali lidé, zatímco API lze chápat jako rozhraní, ve kterém se snadno orientují aplikace.

REST API
--------

REST (Representational State Transfer) je architektonický styl pro vytváření webových API. REST definuje způsob, jakým mohou klienti komunikovat se servery pomocí standardních HTTP metod. REST API je dnes standardní způsob (nikoliv však jediný), jak implementovat API webových aplikací.

### Základní principy REST API:

1. **Resource-based**: API pracuje se zdroji (např. uživatelé, knihy), které jsou identifikovány pomocí URL.
2. **HTTP metody**: API je postavené nad HTTP protokolem a pracuje se standardními HTTP požadavky. Krom metod `GET` a `POST`, které se obvykle používají, pracuje REST API i s dalšími HTTP metodami.
   - `GET`: Načtení zdroje.
   - `POST`: Vytvoření nového zdroje.
   - `PUT`: Aktualizace existujícího zdroje.
   - `DELETE`: Smazání zdroje.
3. **Stateless**: Bezestavovost, každý požadavek od klienta obsahuje veškeré informace potřebné k jeho vyřízení. 
4. **Formát dat**: Data jsou obvykle poskytována ve formátu JSON, případně ve formátu XML.
5. **Kódy odpovědí**: REST API používá standardní HTTP status kódy (`200 OK`, `404 Not Found`, `500 Internal Server Error` atd.).


### Implementace REST API v Django

Existuje celá řada knihoven pro zjednodušení práce při vytváření API rozhraní v Django projektech, nicméně pro lepší pochopení si ukážeme jak udělat základní API bez pomocných knihoven.

Předpokládejme modely Author a Book, které jsme vytvářeli v minulých kapitolách. Pro vytvoření rozhraní (**API endpoint**), které nám vrátí seznam autorů nejprve vytvoříme pohled:

```python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Author, Book
import json

def api_authors(self, request):
    authors = Author.objects.all()
    data = [
        {
            "id": author.id,
            "first_name": author.first_name,
            "last_name": author.last_name,
        }
        for author in authors
    ]
    return JsonResponse(data)
```

Který pak jednoduše namapujeme na nějaké URL:

```python
from django.urls import path
from .views import api_authors

urlpatterns += [
    path('api/authors/', api_authors(), name='api_authors'),
]
```

API tak vlastně není nic jiného, než pohled namapovaný na URL, který místo HTML stránky vrací JSON obsahující pouze data o objektu nebo objektech. Pro testování stačí v prohlížeči zobrazit příslušný API endpoint, tedy například /api/authors/, nebo API můžeme vyzkoušet například pomocí rozšíření VSCode *REST Client*, které umožňuje zasílat API požadavky přímo z IDE.

### Práce s relacemi v API

Můžeme vytvořit také API endpoint pro získání knih konkrétního autora:

```python
def api_books_by_author(request, author_id):
    author = get_object_or_404(Author, id=author_id)
    books = Book.objects.filter(author=author)
    data = [
        {
            "id": book.id,
            "title": book.title,
        }
        for book in books
    ]
    return JsonResponse(data)

```
A namapovat na konkrétní URL:

```python
urlpatterns += [
    path('api/authors/<int:author_id>/books/', api_books_by_author, name='api_books_by_author'),
]
```

### Vkládání objektů pomocí API

Zkusme implementovat vkládání nových komentářů ke knize pomocí API:

```python
@csrf_exempt
def api_reviews_by_book(request, book_id):
    if request.method == 'GET':
        book = get_object_or_404(Book, id=book_id)
        reviews = book.reviews.all()
        data = [
            {
                "id": review.id,
                "name": review.name,
                "rating": review.rating,
                "comment": review.comment,
            }
            for review in reviews
        ]
        return JsonResponse(data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        book = get_object_or_404(Book, id=book_id)
        review = Review.objects.create(
            name=data['name'],
            rating=data['rating'],
            comment=data['comment'],
            book=book
        )
        return JsonResponse({
            "id": review.id,
            "name": review.name,
            "rating": review.rating,
            "comment": review.comment,
        }, status=201)
```

```python
urlpatterns += [
    path('api/books/<int:book_id>/reviews/', api_reviews_by_book, name='api_reviews_by_book'),
]
```


### Načtení seznamu autorů a jejich knih
**Endpoint**: `/api/authors/`

**Odpověď** (JSON):
```json
[
    {
        "id": 1,
        "name": "J.K. Rowling",
    },
    {
        "id": 2,
        "name": "George R.R. Martin",
    }
]
```

### Načtení seznamu všech knih
**Endpoint**: `/api/books/`

**Odpověď** (JSON):
```json
[
    {"id": 1, "title": "Harry Potter and the Philosopher's Stone", "author": "J.K. Rowling"},
    {"id": 2, "title": "Harry Potter and the Chamber of Secrets", "author": "J.K. Rowling"},
    {"id": 3, "title": "A Game of Thrones", "author": "George R.R. Martin"},
    {"id": 4, "title": "A Clash of Kings", "author": "George R.R. Martin"}
]
```

### Načtení seznamu knih od konkrétního autora
**Endpoint**: `/api/authors/1/books/`

**Odpověď** (JSON):
```json
[
    {"id": 1, "title": "Harry Potter and the Philosopher's Stone"},
    {"id": 2, "title": "Harry Potter and the Chamber of Secrets"}
]
```


Cookies, sessions a uživatelé
=============================

* [Django dokumentace - uživatelé](https://docs.djangoproject.com/en/5.1/topics/auth/)

**Sessions** jsou způsob, jak webové aplikace udržují stav mezi jednotlivými požadavky HTTP, které jsou samy o sobě bezstavové. Session umožňuje serveru uchovávat informace o konkrétním uživateli nebo návštěvníkovi stránky (například ID uživatele, jeho preference, přihlášení nebo jiná data) po dobu trvání návštěvy nebo delší časový úsek. 

**Cookie** jsou krátká textová data, která webový server ukládá na zařízení uživatele. Tato data mohou být použita k identifikaci uživatele nebo sledování jeho aktivit na webu. Cookies mohou obsahovat informace jako uživatelské preference, stav přihlášení apod.. V kontextu sessions se cookies často používají k ukládání session ID, které serveru umožňuje rozpoznat uživatele mezi jednotlivými HTTP požadavky.

Django a správa uživatelů
-------------------------

Django obsahuje aplikaci pro správu uživatelů (`django.contrib.auth`), která zajišťuje robustní funkcionalitu pro správu uživatelů jako například jejich přihlašování a odhlašování nebo správu práv a rolí. Tuto aplikaci využívá Django admin rozhraní k přihlašování, ale můžete ho využít také ve své stránce. V admin rozhraní máte možnost vyvářet a editovat uživatele a přidělovat jim různá oprávnění, která můžete ve své webové aplikaci využít. 

### Přihlašovací formulář

Pokud chceme na web přidat možnost přihlašování pro uživatele, je potřeba nejprve vytvořit přihlašovací formulář. Ten funguje podobně jako jiné formuláře, jak jsme si ukázali v minulých kapitolách:

```python
# my_app/forms.py

class LoginForm(forms.Form):
    username = forms.CharField(label='Uživatelské jméno', max_length=100)
    password = forms.CharField(label='Heslo', widget=forms.PasswordInput)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Field('username'),
                Field('password'),
            ),
            Submit('submit', 'Přihlásit se', css_class='btn-primary')
        )   
```
Formulář obsahuje dvě pole pro uživatelské jméno a heslo. Pro atraktivnější vzhled můžeme využít Crispy forms. Formulář vložíme do pohledu a šablony a namapujeme na url:

```python
# my_app/views.py
from django.contrib.auth import authenticate, login
from .forms import LoginForm

def login_view(request):
    form = LoginForm(request.POST)
    if request.method == 'POST' and form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('my_app:login'))
        else:
            return render(request, 'my_app/login.html', {'form': form, 'error': 'Neplatné přihlašovací údaje'})
    else:
        form = LoginForm()
        return render(request, 'my_app/login.html', {'form': form})

```

```python
# my_app/urls.py

urlpatterns += [
    path('login/', views.login_view, name='login'),
]
```

Obsluha přihlášení ve view se realizuje pomocí funkcí `authenticate` a `login` z balíčku `django.contrib.auth`. V objektu request je k dispozici atribut `user`, který obsahuje objekt modelu `User` aktuálně přihlášeného uživatele a pomocí kterého lze testovat, je-li uživatel přihlášen, či nikoliv:

```python
if request.user.is_authenticated:
    # ...
```

### Odhlášení uživatele

Pro odhlášení uživatele v Django použijeme funkci `logout` z balíčku `django.contrib.auth`. Tato funkce odstraní session a odhlásí uživatele. Můžeme například přidat větev do pohledu `login_view`, která v případě, že uživatel je již přihlášen uživatele odhlásí.

```python
# my_app/views.py

from django.contrib.auth import logout

def login_view(request):
    if request.user.is_authenticated:
        form = LogoutForm(request.POST)
        if request.method == 'POST' and form.is_valid():
            logout(request)
            return HttpResponseRedirect(reverse('my_app:login'))
        else:
            form = LogoutForm()
            return render(request, 'my_app/login.html', {'form': form, 'user': request.user})

    else:
        #  ...
```

Formulář pro odhlášení je ve skutečnosti prázdný formulář, který jen odešle POST požadavek na pohled `login_view`:

```python
class LogoutForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Submit('submit', 'Odhlásit se', css_class='btn-primary')
        )     
```
Samotná šablona pak může vypadat třeba takto:

```django
<!-- ... -->

{% if user.is_authenticated %}
    <div class="alert alert-success" role="alert">
        Jste přihlášen jako {{ user.username }}.
    </div>
{% endif %}
{% if error %}
    <div class="alert alert-danger" role="alert">
        {{ error }}
    </div>
{% endif %}
{% crispy form %}

<!-- ... -->
```

Role a práva uživatelů
----------------------

Django podporuje **skupiny** (**`Group`**), které sdružují uživatele a přiřazují jim společná práva. **Práva** (**Permissions**) určují, jaké operace může uživatel dělat. Skupiny i práva je možné editovat v admin rozhraní.

V pohledech můžete testovat přihlášení uživatele a práva pomocí atributu `user` objektu `request`, který obsahuje informace o aktuálně přihlášeném uživateli. Zkusme v admin rozhraní vytvořit skupinu *Moderátoři*, které přiřadíme právo *Can delete Recenze*, tedy skupinu uživatelů, kteří budou moci mazat objekty třídy `Review`. V šabloně pro zobrazení recenzí pak zobrazíme u každé recenze jednoduchý formulář s tlačítkem *Smazat*, pokud má aktuálně přihlášený uživatel potřebné právo ke smazání:

```django
<!-- ... -->

{% for review in book.reviews.all %}
    <div>
        <p><strong>Jméno:</strong> {{ review.name }}</p>
        <p><strong>Hodnocení:</strong> {{ review.rating }}</p>
        <p>{{ review.comment }}</p>

        {% if perms.my_app.delete_review %}
            <form action="{% url 'my_app:book' book.id %}" method="post" class="d-inline">
                {% csrf_token %}
                <input type="hidden" name="review_id" value="{{ review.id }}">
                <button type="submit" class="btn btn-danger">Odstranit</button>
            </form>
        {% endif %}
    </div>
{% endfor %}

<!-- ... -->
```

Proměnná perms obsahuje informace o právech aktuálně přihlášeného uživatele. Více jejích možnostech a jak proměnnou perms v šablonách používat naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/auth/default/#permissions). Na straně pohledu pak odeslaný formulář obsloužíme:

```python
if "review_id" in request.POST:
    review = get_object_or_404(Review, id=request.POST["review_id"])
    if request.user.has_perm('my_app.delete_review'):
        review.delete()
        return HttpResponseRedirect(reverse("my_app:book", args=[book.id]))
    else:
        return HttpResponseForbidden("Nemáte oprávnění mazat recenze")
```

Uživatel má dostupnou metodu `has_perm`, pomocí které lze kontrolovat, zda-li má aktuální uživatel právo. Detailní informace o všech možnostech přihlašovacího systému v Django naleznete naleznete v [dokumentaci](https://docs.djangoproject.com/en/5.1/topics/auth/).


Práce s cookies
---------------

Kromě vestavěné aplikace `django.contrib.auth`, která nabízí hotovou logiku pro správu uživatelů, je možné pracovat také přímo s cookies.

### Nastavení cookie

Pro nastavení cookie použijte metodu `set_cookie` na objektu `HttpResponse`:

```python
from django.http import HttpResponse

def set_cookie_view(request):
    response = HttpResponse("Cookie was set")
    response.set_cookie('my_cookie', 'cookie_value', max_age=3600)
    return response
```
Parametr `max_age` určuje dobu platnosti cookie v sekundách.

### Čtení cookie

Pro čtení cookie použijte objekt `request.COOKIES`:

```python
def get_cookie_view(request):
    cookie_value = request.COOKIES.get('my_cookie')
    if cookie_value:
        return HttpResponse(f'Hodnota cookie: {cookie_value}')
    else:
        return HttpResponse('Cookie nenalezena')
```

### Mazání cookie

Pro smazání cookie použijte metodu `delete_cookie` na objektu `HttpResponse`:

```python
def delete_cookie_view(request):
    response = HttpResponse("Cookie smazána")
    response.delete_cookie('my_cookie')
    return response
```

### Cookie a HTTP hlavičky

Cookies jsou odesílány a přijímány jako HTTP hlavičky `Cookie`. HTTP požadavek obsahující cookie může vypadat například takto:

```
GET / HTTP/1.1
Host: www.example.com
Cookie: session_id=38afes7a8; my_cookie=cookie_value
```

V tomto příkladu jsou HTTP požadavku dvě cookies: `session_id` a `my_cookie`. Každá cookie je oddělena středníkem a mezerou. Server může v HTTP odpovědi nastavit cookie pomocí HTTP hlavičky `Set-Cookie`:

```
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: my_cookie=cookie_value; Max-Age=3600; Path=/
```

V tomto příkladu server odpovídá s HTTP status kódem 200 (OK) a nastavuje cookie `my_cookie` s hodnotou `cookie_value`, která bude platná po dobu 1 hodiny (3600 sekund) a bude dostupná na celé doméně (`Path=/`).


OAuth
-----

**OAuth** (Open Authorization) je standardní protokol, který umožňuje bezpečný přístup k uživatelským datům bez nutnosti sdílení přihlašovacích údajů. OAuth umožňuje aplikacím třetích stran získat omezený přístup k chráněným zdrojům na serveru jménem uživatele. OAuth poskytuje většina velkých internetových hráčů jako Google, Facebook, Microsoft aj. a umožňuje svým uživatelům využít své přihlašovací údaje i na jiných webových stránkách.

### Přihlášení pomocí Google účtu v Django

Pro implementaci přihlášení pomocí Google účtu v Django můžete použít balíček `social-auth-app-django`. Tento balíček poskytuje snadnou integraci s různými poskytovateli OAuth. Pomocí následující postupu můžete ve své aplikaci nastavit přihlašování pomocí Google účtu:

1. **Instalace balíčku**

    Nejprve nainstalujte balíček pomocí `pip`:

    ```bash
    pip install social-auth-app-django
    ```

2. **Konfigurace Django aplikace**

    Přidejte `social_django` do `INSTALLED_APPS` ve vašem `settings.py`:

    ```python
    # my_project/settings.py

    INSTALLED_APPS = [
        # ...
        'social_django',
        # ...
    ]
    ```

3. **Přidejte middleware**

    ```python
    # my_project/settings.py

    MIDDLEWARE = [
        # ...
        'social_django.middleware.SocialAuthExceptionMiddleware',
        # ...
    ]
    ```
    
    ```{admonition} Co je to middleware?
    :class: note
    Middleware je v Django komponenta, která se nachází mezi webovým serverem a vaší aplikací. Může například provádět autentizaci, logování, úpravy požadavků nebo odpovědí a další operace, které je potřeba provést před nebo po zpracování požadavku aplikací v pohledu.
    ```

4. **Přidejte autentizační backendy**

    ```python
    # my_project/settings.py
   
    AUTHENTICATION_BACKENDS = (
        'django.contrib.auth.backends.ModelBackend',
        'social_core.backends.google.GoogleOAuth2',
    )
    ```
    Django podporuje více autentizačních knihoven najednou. Toto nastavení umožní používat zároveň přihlašování pomocí výchozího Django systému pro správu uživatelů (`django.contrib.auth.backends.ModelBackend`), tak přihlašování pomocí Google OAuth (`social_core.backends.google.GoogleOAuth2`).

    Balíček `social-auth-app-django` podporuje mnoho různých poskytovatelů. Mezi nejčastěji používané patří:

    - **Google**: `social_core.backends.google.GoogleOAuth2`
    - **Facebook**: `social_core.backends.facebook.FacebookOAuth2`
    - **Twitter**: `social_core.backends.twitter.TwitterOAuth`
    - **GitHub**: `social_core.backends.github.GithubOAuth2`
    - **LinkedIn**: `social_core.backends.linkedin.LinkedinOAuth2`
    - **Microsoft**: `social_core.backends.microsoft.MicrosoftOAuth2`

    Pro úplný seznam podporovaných backendů a jejich konfiguraci navštivte [dokumentaci social-auth-app-django](https://python-social-auth.readthedocs.io/en/latest/backends/index.html).


5. **Nastavte URL pro přesměrování po přihlášení a odhlášení**

    ```python
    # my_project/settings.py

    LOGIN_REDIRECT_URL = '/'
    LOGOUT_REDIRECT_URL = '/'
    ```

6. **Nastavte klíče pro Google OAuth2**

    ```python
    # my_project/settings.py

    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '<your-client-id>'
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '<your-client-secret>'
    ```

    Pro získání Google OAuth2 klíče a tajného klíče postupujte podle následujících kroků:

    1. **Vytvoření projektu v Google Developers Console**

        - Přejděte na [Google Developers Console](https://console.developers.google.com/).
        - Přihlaste se pomocí svého Google účtu.
        - Klikněte na tlačítko "Select a project" a poté na "New Project".
        - Zadejte název projektu a klikněte na "Create".

    2. **Povolení Google OAuth2 API**

        - V levém menu vyberte "Library".
        - Vyhledejte "Google+ API" a klikněte na něj.
        - Klikněte na tlačítko "Enable".

    3. **Vytvoření OAuth 2.0 přihlašovacích údajů**

        - V levém menu vyberte "Credentials".
        - Klikněte na tlačítko "Create Credentials" a vyberte "OAuth Client ID".
        - Vyplňte požadované informace (např. název aplikace, e-mail podpory).
        - Zadejte název klienta (např. "Django App").
        - Do pole "Authorized redirect URIs" přidejte URL, na kterou bude Google přesměrovávat po úspěšném přihlášení (např. `http://127.0.0.1:8000/oauth/complete/google-oauth2/` pro aplikaci provozovanou na lokálním vývojovém serveru).
        - Klikněte na "Create".

    4. **Získání klíče a tajného klíče**

        - Po vytvoření přihlašovacích údajů se zobrazí váš `Client ID` a `Client Secret`.


7. **Konfigurace URL**

    Přidejte URL pro OAuth autentizaci do vašeho `urls.py`:

    ```python
    # my_project/settings.py

    urlpatterns = [
        # ...
        path('oauth/', include('social_django.urls', namespace='social')),
        # ...
    ]
    ```

8. **Šablony pro přihlášení**

    Přidejte odkaz na přihlášení pomocí Google účtu do vaší šablony:

    ```html
    <a href="{% url 'social:begin' 'google-oauth2' %}">Přihlásit se pomocí Google</a>
    ```

9. **Migrace databáze**

    Proveďte migraci databáze:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

Nyní by mělo přihlášení fungovat. Po úspěšném přihlášení pomocí OAuth můžete zjistit, zda je uživatel přihlášen, a získat jeho jméno a e-mail pomocí opět pomocí objektu `request.user`:

```python
from django.shortcuts import render

def my_view(request):
    if request.user.is_authenticated:
        user = request.user
        name = user.get_full_name() 
        email = user.email
    # ...
```


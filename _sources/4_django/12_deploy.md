Produkční prostředí
===================

* [Dokumentace Django - deployment](https://docs.djangoproject.com/en/5.1/howto/deployment/)
* [Dokumentace Django - deployment checklist](https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/)
* [Návod na spuštění ve službě Google Cloud](https://cloud.google.com/python/django/appengine)
* [Návod na spuštění na Gyarab SVS](https://gist.github.com/kristiankunc/cc58b0d963d3a528f184c8863ce7a5fd)


Doposud jsme vyvíjeli Django aplikaci na vývojovém serveru, který se spouští příkazem 

```sh
python manage.py runserver
```

Vývojový server je navržen tak, aby se s jeho pomocí aplikace snadno a rychle vyvíjela. Automaticky například detekuje změny v Python modulech, šablonách, poskytuje statické soubory a media soubory atd.. Není ale zejména kvůli výkonu a bezpečnosti vhodný při nasazení v ostrém provozu (produkční prostředí).

Před spuštěním Django aplikace v produkčním prostředí je potřeba provést následující kroky:

1. **Vypnutí debug módu**
    V souboru `settings.py` projektu vypněte debug mód:

    ```python
    # my_project/settings.py

    DEBUG = False
    ```

    Vypnutí debug módu má například následující důsledky na chod aplikace:

    - **Chybové hlášky**: Django zobrazí uživatelsky přívětivé chybové stránky místo podrobných chybových zpráv, které jsou určeny pro vývojáře.

    - **Bezpečnost**: Podrobné chybové zprávy, které jsou zobrazeny při zapnutém debug módu, mohou odhalit citlivé informace o vaší aplikaci. Nastavení `DEBUG = False` zvyšuje bezpečnost tím, že tyto informace skryje.
    
    - **Statické soubory**: Django nebude automaticky obsluhovat statické soubory. V produkčním prostředí by měly být statické soubory obsluhovány webovým serverem, jako je Nginx nebo Apache.

    - **Výkon**: Některé optimalizace a cache jsou aktivovány pouze při `DEBUG = False`, což může zlepšit výkon vaší aplikace.

2. **Nastavení `ALLOWED_HOSTS`**

    Dále musíte nastavit `ALLOWED_HOSTS`, což je seznam domén, které mohou obsluhovat vaši aplikaci. Pokud není správně nastaven, Django odmítne požadavky z neznámých domén.

    ```python
    # my_project/settings.py

    ALLOWED_HOSTS = ['example.com']
    ```

3. **Statické soubory**
    
    Před nasazením aplikace do produkčního prostředí je potřeba připravit statické soubory. Nejprve se ujistěte, že máte nastaven adresář `STATIC_ROOT`, kde bude webový server statické soubory hledat:

    ```python
    # my_project/settings.py

    STATIC_ROOT = BASE_DIR / 'static'
    ```

    Dále spusťte příkaz `collectstatic`, který zkopíruje všechny statické soubory do adresáře `STATIC_ROOT`:

    ```sh
    python manage.py collectstatic
    ```

4. **Media soubory**

    Media soubory jsou soubory nahrané uživateli, jako jsou obrázky, videa nebo dokumenty. Tyto soubory by měly být uloženy v adresáři, který je přístupný webovým serverem. Zkontrolujte proto nastavení `MEDIA_ROOT` v konfiguračním souboru `settings.py`:

    ```python
    # my_project/settings.py

    MEDIA_ROOT = BASE_DIR / 'media'
    ```

5. **Nastavení `SECRET_KEY`**:
    
    `SECRET_KEY` je důležité nastavení v Django projektu, které se používá se pro různé kryptografické operace, jako je podepisování cookies, generování bezpečnostních tokenů a další bezpečnostní funkce. Klíč `SECRET_KEY` by měl být dostatečně dlouhý, náhodný řetězec. Je důležité, aby byl tento klíč tajný a unikátní pro každý projekt.

    ```python
    # my_project/settings.py

    SECRET_KEY = 'some-long-random-string'
    ```

    Nikdy nesdílejte svůj `SECRET_KEY` veřejně a nepoužívejte výchozí hodnotu v produkčním prostředí.

Úplný seznam nastavení, která je vhodné před ostrým spuštěním zkontrolovat, naleznete [dokumentaci](https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/). Můžete také spustit příkaz

```sh
python manage.py check --deploy
```

který zkontroluje zda-li je nastavení aplikace připraveno pro ostrý provoz a vypíše případné problémy.

Nyní když máme aplikaci připravenu, můžeme ji spustit v produkčním prostředí. Možností jak a kde Django aplikaci spustit existuje celá řada, pojďme si některé ukázat.

NGINX + gunicorn + PostgreSQL
-----------------------------

Kombinace webového serveru [NGINX](https://nginx.org/), webového serveru [gunicorn](https://gunicorn.org/) a databáze [PostgreSQL](https://www.postgresql.org/) je oblíbenou kombinací pro ostrý provoz Django projektů na linuxových distribucích.

### NGINX

NGINX je populární a výkoný webový server, který lze použít i po běh Django aplikací. Pro instalaci serveru NGINX na debian based linux distribucích použijte příkazy:

```sh
sudo apt update
sudo apt install nginx
```

Dále vytvořte nový konfigurační soubor pro váš projekt v `/etc/nginx/sites-available/`:

```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://unix:/tmp/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /path/to/your/project/static/;
    }

    location /media/ {
        alias /path/to/your/project/media/;
    }
}
```

Doménu `example.com` upravte podle toho, kde budete chtít aplikaci provozovat. Dále nastavte správné cesty k vašim media a static souborům. Konfigurační soubor je potřeba ještě aktivovat vytvořením odkazu ve složce `/etc/nginx/sites-enabled/` a restartováním webového serveru nginx:

```sh
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

Více informací o konfiguraci NGINX serveru naleznete v [dokumentaci](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/).

### gunicorn

Dále je potřeba spustit samotnou Django aplikaci, což lze udělat pomocí serveru gunicorn, který umí Django aplikace spouštět pomocí rozhraní [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface) rozhraní. 

Nejprve se ujistěte, že máte gunicorn nainstalovaný:

```sh
pip install gunicorn
```

A poté spusťte aplikaci pomocí `gunicorn` z adresáře projektu:

```sh
gunicorn --workers 3 --bind unix:/tmp/gunicorn.sock my_project.wsgi:application 
```

Nebo pokud potřebujete pustit `gunicorn` na TCP portu místo unix soketu použijte příkaz

```sh
gunicorn --workers 3 --bind :12345 my_project.wsgi:application 
```

Kde `12345` je číslo portu, na kterém má `gunicorn` poslouchat.



```{admonition} Změny v projektu
:class: tip

Server gunicorn na rozdíl od Django vývojového serveru nehlídá automaticky změny v souborech. Pokud tedy provedete nějakou změnu na vašem projektu, je potřeba gunicorn server restartovat, aby se změny projevily.
```
Server gunicorn má řadu parametrů, jak ho lze nakonfigurovat:

- **`--workers`**: Počet *workerů* (paralelních procesů), které budou zpracovávat požadavky. Čím více workerů, tím více uživatelů najednou může server obsluhovat, ale tím více zdrojů (RAM, CPU) serveru bude gunicorn využívat. Pro optimální využití dostupného výkonu se doporučuje nastavit na počet CPU jader * 2 + 1.
- **`--bind`**: Adresa a port nebo Unix socket, na kterém bude gunicorn naslouchat na příchozí požadavky. Odpovídá nastavení proxy pass u nginx.  V tomto případě je použit Unix socket `/tmp/gunicorn.sock`.

Pro kompletní výpis všech konfiguračních parametrů navštivte [dokumentaci gunicorn](https://docs.gunicorn.org/en/stable/settings.html).


#### gunicorn démon

Abychom nemuseli pouštět gunicorn ručně, je šikovné využít nástroj `systemd` (který je obvykle součástí linuxových distribucí), který spravuje různé služby (service) jako webové či databázové servery a zajišťuje jejich automatické spouštění při startu systému. Pro vytvoření nové `systemd` služby postupujte následovně:

1. **Vytvoření souboru služby**

    Vytvořte nový soubor služby v adresáři `/etc/systemd/system/` s názvem `gunicorn.service`:

    Do souboru `gunicorn.service` vložte následující konfiguraci. Upravte cesty a názvy podle vašeho projektu:

    ```ini
    # /etc/systemd/system/gunicorn.service

    [Unit]
    Description=gunicorn daemon for Django project
    After=network.target

    [Service]
    User=www-data
    Group=www-data
    WorkingDirectory=/path/to/your/project
    ExecStart=/path/to/your/project/.venv/bin/gunicorn --workers 3 --bind unix:/tmp/gunicorn.sock my_project.wsgi:application

    [Install]
    WantedBy=multi-user.target

    ```

3. **Povolení a nastartování služby**

    Povolte a nastartuje gunicorn službu pomocí příkazů:

    ```sh
    sudo systemctl enable gunicorn
    sudo systemctl start gunicorn
    ```

4. **Kontrola stavu služby**

    Zkontrolujte stav služby, abyste se ujistili, že běží správně:

    ```sh
    sudo systemctl status gunicorn
    ```


### PostgreSQL

PostgreSQL je výkonný a open-source relační databázový systém, který je často používán s Django aplikacemi. Následující kroky vás provedou instalací a konfigurací PostgreSQL pro vaši Django aplikaci.

1. **Instalace PostgreSQL**

    Na debian-based distribucích Linuxu můžete PostgreSQL nainstalovat pomocí následujících příkazů:

    ```sh
    sudo apt update
    sudo apt install postgresql
    ```

2. **Vytvoření databáze a uživatele**

    Po instalaci PostgreSQL je potřeba vytvořit novou databázi a uživatele. Nejprve se přihlaste do PostgreSQL shellu jako uživatel `postgres`:

    ```sh
    sudo -u postgres psql
    ```

    V PostgreSQL shellu vytvořte novou databázi a uživatele:

    ```sql
    CREATE DATABASE myproject;
    CREATE USER myprojectuser WITH PASSWORD 'secure-password';
    ALTER DATABASE myproject OWNER TO myprojectuser;
    ```

    Nastavte správná oprávnění pro nového uživatele:

    ```sql
    GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;

    ```

3. **Instalace PostgreSQL knihovny pro Python**

    Pro komunikaci s PostgreSQL z Django aplikace je potřeba nainstalovat knihovnu `psycopg2`:

    ```sh
    pip install psycopg2-binary
    ```

4. **Konfigurace Django projektu**

    Otevřete soubor `settings.py` ve vašem Django projektu a upravte nastavení `DATABASES`:

    ```python
    # my_project/settings.py
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'myproject',
            'USER': 'myprojectuser',
            'PASSWORD': 'secure-password',
            'HOST': 'localhost',
            'PORT': '',
        }
    }
    ```

5. **Migrace databáze**

    Po konfiguraci databáze spusťte migrace, aby se vytvořily potřebné tabulky v PostgreSQL:

    ```sh
    python manage.py migrate
    ```

Tato konfigurace vytvoří nastavení, kdy server NGINX přebírá požadavky z Internetu, a pokud URL směřuje na adresář se statickými soubory (`STATIC_ROOT`), nebo na adresář s media soubory (`MEDIA_ROOT`), rovnou tyto soubory vrátí klientovi. Ostatní požadavky směřuje na server gunicorn, který má spuštěnou samotnou Django aplikaci, která požadavek zpracuje. Takové spojení jako zde (NGINX - gunicorn), kdy webserver přeposílá požadavky dalšímu serveru se označuje jako **Reverse Proxy** (**reverzní proxy**) případně **Proxy Pass**. Samotný Django projekt pak komunikuje s databází PostgreSQL.

```{mermaid}
graph LR;
    A[Webový prohlížeč] <--> I(Internet)
    I <-->B[NGINX]
    B <-->|Static files| D[STATIC_ROOT]
    B <-->|Media files| E[MEDIA_ROOT]
    B <-->|Proxy pass| AS[Gunicorn]
    DB[(PostgreSQL)]

    subgraph FS[File Storage]
        D
        E
    end
    subgraph AS[gunicorn]
        C[Django projekt]
    end
    subgraph WS[Server]
        B
        FS
        AS
        C <--> DB
    end
    subgraph CL[Klient]
        A
    end
```

### Troubleshooting

- Po zadání adresy do prohlížeče prohlížeč nic nezobrazuje
    - Ujistěte se, že běží server nginx
    - Ujistěte se, že sou správně nastaveny DNS záznamy k doméně. Pomocí příkazu `ping example.com` můžete zkontrolovat, zda-li doména odkazuje na správnou IP adresu.

- Po zadání adresy do prohlížeče vrací server nginx chybu `502 Bad Gateway`
    - Spojení na gunicorn server se nezdařilo, zkontrolujte zda:
        - Běží server gunicorn.
        - Je v nginx nakonfigurován `proxy_pass` na gunicorn server.

- Na stránce nejsou zobrazeny statické nebo media soubory
    - Pokud server vrací chybu `404 Not Found`:
        - Zkontrolujte, zda-li jsou správně nastaveny cesty ke statickým a media souborům v konfiguračním souboru nginx. Můžete se také podívat do error logu serveru nginx (obvykle v `/var/log/nginx/error.log`), zda-li server nehlásí nějaké chyby.
    - Pokud server vrací chybu `403 Forbidden`:
        - Pravděpodobně nemá server nginx dostatečná oprávnění ke čtení složky s media nebo statickými soubory.

- Služba gunicorn nestartuje, `sudo systemctl status gunicorn` zobrazuje chybu `gunicorn.service: Changing to the requested working directory failed: Permission denied`.
    - Uživatel, který spouští službu gunicorn (`www-data`) nemá přístup do adresáře projektu.


Google Cloud
------------

Google Cloud nabízí robustní a škálovatelné prostředí pro nasazení nejen Django aplikací.

Nejprve se přihlaste do [Google Cloud Console](https://console.cloud.google.com) a vytvořte nový projekt. Na stránce [Getting started with Django](https://cloud.google.com/python/django) naleznete několik návodů, jak Django aplikaci spustit.

Služba Google Cloud je placená, nicméně nabízí startovní kredit, který je možné využít na vyzkoušení.

Použití SVS
-----------

SVS (Studentský vývojový server) je server spravovaný studenty Gymnázia Arabská. Základní informace o SVS naleznete na adrese [https://svs.gyarab.cz](https://svs.gyarab.cz). 

Návod jak spustit Django aplikaci naleznete zde:

[https://gist.github.com/kristiankunc/cc58b0d963d3a528f184c8863ce7a5fd](https://gist.github.com/kristiankunc/cc58b0d963d3a528f184c8863ce7a5fd)


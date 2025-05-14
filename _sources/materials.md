Materiály k výuce
=================

* Vzorový HTML dokument pro testování CSS selektorů: 
    
    {download}`sandbox.html<_static/examples/sandbox.html>`

* Stránka pro testování CSS layoutu
    
    {download}`layout.zip<_static/examples/layout.zip>`

* Seznam článků z irozhlas.cz

    {download}`articles.json<_static/examples/articles.json>`

* Nástroj na nastavení Django projektu na svs.gyarab.cz
    
    {download}`svs.py<_static/examples/svs.py>`

    **Použití**

    Stáhněte soubor `svs.py` do vašeho repozitáře, soubor musí být umístěn na stejné úrovni jako `manage.py`. Skript nabízí následující příkazy:
    - `python3 svs.py` - Zobrazí nápovědu
    - `python3 svs.py setup` - Nastaví Django projekt na SVS serveru
    - `python3 svs.py info` - Zobrazí informace a stav nastavení Django projektu
    - `python3 svs.py update` - Aktualizuje projekt
    - `python3 svs.py clean` - Smaže všechna vytvořená nastavení
    - `python3 svs.py loaddata <fixture>` - Načte fixture `<fixture>`

    Skript vytvoří konfigurační soubor `settings_svs.py`, který obsahuje nastavení specifická pro SVS server. Pokud chcete spouštět další příkazy Django v kontextu tohoto nastavení, je potřeba před spouštěný příkaz nastavit  environment proměnnou `DJANGO_SETTINGS_MODULE`, např:
    
    ```sh
    DJANGO_SETTINGS_MODULE=cms.settings_svs .venv/bin/python manage.py createsuperuser
    ```

    SVS nainstaluje také balíčky `gunicorn` (server pro spouštění Django aplikací) a `psycopg` (balíček pro práci s PostgreSQL databází)

* Měření hash funkcí
    
    {download}`hashes.py<_static/examples/hashes.py>`

    Vyžaduje Python balíčky `bcrypt` a `argon2-cffi`


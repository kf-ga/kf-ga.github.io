Git
===

* [Git tutoriál od W3C](https://www.w3schools.com/git/default.asp)
* [Git cheat sheet od GitHubu](https://education.github.com/git-cheat-sheet-education.pdf)
* [Nastavení autentizace na GitHub ve Windows](https://ourcodeworld.com/articles/read/1421/how-to-create-a-ssh-key-to-work-with-github-and-gitlab-using-puttygen-in-windows-10)


Co je to Git a k čemu se používá
--------------------------------

Git je distribuovaný systém správy verzí, který umožňuje vývojářům sledovat a spravovat změny v souborech (zejména zdrojových kódů). Je to moderní nástroj pro správu kódu v týmových ale i individuálních projektech, umožňuje koordinovat práci na těchto souborech mezi více lidmi podporuje efektivní workflow při vývoji složitějších projektů.


### Git repozitáře

Síla Gitu ale spočívá v možnosti sdílení kódu. To se obvykle řeší přes centrální **repozitář**, kam všichni vývojáři mají přístup a nahrávají do něj své úpravy kódu. Centrální repozitář si můžete hostovat sami na svém serveru, ale obvykle je jednodušší použít *Git hosting*, který často nabízí i další funkce jako procházení kódu na webu, propojení s dalšími nástroji atd..

Mezi populární Git hostingy patří:

- **[GitHub](https://github.com)**: Populární webová služba pro hosting Git repozitářů s rozsáhlými nástroji pro kolaboraci.
- **[GitLab](https://gitlab.com)**: Umožňuje nejen hosting repozitářů, ale i deployment a mnoho dalších funkcí pro správu softwarových projektů.
- **[Bitbucket](https://bitbucket.org)**: Nabízí Git hosting s integrovanými nástroji pro týmy, které používají Jira a další Atlassian produkty.

#### Konfigurace Gitu

Některé hostingy vyžadují autentizaci pomocí veřejného a soukromého klíče (viz. [asymetrická kryptografie](https://en.wikipedia.org/wiki/Public-key_cryptography)). Postup pro vytvoření páru veřejný-soukromý klíč je následující:

##### Windows

Spusťte program **PuTTYgen** a klikněte na tlačítko *Generate*. Po vytvoření klíče naleznete v bloku *Key* veřejný klíč, který nahrajte do GitHubu.

Dále klikněte v menu Conversions > Export OpenSSH key (force new file format) a uložte klíč do souboru `Z:/.ssh/id_rsa`.

Podrobněji zpracovaný návod naleznete například [zde](https://ourcodeworld.com/articles/read/1421/how-to-create-a-ssh-key-to-work-with-github-and-gitlab-using-puttygen-in-windows-10).


##### Linux

Pro vytvoření páru veřejný-soukromý klíč spusťte příkaz:

```sh
ssh-keygen -o
```

Průvodce se Vás zeptá na umístění souboru s klíči a volitelně heslo, které se bude zadávat při použití klíče. Po dokončení naleznete ve svém domovském adresáři ve složce `.ssh` dva soubory:

```sh
id_ed25519
id_ed25519.pub
```

Soubor `id_ed25519` obsahuje **soukromý klíč** (**private key**), ten je potřeba chránit a zamezit jeho úniku. Soubor `id_ed25519.pub` pak obsahuje **veřejný klíč** (**public key**), který se nahraje do Git hostingu (případně jiné služby, která tento typ autentizace vyžaduje).

```{admonition} Algoritmy
:class: note
Označení `ed25519` je pro používaný šifrovací algoritmus [EdDSA](https://en.wikipedia.org/wiki/EdDSA), aktuálně výchozí v `ssh` (pomocí parametru `-t` je možné algoritmus změnit, `ssh` jich podporuje několik a je možné, že některé služby vyžadující tento typ autentizace mohou vyžadovat i specifický algoritmus). 
```

#### Jméno a email

Dále je ještě nutné nastavit vaše jméno a email, které se bude ukládat do commitů, aby bylo dobře rozlišitelné, kdo je jejich autorem:

```sh
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```


### Stažení existujícího repozitáře

Pokud už vzdálený repozitář existuje a chcete si vytvořit jeho lokální kopii použijte příkaz:

```sh
git clone <URL vzdáleného repozitáře>
```

Tím se vytvoří nový adresář s názvem repozitáře, do něj se stáhne aktuální verze všech souborů repozitáře a zároveň se inicializuje lokální git repozitář s kompletní historií včetně nastavení `origin` (adresy vzdáleného repozitáře na Git hostingu).

### Inicializace lokálního Git repozitáře

Chcete-li vytvořit nový lokální Git repozitář, přejděte do kořenového adresáře projektu a spusťte v konzoli příkaz:

```sh
git init
```

Tím se vytvoří nový prázdný Git repozitář a složka `.git`, kam Git ukládá všechny potřebné soubory a historii projektu.


#### Nahrání lokálního repozitáře na vzdálený server

Chcete-li nahrát existující lokální repozitář na vzdálený server (např. GitHub), proveďte tyto kroky:

1. Vytvořte nový prázdný repozitář na vzdáleném serveru.

2. Přidejte vzdálený repozitář jako remote do vašeho lokálního repozitáře:

   ```sh
   git remote add origin <URL vzdáleného repozitáře> 
   ```

   Jako `origin` se v Gitu označuje výchozí název pro vzdálený repozitář. V dalších příkazech odkazujících se na vzdálený repozitář nemusíte pracovat s URL repozitáře, stačí pouze označením `origin`.

3. Nahrajte lokální repozitář na vzdálený server:

    ```sh
    git push -u origin main
    ```

    Parametr `-u` (ekvivalent `--set-upstream`) řekne vzdálenému repozitáři, aby vytvořil větev kam nahraje lokální repozitář. Parametr `-u` (`--set-upstream`) je potřeba pouze při prvním nahrání na vzdálený repozitář. Označení *main* je výchozí název hlavní větve v Git repozitáři. Větvení v Gitu se budeme věnovat v dalších kapitolách.

```{admonition} master a main
:class: note
Ještě donedávna se všude používalo pro hlavní větev označení **master**, od toho však GitHub [upouští](https://www.zdnet.com/article/github-to-replace-master-with-alternative-term-to-avoid-slavery-references/) a zavádí se označení **main**. Stále se ale často setkáte s označením master.
```

### Vytvoření commitu

V Gitu se vytváří verze pomocí **commitu**. Commit představuje uložený stav souborů ve vašem projektu v daném časovém bodě. Když provedete commit, Git vytvoří snímek souborů a uloží tento snímek do lokálního repozitáře. Každý commit má jedinečný identifikátor (hash), který umožňuje sledovat historii změn a případně se vrátit ke starším verzím.

Commit také obsahuje metadata, jako jsou informace o autorovi, datum a čas commitu, a *commit message*, která stručně popisuje provedené změny.

Pro vytvoření nového commitu v Gitu postupujte následovně:

1. Proveďte změny ve vašem pracovním adresáři, změňte, vytvořte či smažte soubory.
2. Přidejte změněné soubory do commitu pomocí příkazu `git add jmeno_souboru`. Případně použijte `git add .` k přidání všech souborů a změn.
3. Vytvořte commit s popisem změn pomocí příkazu `git commit -m "Popis změn"`. Je důležité psát smysluplné commit messages, aby bylo jasné, co daný commit obsahuje.

Tímto postupem si budete ve vašem lokálním projektovém adresáři udržovat historii změn, kterou je možné vizualizovat jako graf na sebe navazujících commitů:

```{mermaid}
gitGraph
    commit
    commit
    commit
```


### Aktualizace repozitáře

Pokud je Git repozitář inicializován a propojen se vzdáleným repozitářem, jsou v Gitu dva základní příkazy pro synchronizaci. 

Příkaz:

```sh
git pull
```
stáhne ze vzdáleného repozitáře nejnovější verzi souborů a historii změn. Zároveň provede aktualizace všech souborů lokálního repozitáře na nejnovější verzi.

Příkaz:

```sh
git push
```

Odešle všechny změny (commity) z lokálního repozitáře do vzdáleného repozitáře.


### Soubor `.gitignore`

Pomocí souboru `.gitignore` umístěného v kořenovém adresáři projektu můžeme definovat, které soubory nebo složky mají být verzovacím systémem Git ignorovány. Tento soubor pomáhá udržet repozitář čistý od nepotřebných nebo dočasných souborů, jako jsou logy, systémové soubory, kompilované zdrojové kódy a další. Do souboru `.gitignore` se zapisují pravidla, která Git automaticky čte a ignoruje jakékoliv změny v souborech vyhovujících zadaným pravidlům a v Git je neukládá.

Pravidla vypadají následovně

- **Obecná jména souborů**: Název souboru nebo maska, která specifikuje, které soubory ignorovat (např. `*.log` ignoruje všechny soubory s příponou `.log`).
- **Adresářové cesty**: Můžete specifikovat složky, které mají být ignorovány, přidáním lomítka na konec názvu složky (např. `build/`, nebo `**/build`).
- **Komentáře**: Řádky začínající znakem `#` jsou považovány za komentáře.

Příklad souboru `.gitignore`:

```text
# Ignoruje všechny .log soubory
*.log

# Ignoruje konkrétní složku a vše co v ní je
temp/

# Ignoruje složku, která se může být umístěna kdekoliv v adresářové struktuře projektu.
**/cache
```

```{admonition} Co tedy do Gitu nepatří?
:class: note

Do Gitu obecně nepatří soubory, které 
- se generují během běhu programu, např. kompilované bytecode soubory, logy, cache soubory apod.
- soubory databází a obecně data aplikace vytvářená jejím provozem
- konfigurační soubory obsahující hesla nebo jiné osobní informace
- soubory s nastavením pro IDE
```


### Řešení konfliktů

Konflikty v Gitu vznikají, když se například dva vývojáři pokusí změnit stejnou část kódu ve stejném souboru. Tato situace často nastává při spolupráci více lidí na stejném projektu. Když pak dojde k pokusu o sloučení těchto změn (např. při `push` nebo `pull`, ale i v dalších situacích), Git není schopen automaticky rozhodnout, která změna má přednost, a vyvolá konflikt. Konfliktující části kódu se pak musí ručně opravit. Postup je následující:


1. Použijte příkaz `git status`, který ukáže soubory kde došlo konfliktu.
2. Otevřete konfliktující soubor v editoru, kde naleznete speciálně formátované sekce, které ukazují změny z obou větví. Část mezi `<<<<<<<` a `=======` je vaše změna, zatímco část mezi `=======` a `>>>>>>>` je změna z větve.
3. Manuálně upravte soubor, aby obsahoval konečnou verzi kódu. Můžete zvolit jednu ze změn, kombinovat obě nebo napsat něco zcela nového.
4. Jakmile upravíte soubory a vyřešíte konflikty, použijte příkaz `git add <soubor>`, aby Git věděl, že konflikty byly vyřešeny.
5. Po opravení všech konfliktující souborů dokončete proces pomocí `git commit`, čímž vytvoříte commit opravující konflikty a uložíte vaše změny do lokálního repozitáře. Je dobré také ihned provést `git push`, aby změny byly odeslány do vzdáleného repozitáře a ostatní vývojáři měli přístup k aktuální verzi.


Vytváření větví v Git
---------------------

V Gitu je vytváření větví (**branch**) základní funkcí, která umožňuje vývojářům pracovat na různých funkcionalitách nebo opravách bez ovlivnění hlavního (produkčního) kódu aplikace, což usnadňuje paralelní vývoj a pomáhá udržovat produkční kód stabilní. Díky větvím mohou vývojáři experimentovat, vyvíjet nové funkce a opravovat chyby bez rizika narušení produkčního kódu. Teprve až když je nová funkce hotova, provede se sloučení větve s produkčním kódem (**merge**).


### Vytvoření nové větve

Pro vytvoření nové větve v Gitu použijete příkaz `git branch`, následovaný názvem nové větve. Například, pokud chcete vytvořit větev s názvem `my_feature`, zadáte:

```sh
git branch my_feature
```

Po vytvoření větve se na ni můžete přepnout pomocí příkazu `git checkout`:

```sh
git checkout my_feature
```

Tento příkaz řekne Gitu, že další commity má ukládat do větve `my_feature` a hlavní větev `main` tak nebude změnami dotčena. Během práci a přidávání commitů do větve `my_feature` můžete samozřejmě kdykoliv přepnout zpět na hlavní větev pomocí `git checkout main`, nebo na jakoukoliv jinou větev pomocí `git checkout <název větve>`. Zdrojový kód se tak začne v Gitu větvit:

```{mermaid}
gitGraph
    commit
    commit
    commit
    branch my_feature
    checkout my_feature
    commit
    checkout main
    commit
    checkout main
    checkout my_feature
    commit
    commit
```


### Merge větví

Sloučení (merge) větví je proces, při kterém se integrují změny z jedné větve do druhé. To se obvykle děje, když je funkce ve vývojové větvi dokončena a má být začleněna do hlavní větve `main`. Pro sloučení větví postupujte následovně

1. Přepněte na větev, **do** které chcete změny sloučit, což je obvykle `main`, ale obecně je možné slučovat větve libovolně: 

    ```sh
    git checkout main
    ```

2. Použijete příkaz `git merge` následovaný názvem větve, kterou chcete sloučit:

    ```sh
    git merge my_feature
    ```

Tento příkaz začlení všechny změny z větve `my_feature` do aktuální větve (`main`):

3. Git se pokusí sloučení provést automaticky, ale může se stát, že vzniknou konflikty (změny ve stejných částech souborů v obou větvích). Postupujte s řešením konfliktů tak, jak je popsáno v předchozí kapitole. Po vyřešení konfliktů nezapomeňte vyřešené konflikty přidat do repozitáře pomocí příkazu `git add <soubor>` a poté vytvořit nový commit pomocí `git commit`.

Po dokončení merge pak bude repozitář vypadat nějak takto:

```{mermaid}
gitGraph
    commit
    commit
    commit
    branch my_feature
    checkout my_feature
    commit
    checkout main
    commit
    checkout main
    checkout my_feature
    commit
    commit
    checkout main
    merge my_feature
```

Git nabízí celou řadu dalších možností jak s větvemi pracovat a lepší pochopení problematiky doporučuji toto videa o [merge a rebase](https://www.youtube.com/watch?v=zOnwgxiC0OA) a o řešení [merge konfliktů](https://www.youtube.com/watch?v=Sqsz1-o7nXk).

```{note} IDE
Moderní IDE mají zpravidla vestavěnou více či méně pokročilou správu verzí a poskytují funkcionalitu Gitu v uživatelsky přívětivé formě bez nutnosti práce s příkazovou řádkou. Přesto je ale důležité znát základní principy a ovládání Gitu příkazovou řádkou pro situace kde třeba IDE selže, nebo kde není IDE vůbec k dispozici, například na serverech.
```
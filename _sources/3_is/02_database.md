Databáze
========

- [Relational database – Wikipedia](https://en.wikipedia.org/wiki/Relational_database) 
- [ER diagram – Wikipedia](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- [Normalizace databáze – Wikipedie](https://cs.wikipedia.org/wiki/Normalizace_datab%C3%A1ze)

V [předchozí kapitole](01_is.md) jsme si ukázali, z čeho se skládá informační systém — procesy, role a entity. V této kapitole se zaměříme na **databázi**, tedy na to, jak jsou data v informačním systému organizována a uložena.

Základy moderních databázových systémů položil v roce 1970 [Edgar F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd) z IBM, který publikoval článek *A Relational Model of Data for Large Shared Data Banks* a navrhl **relační model** — data uložená v tabulkách propojených vzájemnými vztahy. V 70.–80. letech pak vznikl jazyk **SQL** ([Structured Query Language](https://cs.wikipedia.org/wiki/SQL)) pro dotazování v databázi a první komerční systémy (Oracle, IBM DB2). Dnes se vedle relačních databází prosazují i [**NoSQL** databáze](https://cs.wikipedia.org/wiki/NoSQL) (MongoDB, Redis) pro specifické účely, relační model ale zůstává standardem pro většinu informačních systémů.


Relační databáze
----------------

**Relační databáze** ukládá data do **tabulek**, které jsou vzájemně propojeny pomocí **vztahů** (**relací**). Každá tabulka odpovídá jedné entitě.

Ukažme si, jak by mohly vypadat ukázkové tabulky pro entity `Třída` a `Student` z našeho školního informačního systému:

**Tabulka `Třída`:**

| ID | Název |
|----|-------|
| 1  | 1.A   |
| 2  | 1.B   |
| 3  | 2.A  |

**Tabulka `Student`:**

| ID | Jméno  | Příjmení   | Pohlaví | Bydliště             | ID třídy |
|----|--------|------------|---------|----------------------|----------|
| 1  | Jan    | Novák      | M       | Praha, U Lesa 12     | 1        |
| 2  | Petra  | Svobodová  | F       | Praha, Květnová 45   | 1        |
| 3  | Tomáš  | Dvořák     | M       | Praha, Sluneční 8    | 2        |
| 4  | Lucie  | Králová    | F       | Praha, Modřínová 101 | 2        |
| 5  | Martin | Procházka  | M       | Praha, Na Výsluní 23 | 3        |

Sloupec **ID** v tabulce `Třída` je **primární klíč** (**primary key**) — jednoznačně identifikuje každý řádek. Sloupec **ID třídy** v tabulce `Student` odkazuje na konkrétní záznam v tabulce `Třída` — takový sloupec se nazývá **cizí klíč** (**foreign key**). Spárování primárního a cizího klíče vznikne jednoznačná vazba (relace) mezi oběma tabulkami. Odtud pochází název relační databáze.

### Přirozený a umělý klíč

Primární klíč může být **přirozený** (**natural key**) — hodnota, která přirozeně existuje a je unikátní, například rodné číslo, ISBN knihy nebo e-mailová adresa. Přirozené klíče ale mohou být problematické: mohou se měnit (příjmení po sňatku), být příliš dlouhé nebo obsahovat citlivé údaje (rodné číslo).

Proto se v praxi častěji používá **umělý klíč** (**surrogate key**) — uměle vytvořené číslo (typicky automaticky zvyšované celé číslo), které nemá žádný věcný význam, slouží pouze k identifikaci záznamu. Sloupec **ID** v našich ukázkových tabulkách je právě umělý klíč.

### Typy relací (vztahů)

Mezi entitami mohou existovat tři základní typy vztahů:

#### 1:1 (one-to-one) — Jeden na jednoho

Každý záznam v jedné tabulce odpovídá přesně jednomu záznamu ve druhé tabulce.

*Příklad*: Každý student má právě jeden přístupový účet (login a heslo) do IS a každý účet patří právě jednomu studentovi.

#### 1:N (one-to-many) — Jeden na mnoho

Jeden záznam v první tabulce může být propojen s více záznamy ve druhé tabulce, ale každý záznam ve druhé tabulce patří jen jednomu záznamu v první.

*Příklad*: V jedné třídě je více studentů, ale každý student patří právě do jedné třídy.

#### M:N (many-to-many) — Mnoho na mnoho

Více záznamů v jedné tabulce může být propojeno s více záznamy v druhé tabulce.

*Příklad*: Jeden student navštěvuje více předmětů a jeden předmět je navštěvován více studenty.

Vztah M:N nelze v relační databázi vyjádřit přímo — řeší se **vazební tabulkou** (junction table), která obsahuje cizí klíče obou propojených tabulek.

Ukažme si, jak by tabulky pro tento vztah mohly vypadat:

**Tabulka `Student`:**

| ID | Jméno  | Příjmení  |
|----|--------|-----------|
| 1  | Jan    | Novák     |
| 2  | Petra  | Svobodová |
| 3  | Tomáš  | Dvořák    |

**Tabulka `Předmět`:**

| ID | Zkratka | Název       |
|----|---------|-------------|
| 1  | MAT     | Matematika  |
| 2  | INF     | Informatika |
| 3  | CES     | Čeština     |


**Vazební tabulka `Zápis`:**

| ID studenta | ID předmětu |
|-------------|-------------|
| 1           | 1           |
| 1           | 2           |
| 1           | 3           |
| 2           | 1           |
| 2           | 2           |
| 3           | 1           |
| 3           | 3           |
 
Z tabulky `Zápis` tak například vyčteme, že Jan Novák (ID 1) navštěvuje Matematiku, Informatiku i Češtinu, zatímco Tomáš Dvořák (ID 3) navštěvuje pouze Matematiku a Češtinu.


```{admonition} Kardinalita vztahu
:class: note
Typům relací se formálně říká **kardinalita vztahu** — více se můžete dozvědět [zde](https://en.wikipedia.org/wiki/Cardinality_(data_modeling)).
```

Normalizace databáze
--------------------

**Normalizace** je proces návrhu databáze tak, aby se minimalizovala **redundance** (opakování stejných dat) a předešlo se **nekonzistencím** (situacím, kdy se stejná informace na různých místech liší). Normalizace databáze definuje několik úrovní — **normálních forem**.

Celý proces si ukážeme na jednom příkladu, který budeme krok za krokem upravovat od nenormalizovaného stavu až do 3NF.

### Výchozí (nenormalizovaná) tabulka

Evidujeme, které třídy, učitele, studenty a předměty, které navštěvují, a vše ukládáme do jediné tabulky:

| Jméno studenta  | Třída | Třídní učitel | Předměty                | Učitelé předmětů    |
|-----------------|-------|---------------|-------------------------|---------------------|
| Jan Novák       | 1.A   | Nováková      | Matematika, Informatika | Nováková, Dvořák    |
| Petra Svobodová | 1.A   | Nováková      | Matematika              | Nováková            |
| Tomáš Dvořák    | 1.B   | Procházka     | Matematika, Fyzika      | Nováková, Jelínek   |

**Problémy:**
- **Více hodnot v buňce**: sloupce *Předměty* a *Učitelé předmětů* obsahují více hodnot — nelze se na ně spolehlivě dotazovat ani třídit.
- **Redundance**: třída a třídní učitel se opakují u každého studenta dané třídy; jméno učitele se opakuje u každého studenta v témž předmětu.
- **Riziko nekonzistence**: při změně třídního učitele nebo přejmenování předmětu je nutné opravit všechny dotčené řádky.

### Krok 1 — První normální forma (1NF)

> Tabulka je v **1NF**, pokud každá buňka obsahuje jen jednu (atomickou) hodnotu a každý řádek je unikátní.

**Oprava**: rozložíme záznamy tak, aby každý řádek odpovídal zápisu jednoho studenta do jednoho předmětu. Primární klíč zatím tvoří dvojice přirozených hodnot **(Jméno studenta, Předmět)**:

| Jméno studenta  | Třída | Třídní učitel | Předmět     | Učitel předmětu |
|-----------------|-------|---------------|-------------|-----------------|
| Jan Novák       | 1.A   | Nováková      | Matematika  | Nováková        |
| Jan Novák       | 1.A   | Nováková      | Informatika | Dvořák          |
| Petra Svobodová | 1.A   | Nováková      | Matematika  | Nováková        |
| Tomáš Dvořák    | 1.B   | Procházka     | Matematika  | Nováková        |
| Tomáš Dvořák    | 1.B   | Procházka     | Fyzika      | Jelínek         |

Každá buňka nyní obsahuje jednu hodnotu. Redundance ale přetrvává: *Třída* a *Třídní učitel* se opakují pro každý předmět téhož studenta; *Učitel předmětu* se opakuje pro každého studenta v témž předmětu.

### Krok 2 — Druhá normální forma (2NF)

> Tabulka je v **2NF**, pokud je v 1NF a každý neklíčový atribut závisí na **celém** primárním klíči — ne jen na jeho části.

Ukažme si, na které části klíče závisí jednotlivé atributy:

| Atribut         | Závisí jen na…   | Problém               |
|-----------------|------------------|-----------------------|
| Třída           | *Jméno studenta* | ✗ částečná závislost  |
| Třídní učitel   | *Jméno studenta* | ✗ částečná závislost  |
| Učitel předmětu | *Předmět*        | ✗ částečná závislost  |

**Oprava**: rozdělíme tabulku na samostatné entity `Student` a `Předmět`, vazbu zachytíme tabulkou `Zápis`.

**Tabulka `Student`:**

| ID | Jméno           | Třída | Třídní učitel |
|----|-----------------|-------|---------------|
| 1  | Jan Novák       | 1.A   | Nováková      |
| 2  | Petra Svobodová | 1.A   | Nováková      |
| 3  | Tomáš Dvořák    | 1.B   | Procházka     |

**Tabulka `Předmět`:**

| ID | Název       | Učitel   |
|----|-------------|----------|
| 1  | Matematika  | Nováková |
| 2  | Informatika | Dvořák   |
| 3  | Fyzika      | Jelínek  |

**Tabulka `Zápis`** (vazební tabulka — zachycuje, kdo co navštěvuje):

| ID studenta | ID předmětu |
|-------------|-------------|
| 1           | 1           |
| 1           | 2           |
| 2           | 1           |
| 3           | 1           |
| 3           | 3           |

```{admonition} Proč zavádíme ID?
:class: note
Při rozdělení do samostatných tabulek přestávají být přirozená jména jako primární klíče praktická: jsou dlouhá, mohou se změnit (příjmení po sňatku) a odkazovat na ně z jiných tabulek je nepraktické. Proto nyní každé nové entitě přidáme **umělý klíč — krátké číselné ID**. Jméno studenta ani název předmětu tak není třeba kopírovat do vazební tabulky `Zápis`; stačí uložit jejich ID.
```
Redundance je výrazně omezena. Přesto má tabulka `Student` stále jeden problém: *Třídní učitel* se opakuje u všech studentů téže třídy.

### Krok 3 — Třetí normální forma (3NF)

> Tabulka je v **3NF**, pokud je v 2NF a každý neklíčový atribut závisí přímo na primárním klíči — ne na jiném neklíčovém atributu (**tranzitivní závislost**).

V tabulce `Student` závisí *Třídní učitel* na sloupci *Třída*, nikoli přímo na *ID studenta*. Jedná se o tranzitivní závislost: *ID studenta* → *Třída* → *Třídní učitel*.

**Oprava**: přesuneme informaci o třídě (včetně třídního učitele) do nové tabulky `Třída`. V tabulce `Student` ponecháme jen cizí klíč *ID třídy*:

**Tabulka `Student`:**

| ID | Jméno           | ID třídy |
|----|-----------------|----------|
| 1  | Jan Novák       | 1        |
| 2  | Petra Svobodová | 1        |
| 3  | Tomáš Dvořák    | 2        |

**Tabulka `Třída`:**

| ID | Název | Třídní učitel |
|----|-------|---------------|
| 1  | 1.A   | Nováková      |
| 2  | 1.B   | Procházka     |

Tabulky `Předmět` a `Zápis` zůstávají beze změny — jsou již v 3NF.

### Výsledek normalizace

Z původní jedné tabulky vznikly čtyři:

- **`Student`** — jméno studenta a odkaz na jeho třídu
- **`Třída`** — název třídy a třídní učitel
- **`Předmět`** — název předmětu a jeho učitel
- **`Zápis`** — vazební tabulka propojující studenty s předměty

Každá informace je uložena právě na jednom místě. Změna třídního učitele, přejmenování předmětu nebo přiřazení jiného vyučujícího vyžaduje úpravu jediného řádku v jediné tabulce.

```{admonition} Poznámka k úplnému návrhu
:class: tip
Ve skutečném systému by *třídní učitel* i *učitel předmětu* měly být cizí klíče odkazující na samostatnou tabulku `Učitel` — stejně jako jsme vyčlenili třídu do vlastní tabulky. Pro přehlednost příkladu jsme jména učitelů ponechali jako textové atributy, princip je ale stejný: opakující se hodnota patří do vlastní tabulky a nahrazuje ji ID.
```

### Další normální formy

Kromě prvních tří existují ještě další normální formy — **BCNF** (Boyce-Coddova), **4NF**, **5NF** a **6NF**. V praxi se však za dostatečný základ kvalitního návrhu databáze považuje splnění **3NF**. Vyšší normální formy řeší specifické okrajové případy a v běžných aplikacích se s nimi setkáte zřídka. Podrobnosti najdete na [Wikipedii](https://cs.wikipedia.org/wiki/Normalizace_datab%C3%A1ze).


ER diagram
----------

Než začneme databázi vytvářet, potřebujeme si její strukturu navrhnout. K tomu slouží **ER diagramy** (*Entity-Relationship diagram*) — vizuální plány databáze, které ukazují, jaké entity existují, jaké mají atributy a jak spolu souvisejí. ER diagram se kreslí ještě **před** samotnou implementací databáze — pomáhá odhalit chyby v návrhu, usnadňuje komunikaci v týmu a slouží jako dokumentace.

### Základní pravidla ER diagramu

- Každá **entita** se zobrazuje jako obdélník s názvem a seznamem atributů
- U každého atributu se uvádí jeho **datový typ** (int, string, …)
- **Relace** (vztahy) mezi entitami se znázorňují čarami s popiskem

### Vztah 1:N — Třída a Student

Každý student patří do právě jedné třídy; v jedné třídě je více studentů.

```{mermaid}
erDiagram
    Trida ||--|{ Student : "obsahuje"
    Trida {
        int id
        string nazev
        string tridni_ucitel
    }
    Student {
        int id
        string jmeno
        int id_tridy
    }
```

Čára `┼┼────┼⋲` říká: jedna třída (`┼┼`) obsahuje více studentů (`┼⋲`). Atribut `id_tridy` v entitě `Student` je cizí klíč odkazující na `Třída`.

### Vztah M:N — Student a Předmět

Student navštěvuje více předmětů a jeden předmět navštěvuje více studentů. V relační databázi se vždy realizuje přes **vazební tabulku** (`Zapis`), která jej rozloží na dva vztahy 1:N:

```{mermaid}
erDiagram
    Student ||--|{ Zapis : "je zapsán"
    Predmet ||--|{ Zapis : "je navštěvován"
    Student {
        int id
        string jmeno
    }
    Predmet {
        int id
        string nazev
    }
    Zapis {
        int id_studenta
        int id_predmetu
    }
```

### Výsledný diagram — školní IS

Následující diagram přímo odpovídá finálnímu výsledku normalizace z předchozí kapitoly:

```{mermaid}
erDiagram
    Trida ||--|{ Student : "obsahuje"
    Student ||--|{ Zapis : "je zapsán"
    Predmet ||--|{ Zapis : "je navštěvován"
    Trida {
        int id
        string nazev
        string tridni_ucitel
    }
    Student {
        int id
        string jmeno
        int id_tridy
    }
    Predmet {
        int id
        string nazev
        string ucitel
    }
    Zapis {
        int id_studenta
        int id_predmetu
    }
```

Z diagramu lze vyčíst:

- **`Třída` → `Student`**: jedna třída obsahuje více studentů (1:N); atribut `tridni_ucitel` je zde textový řetězec — ve větším systému by odkazoval na samostatnou tabulku učitelů
- **`Student` ↔ `Předmět`**: student je zapsán do více předmětů a předmět navštěvuje více studentů (M:N realizované přes vazební tabulku `Zápis`)


Databázové systémy
------------------

Pro práci s relačními databázemi existuje celá řada systémů. Zde jsou nejznámější z nich:

| Systém | Licence | Poznámka |
|--------|---------|----------|
| [SQLite](https://www.sqlite.org/) | Open source | Jednoduchá souborová databáze, ideální pro malé aplikace a výuku |
| [MySQL](https://www.mysql.com/) | Open source / komerční | Nejrozšířenější open-source databáze, dnes vlastněna společností Oracle |
| [PostgreSQL](https://www.postgresql.org/) | Open source | Pokročilá open-source databáze s důrazem na standardy a rozšiřitelnost |
| [MariaDB](https://mariadb.org/) | Open source | Komunitní fork MySQL |
| [Oracle Database](https://www.oracle.com/database/) | Komerční | Jeden z nejstarších a nejvýkonnějších komerčních systémů |
| [Microsoft SQL Server](https://www.microsoft.com/sql-server) | Komerční | Databázový systém od Microsoftu, široce používaný v korporátním prostředí |

Přehled a srovnání databázových systémů naleznete [zde](https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems).

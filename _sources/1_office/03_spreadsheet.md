Tabulkové procesory
===================

- [Referenční příručka funkcí Google Sheets](https://support.google.com/docs/table/25273)
- [Referenční příručka funkcí MS Excel](https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb)


Zápis vzorců
------------

**Vzorce** se zapisují do buňky pomocí znaku `=`, za kterým následuje výraz pro výpočet obsahu buňky. Výraz může obsahovat konkrétní hodnoty nebo odkazy na jiné buňky. Například vzorec `=A5+10` sečte obsah buňky `A5` s číslem `10`. Pokud se obsah buňky `A5` změní, výsledek se automaticky přepočítá.

Při zápisu vzorců můžete používat základní aritmetické operátory:

| Operátor | Význam         | Příklad         |
|----------|----------------|-----------------|
| `+`      | Sčítání        | `=A1+B1`        |
| `-`      | Odčítání       | `=A1-B1`        |
| `*`      | Násobení       | `=A1*B1`        |
| `/`      | Dělení         | `=A1/B1`        |
| `^`      | Umocnění       | `=A1^2`         |

Operátory lze kombinovat a používat závorky pro určení pořadí výpočtů, např. `=(A1+B1)*C1`.


### Funkce

Výraz může obsahovat také volání **funkce**, která provede složitější operaci. Zápis funkce vypadá takto:

`NAME(argument1, argument2)`

kde `NAME` je **název** volané funkce a `argument1`, `argument2` jsou její **argumenty** (**parametry**). Každá funkce má definovaný počet parametrů a některé podporují proměnný počet parametrů nebo volitelné parametry. Konkrétní počet a význam parametrů najdete v dokumentaci k příslušnému tabulkovému procesoru.

```{admonition} Čárka nebo středník?
:class: note
Oddělovač jednotlivých parametrů je buď středník `;`, nebo čárka `,` (záleží na jazykovém nastavení programu).
```

### Rozsahy buněk

Kromě odkazů na jednotlivé buňky mohou některé funkce pracovat s celými rozsahy buněk. Rozsah se zapisuje pomocí počáteční a koncové buňky oddělených dvojtečkou `:`, např. `B4:B8`, což označuje buňky od `B4` po `B8` včetně. Rozsahy mohou být i vícerozměrné (pokud je daná funkce podporuje), např. `B4:C8`.

Lze zapsat i rozsah přes celý sloupec nebo řádek:

- **`B:B`**: celý sloupec `B`
- **`7:7`**: celý řádek `7`

V Google Tabulkách můžete použít také následující zápisy:

- **`B4:B`**: sloupec `B` od řádku `4` včetně
- **`C7:7`**: řádek `7` od sloupce `C` včetně

```{admonition} Celý sloupec
:class: tip

Pokud potřebujete v MS Excel nebo LibreOffice Calc sečíst hodnoty v celém sloupci až od konkrétního řádku, můžete použít například:

- **`B4:B1000000`**: sloupec `B` od řádku `4` po řádek `1000000`
- **`C7:ZZ7`**: řádek `7` od sloupce `C` po sloupec `ZZ`

Mějte na paměti, že takový zápis ve skutečnosti nepokrývá sloupec nebo řádek až do úplného konce listu.
```

### Fixace buněk

Při kopírování nebo přesouvání buňky se vzorcem se odkazy na buňky a rozsahy automaticky upravují o relativní posun. Pokud toto nechcete, můžete zafixovat sloupec či řádek předsazením symbolu `$`:

- **`$B7`**: fixuje sloupec `B`
- **`B$7`**: fixuje řádek `7`
- **`$B$7`**: fixuje buňku `B7`

### Text

Kromě číselných parametrů nebo odkazů na buňky či rozsahy mohou některé funkce podporovat i textové argumenty, které se zapisují do dvojitých uvozovek, např. `"text"`. Je třeba rozlišovat mezi zápisem například `B10` (odkaz na buňku `B10`) a `"B10"` (text `B10`). 

*Příklad:*
- Zápis `=IF(A2 = B10, "ANO", "NE")` znamená:

    Pokud je obsah buňky `A2` stejný jako obsah buňky `B10`, zobrazí se `ANO`, jinak `NE`.

- Zatímco `=IF(A2 = "B10", "ANO", "NE")` znamená:

    Pokud se obsah buňky `A2` rovná textu `B10`, zobrazí se `ANO`, jinak `NE`.

Nejčastěji používané funkce
---------------------------

```{admonition} České překlady funkcí
:class: warning
MS Excel v české verzi **vyžaduje** použití českého názvu funkce ve vzorci. Google Tabulky umožňují zápis funkce v češtině i pomocí jejího originálního anglického názvu, který se automaticky přeloží.
```

### Aritmetické funkce

- **`SUM(range)`** / `SUMA`: Sečte všechny číselné hodnoty v rozsahu `range`. Textové hodnoty ignoruje.  
    
    *Příklad:* `=SUM(A2:A100)`
    

- **`AVERAGE(range)`** / `PRŮMĚR`: Vypočítá aritmetický průměr hodnot v rozsahu `range`.  
    
    *Příklad:* `=AVERAGE(B2:B10)`

- **`COUNT(range)`** / `POČET`: Vrátí počet neprázdných číselných buněk v rozsahu `range`.  
    
    *Příklad:* `=COUNT(C2:C20)`

- **`ROUND(value, decimals)`** / `ZAOKROUHLIT`: Zaokrouhlí číslo `value` na zadaný počet desetinných míst `decimals`. Parametr `decimals` je nepovinný; pokud není zadán, zaokrouhluje na celé číslo.
    
    *Příklad:* `=ROUND(D2, 2)`

- **`ROUNDUP(value, decimals)`** / `ZAOKR.NAHORU`: Zaokrouhlí číslo `value` nahoru na počet desetinných míst `decimals`. Parametr `decimals` je nepovinný; pokud není zadán, zaokrouhluje na celé číslo nahoru.
    
    *Příklad:* `=ROUNDUP(E2, 0)`

- **`ROUNDDOWN(value, decimals)`** / `ZAOKR.DOLŮ`: Zaokrouhlí číslo `value` dolů na počet desetinných míst `decimals`. Parametr `decimals` je nepovinný; pokud není zadán, zaokrouhluje na celé číslo dolů. 
    
    *Příklad:* `=ROUNDDOWN(E2, 0)`


### Logické funkce

- **`IF(condition, value_if_true, value_if_false)`** / `KDYŽ`: Vyhodnotí logickou podmínku `condition` a pokud je pravdivá, vrátí `value_if_true`, jinak `value_if_false`.  
    
    *Příklad:* `=IF(A2 > 5, "ANO", "NE")` – Pokud je číslo v buňce `A2` větší než `5`, vrátí text `ANO`, jinak `NE`.


- **`AND(condition1, condition2, …)`** / `A`: Vrátí logickou hodnotu `TRUE`, pokud jsou všechny podmínky splněny. Funkce může mít libovolný počet parametrů.

    *Příklad:* `=AND(A2 > 5, B2 < 10)`

- **`OR(condition1, condition2, …)`** / `NEBO`: Vrátí logickou hodnotu `TRUE`, pokud je alespoň jedna podmínka splněna. Funkce může mít libovolný počet parametrů.  

    *Příklad:* `=OR(A2 > 5, B2 < 10)`

- **`NOT(condition)`** / `NE`: Neguje logickou hodnotu parametru `condition`.

    *Příklad:* `=NOT(A2 = 0)`

    Funkce `AND`, `OR`, `NOT` je možné vnořovat a sestavit tak komplexní logický výraz.

    *Příklad:* `=IF(OR(AND(A2 > 5, B2 = 0), A2 <= 5), "ANO", "NE")`


- **`COUNTIF(range, condition)`**: Spočítá počet buněk v rozsahu `range`, které splňují zadanou podmínku `condition`. Podmínka může být například porovnání nebo textový řetězec.

    *Příklad:* `=COUNTIF(A2:A10, ">5")` – Spočítá počet buněk v rozsahu `A2:A10`, které obsahují hodnotu větší než `5`.

- **`SUMIF(range, condition, [sum_range])`**: Sečte hodnoty v rozsahu `sum_range`, pokud odpovídající buňky v rozsahu `range` splňují zadanou podmínku `condition`. Pokud není `sum_range` zadán, sčítají se hodnoty přímo z `range`. Funkce podporuje pouze jednu podmínku; pokud potřebujete více podmínek, použijte `SUMIFS`.

    *Příklad:* `=SUMIF(A2:A10, ">5", B2:B10)` – Sečte hodnoty v rozsahu `B2:B10`, kde odpovídající buňky v rozsahu `A2:A10` obsahují hodnotu větší než `5`.

Seznam operátorů, které lze v logických funkcích používat:

| Operátor | Význam           | Příklady                 |
|----------|------------------|--------------------------|
| `=`      | Rovnost          | `A1 = B1`, `A1 = 5`      |
| `<>`     | Nerovnost        | `A1 <> B1`, `A1 <> 5`    |
| `>`      | Větší než        | `A1 > B1`, `A1 > 5`      |
| `<`      | Menší než        | `A1 < B1`, `A1 < 5`      |
| `>=`     | Větší nebo rovno | `A1 >= B1`, `A1 >= 5`    |
| `<=`     | Menší nebo rovno | `A1 <= B1`, `A1 <= 5`    |


### Textové funkce

- **`CONCAT(text1, text2, …)`**, **`CONCATENATE(text1, text2, …)`**: Spojí více textových řetězců do jednoho. Funkce může mít libovolný počet parametrů. 

    *Příklad:* `=CONCAT(A2, " ", B2)`

- **`TEXTJOIN(delimiter, ignore_empty, text1, text2, …)`**: Spojí argumenty `text1`, `text2` (a další) oddělovačem `delimiter`. Pokud je parametr `ignore_empty` `TRUE`, přeskakuje prázdné buňky. Parametry `text1`, `text2` mohou být také celé rozsahy buněk.

    *Příklad:* `=TEXTJOIN(", ", TRUE, A2:A10)`

- **`LEN(text)`** / `DÉLKA`: Vrátí délku textového řetězce.  

    *Příklad:* `=LEN(A2)`

- **`LEFT(text, count)`** / `ZLEVA`: Vrátí zleva počet znaků `count` z textu `text`.  

    *Příklad:* `=LEFT(A2, 3)`

- **`RIGHT(text, count)`** / `ZPRAVA`: Vrátí zprava počet znaků `count` z textu `text`.  

    *Příklad:* `=RIGHT(A2, 2)`

- **`MID(text, start, number)`** / `ČÁST`: Vrátí část textu od znaku na pozici `start` o délce `number`. Index prvního znaku v řetězci je 1.  

    *Příklad:* `=MID(A2, 2, 4)`

- **`TRIM(text)`** / `PROČISTIT`: Odstraní nadbytečné mezery z textu `text`.  

    *Příklad:* `=TRIM(A2)`

- **`SEARCH(search, text, [start_num])`** / `HLEDAT`: Vyhledá pozici prvního výskytu textu `search` v textu `text`. Volitelný parametr `start_num` určuje, od kterého znaku má hledání začít (výchozí je 1). Funkce vrací pozici nalezeného textu jako číslo, nebo chybu, pokud text nenajde.

    *Příklad:* `=SEARCH("abc", A2)` – Vrátí pozici, kde se v buňce `A2` poprvé vyskytuje řetězec `"abc"`.

- **`TEXT(value, format_text)`** / `TEXT`: Převede číslo nebo datum na text podle zadaného formátu `format_text`. Formátovací řetězec určuje, jak bude výstupní text vypadat.

    *Příklad:* `=TEXT(A2, "0.00")` – Převede číslo v buňce `A2` na text se dvěma desetinnými místy.  
    *Příklad:* `=TEXT(A2, "dd/mm/yyyy")` – Převede datum v buňce `A2` na text ve formátu den/měsíc/rok.

```{admonition} MS Excel
:class: note
MS Excel v české verzi **vyžaduje** při formátování data zapsat rok jako `rrrr`, tedy například `=TEXT(A2, "dd/mm/rrrr")`.
```

### Vyhledávání

- **`XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])`**: Vyhledá hodnotu `lookup_value` v oblasti `lookup_array` a vrátí odpovídající prvek z `return_array`. Pokud se hodnota nenajde, vrátí `if_not_found` (jinak chybu `#N/A`). 

    Parametr `match_mode` definuje, jak má být porovnání realizováno:
        
    - `0`: přesná shoda (výchozí),
    - `-1`: nejbližší menší,
    - `1`: nejbližší větší,
    - `2`: zástupné znaky (`*`, `?`).
        
    Parametr `search_mode` určuje pořadí hledání:

    - `1`: od začátku (výchozí), 
    - `-1`: od konce.

    *Příklad:* `=XLOOKUP(E2, A2:A100, C2:C100, "nenalezeno")`

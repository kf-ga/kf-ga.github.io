Tabulkové procesory
===================

- [Referenční příručka funkcí Google Sheets](https://support.google.com/docs/table/25273)
- [Referenční příručka funkcí MS Excel](https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb)


Zápis vzorců
------------

**Vzorce** se zapisují do buňky pomocí znaku `=` za kterým následuje výraz pro výpočet obsahu buňky. Výraz může obsahovat buď konkrétní hodnoty nebo odkaz na jinou buňku. Například vzorec `=A5+10` provede součet buněk `A5` a  čísla 10, pokud dojde ke změně obsahu buňky `A5`, výsledek se automaticky přepočítá.

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

Výraz může obsahovat také volání **funkce**, která provede nějakou složitější operaci. Zápis funkce vypadá takto:

`NAME(argument1, argument2)`

kde `NAME` je **název** volané funkce `argument1`, `argument2` jsou **argumenty** (**parametry**). Každá funkce má specifikovaný počet parametrů a některé funkce mohou mít libovolný počet parametrů. Konkrétní počet a význam parametrů lze najít v dokumentaci k příslušnému tabulkovému procesoru. I když většina základních funkcí má stejný název a parametry ve všech tabulkových procesorech, u některých složitějších funkcí se může způsob použití lišit.

Kromě odkazů na konkrétní buňky mohou některé funkce pracovat také s celými rozsahy buněk. Rozsahy se zapisují počáteční a koncovou (včetně) buňkou rozsahu oddělenou dvojtečkou `:`, např. `B4:B8`, což značí rozsah od buňky B4 až do buňky B8 včetně. Rozsahy mohou být i vícerozměrné (pokud je daná funkce podporuje), např. `B4:C8`.

Dále je možné zapsat rozsah přes celý sloupec nebo řádek:

- **`B:B`**: označuje celý sloupec `B`
- **`B4:B`**: značí sloupec `B` od řádku `4` včetně
- **`7:7`**: celý řádek `7`
- **`C7:7`**: řádek `7` od sloupce `C` včetně

Při kopírování nebo přesouvání buňky se vzorcem se automaticky aktualizují odkazy na buňky a rozsahy o relativní posun vůči původní buňce. Pokud takovou funkci pro výpočet nechceme, je možné zafixovat sloupec či řádek předsazením symbolu `$`:

- **`$B7`**: fixuje sloupec `B`
- **`B$7`**: fixuje řádek `7`
- **`$B$7`**: fixuje buňku `B7`

Krom číselných parametrů nebo odkazů na buňky či rozsah mohou některé funkce podporovat i textové proměnné, které se zapisují do dvojitých uvozovek např. `"text"`.

```{admonition} Čárka nebo středník?
:class: note
Oddělovač jednotlivých parametrů je buď středník `;` nebo čárka `,` (záleží na nastavení programu).
```

Nejčastěji používané funkce
---------------------------

### Aritmetické funkce

- **`SUM(range)`**: Sečte všechny číselné hodnoty v rozsahu `range`. Text ignoruje.  
*Příklad:* `=SUM(A2:A100)`

- **`AVERAGE(range)`**: Vypočítá aritmetický průměr hodnot v rozsahu `range`.  
    
    *Příklad:* `=AVERAGE(B2:B10)`

- **`COUNT(range)`**: Vrátí počet neprázdných číselných buněk v rozsahu `range`.  
    
    *Příklad:* `=COUNT(C2:C20)`

- **`ROUND(value, decimals)`**: Zaokrouhlí číslo `value` na zadaný počet desetinných míst `decimals`. Parametr `decimals` je nepovinný a pokud není zadán, zaokrouhluje funkce na celé číslo.
    
    *Příklad:* `=ROUND(D2, 2)`

- **`ROUNDUP(value, decimals)`**: Zaokrouhlí číslo `value` nahoru na počet desetinných míst `decimals`. Parametr `decimals` je nepovinný a pokud není zadán, zaokrouhluje funkce na celé číslo nahoru.
    
    *Příklad:* `=ROUNDUP(E2, 0)`

- **`ROUNDDOWN(hodnota, decimals)`**: Zaokrouhlí číslo `value` dolů na počet desetinných míst `decimals`. Parametr `decimals` je nepovinný a pokud není zadán, zaokrouhluje funkce na celé číslo dolů. 
    
    *Příklad:* `=ROUNDDOWN(E2, 0)`


### Logické funkce

- **`IF(condition, value_if_true, value_if_false)`**: Vyhodnotí logickou podmínku `condition` a pokud je podmínka pravdivá, vrací funkce hodnotu `value_if_true`, pokud nepravdivá, vrací `value_if_false`.  
    
    *Příklad:* `=IF(A2 > 5, "ANO", "NE")` - Pokud je číslo v buňce `A2` větší než `5`, vrací funkce text `ANO`, pokud ne, vrací text `NE`

    Ve vyhodnocování podmínky je možné použít operátory `>`, `<`, `>=`, `<=`, `=`, `<>` (nerovná se). Pokud chceme testovat textovou hodnotu, nezapomeňte textu uvést do dvojitých uvozovek, např. `A4 = "hello"`.

- **`COUNTIF(range, condition)`**: Spočítá počet buněk v rozsahu `range`, které splňují zadanou podmínku `condition`. Podmínka může být například porovnání nebo textový řetězec.

    *Příklad:* `=COUNTIF(A2:A10, ">5")` - Spočítá počet buněk v rozsahu `A2:A10`, které obsahují hodnotu větší než 5.

- **`SUMIF(range, condition, [sum_range])`**: Sečte hodnoty v rozsahu `sum_range`, pokud odpovídající buňky v rozsahu `range` splňují zadanou podmínku `condition`. Pokud není `sum_range` zadán, sčítají se hodnoty přímo z `range`. Funkce podporuje pouze jednu podmínku, pokud potřebujete více podmínek, použijte `SUMIFS`.

    *Příklad:* `=SUMIF(A2:A10, ">5", B2:B10)` - Sečte hodnoty v rozsahu `B2:B10`, kde odpovídající buňky v rozsahu `A2:A10` obsahují hodnotu větší než 5.

- **`AND(condition1, condition2, …)`**: Vrátí logickou hodnotu `TRUE`, pokud jsou všechny podmínky splněny. Funkce může mít libovolný počet parametrů.

    *Příklad:* `=AND(A2 > 5, B2 < 10)`

- **`OR(condition1, condition2, …)`**: Vrátí logickou hodnotu `FALSE`, pokud je alespoň jedna podmínka splněna. Funkce může mít libovolný počet parametrů.  

    *Příklad:* `=OR(A2 > 5, B2 < 10)`

- **`NOT(condition)`**: Neguje logickou hodnotu parametru `condition`.

    *Příklad:* `=NOT(A2 = 0)`

    Funkce `AND`, `OR`, `NOT` je možné stejně jako jiné funkce vnořovat a sestavit tak komplexní logický výraz.

    *Příklad:* `=IF(OR(AND(A2 > 5, B2 = 0), A2 <= 5), "ANO", "NE")`

### Textové funkce

- **`CONCAT(text1, text2, …)`**, **`CONCATENATE(text1, text2, …)`**: Spojí více textových řetězců do jednoho. Funkce může mít libovolný počet parametrů. 

    *Příklad:* `=CONCAT(A2, " ", B2)`

- **`TEXTJOIN(delimiter, ignore_empty, text1, text2, …)`**: Spojí argumenty `text1`, `text2` (a další) oddělovačem `delimiter`. Pokud je parametr `ignore_empty` `TRUE`, přeskakuje funkce prázdné buňky. Parametry `text1`, `text2` mohou být také celé rozsahy buněk.

    *Příklad:*  `=TEXTJOIN(", ", TRUE, A2:A10)`

- **`LEN(text)`**: Vrátí délku textového řetězce.  

    *Příklad:* `=LEN(A2)`

- **`LEFT(text, count)`**: Vrátí zleva počet znaků `count` z textového parametru `text`.  

    *Příklad:* `=LEFT(A2, 3)`

- **`RIGHT(text, count)`**: Vrátí zprava počet znaků `count` z textového parametru `text`.  

    *Příklad:* `=RIGHT(A2, 2)`

- **`MID(text, start, end)`**: Vrátí část textu text od znaku na pozici `start` do znaku na pozici `end` (včetně). Index prvního znaku v řetězci je 1.  

    *Příklad:* `=MID(A2, 2, 4)`

- **`TRIM(text)`**: Odstraní nadbytečné mezery z textu `text`.  

    *Příklad:* `=TRIM(A2)`

- **`SEARCH(search, text, [start_num])`**: Vyhledá pozici prvního výskytu textu `search` v textu `text`. Volitelný parametr `start_num` určuje, od kterého znaku má hledání začít (výchozí je 1). Funkce vrací pozici nalezeného textu jako číslo, nebo chybu pokud text nenajde.

    *Příklad:* `=SEARCH("abc", A2)` – Vrátí pozici, kde se v buňce `A2` poprvé vyskytuje řetězec `"abc"`.

- **`TEXT(value, format_text)`**: Převede číslo nebo datum na text podle zadaného formátu `format_text`. Formátovací řetězec určuje, jak bude výstupní text vypadat.

    *Příklad:* `=TEXT(A2, "0.00")` - Převede číslo v buňce `A2` na text s dvěma desetinnými místy.  
    *Příklad:* `=TEXT(A2, "dd/mm/yyyy")` - Převede datum v buňce `A2` na text ve formátu `den/měsíc/rok`.

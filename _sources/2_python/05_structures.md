Datové struktury
================


Základní datové typy
--------------------

V Pythonu existuje několik základních datových typů s robustní vestavěnou funkcionalitou, která je ale opět v duchu Pythonu hodně minimalistická, intuitivní a snadno čitelná. 

### Pole `list`

Pole (**`list`**) v Pythonu je uspořádaná kolekce prvků, které mohou být různých typů. Prvky v poli jsou indexovány celočíselně od nuly, nicméně prvky v poli mohou být různého typu:

```python
arr = [1, "a", 4, None]
print(arr[2]) # 4
```

Objekt pole nabízí sadu základních funkcí a operátorů pro snadnou práci:

- `append(item)`: Přidá prvek item na konec pole.
- `insert(index, item)`: Přidá prvek item do pole na pozici index.
- `remove(item)`: Odstraní první výskyt prvku p v poli.
- `pop(index)`: Odstraní prvek na pozici index (nebo poslední, pokud index není zadán). Prvek je vrácen jako návratová hodnota funkce.
- `count(item)`: Vrací počet výskytů prvku item v poli
- `index(item)`: Vrací index prvního výskytu prvku item v poli.
- `sort(reverse=False, comp=None)`: Seřadí pole od nejmenšího prvku po největší. Volitelný parametr reverse obrátí řazení prvků a volitelný parametr comp umožňuje definovat vlastní funkci pro porovnání.
- `+`: Operátor sčítání vytvoří nové pole sloučením obou polí.

Nad poli lze tak snadno vystavět datové struktury jako pole nebo zásobník. Úplný seznam funkcí a chování polí naleznete v [dokumentaci](https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range).

### N-tice `tuple`

N-tice (**`tuple`**) je podobná poli, ale je neměnná, což znamená, že po jejím vytvoření nelze její prvky měnit. N-tice jsou také definovány pomocí kulatých závorek `()`, které ale není nutné v řadě případů explicitně zapisovat:

```python
n = "a", "b", 1
print(n) 
```

Vzhledem k tomu, že n-tice jsou neměnné, mají i omezenější sadu funkcí. Z výše uvedených funkcí pro pole, nabízí akorát funkce `count` a `index`, které mají stejný význam. Je možné také využít operátor `+`, neboť ten vytváří novou n-tici, která obsahuje prvky obou operandů.

N-tice se v Pythonu také často využívají jako návratové hodnoty funkcí, pokud je potřeba vrátit více proměnných najednou:

```python
def f(a, b):
    return a+b, a-b 

add, sub = f(2,4)
```

Výše uvedená funkce vrátí n-tici obsahující dva prvky - součet a rozdíl argumentů. Povšimněte si také, že n-tici (návratovou hodnotu) je možné "rozbalit". 

### Slovník `dict`

Slovník (**`dict`**) v Pythonu je kolekce prvků, kde každý prvek je pár `klíč:hodnota` a zapisuje se do složených závorek `{}`. Klíče musí být v rámci jednoho slovníku jedinečné a mohou být číslo nebo řetězec:

```python
d = {
    "a": 1,
    "b": 2,
    0: 3,
}
print(d["a"])
```

Slovník také nabízí pestrou sadu vestavěných funkcí:

- `get(key, default)`: Vrátí hodnotu klíče key, pokud je k dispozici, jinak vrátí default.
- `pop(key, default)`: Odstraní ze slovníku klíč key a vrátí jeho hodnotu. Pokud takový klíč neexistuje, vrátí hodnotu default.
- `keys()`: Vrátí seznam všech klíčů ve slovníku
- `values()`: Vrátí seznam všech hodnot ve slovníku
- `items()`: Transformuje slovník do seznamu dvojic (klíč, hodnota). To může být někdy praktické při procházení slovníku:

```python
for key, value in my_dict.items():
    print(f"{key}: {value}")
```
## 🔂 Úlohy na **vnořené cykly**

- `del`: Odstraní prvek ze slovníku:

```python
my_dict = {"a": 1, "b": 2}
my_dict["a"] = 3
del my_dict["b"]
my_dict["c"] = 4
```

### Množina `set`

Množina (**`set`**) v Pythonu je kolekce jedinečných prvků, což znamená, že žádný prvek v setu se nemůže vyskytovat vícekrát. Tento datový typ je velmi užitečný pro množinové operace, jako je testování členství prvku v množině, sjednocení, průniky apod.. Množina se v Pythonu definuje ve složených závorkách `{}`:

```python
my_set = {1, 2, "a"}
```

Základní funkce, které nabízí Python `set`:

- `add(item)`: Přidá prvek `item` do setu, pokud již není přítomný.
- `remove(item)`: Odebere prvek `item` ze setu s vyvolá výjimku KeyError, pokud prvek není v setu.
- `discard(item)`: Odebere prvek `item` ze setu, pokud je přítomen a nevyvolává chybu, pokud prvek není v setu.

Množinové operace:

- `union(other_set)`: Vrací nový set obsahující všechny prvky z aktuálního setu a `other_set`.
- `intersection(other_set)`: Vrací nový set obsahující prvky, které jsou jak v aktuálním setu, tak v `other_set`.
- `difference(other_set)`: Vrací nový set obsahující prvky, které jsou v aktuálním setu, ale nejsou v `other_set`.
- `symmetric_difference(other_set)`: Vrací nový set obsahující prvky, které jsou buď v aktuálním setu, nebo v druhém setu, ale ne v obou současně.
- `issubset(other_set)`: Vrací `True`, pokud jsou všechny prvky aktuálního setu obsaženy v druhém setu (test na podmnožinu).
- `issuperset(other_set)`: Vrací `True`, pokud aktuální set obsahuje všechny prvky druhého setu (test na nadmnožinu).

Každý prvek ve slovníku je unikátní a pokud přidáte již existující prvek, nebude se prvek do setu opakovaně vkládat:

```python
a = {1, 2, "a", 2}
print(a) # {1, 2, 'a'}
a.add("a")
print(a) # {1, 2, 'a'}
```

Úplný seznam funkcí slovníku a detailní popis funkcionality naleznete v [dokumentaci](https://docs.python.org/3/library/stdtypes.html#typesmapping).


Práce s poli - řezy
-------------------

**Řezy** (**slices**) je v Pythonu užitečná technika pro výběr podmnožin prvků z datových struktur, jako jsou seznamy, n-tice (tuples), a řetězce (strings). Řezy umožňují specifikovat indexy pro výběr rozsahu prvků.

Kromě základní notace `[n]` pro výběr konkrétního prvku, nabízí Python i notaci `[m:n]` umožňující výběr prvků od indexu `m` (včetně) do indexu `n` (výlučně). To znamená, že prvek na pozici `m` bude zahrnut, zatímco prvek na pozici `n` už zahrnut nebude. Návratovou hodnotou je nový seznam (případně n-tice či řetězec), který obsahuje vybrané prvky.

```python
my_list = [10, 20, 30, 40, 50]
print(my_list[1:3]) # [20, 30]
```

Nebo s řetězci:

```python
my_str = "Hello World!"
print(mys[0:4]) # Hell
```

### Prázdné indexy

Index `n`, nebo `m` může být ponechán i prázdný, což je chápáno, tak, že bere pozice úplně od začátku (`m`) resp. až na konec (`n`): 

```python
my_list = [10, 20, 30, 40, 50]
print(my_list[3:]) # [40, 50]
```

### Záporné indexy

Záporné indexy umožňují odkazovat na prvky od konce datové struktury. Například, index `-1` odkazuje na poslední prvek, `-2` na předposlední prvek.

```python
my_list = [10, 20, 30, 40, 50]
print(my_list[-3:-1]) # [30, 40]
```

Operátor in
-----------

Operátor `in` v Pythonu se používá k testování, zda se určitá hodnota nachází v sekvenci (například v proměnné typu `list`, `tuple`, `string`) nebo klíč v slovníku. Pokud je hodnota přítomna, operátor `in` vrátí `True`, v opačném případě `False`.

### Příklad se seznamem:

```python
my_list = [1, 2, 3, 4, 5]
print(3 in my_list) # True
```
### Příklad s řetězcem:

```python
my_str = "Hello, world!"
print("Hell" in my_str) # True
```

### Příklad se slovníkem:

Operátor `in` může být použit k ověření, zda se **klíč** (nikoliv hodnota) nachází ve slovníku:

```python
my_dict = {"a": 1, "b": 2}
print("a" in my_dict) # True
print(2 in my_dict) # False
```

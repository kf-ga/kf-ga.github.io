Funkce a třídy
==============

* [Tutoriál od W3C - Funkce](https://www.w3schools.com/python/python_functions.asp)
* [Tutoriál od W3C - Třídy](https://www.w3schools.com/python/python_classes.asp)

Funkce v Pythonu
----------------

Funkce v Pythonu jsou definovány klíčovým slovem `def` následovaným názvem funkce a závorkami `()`, které mohou obsahovat parametry (argumenty). Funkce mohou vrátit hodnotu pomocí klíčového slova `return`.

```python
def fn(arg1, arg2):
    r = arg1 + arg2
    return r
```

Pokud funkce neobsahuje příkaz `return`, implicitně vrací `None`.

### Výchozí hodnoty

V definici funkce je možné specifikovat i výchozí hodnoty pro argumenty funkce:

```python
def fn(arg1, arg2=0):
    r = arg1 + arg2
    return r

fn(1)
```

### Použití názvu parametru

Python umožňuje explicitně definovat název parametru při volání funkce. Není tak potřeba dodržovat pořadí parametrů tak, jak bylo dáno v definici:

```python
def f(a, b):
    print(f"a:{a}, b:{b}")

f(b=1, a=2)
```

Pokud je při volání funkce použit název argumentu, označuje se takový argument jako **pojmenovaný argument** (**keyword argument**).


### Argumenty `args`, `kwargs`

Často se v definicích funkce setkáme s argumenty `*args` (**positional arguments**) a `**kwargs` (**keyword arguments**), které umožňují psát funkce, které přijímají proměnlivý počet argumentů. 

#### `*args`

Argument `*args` slouží k předávání proměnlivého počtu pozičních argumentů do funkce. Umožňuje, aby funkce přijala libovolný počet argumentů a zachází s nimi jako s polem.

```python
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))         # 6
print(sum_all(1, 2, 3, 4, 5))   # 15
```

#### `**kwargs`

Argument `**kwargs` slouží k předávání proměnlivého počtu pojmenovaných (klíč-hodnota) argumentů do funkce. Umožňuje, aby funkce přijala libovolný počet pojmenovaných argumentů a zachází s nimi jako se slovníkem.

```python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(job="Developer", company="Tech Inc.", country="USA")
# job: Developer
# company: Tech Inc
# country: USA
```

#### Kombinace `*args` a `**kwargs`

Je možné použít `*args` a `**kwargs` ve stejné funkci, což umožňuje přijímat variabilní počet jak pozičních, tak pojmenovaných argumentů:

```python
def mixed_args(*args, **kwargs):
    print(f"Positional arguments {args}")
    print(f"Keyword arguments {kwargs}")

mixed_args(1, 2, 3, name="Alice", age=30)
# Positional arguments: (1, 2, 3)
# Keyword arguments: {'name': 'Alice', 'age': 30}
```

A obojí je možné kombinovat i s klasickými argumenty funkce:

```python
def mixed_args_two(a, b, *args, **kwargs):
    print(f"Positional arguments {args}")
    print(f"Keyword arguments {kwargs}")

mixed_args_two(1, 2, name="Alice", age=30)
```

Platí při tom, že při volání musí být poziční argumenty předány jako první a po nich následují pojmenované argumenty.

### Třída v Pythonu

Třídy v Pythonu se definují klíčovým slovem `class`, které je následováno názvem třídy a dvojtečkou. Tělo třídy může obsahovat metody (které jsou funkce definované uvnitř třídy). Nová instance třídy se vytváří notací volání funkce `()`, bez žádného klíčového slova:

```python
class MyClass:
    def __init__(self, a):
        self.attribute = a
    
    def my_method(self, p):
        print(f'Attribute value is {self.attribute}, argument is {p}')

obj = MyClass(5)
obj.my_method("Hello")
```

Klíčové slovo `self` odkazuje v definici třídy na aktuální instanci a je potřeba ho uvést jako první parametr metod třídy. Pokud argument `self` neuvedete, metoda se chápe jako statická (váže se k třídě, ne k instanci třídy). Při samotném volání metody instance se "automaticky" jako první argument metody (`self`) dosazuje instance třídy.

### Speciální metody

Každý objekt obsahuje také speciální metody, které upravují chování objektů při použití Python syntaxe:

- `__init__`: Konstruktor, volá se při vytvoření instance třídy
- `__str__`: Vrátí textovou reprezentaci objektu. Je volána pokud přetypováváte objekt na řetězec (`str(obj)`).

Speciální funkce umožňují obohatit syntaxi vašich tříd o operace jako porovnávání nebo procházení cyklem `for` apod. Úplný seznam těchto funkcí naleznete v [dokumentaci Python](https://docs.python.org/3.12/reference/datamodel.html#special-method-names).

### Dědění tříd

Dědění umožňuje třídě zdědit metody a atributy z jiné třídy:

```python
class Animal:
    def __init__(self, name):
        self.name=name

    def hello(self):
        print(f"My name is {self.name}")

class Dog(Animal):
    def hello(self):
        super().hello()
        print(f"Bark, bark!")

dog=Dog("Rex")
dog.hello()
# My name is Rex
# Bark, bark!
```

Volání metody rodičovské třídy v odvozené třídě lze provést pomocí funkce `super()`.

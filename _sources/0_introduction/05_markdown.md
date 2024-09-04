Markdown
========

[Detailní přehled Markdown syntaxe](https://www.markdownguide.org/basic-syntax/)

Markdown je značkovací jazyk s jednoduchou syntaxí, navržený tak, aby byl snadno čitelný a upravitelný v jednoduchém (plain text) textovém editoru a zároveň převeditelný do formátovacích jazyků, které nabízí lepší možnosti formátování textu jako třeba HTML nebo LaTeX. Markdown se daleko striktněji zaměřuje na samotný obsah a oproti HTML obsahuje daleko méně informací formě prezentace. Často se označuje jako *strukturovaný text*, který se pak podle potřeby a možností dá snadno zobrazovat v různých formách.

Základní formátovací značky
---------------------------

### Nadpisy

```{myst-example}
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

#### Tučné písmo, kurzíva

```{myst-example}
**tučné písmo** nebo __tučné písmo__

*kurzíva* nebo _kurzíva_

***tučná kurzíva*** nebo ___tučná kurzíva___
```
#### Seznamy

Nečíslované seznamy:
```{myst-example}
- Položka 1
- Položka 2
  - Podpoložka 2.1
```

Číslované seznamy:

```{myst-example}
1. Položka 1
2. Položka 2
    1. Podpoložka 2.1
```

#### Literál

```{myst-example}
Zobrazení `literálu` přímo v textu
```

#### Zdrojový kód

````{myst-example}
  ```python
  print("Hello, World!")
  ```
````

#### Tabulky

```{myst-example}
| Hlavička 1 | Hlavička 2 |
|------------|------------|
| Buňka 1    | Buňka 2    |
| Buňka 3    | Buňka 4    |
```


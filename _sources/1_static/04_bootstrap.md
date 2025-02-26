Bootstrap framework
===================

* [Oficiální dokumentace Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
* [Tutoriál Bootstrap 5 od W3C](https://www.w3schools.com/bootstrap5/index.php)

Bootstrap je jeden z nejpopulárnějších frontend frameworků pro rychlý vývoj responzivních webových aplikací. Byl vyvinutý týmem v Twitteru a poprvé vydán v roce 2011. Bootstrap poskytuje rozsáhlou sbírku předdefinovaných CSS stylů, komponent a JavaScript pluginů, které usnadňují vývoj kvalitního a vizuálně přitažlivého webového uživatelského rozhraní. 

Nastavení Bootstrapu
--------------------

Nejjednodušší způsob, jak začít používat Bootstrap, je přidat do `<head>` soubor se styly pro Bootstrap:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
```

A na konec `<body>` (před `</body>` tag) JavaScript:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
```

První soubor je CSS s definicemi stylů pro Bootstrap prvky, druhý je pak JavaScript, který některým Bootstrap prvkům přidává interaktivitu.

Bootstrap je sadou definic CSS stylů (tříd), které se aplikují na HTML elementy. Přidáváním těchto tříd k HTML elementům může vývojář snadno vytvořit nejen základní responzivní layout stránky, ale i velkou škálu prvků stránky jako tlačítka, navigační menu, formuláře a další komponenty, které z hlediska chování a vzhledu respektují obvyklou praxi ve světě webových aplikací.

Tvorba layoutu
--------------

### Breakpointy

V Bootstrapu je **breakpoint** klíčový pojem, který odkazuje na šířku viewportu. Na základě techto breakpointů se mění chování prvků na stránce podle toho jak je obrazovka aktuálně široká. Bootstrap využívá několik předdefinovaných breakpointů, a pracují s minimální šířkou viewport:

- **Extra small**, **`xs`**: Aplikuje se pro všechna zařízení a nemá minimální šířku. Styly pro `xs` jsou aplikovány, dokud není dosaženo dalšího breakpointu.
- **Small**, **`sm`**: Aplikuje se pro viewport s minimální šířkou 576px.
- **Medium**, **`md`**: Aplikuje se pro viewport s minimální šířkou 768px.
- **Large**, **`lg`**: Aplikuje se pro viewport s minimální šířkou 992px.
- **Extra large**, **`xl`**: Aplikuje se pro viewport s minimální šířkou 1200px.
- **Extra extra large**, **`xxl`**: Aplikuje se pro viewport s minimální šířkou 1400px.

Zkratky pro breakpointy se pak objevují v řadě CSS tříd, jak uvidíme dále.

### Kontejnery

V Bootstrapu jsou **kontejnery** základním stavebním prvkem, který umožňuje uspořádat obsah stránky do čitelné a strukturované formy. Existují tři typy kontejnerů:

- **`.container`**: Tento standardní kontejner je responzivní s pevnou šířkou, která se mění v závislosti na velikosti viewportu. Například na velkých obrazovkách bude mít kontejner šířku 1140px, zatímco na středních bude mít 720px.
- **`.container-fluid`**: Kontejner, který je vždy 100% široký bez ohledu na velikost viewportu. Využívá se pro designy, které potřebují využít celou šířku viewportu.
- **`.container-{breakpoint}`**: Tyto kontejnery umožňují kontejnerům být fluidními až do specifického breakpointu. Například `.container-md` je fluidní do velikosti viewportu Medium (768px) a má pevnou šířku pro větší viewporty.

Chování kontejnerů je přesně popsáno v tabulce [zde](https://getbootstrap.com/docs/5.3/layout/containers/).

Kontejner může fungovat samostatně, ale obvykle se do něj vkládají **řádky** (**rows**) a do nich **sloupce** (**columns**) u kterých se opět definuje, jak se mají chovat v různých zařízeních. Toto skládání je založeno na CSS flexboxu a v Bootstrapu se označuje jako **grid**:

```html
<div class="container">
    <div class="row">
        <div class="col">Sloupec 1</div>
        <div class="col">Sloupec 2</div>
        <div class="col">Sloupec 3</div>
    </div>
</div>
```

Tento kód vytvoří tři sloupce, které se rovnoměrně rozdělí v rámci kontejneru. Bootstrap ale umožňuje daleko flexibilnější kontrolu nad šířkami sloupců v kontejneru. Každý kontejner je rozdělen na 12 sloupců, a třídy `col` je možné doplnit o číslo od 1 do 12, která určuje, kolik sloupců v kontejneru má zabírat:

```html
<div class="container">
    <div class="row">
        <div class="col-4">Sloupec šířky 4/12</div>
        <div class="col-6">Sloupec šířky 6/12</div>
        <div class="col-2">Sloupec šířky 2/12</div>
    </div>
</div>
```
Pokud by se stalo, že další sloupec by nebylo již v řádku místo, přeteče do nového řádku.

Třídy `col` navíc mohou obsahovat i zkratku breakpointu, která určuje **od** které velikosti viewportu se má šířka displeje aplikovat, např.:

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">Sloupec šířky 4/12, ale až od velikosti Medium</div>
        <div class="col-md-4">Sloupec šířky 4/12, ale až od velikosti Medium</div>
        <div class="col-md-4">Sloupec šířky 4/12, ale až od velikosti Medium</div>
    </div>
</div>
```

Styly třídy `.col-md-4` zde platí až od velikosti Medium, pro menší zařízení se elementy `<div>` chovají jako jako standardní blokové elementy a jsou zobrazeny pod sebou. Takto lze tedy vytvořit třísloupcový layout stránky pro Medium (a větší) zařízení, který se ale zobrazí pod sebou na menších zařízeních. 


```{admonition} Poznámka
:class: note
Pokud třída `col` nemá u sebe žádnou zkratku breakpointu, chápe se to jako výchozí velikost platící od nejmenšího viewportu (`xs`).
```

Třídy lze navíc kombinovat a definovat tak chování pro celou škálu velikostí zařízení, například:

```html
<div class="container-lg">
    <div class="row">
        <div class="col-md-4 col-lg-2">První sloupec</div>
        <div class="col-md-4 col-lg-8">Druhý sloupec</div>
        <div class="col-md-4 col-lg-2">Třetí sloupec</div>
    </div>
</div>
```
Vyzkoušejte si jak se chová předchozí rozvržení na různých velikostech zařízení.

Bootstrap kontejnery jsou mocným nástrojem a všechny funkce a možnosti naleznete v [oficiální dokumentaci](https://getbootstrap.com/docs/5.3/layout/grid/).

Využití Bootstrap komponent
---------------------------

Bootstrap nabízí pestrou škálu předstylovaných komponent respektující obvyklou praxi při návrhu uživatelských rozhraní na webu. Podívejme se na některé z nich.

### Tlačítka

Tlačítka se v Bootstrapu definují pomocí třídy `btn` a poté třídy `btn-{color}`, kde `{color}` je jedna z následujících hodnot `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` nebo `link`.

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>
```

Alternativně je možné přidat třídu `btn-outline-{color}`, což zobrazí tlačítko s ohraničením, ale bez barvy pozadí. Případně `btn-lg` pro velké nebo `btn-sm` pro malé tlačítka:

```html
<button type="button" class="btn btn-primary btn-lg">Primární akce</button>
<button type="button" class="btn btn-outline-secondary btn-sm">Alternativní akce</button>
```

Často se také hodí použít styl zobrazení tlačítka pro obyčejné odkazy:

```html
<a class="btn btn-primary">Primární akce</a>
<a class="btn btn-secondary">Alternativní akce</a>
```

### Navigační lišta

Navigační lišta je jednou z nejdůležitějších komponent, které se používají na webu. Pomocí navigační lišty se uživatel může pohybovat mezi jednotlivými stránkami webu. Bootstrap umožňuje jednoduše vytvořit responzivní navigační lištu pomocí třídy `navbar`:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
```

Příklad z [dokumentace Bootstrapu](https://getbootstrap.com/docs/5.3/components/navbar/), kde také naleznete detailní vysvětlení a další možnosti jak navigační lištu tvořit.

Tato navigační lišta obsahuje několik odkazů, které se ale na menších zařízeních (hranici menšího určuje třída `.navbar-expand-lg` s breakpointem na Large) zobrazí do rozbalovacího menu. Pokud chcete, aby navigační lišta byla vždycky zobrazena, stačí přidat třídu `.navbar-expand` (tedy žádný breakpoint) do navigační lišty.

### Obrázky

I pro obyčejné obrázky je většinou důležité se chovat správně v různých situací. Bootstrap nabízí opět [celou paletu](https://getbootstrap.com/docs/5.3/content/images/) nástrojů jak s obrázky pracovat. Je libo například responzivní obrázek:

```html
<img src="..." class="img-fluid" alt="...">
```

Nebo kulatý obrázek tak oblíbený na webu pro zobrazování portrétů:

```html
<img src="cinqueterre.jpg" class="rounded-circle" alt="Cinque Terre">
```

Toto je jen malá ukázka z prvků Bootstrapu, které můžete využít pro rychlou tvorbu moderně vypadajícího designu stránky. Vše ostatní naleznete v [oficiální dokumentaci](https://getbootstrap.com/docs/5.3/getting-started/introduction/) nebo [Tutoriálu od W3C](https://www.w3schools.com/bootstrap5/index.php).
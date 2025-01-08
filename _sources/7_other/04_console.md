Základy práce v konzoli
=======================

Základní Linuxové příkazy
-------------------------

### Výpis adresáře `ls`

- `ls`: Výpisu obsahu adresáře
- `ls -la`: Výpisu obsahu adresáře s detailními informacemi o souborech a složkách
- `ls my_dir`: Výpisu obsahu adresáře `my_dir`

### Změna adresáře `cd`

Slouží ke změně aktuálního adresáře

- `cd my_dir`: Změní aktuální adresář na `my_dir`.
- `cd`, `cd ~`: Změní adresář na domovský adresář (home). Symbol `~` je obecně zkratka pro home adresář, lze pomocí něj adresovat i podadresáře v home, např.: `~/.ssh`. 
- `cd ..`: Změní aktuální adresář na nadřazený adresář.
- `cd -`: Přepne zpět do předchozího adresáře.
- `cd /`: Přepne do kořenového adresáře.

### Vytvoření adresáře `mkdir`

- `mkdir my_dir`: Vytvoří v aktuálním adresáři nový adresář v s názvem `my_dir`.

### Odstranění souboru `rm`

Příkaz `rm` slouží k odstranění souboru nebo adresáře. Například:

- `rm file.txt`: Odstraní soubor `file.txt`.
- `rm -r my_dir`: Odstraní adresář `my_dir` a všechny jeho podadresáře a soubory.


Klávesové zkratky v konzoli
---------------------------

Moderní konzole podporují celou řadu klávesových zkratek, které hodně zjednodušují práci.

### Prohledávání historie `Ctrl + R`

Prohledávání historie příkazů můžete provést pomocí klávesové zkratky `Ctrl + R`. Začněte psát část příkazu a konzole automaticky vyhledá odpovídající příkaz z historie.

### Přerušení procesu `Ctrl + C`

Pro přerušení běžícího procesu (například když se vám něco zacyklí) použijte klávesovou zkratku `Ctrl + C`. Stejná zkratka také vymaže aktuální příkaz, který máte rozepsaný v konzoli.

### Pohyb v historii `↑`, `↓`

Pomocí šipek nahoru a dolů se můžete pohybovat v historii příkazů

### Pohyb v příkazu `Ctrl + ←`, `→`

Pomocí zkratky `Ctrl + ` šipky doleva a doprava a se můžete pohybovat v rámci aktuálního příkazu po blocích.

### Doplňování příkazů `Tab`

Stisknutím klávesy `Tab` můžete automaticky doplnit příkaz nebo název souboru/adresáře. Pokud existuje více možností, stiskněte `Tab` dvakrát rychle za sebou pro zobrazení všech možností. Funguje také (někdy) pro zobrazení možností parametrů příkazů. 
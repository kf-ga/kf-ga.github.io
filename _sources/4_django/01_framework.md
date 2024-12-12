Webové frameworky
=================

* [Domovská stránka Django](https://www.djangoproject.com)

K čemu framework?
-----------------

Frameworky na tvorbu webových stránek vznikly jako reakce na rostoucí složitost a požadavky na moderní webové aplikace. V průběhu let se webové technologie vyvíjely z jednoduchých statických stránek na složité interaktivní aplikace, což znamenalo, že vývojáři museli investovat více času a úsilí do správy kódu, zabezpečení a optimalizace výkonu. Frameworky nabízejí hotové komponenty a nástroje, které umožňují vývojářům rychleji a efektivněji vytvářet robustní a bezpečné webové aplikace. Použitím frameworku mohou týmy snížit množství redundantního kódu, dodržovat osvědčené postupy a soustředit se více na unikátní aspekty a funkce svých projektů.


Framework Django
----------------

Django je vysokoúrovňový webový framework napsaný v Pythonu, který byl vytvořen s cílem usnadnit rychlý vývoj čistých, funkčních a bezpečných webových aplikací. Django klade důraz na DRY princip. S jeho silným ekosystémem vývojářů a širokou škálou hotových knihoven podporuje vývoj různých typů webových aplikací, od jednoduchých osobních blogů po složité podnikové systémy.

```{admonition} Neopakuj se!
:class: tip
**DRY** (**Don't repeat yourself**) je princip vývoje nejen u webových aplikací, kdy se klade důraz na minimalizaci duplicitního kódu nebo chování aplikace. Pokud jsou na dvou nebo více místech v aplikaci stejné nebo velmi podobné kusy kódu, je to podle DRY principu chybný stav a kód by měl být upraven tak, aby duplicity neobsahoval.

Django, jak uvidíme později, nabízí celou řadu nástrojů, jak duplicity eliminovat, nebo ideálně je ani při psaní aplikace nevytvářet.
```

### Architektura MVT

Django používá architekturu **MVT** (**Model-View-Template**), což je obdoba architektury **MVC** (**Model-View-Controller**). V MVT architektuře je část **Model** zodpovědná za správu dat a logiku aplikace a zajišťuje komunikaci s databází, **View** zpracovává HTTP požadavky přicházející z klienta a vytváří HTTP odpovědi, a **Template** se stará o prezentaci dat uživateli. Tato architektura umožňuje jasné oddělení jednotlivých částí aplikace, což usnadňuje její údržbu a rozšiřování.

### ORM

Django obsahuje vestavěný **ORM** (**Object-Relational Mapping**), což je nástroj, který umožňuje vývojářům pracovat s databázemi pomocí objektově orientovaného programování. ORM mapuje **databázové tabulky na Python třídy** a **řádky tabulek na instance** těchto tříd. Díky tomu mohou vývojáři manipulovat s databázovými daty pomocí Python kódu, aniž by museli psát SQL dotazy a zjednodušuje a zrychluje práci s databázemi.
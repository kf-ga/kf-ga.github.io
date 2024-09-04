Úvod do internetových technologií
=================================

Internet a Web
--------------

**Internet** je celosvětová síť vzájemně propojených počítačů, která umožňuje komunikaci a přenos dat mezi těmito počítači. Jeho počátky sahají do 60. letech 20. století, kdy vědci pod záštitou amerického ministerstva obrany začali vytvářet síť (původně projekt [ARPANET](https://en.wikipedia.org/wiki/ARPANET)) ke komunikaci a sdílení informací mezi vzdálenými počítači pro výzkumné a vojenské účely. 

```{admonition} Velký Internet
:class: note
Protože Internet je jméno této celosvětové sítě, píšeme ho s velkým I.
```

**Web** neboli **World Wide Web** zkráceně **WWW**, často zaměňovaný s Internetem, je ve skutečnosti jednou z mnoha služeb dostupných na Internetu. Web vytvořil v roce 1989 [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) v CERNu a zahrnuje *webové stránky*, které jsou přístupné pomocí *webových prohlížečů*.

Web je jen jednou z mnoha služeb postavených na Internetu. Mezi další služby Internetu patří například e-mail, FTP (File Transfer Protocol), VoIP ale třeba i online hry a celá řada dalších. Web se však stal jednou z nejpopulárnějších služeb, protože poskytuje interaktivní a vizuálně přitažlivou formu prezentace informací a komunikaci s uživatelem skrze všeobecně dostupné webové prohlížeče.


Základní architektura Webu
--------------------------

Základním principem fungování webu je interakce mezi uživatelem a serverem skrze Internet. Na straně uživatele (která se označuje jako **klient**) je třeba řešit zejména prezentaci informací, což je hlavní úkol webového prohlížeče. Na straně **server**u pak běží aplikace, která definuje vnitřní logiku, funkce, ukládá data v *databázi* atd..

Koncept klient-server je důležitým vývojářským paradigmatem, který se často objevuje ve webových technologiích, ale i v jiných oblastech IT. Klient je *aktivní*, *zasílá požadavky* na server. Server je *pasivní*, *čeká na příchozí požadavky* od klienta a poskytuje odpovědi, například v podobě webových stránek.

```{mermaid}
graph LR
    A[fa:fa-male]:::NB <--> B[Webový prohlížeč]
    B <--> C(Internet)
    C <--> D[Webový server]
    D <--> E[(Databáze)]

    subgraph Klient
        B
    end
    subgraph Server
        D
        E
    end

    classDef NB fill:none,stroke-width:0,font-size:1em
```

V první části předmětu se budeme věnovat technologiím klienta, což jsou zejména formátovací jazyky HTML a CSS. Dále se seznámíme ze základy JavaScriptu, který umožňuje interaktivitu s prvky ve webové stránce. Část webové aplikace, kterou uživatelé vidí a se kterou mohou interagovat přímo v jejich webovém prohlížeči, se také označuje jako **front-end**. Zahrnuje disciplíny jako design webu, uživatelského rozhraní (user interface), user experience (UX, neboli jaký zážitek uživateli webová stránka přinese) a další. 

V druhé části se pak budeme věnovat zejména straně serveru, naučíme se programovat webovou aplikaci a seznámíme se detailněji s principy fungování Webu. Část webové aplikace, která běží na serveru se také označuje jako **back-end**. Zahrnuje disciplíny jako programování aplikace, databázové technologie, komunikace mezi serverem a klientem, zabezpečení a další.

```{admonition} Hurá na to!
:class:note
Tato dokumentace poskytuje základní přehled o technologiích Webu a má sloužit jako rozcestník pro další informace.
```

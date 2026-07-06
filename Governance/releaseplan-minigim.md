# Releaseplan & Releaseproces: Van MiniGIM 0.9.1 naar 1.0
**Project:** Minimaal Gebied Informatie Methodiek (MiniGIM)  
**Status:** Concept ten behoeve van de Stuurgroep / Opdrachtgever  
**Datum:** 20 maart 2026  

---

## 1. Introductie & Context

De landelijke woningbouwopgave is groot, complex en uiterst urgent. Ruimtelijke projecten, met name binnenstedelijke ontwikkelingen, kampen met ingewikkelde randvoorwaarden zoals netcongestie, geluid, milieuregels, waterveiligheid en complexe besluitvormingsprocedures [2, 85]. Om vertraging, herontwikkeling en onnodig hoge faalkosten te voorkomen, is er behoefte aan een slimmere, transparantere en meer datagedreven samenwerking tussen alle betrokken stakeholders (overheden, ontwikkelaars en corporaties) [3, 85, 126]. 

Binnen de *Strategische Samenwerkingsagenda Toekomstbestendige Gebiedsontwikkeling* (ondertekend door DMI, IOP en Agenda Stad) is afgesproken om te zoeken naar schaalbare, nieuwe werkwijzen en standaarden die de uitvoeringskracht van gebiedsontwikkeling structureel versterken . 

Het project **MiniGIM** (Minimaal Gebied Informatie Model) vormt hierin een cruciaal instrument. Door een minimale set van gebiedsontwikkelingsinformatie in een vroege planfase digitaal samen te brengen, ontstaat een **Common Operational Picture (COP)**: één betrouwbare, gedeelde informatiebron waarover stakeholders de dialoog kunnen voeren . 

Dit releaseplan beschrijft het gestructureerde proces om de conceptversie van de Omgevingsanalyselijst (v0.9.1) door te ontwikkelen en te publiceren als de officieel gedragen landelijke standaard (v1.0) .

---

## 2. Doel & Scope van de Release (0.9.1 → 1.0)

Het doel van deze release is het transformeren van een hoofdzakelijk door marktpartijen opgestelde checklist (v0.9.1) naar een breed gedragen, landelijk toepasbare standaard (v1.0) waarin ook de belangen, aandachtspunten en bronregistraties van overheden (gemeenten) en normalisatie-instituten volledig zijn geïntegreerd .

### 2.1 Belangrijkste wijzigingen in scope en opzet:
*   **Van "Thema's" naar "Modules":** Om aan te sluiten bij de behoeften van gemeenten en de koppeling te leggen met **MiniSIM** (stedelijk niveau) en **MiniBIM** (projectniveau), wordt de structuur omgevormd tot 12 gestandaardiseerde, functionele *modules* .
*   **Integratie van Publieke Eisen:** Toevoegen van gemeentelijke en provinciale randvoorwaarden (zoals hittestress, overstromingsrisico's, specifieke hulpdiensteneisen en de milieuregels onder de Omgevingswet) .
*   **Leveranciersonafhankelijkheid:** Het borgen dat softwareleveranciers (GIS- en digital twin-specialisten) de datalagen correct kunnen inladen en visualiseren via open standaarden (zoals OGC, cityGML en CityJSON) .
*   **Koppeling met de Grondexploitatie (GREX):** De Omgevingsanalyselijst moet naadloos aansluiten op de GIM Informatie Leverings Specificatie (ILS) om 3D-BIM-ontwerpvarianten rechtstreeks door te rekenen in de GREX .

---

## 3. Fasering & Timeline (16 Weken)

De doorlooptijd van het releaseproces is vastgelegd op exact **16 weken** (circa 4 maanden) en kent een parallelle opbouw langs strategische en operationele mijlpalen :

```
   Week 1 - 6                 Week 6 - 10                 Week 10 - 16
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│ Fase A: Inrichting &   │  │ Fase B: Consultatie,   │  │ Fase C: Validatie,     │
│ Definitie Kwaliteits-  │──►│ Consistentietoets &    │──►│ Sluiting Issues &      │
│ kader                  │  │ Conceptset 1.0         │  │ Vaststelling Release   │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

### Fase A: Inrichting & Definitie (Week 1 t/m 6)
*   **Inrichten releaseproces:** Vastleggen van de definitieve scope voor 1.0, het versiebeheer en de overkoepelende planning .
*   **Kwaliteitskader:** Opstellen van expliciete acceptatiecriteria, reviewformats en toetsbare testcases ten behoeve van softwareleveranciers .
*   **Startafspraken:** Maken van werkafspraken met leveranciersduo's voor de kruisreviews en het selecteren van een koploper-gemeente en pilotproject als validatiecontext .
*   **Roadmap-initiatie:** Ophalen en ordenen van de eerste gebruikersbehoeften bij gemeenten en gebiedsteams om de strategische roadmap op hoofdlijnen te schetsen .

### Fase B: Consultatie, Consistentietoets & Concept (Week 6 t/m 10)
*   **Brede consultatie:** Actief ophalen van feedback bij gemeenten en marktpartijen. Er geldt een harde deadline voor inbreng: **30 juni** .
*   **Consistentieborging:** Controleren van de eenduidige terminologie en definities tussen de Omgevingsanalyselijst en de ILS .
*   **Kruisreviews (Cross-reviews):** Coördineren van de reviews tussen de leveranciersduo's op elkaars software-implementaties .
*   **Oplevering conceptset 1.0:** Samenstellen van de concept-vaststellingsset inclusief een gedetailleerde issue- en maatregelenlijst .
*   **Roadmap-uitwerking:** Uitwerken van de strategische roadmap met adoptiepaden (hoe MiniGIM te laten landen in lokale processen) .

### Fase C: Validatie, Sluiting & Vaststelling (Week 10 t/m 16)
*   **Sluiting van issues:** Oplossen en formeel sluiten van alle kritieke "major issues" uit de consultatieronde en reviews .
*   **Pilot-validatie:** Toetsen van de conceptset 1.0 in de praktijk. Dit omvat een **eerste functionele koppeling tussen het 3D-gebiedsmodel en een gemeentelijke grondexploitatie (GREX)** .
*   **Vaststellingsdocumenten:** Opstellen van de definitieve release 1.0, de bijbehorende beslisnotities en de open-puntenlijst voor de Stuurgroep .
*   **Mijlpaal en Lancering:** Formele vaststelling en deblokkering door de Stuurgroep, presentatie aan de NEPROM (initiërende gebiedsontwikkelaars) en de publieke lancering van MiniGIM 1.0 .

---

## 4. Inhoudelijke Doorontwikkeling per Module

Tijdens het releaseproces worden de oorspronkelijke thema's uit v0.9.1 grondig herzien en getransformeerd naar modules van de uniforme themalijst.

---

## 5. Kwaliteitsborging & Onafhankelijke Toetsing

Om de betrouwbaarheid en objectieve toetsbaarheid van de 1.0-release te borgen, hanteert het releaseproces vier vaste kwaliteitspoorten:

1.  **De Software Matrix:** Softwareleveranciers moeten door middel van gestandaardiseerde testcases en outputs bewijzen dat hun GIS- en digital twin-systemen de modules uit de lijst conform de gestelde data-eisen kunnen inladen en visualiseren .
2.  **Kruisreviews (Cross-reviews):** Leveranciers worden ingedeeld in duo's en voeren kruisreviews uit op elkaars data-exports en processtappen om inconsistenties objectief bloot te leggen .
3.  **Het Sluiten van Major Issues:** Alle bevindingen worden vastgelegd in een centrale issue- en maatregelenlijst. Alle kritieke fouten of grote inconsistenties ("major issues") moeten verplicht zijn opgelost en formeel gesloten voordat de release ter vaststelling kan worden voorgelegd .
4.	**Governance:** Vaststellen van het eigendom en de publicatie licentie. Voorstel voor beheer en goverance structuur.

---

## 6. Governance & Besluitvormingsstructuur

Om een evenwichtige belangenafweging tussen marktpartijen en publieke belangen te garanderen, is het releaseproces opgehangen aan een heldere governance-structuur op drie niveaus :

### 6.1 Strategisch Niveau: De Stuurgroep
*   **Mandaat:** Neemt de formele beslissing over het deblokkeren van releases, het goedkeuren van de roadmap en de strategische prioriteiten . 
*   **Samenstelling:** Programmamanagers vanuit de betrokken publiek-private programma's (IOP/DMI) .

### 6.2 Tactisch Niveau: Het Coördinatieteam
*   **Mandaat:** Bereidt de strategische voorstellen voor, bewaakt de voortgang van de werkpakketten en coördineert de afstemming met externe stelsels (zoals Geonovum, DigiGO en het DSGO) .
*   **Samenstelling:** Coördinatoren van de samenwerkingsagenda en programma-adviseurs .

### 6.3 Operationeel Niveau: Het Beheerteam
*   **Mandaat:** Verantwoordelijk voor het opstellen en prioriteren van de productbacklog, de directe operationele regie over het releaseproces, het borgen van terminologische consistentie en het voorbereiden van beslisnotities voor de Stuurgroep .
*   **Marktacceptatie:** Afstemming van wijzigingen met de digitaliseringscommissie van de **NEPROM** (de eigenaar en initiator van de standaard) en gemeentelijke koplopers om de dagelijkse bruikbaarheid te garanderen .

---

## 7. Projectmatig Versiebeheer (Lokaal Gebruik)

Het releaseproces introduceert een bindend beleid voor het gebruik van de Omgevingsanalyselijst binnen individuele, langlopende gebiedsontwikkelingen. Omdat gedurende een project van 10 jaar nieuwe landelijke datareleases of updates van de lijst beschikbaar komen, moeten stakeholders vooraf schriftelijk vastleggen welk keuzemodel zij hanteren :

*   **Model A (Bevriezen):** Partijen houden vast aan de situatie en dataset zoals bekend bij de nulmeting (bevroren dataset) .
*   **Model B (Dynamisch aanpassen):** Analyses, risicoberekeningen en ontwerpen worden continu en dynamisch aangepast op basis van de meest recente datareleases van bronhouders .


---
*Gepubliceerd via DMI en de GitHub-organisatie van Minimum Information Models.* 

# Beleidsdocument Beheer & Governance: MiniGIM Omgevingsanalyselijst

**Versie:** 2.0 (Vastgesteld Beheerskader)  
**Status:** Concept Beleidsdocument  
**Datum:** 6 juli 2026  
**Eigendom:** Vereniging van Projectontwikkelaren (NEPROM)  
**Beheer:** Gedelegeerd aan een nader te bepalen Beheerteam  

---

## 1. Doelstelling en Reikwijdte (Scope)

### 1.1 Doel van de Omgevingsanalyselijst
De **MiniGIM Omgevingsanalyselijst** is ontwikkeld als een complete, landelijk uniforme checklist met omgevingsanalyses, risico’s en inventarisaties op gebiedsniveau. Het doel van de lijst is om in een vroeg stadium van gebiedsontwikkeling fysieke, beleidsmatige en juridische risico’s en kansen gestructureerd in kaart te brengen. Dit voorkomt dat essentiële analyses ontbreken of te laat worden uitgevoerd, wat leidt tot faalkosten, vertraging of kostbare herontwikkeling. 

Door het systematisch doorlopen van de analyses in deze lijst ontstaat een **Common Operational Picture (COP)**: een gedeeld, betrouwbaar en uniform digitaal beeld van het ontwikkelgebied. Hierover kunnen overheden, marktpartijen en corporaties een transparante, datagedreven dialoog voeren.

### 1.2 Reikwijdte van het Beheer
Dit beleidsdocument regelt de governance, de procedures voor wijziging, de kwaliteitsborging en het releasebeheer van de landelijke standaard-Omgevingsanalyselijst. Het beheer richt zich op:
1.  De semantische definitie, terminologie en consistentie van de 12 modules (Participatie, Locatie, Topografie, Mobiliteit, Bodem en water, Kabels en leidingen, Energie, Ruimtelijke ordening, Milieu, Veiligheid, Statistiek en Identiteit).
2.  De koppeling met landelijke openbare bronregistraties (zoals PDOK, CBS en Atlas Leefomgeving).
3.  De afstemming met softwareleveranciers om de technische implementatie van de analyses in GIS- en digital twin-systemen te valideren.
4.  De samenhang met de MiniGIM Informatie Leverings Specificatie (ILS) ter onderbouwing van de grondexploitatie (GREX).

---

## 2. Governance en Verantwoordelijkheden

Omdat de eigendomsrechten van de MiniGIM-standaard berusten bij de NEPROM, maar de feitelijke uitvoering van het beheer door een onafhankelijke entiteit moet worden ingericht, is de governance verdeeld over strategische, tactische en operationele rollen. Dit borgt de publiek-private samenwerking, de marktacceptatie en de continuïteit van de standaard.

```
                     ┌──────────────────────────────────────┐
                     │ 1. Strategisch Mandaat: Stuurgroep   │
                     │    (Gezamenlijk publiek-privaat)     │
                     └──────────────────┬───────────────────┘
                                        │
                                        ▼
                     ┌──────────────────────────────────────┐
                     │ 2. Tactisch/Operationeel: Beheerteam │
                     │    (Onafhankelijk, nader te bepalen) │
                     └──────────────────┬───────────────────┘
                                        │
                                        ▼
                     ┌──────────────────────────────────────┐
                     │ 3. Inhoudelijke Toetsing: Expertgroep │
                     │    (Gebruikers, Leveranciers & etc)  │
                     └──────────────────────────────────────┘
```

### 2.1 Eigendom (NEPROM)
Als eigenaar van de MiniGIM-standaard ziet de NEPROM (met name via haar digitaliseringscommissie) toe op het behoud van de private bruikbaarheid en marktconformiteit van de standaard. De NEPROM mandateert het operationele en tactische beheer aan een onafhankelijk **Beheerteam**, maar behoudt een beslissende stem in de strategische wijzigingen en releases om de belangen van de initiërende marktpartijen te waarborgen.

### 2.2 Strategisch Niveau: De Stuurgroep
De **Stuurgroep** is het hoogste besluitvormende orgaan voor de MiniGIM-standaard.
*   **Samenstelling:** Een evenredige vertegenwoordiging van publieke partijen (zoals ministeries en gemeenten uit het digitaliserings-ecosysteem) en private partijen (NEPROM-leden).
*   **Verantwoordelijkheden:**
    *   Het formeel vaststellen van nieuwe releases van de Omgevingsanalyselijst en de ILS (zoals de transitie naar versie 1.0 en opvolgende versies).
    *   Het goedkeuren van de strategische roadmap, doorontwikkelingsbudgetten en het adoptiepad.
    *   Het bewaken van de aansluiting op nationale standaarden en wettelijke stelsels (zoals het DSGO en de geo-standaarden van Geonovum).

### 2.3 Tactisch en Operationeel Niveau: Het Beheerteam
Het **Beheerteam** is verantwoordelijk voor de dagelijkse operationele regie en het onderhoud van de standaard. De exacte partij die deze rol invult wordt door de eigenaar (NEPROM) en de samenwerkende overheden aangewezen.
*   **Verantwoordelijkheden:**
    *   Het inrichten, bewaken en operationeel uitvoeren van het releaseproces en de bijbehorende kwaliteitspoorten.
    *   Het opstellen, prioriteren en beheren van de centrale productbacklog en roadmap.
    *   Het borgen van de consistentie in terminologie en definities tussen de verschillende MiniGIM-documenten (Omgevingsanalyselijst, ILS) en de schaalniveaus (miniSIM, miniBIM).
    *   Het organiseren van kwaliteitsborging (acceptatiecriteria, reviewformats, testcases en voorbeeldoutputs).
    *   Het ophalen, structureren en prioriteren van gebruikersbehoeften bij gemeenten en marktpartijen.
    *   Het voorbereiden van formele besluitvorming voor de Stuurgroep door middel van objectieve beslisnotities en open-puntenlijsten.

### 2.4 Advisering en Afstemming: De Expertgroep
De **Expertgroep** is een adviserend panel van inhoudelijke specialisten.
*   **Samenstelling:** Vertegenwoordigers van gemeentelijke koplopers (zoals Rotterdam, Apeldoorn, Alkmaar en Dordrecht), marktpartijen (gebiedsontwikkelaars en adviseurs), softwareleveranciers en normalisatie-instituten (zoals Geonovum en DigiGO).
*   **Verantwoordelijkheden:**
    *   Het inhoudelijk beoordelen van ingediende wijzigingsvoorstellen op basis van de dagelijkse praktijk.
    *   Het uitvoeren van kruisreviews (cross-reviews) tussen softwareleveranciers om de onafhankelijkheid en technische toepasbaarheid van de standaarden te garanderen.
    *   Het signaleren van nieuwe wetgeving (zoals de Omgevingswet en het Besluit Bouwwerken Leefomgeving) of nieuwe openbare databronnen die een aanpassing van de lijst vereisen.

---

## 3. Beheermethodiek: "Managed Open Source"

Om te voorkomen dat de Omgevingsanalyselijst versnippert in lokale varianten of niet-reproduceerbare "one-off" pilots, hanteert het programma een **Managed Open Source-aanpak**:

1.  **Open en Kosteloze Toegang:** De standaarden, specificatiebladen en validatieregels zijn voor iedereen openbaar en kosteloos toegankelijk via een centrale online repository en de website.
2.  **Centrale Kwaliteitspoort (Quality Gate):** Iedereen (gemeenten, ontwikkelaars en adviseurs) kan verbetersuggesties en "issues" aandragen via de GitHub-omgeving. Formele wijzigingen in de standaarden worden echter uitsluitend doorgevoerd na centrale kwaliteitsborging door het Beheerteam en formele accordering door de Stuurgroep.
3.  **Leveranciersonafhankelijkheid:** De Omgevingsanalyselijst is strikt leveranciersonafhankelijk. Softwareleveranciers worden uitgenodigd om in een openbare matrix aan te geven welke analyses zij conform de gestelde standaardeisen kunnen ondersteunen. Het Beheerteam ziet er streng op toe dat er geen voorkeursposities ontstaan.

---

## 4. De Wijzigings- en Releaseprocedure

Wijzigingen aan de Omgevingsanalyselijst volgen een vaste en transparante cyclus om stabiliteit, betrouwbaarheid en voorspelbaarheid voor zowel gebruikers als softwareontwikkelaars te garanderen.

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ 1. Initiëren &  │ ───► │   2. Toetsen &  │ ───► │  3. Validatie   │
│    Consultatie  │      │   Kruisreview   │      │    in Pilot     │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                                                   │
                                                                   ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  6. Publicatie  │ ◄───  │ 5. Besluitvorming│ ◄───  │  4. Sluiten van │\n│   & Opschaling  │      │   Stuurgroep    │      │  Major Issues   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Stap 1: Initiëren en Consultatie
*   Wijzigingsvoorstellen of extra parameters (zoals nieuwe milieuregels, stikstofvereisten of specifieke hulpdiensteneisen) kunnen door overheden en marktpartijen worden ingediend.
*   Er geldt een harde consultatiedeadline per releasecyclus om input ordentelijk te kunnen verwerken.
*   Het Beheerteam toetst of de voorgestelde wijziging direct invloed heeft op het ruimtelijk ontwerp of de financiële haalbaarheid (dit is de harde afbakeningsgrens van MiniGIM).

### Stap 2: Toetsing en Kruisreview
*   Ingekomen voorstellen worden door het Beheerteam vertaald naar expliciete, objectief toetsbare acceptatiecriteria en reviewformats.
*   Softwareleveranciers worden in duo’s (kruisreview-duo's) georganiseerd om elkaars implementaties en testdata te valideren en inconsistenties op te sporen.
*   Leveranciers zijn verplicht om testcases en voorbeeldoutputs aan te leveren ter controle.

### Stap 3: Praktijkvalidatie in een Pilot
*   Elke significante wijziging van de standaard moet verplicht praktisch worden getoetst in een vooraf aangewezen pilotproject.
*   In deze pilot wordt gecontroleerd of de nieuwe lijst eenduidig, testbaar en gemeentelijk bruikbaar is. De resultaten worden door de pilotleiders vastgelegd als formele input voor de acceptatie.

### Stap 4: Sluiten van Major Issues
*   Alle geconstateerde fouten en feedbackpunten uit de reviews en de pilot worden geregistreerd in een centrale issue- en maatregelenlijst.
*   Inconsistenties of kritieke fouten ("major issues") moeten verplicht aantoonbaar zijn opgelost en formeel door het Beheerteam worden gesloten voordat een release ter vaststelling aan de Stuurgroep mag worden voorgelegd.

### Stap 5: Formele Besluitvorming
*   Het Beheerteam stelt de definitieve vaststellingsset op, vergezeld van een heldere beslisnotities en een open-puntenlijst.
*   De Stuurgroep neemt het formele besluit tot vaststelling en deblokkering van de release.
*   De definitieve release wordt gepresenteerd aan en geaccepteerd door de NEPROM (als eigenaar).

### Stap 6: Publicatie en Opschaling
*   Na vaststelling wordt de geüpdatete lijst officieel gepubliceerd via de daartoe aangewezen openbare kanalen en de GitHub-omgeving.
*   Opschaling en instructie worden gefaciliteerd via de Community of Practice en de aangesloten kennisplatforms.

---

## 5. Projectmatig Versiebeheer (Lokaal Gebruik)

Gebiedsontwikkelingen hebben vaak een zeer lange doorlooptijd (soms wel 7 tot 15 jaar). Gedurende dit traject zullen er landelijk nieuwe releases van databronnen of updates van de Omgevingsanalyselijst beschikbaar komen. Om te voorkomen dat dit leidt tot contractuele discussies en herontwikkelingskosten, schrijft deze policy voor:

1.  **Schriftelijke Startafspraken:** Stakeholders (gemeente, ontwikkelaar en corporatie) zijn verplicht om voorafgaand aan de start van de planfase schriftelijk vast te leggen hoe zij omgaan met tussentijdse data-updates.
2.  **Keuzemodellen:** Partijen moeten expliciet kiezen en contractueel vastleggen of zij:
    *   *Model A (Bevriezen):* Vasthouden aan de situatie en dataset zoals bekend bij de nulmeting (bevroren dataset).
    *   *Model B (Dynamisch aanpassen):* De analyses en ontwerpen continu dynamisch aanpassen op basis van de nieuwste datareleases.
3.  **Juridische Defensibiliteit:** Bij deze afweging dient rekening te worden gehouden met eventuele juridische procedures (zoals bij de Raad van State). Een aantoonbare, consequente en grondige analyse op basis van de meest actuele, ten tijde van het besluit geldende MiniGIM-themalijst helpt bij de rechter om aan te tonen dat er objectief en zorgvuldig onderzoek is gedaan.


---

*Vastgesteld door de Stuurgroep MiniGIM.*  
*Gemandateerd aan het Beheerteam ter publicatie en beheer.*

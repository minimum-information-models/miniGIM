---
naam: DemoTool2
korte_naam: DemoTool2
leverancier: Demoleverancier 2
versie: "2026"
website: https://voorbeeld.nl/demotool2
contact: demo2@voorbeeld.nl
kleur: "#6a3fa0"
bijgewerkt: 2026-07-22
---

| ID | Onderdeel | Uitleg | Documentatie |
|----|-----------|--------|--------------|
| LOC-05 | Nulpunt | Leg het projectnulpunt vast in de coördinatentransformatie van de workspace. Werk je met de 3D-viewer, zet dan zowel RD New als de ellipsoïdale hoogte expliciet, anders wijkt de hoogte tot twee meter af. |  |
| TOP-01 | Materialisatie van het terrein | Combineer AHN-hoogtedata met de BGT-vlakken in een terreinmodel en ken per fysiekVoorkomen een materiaal toe. De classificatie is herbruikbaar als stijl in andere projecten. |  |
| TOP-05 | 3D panden op en om het terrein | Streaming van 3D BAG via OGC 3D Tiles houdt ook grote gebieden werkbaar, omdat alleen het zichtbare deel wordt ingeladen. Combineer met de luchtfoto als drape voor context. | [3D Tiles streamen](https://voorbeeld.nl/demotool2/handleiding) |
| TOP-08 | Wegdeel | Neem de wegdelen uit de BGT over en koppel ze aan het NWB voor wegcategorie en wegbeheerder. Zonder die koppeling ontbreekt de beheerder, wat je nodig hebt voor de vergunningaanvraag. |  |
| BOD-01 | Grondbalans | Bereken het volumeverschil tussen het bestaande AHN-maaiveld en het ontworpen maaiveld. Reken met een uitleveringsfactor per grondsoort; één gemiddelde factor geeft bij gemengde bodems een te rooskleurige balans. |  |
| BOD-02 | Bodemdaling | Zet de bodemdalingsvoorspelling als tijdreeks over het terreinmodel en genereer een animatie per decennium. Dat maakt de opgave voor het ophoogregime in één beeld duidelijk. |  |
| KAB-01 | Data | De KLIC-levering komt binnen als GML-set per netbeheerder. Importeer alle themabestanden in één workspace en houd de netbeheerder als attribuut aan, anders is later niet te herleiden wie de bronhouder is. | [KLIC verwerken](https://voorbeeld.nl/demotool2/handleiding) |
| KAB-02 | Drinkwater | Modelleer de leidingen met diameter en materiaal als attributen en toets de gronddekking tegen het ontworpen maaiveld in een lengteprofiel. |  |
| KAB-03 | Riolering | Neem putten en strengen over uit het GRP en controleer het verhang per streng. Strengen zonder hoogte-informatie moet je expliciet markeren; die vallen anders stil uit de toets. |  |
| ENE-01 | Hoofdtracés | Zet de hoofdtracés van hoogspanning en transportleidingen als aparte laag met hun belemmeringenstrook, zodat conflicten met het plangebied direct zichtbaar zijn. |  |
| VEI-03 | Buisleidingen | Combineer de buisleidingenstrook met de risicocontour uit het Register Externe Veiligheid. Toets beide: de belemmeringenstrook is een ruimtelijke beperking, de contour een veiligheidsnorm. |  |
| GRE-01 | BIM data (IFC 4 or 4.3) | Lees IFC in naast de geodata en plaats het model met de georeferentie uit IfcMapConversion. Ontbreekt die, dan moet je handmatig op het projectnulpunt plaatsen. |  |

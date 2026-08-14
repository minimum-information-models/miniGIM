---
naam: DemoTool1
korte_naam: DemoTool1
leverancier: Demoleverancier 1
versie: "3.5"
website: https://voorbeeld.nl/demotool1
contact: demo1@voorbeeld.nl
kleur: "#007ac2"
bijgewerkt: 2026-08-11
---

| ID | Onderdeel | Uitleg | Documentatie |
|----|-----------|--------|--------------|
| LOC-01 | Luchtfoto | Voeg de PDOK-luchtfoto toe als WMTS-service via de servicebeheerder. Zet de laag onderaan het lagenpaneel zodat vectorlagen er overheen tekenen. | [Rasterlagen toevoegen](https://voorbeeld.nl/demotool1/handleiding) |
| LOC-02 | Kadaster | Koppel de BRK-percelen via de PDOK WFS als vectorservice. Gebruik een filter op perceelnummer in plaats van de volledige laag; dat scheelt aanzienlijk in tekentijd. | [WFS-lagen](https://voorbeeld.nl/demotool1/handleiding) |
| LOC-03 | Plangrens | Maak een polygoonlaag in de projectdatabase met coördinaatsysteem RD New (EPSG:28992) en digitaliseer met snapping op de perceelgrenzen. |  |
| LOC-04 | Oppervlakte | Voeg via de geometrieberekening een oppervlakteveld toe in vierkante meters. In de projectdatabase wordt dit veld automatisch bijgewerkt bij elke geometriewijziging. |  |
| RUI-01 | Omgevingsplan (bestemmingsplan) | Haal de plandata op via de Ruimtelijke Plannen-service en koppel de bestemmingsvlakken aan de plangrens met een ruimtelijke koppeling, samenvattingstype meest voorkomend. |  |
| TOP-05 | 3D panden op en om het terrein | Publiceer 3D BAG als 3D-tegelset en bekijk die in de 3D-weergave. Gebruik het AHN-maaiveld als hoogteondergrond, anders zweven de panden boven of onder het terrein. | [Scene layers](https://voorbeeld.nl/demotool1/handleiding) |
| TOP-07 | Verhard/onverhard oppervlak | Combineer de BGT-vlakken met samenvoegen (dissolve) op het veld fysiekVoorkomen. Het resultaat is direct bruikbaar als invoer voor de waterbergingsopgave. |  |
| MOB-06 | Openbaar vervoer | Laad de haltes uit de NDOV-feed en bereken loopafstanden met de netwerkanalyse (service area). Zonder netwerkdataset krijg je hemelsbreedafstanden, wat de bereikbaarheid overschat. | [Network Analyst](https://voorbeeld.nl/demotool1/handleiding) |
| MIL-07 | Natuurgebieden & Natura2000 gebieden | Voeg de Natura 2000-begrenzing toe uit de ingebouwde databibliotheek of via PDOK en maak met de bufferfunctie een zone van 3 km voor de stikstoftoets. |  |
| VEI-02 | Risicocontouren | De risicocontouren van de Risicokaart komen binnen als kaartservice zonder attributen. Voor toetsbare gegevens gebruik je de dataset van het Register Externe Veiligheid. |  |
| STA-01 | Inwoners | Koppel de CBS-vierkantstatistiek 100x100 m met een zonale samenvatting aan de plangrens. Cellen met minder dan 5 inwoners zijn afgeschermd en tellen als nul; vermeld dat bij de uitkomst. |  |
| IDE-05 | Archeologie | Laad de archeologische verwachtingskaart van de gemeente en zet die met transparantie over de plangrens. Let op dat gemeentelijke kaarten voorrang hebben op de landelijke IKAW. |  |

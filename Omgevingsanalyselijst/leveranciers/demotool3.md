---
naam: DemoTool3
korte_naam: DemoTool3
leverancier: Demoleverancier 3
versie: "3.40"
website: https://voorbeeld.nl/demotool3
kleur: "#589632"
contact: demo3@voorbeeld.nl
bijgewerkt: 2026-08-02
---

| ID | Onderdeel | Uitleg | Documentatie |
|----|-----------|--------|--------------|
| LOC-01 | Luchtfoto | Voeg de PDOK-luchtfoto toe als WMTS-laag via de laagbeheerder. Kies de laag Actueel_ortho25 voor 25 cm resolutie. | [Luchtfoto toevoegen](https://voorbeeld.nl/demotool3/handleiding) |
| LOC-02 | Kadaster | Koppel de BRK-percelen via de PDOK WFS. Filter op perceelnummer met een expressie in plaats van de hele laag in te laden; dat scheelt veel laadtijd. | [BRK WFS](https://voorbeeld.nl/demotool3/handleiding) |
| LOC-03 | Plangrens | Maak een nieuwe polygoonlaag in EPSG:28992 en digitaliseer de plangrens met snapping op de perceelgrenzen. |  |
| LOC-04 | Oppervlakte | Voeg een berekend veld toe met de oppervlakte-expressie. Dit veld rekent automatisch mee bij elke wijziging van de geometrie. | [Expressies](https://voorbeeld.nl/demotool3/handleiding) |
| TOP-02 | Begroeid en onbegroeid terreindeel | Gebruik de BGT-lagen begroeidterreindeel en onbegroeidterreindeel uit de PDOK WFS en clip ze op de plangrens met de clip-bewerking. |  |
| TOP-07 | Verhard/onverhard oppervlak | Combineer de BGT-vlakken en groepeer met samenvoegen (dissolve) op fysiekvoorkomen. Een gestapeld staafdiagram via de diagrammodule maakt de verhouding direct inzichtelijk. |  |
| TOP-09 | Waterdeel | De BGT-laag waterdeel geeft het bestaande wateroppervlak. Vergelijk met het watervlak uit de legger van het waterschap; die wijken vaak af. |  |
| BOD-03 | Bodemsamenstelling | Laad de bodemkaart 1:50.000 van WUR als WMS en de DINOloket-boringen als puntenlaag voor lokale verificatie. |  |
| BOD-08 | Verontreiniging | Haal de gegevens van het Bodemloket op als WFS. Let op dat de laag alleen bekende gevallen toont; een lege kaart is geen bewijs van schone grond. | [Bodemloket](https://voorbeeld.nl/demotool3/handleiding) |
| MIL-03 | Geluidszones | Gebruik de geluidskaarten van Atlas Leefomgeving als WMS. Voor toetsing heb je de contouren per bron nodig, niet de gecumuleerde kaart. |  |
| MIL-07 | Natuurgebieden & Natura2000 gebieden | Laad de Natura 2000-begrenzing van PDOK en maak een buffer van 3 km om de stikstofrelevante afstand te tonen. | [Natura 2000 PDOK](https://voorbeeld.nl/demotool3/handleiding) |
| MIL-12 | Primaire en secundaire watergangen | Vraag de legger op bij het waterschap; de meeste waterschappen bieden een open WFS aan. Symboliseer op categorie voor het onderscheid primair/secundair. |  |
| MIL-13 | Waterkeringen | De laag waterkeringen uit de legger geeft kernzone en beschermingszone als aparte vlakken. Beide zijn relevant voor het vergunningentraject. |  |
| VEI-02 | Risicocontouren | Risicokaart.nl biedt een WMS met plaatsgebonden risicocontouren. Deze laag is niet bevraagbaar; voor attribuutgegevens gebruik je het Register Externe Veiligheid. |  |
| VEI-07 | Overstromingsrisico | Gebruik de LIWO-kaarten voor overstromingsdiepte. Kies het scenario dat past bij de normering van de dijkring waarin het plangebied ligt. | [LIWO](https://voorbeeld.nl/demotool3/handleiding) |
| STA-01 | Inwoners | Koppel de CBS-vierkantstatistiek 100x100 m aan de plangrens met een ruimtelijke koppeling en somaggregatie. Let op dat cellen met minder dan 5 inwoners zijn afgeschermd. | [CBS vierkantstatistiek](https://voorbeeld.nl/demotool3/handleiding) |
| STA-02 | WOZ | WOZ-waarden per buurt komen uit de CBS Kerncijfers Wijken en Buurten; koppel op buurtcode, niet op naam. |  |
| ENE-03 | Elektriciteit | Netbeheerders publiceren capaciteitskaarten als WMS. Combineer met de netcapaciteitskaart van Netbeheer Nederland om congestie in beeld te brengen. |  |
| KAB-01 | Data | KLIC-levering komt binnen als GML. DemoTool3 leest dit direct in, maar de symbologie moet je zelf toekennen via het meegeleverde stylesheet. |  |

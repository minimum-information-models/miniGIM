# Softwaredocumentatie bij de Omgevingsanalyselijst

De omgevingsanalyselijst beschrijft *wat* je moet uitzoeken. Dit uitbreidingsmechanisme
beschrijft *hoe* je dat doet in een specifieke softwaretool. Elke leverancier beheert
één eigen bestand; de hoofdlijst blijft leverancieronafhankelijk.

Er is geen enkele installatie nodig: markdown bewerk je in GitHub en het controleren van de
bestanden gebeurt in de website zelf, op het tabblad **Controle**.

## Opzet

```
Omgevingsanalyselijst/
├─ omgevingsanalyselijst.md      hoofdlijst, met ID-kolom
├─ leveranciers/
│  ├─ index.json                 manifest van alle leveranciersbestanden
│  ├─ _template.md               startpunt voor een nieuwe leverancier
│  ├─ demotool1.md
│  ├─ demotool2.md
│  └─ demotool3.md
└─ omgevingsanalyselijst.html    de website (bevat ook de controle)
```

## De ID is het contract

De koppeling tussen hoofdlijst en leveranciersbestanden loopt via een ID, niet via de
naam van het onderdeel. Namen worden herschreven, ID's niet.

Formaat: `<MODULEPREFIX>-<volgnummer>`, bijvoorbeeld `TOP-04`.

| Module | Prefix | | Module | Prefix |
|---|---|---|---|---|
| Participatie | `PAR` | | Ruimtelijke ordening | `RUI` |
| Locatie | `LOC` | | Milieu | `MIL` |
| Topografie | `TOP` | | Veiligheid | `VEI` |
| Mobiliteit | `MOB` | | Statistiek | `STA` |
| Bodem en water | `BOD` | | Identiteit | `IDE` |
| Kabels en leidingen | `KAB` | | Grex | `GRE` |
| Energie | `ENE` | | | |

Regels:

- Een toegekend ID verandert **nooit** meer, ook niet als het onderdeel wordt hernoemd.
- Een nieuw onderdeel krijgt het eerstvolgende vrije nummer binnen zijn module.
  Bestaande nummers schuiven niet op, ook niet als het onderdeel middenin wordt ingevoegd.
- Wordt een onderdeel verwijderd, dan vervalt het nummer en wordt het niet hergebruikt.

De ID-kolom staat in `omgevingsanalyselijst.md` en is de enige koppelsleutel. De website
weigert te laden als die kolom ontbreekt, zodat een onbedoelde verwijdering meteen opvalt.

Nieuwe onderdelen krijgen handmatig het eerstvolgende vrije nummer binnen hun module.
Regels zonder geldig ID worden niet getoond en verschijnen als fout op het tabblad Controle.

## Een leveranciersbestand aanmaken

1. Kopieer `leveranciers/_template.md` naar `leveranciers/<jouw-tool>.md`.
2. Vul de frontmatter in.
3. Voeg per ondersteund onderdeel één regel toe aan de tabel.
4. Zet je bestand in `leveranciers/index.json`.
5. Open een pull request.

### Frontmatter

| Veld | Verplicht | Toelichting |
|---|---|---|
| `naam` | ja | Volledige productnaam |
| `korte_naam` | nee | Label op de badges in de tabel; standaard gelijk aan `naam` |
| `leverancier` | ja | Je organisatie |
| `versie` | nee | Versie waarop de uitleg betrekking heeft |
| `website` | nee | Productpagina |
| `contact` | nee | Mailadres voor vragen over de inhoud |
| `kleur` | nee | Hex-kleur voor de badge, standaard grijs |
| `bijgewerkt` | ja | Datum in `JJJJ-MM-DD`; wordt op de site getoond |

### Tabel

```markdown
| ID | Onderdeel | Uitleg | Documentatie |
|----|-----------|--------|--------------|
| TOP-04 | Bebouwd oppervlak | Bereken het bebouwd oppervlak met… | [handleiding](https://…) |
```

- `ID` is leidend. `Onderdeel` staat er alleen voor de leesbaarheid en wordt door de
  website genegeerd — die hoeft dus niet exact overeen te komen.
- Laat onderdelen die je software niet ondersteunt gewoon weg. Onvolledigheid is normaal
  en wordt op de site zichtbaar als dekkingsgraad.
- `Uitleg`: één tot drie zinnen, praktisch en concreet. Markdown-opmaak en links werken.
- `Documentatie` is optioneel en bedoeld voor een verwijzing naar je eigen handleiding.
- Een ID mag maar één keer voorkomen per bestand.

## Controle

Het tabblad **Controle** in de website doet dezelfde controles die je anders in een
CI-stap zou draaien, en meldt per bestand:

| Melding | Betekenis |
|---|---|
| Regel zonder geldig ID | staat in de hoofdlijst maar mist een ID en wordt niet getoond |
| ID onbekend in de hoofdlijst | typefout, of het onderdeel is verwijderd |
| ID komt meer dan één keer voor | dubbele regel in hetzelfde bestand |
| Geen geldig ID-formaat | past niet op `XXX-00` |
| Ontbrekend frontmatterveld | `naam`, `leverancier` of `bijgewerkt` mist |
| Lege uitleg | regel zonder inhoud (waarschuwing, geen fout) |
| Kon niet laden | staat in `index.json` maar het bestand ontbreekt |

Daaronder staat de dekking: hoeveel onderdelen door minstens één tool zijn beschreven, met
een uitklapbare lijst van de onderdelen die nog niemand heeft gedocumenteerd.

Praktische werkwijze zonder CI: laat de indiener van een pull request een schermafdruk van dit
tabblad meesturen, of controleer het zelf voor het mergen. Wil je het later toch automatiseren,
dan is de logica één functie in de HTML die zich met Node zonder afhankelijkheden laat hergebruiken.

## Eigenaarschap

Met `.github/CODEOWNERS` kan elke leverancier alleen zijn eigen bestand wijzigen zonder
review van de kerngroep:

```
# kern van het model: alleen de werkgroep
/Omgevingsanalyselijst/omgevingsanalyselijst.md   @minimum-information-models/werkgroep
/Omgevingsanalyselijst/leveranciers/index.json    @minimum-information-models/werkgroep

# leveranciers beheren hun eigen bestand
/Omgevingsanalyselijst/leveranciers/demotool1.md  @leverancier-1
/Omgevingsanalyselijst/leveranciers/demotool2.md  @leverancier-2
/Omgevingsanalyselijst/leveranciers/demotool3.md  @leverancier-3
```

`index.json` staat bewust bij de werkgroep: het toevoegen van een nieuwe tool blijft zo een
bewuste beslissing.

## Waarom geen kolom per tool in de tabel?

Bij drie leveranciers zou dat al negen extra kolommen opleveren en bij tien is de tabel
onleesbaar. In plaats daarvan toont de kolom *Documentatie* per onderdeel welke tools het
beschrijven; een klik op de badge klapt de uitleg uit. Filteren op tool gebeurt met de
knoppenrij bovenaan, en het tabblad *Softwaretools* geeft het overzicht met dekkingsgraad
per tool.

const SPIELFELD_KLASSE = "spielfeld";
const SPIELANZEIGE_KLASSE = "spielanzeige";
const FELD_KLASSE = "feld";
const SPIELER_KLASSE = "spieler";
const GEGNER_KLASSE = "gegner";
const OVERLAY_KLASSE = "overlay";
const OVERLAY_TEXT_KLASSE = "overlay-text";
const OVERLAY_BUTTON_KLASSE = "overlay-button";
const SICHTBAR_KLASSE = "sichtbar";

const spielfeld = document.querySelector("." + SPIELFELD_KLASSE);
const spielanzeige = document.querySelector("." + SPIELANZEIGE_KLASSE);
const overlay = document.querySelector("." + OVERLAY_KLASSE);
const overlayText = document.querySelector("." + OVERLAY_TEXT_KLASSE);
const overlayButton = document.querySelector("." + OVERLAY_BUTTON_KLASSE);


const felder = document.querySelectorAll("." + FELD_KLASSE);

const SIEG_KOMBINATIONEN = [
    [felder[0], felder[1], felder[2]],
    [felder[3], felder[4], felder[5]],
    [felder[6], felder[7], felder[8]],
    [felder[0], felder[3], felder[6]],
    [felder[1], felder[4], felder[7]],
    [felder[2], felder[5], felder[8]],
    [felder[0], felder[4], felder[8]],
    [felder[2], felder[4], felder[6]],
];

let aktuelleKlasse;

overlayButton.addEventListener("click", spielStarten);

spielStarten();

function klickVerarbeiten(ereignis) {
    //Ermitteln, welches Feld angeklickt wurde
    const feld = ereignis.target;

    //Spielstein auf dieses Feld setzten
     if (spielsteinSetzen(feld) === true) {
    //Beende den Zug, wenn der Spielstein erfolgreich gesetzt wurde
zugBeenden(); 
 }
}

function spielsteinSetzen(feld) {
    //Prüfen, ob das Feld schon besetzt ist
    if (
        feld.classList.contains(SPIELER_KLASSE) ||
        feld.classList.contains(GEGNER_KLASSE)
    ) {
        //Verhindern, dass ein Spielstein gesetzt wird
        return false;
    }
    // Dem Feld die Klasse des Spielers anhägen, der gerade an der Reihe ist
    feld.classList.add(aktuelleKlasse);

    // Signalisieren, dass der Spielstein erfolgreich gesetzt wurde
    return true;
}


    function spielStarten() {
        // Das Overlay wieder verstecken, falls es bereits sichtbar ist
        overlay.classList.remove(SICHTBAR_KLASSE);

        // Die Klasse des letzten Siegers vom Overlay-Text entfernen
        overlayText.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);

        // Die aktuelleKlasse leeren, damit der Zufall entscheidet, wer beginnt
        aktuelleKlasse = null;

        // Die Liste der Felder durchgehen
        for (const feld of felder) {
            // Bestehende Spielsteine vom Feld entfernen
            feld.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);

            // Das Feld wieder aktivieren, falls es schon deaktiviert ist
            feld.disablet = false;

            // Jedem Feld sagen, was beim Klick darauf passieren soll
            feld.addEventListener("click", klickVerarbeiten);
        }

         // Festlegen, wer bginnen darf
    zugBeenden();
    }
   
    function zugBeenden() {
        // Prüfen, od der Spieler, der gerade dran ist, gewonnen hat
        if (siegPruefen() === true) {
        // Ist das der Fall, wird das Spiel beendet    
    spielBeenden(false);
        // zugBeenden-Funktion unterbrechen, um nicht zum anderen Spieler zu wechseln
     return;    
    }

    // Prüfen ob ein Unentschieden entstanden ist
    if (unentschiedenPruefen() === true) {
        // Ist das der Fall, wird das Spiel beendet
        spielBeenden(true);

        // zugBeenden-Funktion unterbrechen, um nicht zum anderen Spieler zu wechseln
        return;
    }

        if (aktuelleKlasse  === SPIELER_KLASSE) {
        // Spieler beendet sinen Zug -> zum Gegner wechseln
        aktuelleKlasse = GEGNER_KLASSE;
        } else if(aktuelleKlasse === GEGNER_KLASSE) {
        // Gegner beendet seinen Zug -> zum Spieler wechseln
        aktuelleKlasse = SPIELER_KLASSE;
        } else {
        // Es ist noch niemand am Zug -> auswürfeln, wer beginnt
        aktuelleKlasse = Math.random() < 0.5 ? SPIELER_KLASSE : GEGNER_KLASSE;
        }

        spielanzeigeAktualisieren();
    }

    function spielanzeigeAktualisieren() {
        // Die Klassse des aktuellen Spielers von der Spielanzeige entfernen
        spielanzeige.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);

        // Die Klasse aktualisieren, je nachdem wer gerade am Zug ist
        if (aktuelleKlasse === SPIELER_KLASSE) {
            spielanzeige.innerText = "Blau ist am Zug.";
        } else {
            spielanzeige.innerText = "Rot ist am Zug.";
        }

        // Die Klasse des Spielers, der gerade am Zug ist an die Spielanzeige hängen
        spielanzeige.classList.add(aktuelleKlasse);
    }

    function siegPruefen (){
        // Gehe alle Siegeskombinationen durch
        for (const kombination of SIEG_KOMBINATIONEN) {
            // Prüfe, ob alle 3 Felder der gleichen Klasse angehören
           const gewonnen = kombination.every(function (feld) {
               return feld.classList.contains(aktuelleKlasse);
            });

            if(gewonnen === true) {
                // Beende die Funktion & signalisiere, dass der Spieler gewonnen hat
                return true;
            }
        }

        // Signalisiere, dass das Spiel noch nicht gewonnen ist
        return false;
    }

    function spielBeenden(unentschieden) {
        // Text für das Overlay festlegen
        if(unentschieden === true) {
            overlayText.innerText = "Unentschieden!"
        }
          else if (aktuelleKlasse === SPIELER_KLASSE) {
          overlayText.innerText = "Blau gewinnt!";
          overlayText.classList.add(SPIELER_KLASSE);
        } else {
          overlayText.innerText = "Rot gewinnt!";
          overlayText.classList.add(GEGNER_KLASSE);
        }

        // Das Overlay sichtbar machen
        overlay.classList.add(SICHTBAR_KLASSE);
    }

    function unentschiedenPruefen() {
        // Gehe alle Felder durch
        for (const feld of felder) {
            // Prüfe ob das Feld noch unbesetzt ist
            if (
                !feld.classList.contains(SPIELER_KLASSE) && 
                !feld.classList.contains(GEGNER_KLASSE)
            ) {
                // Gibt es ein unbesetztes Feld, kann es kein Unentschieden sein
                return false;
            }
        }
        // Es gibt kein freies Feld mehr -> unentschieden!
        return true;
    }
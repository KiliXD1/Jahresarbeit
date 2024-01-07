const SPIELFELD_KLASSE = "spielfeld";
const SPIELANZEIGE_KLASSE = "spielanzeige";
const FELD_KLASSE = "feld";
const SPIELER_KLASSE = "spieler";
const GEGNER_KLASSE = "gegner";

const spielfeld = document.querySelector("." + SPIELFELD_KLASSE);
const spielanzeige = document.querySelector("." + SPIELANZEIGE_KLASSE);

const felder = document.querySelectorAll("." + FELD_KLASSE);

let aktuelleKlasse;

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
        feld.classList.contains(SPIELER_KLASSE), 
        feld.classList.contains(GEGNER_KLASSE)
    ) {
        //Verhindern, dass ein Spielstein gesetzt wird
        return false;
    }
    // Dem Feld die Klasse des Spielers anhägen, der gerade an der Reihe ist
    feld.classList.add(aktuelleKlasse);

    // Das Feld deaaktivieren, um weitere Klicks zu verhindern
    feld.disabled = true;

    // Signalisieren, dass der Spielstein erfolgreich gesetzt wurde
    return true;
}



    function spielStarten() {
        // Die Liste der Felder durchgehen
        for (const feld of felder) {
            // Jedem Feld sagen, was beim Klick darauf passieren soll
            feld.addEventListener("click", klickVerarbeiten);
        }

         // Festlegen, wer bginnen darf
    zugBeenden();
    }
   
    function zugBeenden() {
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

        // Die Klasse aktualisieren, je nachdem wer geradde am Zug ist
        if (aktuelleKlasse === SPIELER_KLASSE) {
            spielanzeige.innerText = "Du bist dran.";
        } else {
            spielanzeige.innerText = "Der Gegner ist dran.";
        }

        // Die Klasse des Spielers, der gerade am Zug ist an die Spielanzeige hängen
        spielanzeige.classList.add(aktuelleKlasse);
    }
// Deklarerer arrayet globalt, slik at slettBilletter funksjonen har tilgang til arrayet.
let billettlagring = [];

function kjopBilletter() {
    /* Henter inputene fra HTML siden */
    let film = $("#velgfilm").val();
    let antall = $("#antall").val();
    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    let telefonnr = $("#telefonnr").val();
    let epost = $("#epost").val();

    /* Deklarerer et array og definer verdiene til et objekt */
    let ordre = {
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    };

    /* Regler for validering */
    const navnRegex = /^[A-Za-z]+$/;
    const telefonnrRegex = /^[0-9]+$/;
    const epostRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    /*  "epostRegex" er hentet fra:
        https://emaillistvalidation.com/blog/email-validation-in-javascript-using-regular-expressions-the-ultimate-guide/
    */

    /* Valideringen av alle feltene */
    let feilmld = "";
    if (film === "") {
        feilmld += "Feil vedrørende din ordre ved: Velg film:"+"<br>";
    }
    if (antall <= 0) {
        feilmld += "Feil vedrørende din ordre ved: Antall"+"<br>";
    }
    if (!navnRegex.test(fornavn)) {
        feilmld += "Feil vedrørende din ordre ved: Fornavn"+"<br>";
    }
    if (!navnRegex.test(etternavn)) {
        feilmld += "Feil vedrørende din ordre ved: Etternavn"+"<br>";
    }
    if (!telefonnrRegex.test(telefonnr)) {
        feilmld += "Feil vedrørende din ordre ved: Telefonnr"+"<br>";
    }
    if (!epostRegex.test(epost)) {
        feilmld += "Feil vedrørende din ordre ved: Epost"+"<br>";
    }

    /* Hvis feilmld er tom string, betyr dette at alle input feltene er godkjente og billetten kjøpes */
    let ut = "";
    if (feilmld === "") {
        billettlagring.push(ordre);
        for (let billett of billettlagring) {
            ut += "Film: "+billett.film+"<br>"+"Antall: "+billett.antall+"<br>"+"Fornavn: "+billett.fornavn+"<br>"+
                "Etternavn: "+billett.etternavn+"<br>"+"Telefonnr: "+billett.telefonnr+"<br>"+"Epost: "+billett.epost+"<br><br>";
        }
        $("#billettfelt").html(ut);
        $("#feilmldfelt").html("");

        // Reset av input felt etter vellykket kjøp
        $("#velgfilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
        /* Hvis ikke feilmld er en tom string, betyr dette at det er en feil i en eller flere av input feltene */
    } else {
        $("#feilmldfelt").html(feilmld);
    }
}

function slettBilletter() {
    // Setter feltet billettene skrives ut til ""
    $("#billettfelt").html("");
    // Går gjennom lengden til billettarrayet og fjerner objektene med pop()
    for (let i of billettlagring) {
        billettlagring.pop();
    }
}
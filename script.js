$(document).ready(function () {

    // Drag & Drop
    $("#listaZakupow").sortable();

    function dodajElement(nazwa, gdzie = "append") {
        if (nazwa !== "") {
            let nowy = $("<li></li>")
                .text(nazwa)
                .addClass("list-group-item");

            if (gdzie === "prepend") {
                $("#listaZakupow").prepend(nowy);
            } else {
                $("#listaZakupow").append(nowy);
            }
        }
    }

    $("#dodajProdukt").click(function () {
        let nazwa = $("#produktInput").val();
        dodajElement(nazwa);
        $("#produktInput").val("");
    });

    $("#usunOstatni").click(function () {
        $("#listaZakupow li:last").remove();
    });

    $("#dodajPoczatek").click(function () {
        let nazwa = $("#produktInput").val();
        dodajElement(nazwa, "prepend");
        $("#produktInput").val("");
    });

    $("#dodajKoniec").click(function () {
        let nazwa = $("#produktInput").val();
        dodajElement(nazwa, "append");
        $("#produktInput").val("");
    });

    $("#wyczyscListe").click(function () {
        $("#listaZakupow").empty();
    });

    $("#przywrocListe").click(function () {
        $("#listaZakupow").html(`
            <li>Jabłka</li>
            <li>Banany</li>
            <li>Ser</li>
        `);
    });

   // Edycja elementu
$(document).on("dblclick", "#listaZakupow li", function () {

    let li = $(this);

    // jeśli już jest input - nie rób nic
    if (li.find("input").length > 0) return;

    let tekst = li.text();

    let input = $("<input type='text' class='edit-input'>").val(tekst);

    li.fadeOut(200, function () {
        li.html(input).fadeIn(200);
        input.focus();
    });

    input.on("keydown", function (e) {
        if (e.key === "Enter") {
            let nowyTekst = $(this).val();

            li.fadeOut(200, function () {
                li.text(nowyTekst)
                  .addClass("list-group-item")
                  .fadeIn(200);
            });
        }
    });
});

    $("#pokoloruj").click(function () {
        $("#listaZakupow li:even").css("background-color", "#d1e7dd");
    });

    $("#sortuj").click(function () {
        let elementy = $("#listaZakupow li").get();

        elementy.sort(function (a, b) {
            return $(a).text().localeCompare($(b).text());
        });

        $("#listaZakupow").empty().append(elementy);
    });

    $("#filtrInput").on("keyup", function () {
        let fraza = $(this).val().toLowerCase();

        $("#listaZakupow li").each(function () {
            let tekst = $(this).text().toLowerCase();
            $(this).toggle(tekst.includes(fraza));
        });
    });

});

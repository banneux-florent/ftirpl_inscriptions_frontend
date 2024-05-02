$(function () {
    $("#backdrop-modals").css("opacity", 0.65);
    var modals = $("#surround-modals .modal");
    modals.css("opacity", 1);
    var countModals = modals.length;
    var lastClick = 0;

    $("#surround-modals .modal .close").click(function () {
        if (lastClick + 420 < $.now()) {
            lastClick = $.now();
            // Variables
            var modalH = $(this).closest(".modal").height();

            // Retrait de la modal fermée
            var modal = $(this).closest(".modal");
            if (modal.is(":first-child")) {
                modal.css({"opacity": 0, "margin-top": "-" + (modalH + 2) + "px"});
            } else {
                var pxToRemove = ($(window).width() <= 828) ? 20 : 30;
                modal.css({"opacity": 0, "margin-top": "-" + (modalH + 2 + pxToRemove) + "px"});
            }
            setTimeout(function () {
                modal.remove();
            }, 400);

            countModals = countModals - 1;

            // Si c'est la dernière modal
            if (countModals === 0) {
                $("#backdrop-modals").css("opacity", 0);
                setTimeout(function () {
                    $("#surround-modals").remove();
                }, 400);
            }
        }
    });
});
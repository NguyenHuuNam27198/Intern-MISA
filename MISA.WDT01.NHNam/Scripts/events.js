$('document').ready(function () {
    $('#dialog input[name = "customBirth"]').datepicker({
        dateFormat: "dd/M/yy",
        maxDate: "0D",
        showOn: "button"
    });
    $('#dialog .dialog-stopFollowing').click(function () {
        if ($('#dialog input[type="checkbox"]').prop("checked") == true) {
            $('#dialog input[type="checkbox"]').prop("checked", false);
            $('#dialog input[type="checkbox"]').val("false");
        }
        else {
            $('#dialog input[type="checkbox"]').prop("checked", true);
            $('#dialog input[type="checkbox"]').val("true");
        }

    });
})
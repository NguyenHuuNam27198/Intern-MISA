$('document').ready(function () {
    $('#dialog input[name = "customBirth"]').datepicker({
        dateFormat: "dd/M/yy",
        maxDate: "0D",
        showOn: "button"
    });
    $('#dialog input[type="checkbox"]').click(function () {
        if ($(this).prop("checked") == true) {
            $(this).val("true");
        }
        else {
            $(this).val("false");
        }

    });
})
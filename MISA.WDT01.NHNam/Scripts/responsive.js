    var mainWidth = $('body').width();
    var mainHeight = $('body').height();
    if (mainWidth < 2049) {
        $('.table-data').css("width", "1802.98px");
        $('.outer-table-data').css({ "overflow-x": "scroll", "overflow-y": "scroll" });

    }
    if (mainHeight <= 760) {
        $('.menu').css("overflow-y", "scroll");
    }


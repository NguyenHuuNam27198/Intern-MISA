
class customer {

    constructor() {
        this.LoadData();
        this.HandleEvents();
        
    }
    arrayGlobal = this.GetAllData().length;
    isChanged = false;
    /**
     * Hàm xử lí các sự kiện 
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    HandleEvents() {
        $(document).on('click', '.tbody .tbody-row', this.SelectRows);
        $(document).on('click', '.tool-bar #btn-add', this.OpenDialogAdd.bind(this));
        $(document).on('click', '.tool-bar #btn-update', this.OpenDialogUpdate.bind(this));
        $(document).on('click', '.tool-bar #btn-delete', this.DeleteButton.bind(this));
        $(document).on('click', '.tool-bar #btn-refresh', this.LoadData.bind(this));
        $(document).on('click', '.dialog-add #save-btn', { "method": "POST", "typeSave": "save" }, this.SaveButton.bind(this));
        $(document).on('click', '.dialog-add #save-add-btn', { "method": "POST", "typeSave": "saveadd" }, this.SaveButton.bind(this));
        $(document).on('click', '.dialog-update #save-btn', { "method": "PUT", "typeSave": "save" }, this.SaveButton.bind(this));
        $(document).on('click', '.dialog-update #save-add-btn', { "method": "PUT", "typeSave": "saveadd" }, this.SaveButton.bind(this));
        $(document).on('keyup', '#dialog input[type="text"],textarea', { "ischanged": "1" }, this.ChangeSignal.bind(this));
        $(document).on('change', '#dialog input[type="checkbox"]', { "ischanged": "1" }, this.ChangeSignal.bind(this));
        $(document).on('click', '.dialog-add #cancel-btn', {"method":"POST"},this.CloseDialog.bind(this));
        $(document).on('click', '.dialog-update #cancel-btn', {"method":"PUT"},this.CloseDialog.bind(this));
        $(document).on('keyup', '.paging #current-page', this.GotoPage.bind(this));
        $(document).on('change', '.paging #page-size', this.ChangePageSize.bind(this));
        $(document).on('click', '.paging #first-page', this.FirstPageButton.bind(this));
        $(document).on('click', '.paging #prev-page', this.PrevPageButton.bind(this));
        $(document).on('click', '.paging #last-page', this.LastPageButton.bind(this));
        $(document).on('click', '.paging #next-page', this.NextPageButton.bind(this));

    }

    /**
     * Hàm bắt sự kiện keyup,change thành tín hiệu thông báo thay đổi input
     * Created by: Nguyễn Hữu Nam 27-08-2019
     */
    ChangeSignal(event) {
        var me = this;
        var _isChanged = event.data["ischanged"];
        //var isChanged = arguments[0];
        if (_isChanged == 1) {
            me.isChanged = true;
        }
    }

    /**
     * Hàm thực hiện load lại dữ liệu khi thay đổi số lượng bản ghi
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    ChangePageSize() {
        $('.paging #current-page').val(1);
        this.LoadData()

    }

    /**
     * Hàm thực hiện nhảy đến trang 1
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    FirstPageButton() {
        $('.paging #current-page').val(1);
        this.LoadData();
    }

    /**
     * Hàm thực hiện nhảy đến trang trước trang hiện tại
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    PrevPageButton() {
        var nextPage = $('.paging #current-page').val();
        $('.paging #current-page').val(parseInt(nextPage) - 1 );
        this.LoadData();
    }

    /**
     * Hàm thực hiện nhảy đến trang cuối
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    LastPageButton() {
        var lastPage = this.CalculateTotalPage();
        $('.paging #current-page').val(lastPage);
        this.LoadData();
    }

    /**
     * Hàm thực hiện nhảy đến trang kế tiếp
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    NextPageButton() {
        var nextPage = $('.paging #current-page').val();
        $('.paging #current-page').val(1 + parseInt(nextPage));
        this.LoadData();
    }

    /**
     * Hàm thực hiện tính tổng số trang dữ liệu
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    CalculateTotalPage() {
        var pageSize = $('.paging #page-size').val();
        var totalPageMax;
        if (parseInt(this.arrayGlobal) % parseInt(pageSize) == 0) {
            totalPageMax = this.arrayGlobal / pageSize;
        }
        else {
            totalPageMax = parseInt(this.arrayGlobal / pageSize) + 1;
        }

        return totalPageMax;
    }

    /**
     * Hàm thực hiện load trang dữ liệu thứ n(nhập từ bàn phím)
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    GotoPage(event) {

        var me = this;
        var reg = /[a-zA-Z]/g;
        var pageSize = $('.paging #page-size').val();
        var totalPageMax = me.CalculateTotalPage();
        if (event.keyCode == 13) {
            
            //kiểm tra nếu nhập trang hiện tại là chữ thì tự động set về 1
            if ($('.paging #current-page').val().search(reg) >= 0) {
                $('.paging #current-page').val(1);
            }
            //kiểm tra nếu nhập trang hiện tại lớn hơn trang lớn nhất thì set về trang cuối
            if ($('.paging #current-page').val() > totalPageMax) {
                $('.paging #current-page').val(totalPageMax);
            }
            //Kiểm tra nếu nhập số âm hoặc 0 thì set về trang 1
            if ($('.paging #current-page').val() < 1 ) {
                $('.paging #current-page').val(1);
            }
            var currentPage = $('.paging #current-page').val();
            me.LoadData(currentPage, pageSize);
        }
        
    }

    /**
     * Hàm thực hiện Validate dữ liệu (chưa xong)
     * Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    Validate() {
        var isValidFlag = true;
        var customNoInput = $('#dialog input[name="customNo"]');
        var customNameInput = $('#dialog input[name="customName"]');
        var customPhoneNumberInput = $('#dialog input[name="customPhoneNumber"]');
        var iconCustomNo = $("#dialog #icon-customNo");
        var iconCustomName = $("#dialog #icon-customName");
        var iconcustomPhoneNumber = $("#dialog #icon-customPhoneNumber");

        customNoInput.removeClass("dangerous-input");
        customNameInput.removeClass("dangerous-input");
        customPhoneNumberInput.removeClass("dangerous-input");
        iconCustomNo.hide();
        iconCustomName.hide();
        iconcustomPhoneNumber.hide();
        if (customNoInput.val().trim().length == 0) {
            $(iconCustomNo).show();
            customNoInput.addClass("dangerous-input");
            $(iconCustomNo).mouseenter(function () {
                $('#dialog .message-box .message-text').text("Mã khách hàng không hợp lệ");
                $('#dialog .message-box').show();
            });
            $(iconCustomNo).mouseleave(function () {
                $('#dialog .message-box').hide();
            });
            isValidFlag = false;
        }
        if (customNameInput.val().trim().length == 0) {
            customNameInput.addClass("dangerous-input");
            $(iconCustomName).show();
            $(iconCustomName).mouseenter(function () {
                $('#dialog .message-box .message-text').text("Tên khách hàng không hợp lệ");
                $('#dialog .message-box').show();
            });
            $(iconCustomName).mouseleave(function () {
                $('#dialog .message-box').hide();
            });
            isValidFlag = false;
        }
        if (customPhoneNumberInput.val().trim().length == 0) {
            customPhoneNumberInput.addClass("dangerous-input");
            $(iconcustomPhoneNumber).show();
            $(iconcustomPhoneNumber).mouseenter(function () {
                $('#dialog .message-box .message-text').text("Số điện thoại không hợp lệ");
                $('#dialog .message-box').show();
            });
            $(iconcustomPhoneNumber).mouseleave(function () {
                $('#dialog .message-box').hide();
            });
            isValidFlag = false;
        }
        
        return isValidFlag;
    }

    /**
     * Hàm thực hiện kiểm tra kiểu lưu: save/save-add
     * Created by: Nguyễn Hữu Nam 25-08-2019
     */
    SaveButton(event) {
        var me = this;
        var _method = event.data["method"];
        var _typeSave = event.data["typeSave"];
        me.SaveEvents(_method, _typeSave);
    }

    /**
     *Hàm xử lí các sự kiện lưu khách hàng
     *Created by: Nguyễn Hữu Nam 26-08-2019
     * */
    SaveEvents() {
        var me = this;
        var _method = arguments[0];
        var _typeSave = arguments[1];
        var _isValid = me.Validate();
        if (_isValid) {
            me.SaveCustomer(_method, _typeSave);
        }
        else {
            me.Validate();
        }
    }

    /**
     * Hàm thực hiện gọi service lưu thông tin khách hàng
     * Created by: Nguyễn Hữu Nam 25-08-2019
     */
    SaveCustomer(event) {
        var me = this;
        var method = arguments[0];
        var typeSave = arguments[1];
        var propertyNames = $('#dialog input,textarea');
        var object = {};
        var id = me.GetRowIds();
        $.each(propertyNames, function (proppertyIndex, propertyItem) {
            var propName = $(propertyItem).attr("name");
            var propValue = $(propertyItem).val();
            object[propName] = propValue;
        });
        if (method === "PUT") {

            object["customID"] = id[0];
        }
        object["customBirth"] = object["customBirth"].formatmmDDyyyy(object["customBirth"]);
        $.ajax({
            method: method,
            url: "/customers",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(object),
            success: function (res) {
                if (typeSave === "save") {
                    $("#dialog").dialog("close");
                }
                else {
                    me.RefreshDialog();
                }
                $('.tool-bar #btn-duplicate,#btn-update,#btn-delete').attr("disabled", true);
                me.LoadData();
                me.isChanged = false;
            },
            error: function (res) {
                alert("Đã xảy ra lỗi. Mời bạn liên hệ MiSa để được hỗ trợ giải quyết");
            }
        })
    }

    /**
     * Hàm kiểm tra số lượng xóa khi click xóa khách hàng
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    DeleteButton() {
        var me = this;
        var ids = me.GetRowIds();
        var string = "";
        var buttons = [
            {
                text: "Có",
                "class": "btn-warning yes-btn-warning",
                click: function () {

                    me.DeleteCustomer(ids);
                    $('#dialog-warning').dialog("close");
                }
            },
            {
                text: "Không",
                "class": "btn-warning no-btn-warning",
                click: function () {
                    $('#dialog-warning').dialog("close");
                }
            }
        ];
        if (ids.length > 1) {
            string = "Bạn có chắc chắn muốn xóa những Khách hàng đã chọn không?";
            me.OpenDialogWarning(buttons, string);
        }
        else {
            var _customNo = $('.tbody .rows-on-select .customNo').text();
            var _customName = $('.tbody .rows-on-select .customName').text();
            string = "Bạn có chắc chắn muốn xóa Khách hàng << " + _customNo + " - " + _customName + " >> không?";
            me.OpenDialogWarning(buttons, string);
        }
    }

    /**
     * Hàm thực hiện gọi service xóa bản ghi khách hàng 
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    DeleteCustomer() {
        var me = this;
        var ids = arguments[0];
        $.ajax({
            method: "DELETE",
            url: "/customers",
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ids),
            success: function (res) {
                me.LoadData();
            },
            error: function (res) {
                alert(res.Message);
            }
        })
        $('.tool-bar #btn-duplicate,#btn-update,#btn-delete').attr("disabled", true);
    }

    /**
     * Hàm thực hiện lấy id của các bản ghi được chọn
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    GetRowIds() {
        var rowsSelected = $('.tbody .rows-on-select');
        var ids = [];
        $.each(rowsSelected, function (index, item) {
            var id = $(item).data("id");
            ids.push(id);
        });
        return ids;
    }

    /**
     * Hàm thực hiện mở dialog cảnh báo
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    OpenDialogWarning() {

        var _string = arguments[1];
        $('#dialog-warning').dialog({
            width: 420,
            height: 160,
            modal: true,
            resizable: false,
            buttons: arguments[0],
            dialogClass: arguments[2],
            open: function () {
                var markup = '<div class="dialog-warning-icon"></div><div class="dialog-warning-text">' + _string + '</div>';
                $(this).html(markup);
            }
        });
    }

    /**
     * Hàm thực hiện đưa ra cảnh báo khi đóng dialog
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    CloseDialog(event) {
        var me = this;
        var changeFlag = me.isChanged;
        var _method = event.data["method"];
        if (changeFlag) {
            var buttons = [
                {
                    text: "Có",
                    "class": "btn-warning yes-btn-warning",
                    click: function () {
                        var method = _method;
                        var typeSave = "save";
                        me.SaveEvents(method, typeSave);
                        me.isChanged = false;
                        $('#dialog-warning').dialog("close");
                    }
                },
                {
                    text: "Không",
                    "class": "btn-warning no-btn-warning",
                    click: function () {
                        $('#dialog-warning').dialog("close");
                        $('#dialog').dialog("close");
                        me.isChanged = false;
                    }
                },
                {
                    text: "Hủy bỏ",
                    "class": "btn-warning cancel-btn-warning",
                    click: function () {
                        $('#dialog-warning').dialog("close");
                    }
                }
            ];
            var messageWarning = "Dữ liệu đã thay đổi, bạn có muốn cất không?";
            me.OpenDialogWarning(buttons, messageWarning, "dialog-close-warning");
        }
        else {
            $('#dialog').dialog("close");
        }
    }

    /**
     * Hàm thực hiện mở dialog thêm mới khách hàng
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    OpenDialogAdd() {
        var me = this;
        me.OpenDialog("dialog-add");
        $('.dialog-add input[type="checkbox"]').prop("disabled", true);
        me.RefreshDialog();
    }

    /**
     * Hàm thực hiện mở dialog cập nhật thông tin khách hàng
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    OpenDialogUpdate() {
        var me = this;
        me.OpenDialog("dialog-update");
        me.RefreshDialog();
        $('.dialog-update input[type="checkbox"]').prop("disabled", false);
        var ids = me.GetRowIds();
        var inputs = $('.dialog-update input,textarea');
        $.ajax({
            method: "GET",
            url: "/customers/" + ids[0],
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (res) {
                if (res.Data.customBirth != null) {
                    res.Data.customBirth = new Date(res.Data.customBirth);
                }
                $.each(inputs, function (index, item) {
                    if (res.Data[item.getAttribute("name")] != null) {
                        if (typeof (res.Data[item.getAttribute("name")]) === "object") {
                            item.value = res.Data[item.getAttribute("name")].formatddMMyyyy(res.Data[item.getAttribute("name")]);
                        }
                        else if (typeof (res.Data[item.getAttribute("name")]) === "boolean") {
                            if (res.Data[item.getAttribute("name")]) {
                                $(item).prop("checked", true);
                                item.value = true;
                            }
                            else
                            {
                                $(item).prop("checked", false);
                                item.value = false;
                            }
                        }
                        else {
                            item.value = res.Data[item.getAttribute("name")];
                        }
                    }
                    else {
                        item.value = "";
                    }

                });
            },
            error: function (res) {
                alert(res.Message);
            }
        })

        //$('.dialog-update input[type="text"],textarea').keyup(function () {

        //})
    }

    /**
     * Hàm thực liện làm mới dialog
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    RefreshDialog() {
        var emptys = $('#dialog input,textarea');
        $.each(emptys, function (index, item) {
            $(item).val(item.defaultValue);
            if ($(item).hasClass("dangerous-input")) {
                $(item).removeClass("dangerous-input")
            }
        });
        var buttonsRed = $('#dialog .btn-dangerous-icon');
        $.each(buttonsRed, function (id, it) {
            $(it).hide();
        });
    }

    /**
     * Hàm thực hiện mở dialog
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    OpenDialog() {
        var me = this;
        $('#dialog').dialog({
            title: "Khách hàng",
            width: 673,
            height: 330,
            modal: true,
            resizable: false,
            dialogClass: arguments[0]
            //close: function (event, ui) {
            //    me.CloseDialog();
            //}
        });
    }

    /**
     * Hàm xử lí sự kiện khi click vào 1 row trang bảng dữ liệu
     * Created by: Nguyễn Hữu Nam 25-08-2019
     */
    SelectRows(events) {
        if ($(this).hasClass('rows-on-select')) {
            $(this).removeClass('rows-on-select');
        }
        else {
            $(this).addClass('rows-on-select');
        }

        var rowsSelected = $('.rows-on-select');
        if (rowsSelected.length == 0) {
            $('#btn-duplicate,#btn-update,#btn-delete').prop("disabled", true);
        }
        if (rowsSelected.length == 1) {
            $('#btn-duplicate,#btn-update,#btn-delete').prop("disabled", false);
        }
        if (rowsSelected.length >= 2) {
            $('#btn-delete').prop("disabled", false);
            $('#btn-duplicate,#btn-update').prop("disabled", true);
        }
    }

    /**
     *Hàm thực hiện lấy gọi service lấy tất dữ liệu
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    GetAllData() {
        var objects = [];
        $.ajax({
            method: "GET",
            url: "/customers",
            dataType: "json",
            async: false,
            success: function (res) {
                objects = res.Data;
            },
            error: function (res) {
                alert(res.Message);
            }
        })
        return objects;
    }

    /**
     *Hàm thực hiện lấy gọi service lấy dữ liệu theo các trang
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    GetData() {
        var _pageIndex = arguments[0];
        var _pageSize = arguments[1];
        var objects = [];
        $.ajax({
            method: "GET",
            url: "/customers/" + _pageIndex + "/" + _pageSize,
            dataType: "json",
            async: false,
            success: function (res) {
                objects = res.Data;
            },
            error: function (res) {
                alert(res.Message);
            }
        })
        return objects;
    }

    /**
     * Hàm thực hiện load dữ liệu lên bảng
     * Created by: Nguyễn Hữu Nam 25-08-2019
     * */
    LoadData() {
        $('.tbody').empty();
        var me = this;

        var totalPage = me.CalculateTotalPage();
        //Load data lên table
        var pageIndex = $('.paging #current-page').val();
        var pageSize = $('.paging #page-size').val();
        var Data = me.GetData(pageIndex, pageSize);
        var fieldNames = $('.thead div[field]');
        var cls = "text-align-left";
        
        $.each(Data, function (index, item) {
            var rows = $('<div class="tbody-row"></div>').data("id", item["customID"]);
            $.each(fieldNames, function (fieldIndex, fieldItem) {
                var fieldName = $(fieldItem).attr("field");
                var fieldValue = item[fieldName];
                if (fieldValue === null) {
                    rows.append('<div class="{0}"></div>'.format(fieldName));
                }
                else if (fieldName === "IsMember5Food") {
                    if (item["customMemberNo"]) {
                        rows.append('<div class="IsMember5Food text-align-center"><input type="checkbox" checked disabled/></div>');
                    }
                    else {
                        rows.append('<div class="IsMember5Food text-align-center"><input type="checkbox" disabled/></div>');
                    }
                }
                else if (typeof (fieldValue) === "string") {
                    cls = "text-align-left";
                    rows.append('<div class="{0} {1}">{2}</div>'.format(fieldName, cls, fieldValue));
                }
                else if (typeof (fieldValue) === "boolean") {
                    cls = "text-align-center";
                    if (fieldValue) {
                        rows.append('<div class="stopFollowing text-align-center"><input type="checkbox" checked disabled/></div>');
                    }
                    else {
                        rows.append('<div class="stopFollowing text-align-center"><input type="checkbox" disabled/></div>');
                    }

                }
                else if (typeof (fieldValue === "number")) {
                    cls = "text-align-right";
                    rows.append('<div class="{0} {1}">{2}</div>'.format(fieldName, cls, fieldValue));
                }

            });
            $('.tbody').append(rows);
        });

        //thiệt lập cho phân trang
        $('.paging #total-page').text("trên " + totalPage);
        if (pageIndex == 1) {
            $('.paging #first-page,#prev-page').prop("disabled", true);
            $('.paging #last-page,#next-page').prop("disabled", false);
        }
        if (pageIndex == totalPage) {
            $('.paging #last-page,#next-page').prop("disabled", true);
            $('.paging #first-page,#prev-page').prop("disabled", false);
        }
        if (pageIndex > 1 && pageIndex < totalPage) {
            $('.paging #first-page,#prev-page,#last-page,#next-page').prop("disabled", false);
        }
    }
}

$('document').ready(function () {
    var _customer = new customer();
})

function create_grid(gridId, page_name, fields) {
    $(gridId).jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        autoload: true,
        paging: true,
        pageLoading: true,

        pageSize: 10,
        pageButtonCount: 5,

        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: "/" + page_name + "/items?page_index=" + filter.pageIndex + "&page_size=" + filter.pageSize,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus)
                    }
                });
            },

            insertItem: function (item) {
                let d = $.Deferred();
                console.log(item);
                $.ajax({
                    type: "POST",
                    url: "/" + page_name + "/items",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        $(gridId).jsGrid("clearInsert");
                        d.reject()
                    },
                    success: function (data, status, jqXHR) {
                        d.resolve(data)
                    },
                });
                return d.promise()
            },

            updateItem: function (item) {
                let d = $.Deferred();
                console.log(item);
                $.ajax({
                    type: "PUT",
                    url: "/" + page_name + "/items",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        $(gridId).jsGrid("clearInsert");
                        d.reject()
                    },
                    success: function (data, status, jqXHR) {
                        d.resolve(data)
                    },
                });
                return d.promise()
            },

            deleteItem: function (item) {
                let d = $.Deferred();
                console.log(item);
                $.ajax({
                    type: "DELETE",
                    url: "/" + page_name + "/items",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        $(gridId).jsGrid("clearInsert");
                        d.reject()
                    },
                    success: function (data, status, jqXHR) {
                        d.resolve(data)
                    },
                });
                return d.promise()
            },
        },

        fields: fields
    });
}
'use strict';

define(['app'], function (app) {

    var invoiceFilter = function () {
        return function (dataList, filterValue) {
        	
            if (!filterValue) return dataList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < dataList.length; i++) {
                var invoice = dataList[i];
              
                if (invoice.serviceName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(invoice);
                }
            }
            return matches;
        };
    };

    app.filter('invoiceFilter', invoiceFilter);

});



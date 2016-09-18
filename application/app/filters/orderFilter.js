'use strict';

define(['app'], function (app) {

    var orderFilter = function () {
        return function (dataList, filterValue) {
        	
            if (!filterValue) return dataList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < dataList.length; i++) {
                var order = dataList[i];
              
                if (order.serviceName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(order);
                }
            }
            return matches;
        };
    };

    app.filter('orderFilter', orderFilter);

});



'use strict';

define(['app'], function (app) {

    var ticketFilter = function () {
        return function (dataList, filterValue) {
        	
            if (!filterValue) return dataList;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < dataList.length; i++) {
                var ticket = dataList[i];
              
                if (ticket.topic.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(ticket);
                }
            }
            return matches;
        };
    };

    app.filter('ticketFilter', ticketFilter);

});



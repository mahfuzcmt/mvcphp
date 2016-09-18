
'use strict';

define(['app'], function (app) {

    var updateDataService = function ($http, $q, $location) {
    	
    	var serviceBase = 'api/v1/update.php/';

        this.updateData= function (q, obj) {
            return $http.post(serviceBase + q, obj).then(function (results) {
				return results.data;
            });
        };
	};
    
    app.service('updateDataService', ['$http', '$q', '$location', updateDataService]);

});
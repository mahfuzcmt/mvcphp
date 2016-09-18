
'use strict';

define(['app'], function (app) {

    var saveDataService = function ($http, $q, $location) {
    	
    	
        var serviceBase = 'api/v1/insert.php/';

        this.saveData = function (q, obj) {
			return $http.post(serviceBase + q, obj).then(function (results) {
				return results.data;
            });
        };
	};
    
    app.service('saveDataService', ['$http', '$q', '$location', saveDataService]);

});
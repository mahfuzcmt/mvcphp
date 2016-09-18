
'use strict';

define(['app'], function (app) {

    var deleteDataService = function ($http, $q, $location) {
    	
    	
        var serviceBase = 'api/v1/delete.php/';
        		
		this.deleteData= function (q, obj) {
            return $http.delete(serviceBase + q, obj).then(function (results) {
				debugger
                return results.data;
            });
        };
		
	};
    
    app.service('deleteDataService', ['$http', '$q', '$location', deleteDataService]);

});
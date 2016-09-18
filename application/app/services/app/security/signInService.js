
'use strict';

define(['app'], function (app) {

    var signInService = function ($http, $q, $location) {
    	
    	
        var serviceBase = 'api/v1/';

       
		this.login = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
		
		this.saveOperationLog = function (q, obj) {
            return $http.post(serviceBase + q, obj).then(function (results) {
				debugger
                return results.data;
            });
        };
	};
    
    app.service('signInService', ['$http', '$q', '$location', signInService]);

});








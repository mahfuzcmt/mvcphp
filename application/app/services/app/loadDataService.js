
'use strict';

define(['app'], function (app) {

    var loadDataService = function ($http, $q, $location) {
    	
    	
        var serviceBase = 'api/v1/';

        this.loadData = function (q) {
			return $http.get(serviceBase+q).then(function (results) {
				return results.data;
			});
		};
		
	};
    
    app.service('loadDataService', ['$http', '$q', '$location', loadDataService]);

});
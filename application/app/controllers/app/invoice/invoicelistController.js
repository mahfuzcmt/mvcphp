'use strict';

define(['app'], function (app) {
	
	var invoicelistController = function ($rootScope, $scope, _, constantService, $filter, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, saveDataService) {
		
		var promis;
		
		 $scope.itemsPerPage;
    	 	 $scope.currentPage = 1;
		 $scope.pageDataBegin = 0;
		 $scope.pageDataEnd = 0;
		 $scope.pageDataTotal = 0;
		 $scope.pageItemText = "";
		 $scope.maxPaginationSize = 5;
		 $scope.dataList = [];
		 $scope.displayedCollection = [];
		 $scope.itemsPerPage = 15;
		 
		var loadinvoicelist = function () {
			$scope.userInfo = authorizationService.getUserInfo();
			promis = loadDataService.loadData('loadinvoicelist/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.invoicelist = data.data;
				$scope.dataListSize = $scope.invoicelist.length;
				$scope.dataList = data.data;
				createWatches($scope.dataList);
			});
		};
		$scope.search = function(filterText){ 
			var filteredResult = $filter("invoiceFilter")($scope.dataList, filterText); 
            $scope.dataListSize = filteredResult.length; 
            doPagination(filteredResult); 
            createWatches(filteredResult);
	     };  
			 		                 
	     var doPagination = function(filteredResult){ 
        	 $scope.invoicelist = filteredResult;
			 $scope.pageDataTotal = filteredResult.length;
	        	if($scope.pageDataTotal == 0){
	        		$scope.pageDataBegin = 0;
	            	$scope.pageDataEnd = 0;        		    		
	    		} else {
	        		$scope.pageDataBegin = (($scope.currentPage - 1) * $scope.itemsPerPage) + 1;
	            	$scope.pageDataEnd = $scope.pageDataBegin + $scope.itemsPerPage - 1;    		
	    		}
	        	
	        	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
	        		$scope.pageDataEnd = $scope.pageDataTotal
	        	}  
	        	       	
	    		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
								$scope.pageDataTotal, "Invoice", 'English');
	        };

	    	var createWatches = function (data) {
	        	$scope.$watch("searchText", function (filterText) {
	            	$scope.currentPage = 1;
	            });
	            
	            $scope.$watch('currentPage + itemsPerPage', function() {
	            	var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + ($scope.itemsPerPage - 0);
	            	$scope.invoicelist = data.slice(begin, end);
	            	$scope.pageDataTotal = $scope.dataListSize;
	            	
	            	if($scope.pageDataTotal == 0) {
	            		$scope.pageDataBegin = 0;
	                	$scope.pageDataEnd = 0;        		    		
	        		} else {
	            		$scope.pageDataBegin = begin + 1;
	                	$scope.pageDataEnd = end;
	        		}
	            	if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal) {
	            		$scope.pageDataEnd = $scope.pageDataTotal
	            	}
	        		$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Invoice", "English");
	            });
	        };
		 
	 	var init = function () {
			ngProgress.start();
			loadinvoicelist();
			ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('invoicelistController', ['$rootScope', '$scope', '_', 'constantService', '$filter', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'saveDataService',
    invoicelistController]);
   
	
});


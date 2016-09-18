'use strict';

define(['app'], function (app) {
	
	var orderlistController = function ($rootScope, $scope, _, constantService, $filter, navigationService, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, updateDataService, saveDataService) {
		
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
		 
		var loadOrderList = function () {
			$scope.userInfo = authorizationService.getUserInfo();
			promis = loadDataService.loadData('loadOrderList/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.orderList = data.data;
				$scope.dataListSize = $scope.orderList.length;
				$scope.dataList = data.data;
				createWatches($scope.dataList);
			});
		};
		$scope.search = function(filterText){ 
			var filteredResult = $filter("orderFilter")($scope.dataList, filterText); 
            		$scope.dataListSize = filteredResult.length; 
            		doPagination(filteredResult); 
            		createWatches(filteredResult);
	     };  
			 		                 
	     var doPagination = function(filteredResult){ 
        	 $scope.orderList = filteredResult;
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
								$scope.pageDataTotal, "Order", 'English');
	        };
	        
		var createWatches = function (data) {
	        	$scope.$watch("searchText", function (filterText) {
	            	$scope.currentPage = 1;
	            });
	            
	            $scope.$watch('currentPage + itemsPerPage', function() {
	            	var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + ($scope.itemsPerPage - 0);
	            	$scope.orderList = data.slice(begin, end);
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
							$scope.pageDataTotal, "Order", "English");
	            });
	        };
		 
		$scope.redirect = function(page){
			navigationService.menuNavigation(page); 
		}
		
		$scope.changeStatus= function (status,oid) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('changestatus/'+oid+'/'+status+'/'+$scope.userInfo.userID+'/'+'orderdetail');
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				if(status === 'active'){
					changeInvoiceStatus('paid',oid);
				}
				else{
					changeInvoiceStatus('unpaid', oid);
				}
			});
		};
		
		var changeInvoiceStatus= function (status,orderID) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('changestatusofinvoices/'+orderID+'/'+status+'/'+$scope.userInfo.userID);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				loadOrderList();
			});
		};
		
	 	var init = function () {
			ngProgress.start();
			loadOrderList();
			ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('orderlistController', ['$rootScope', '$scope', '_', 'constantService', '$filter', 'navigationService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'updateDataService', 'saveDataService',
    orderlistController]);
   
	
});


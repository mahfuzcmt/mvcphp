'use strict';

define(['app'], function (app) {
	
	var userlistController = function ($rootScope, $scope, _, constantService, $filter, navigationService, authorizationService, localStorageService,
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
		 
		var loadUserList = function () {
			$scope.userInfo = authorizationService.getUserInfo();
			if($scope.userInfo.role ==='user' ){
				return;
			}
			promis = loadDataService.loadData('loadUserList/');
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.userList = data.data;
				$scope.dataListSize = $scope.userList.length;
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
								$scope.pageDataTotal, "Users", 'English');
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
							$scope.pageDataTotal, "Users", "English");
	            });
	        };
		 
		$scope.redirect = function(page){
			navigationService.menuNavigation(page); 
		}
		
		$scope.changeStatus= function (status,userID) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('changestatusofuser/'+userID+'/'+status);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				loadUserList();
			});
		};
		
		
	 	var init = function () {
			ngProgress.start();
			loadUserList();
			ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('userlistController', ['$rootScope', '$scope', '_', 'constantService', '$filter', 'navigationService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'updateDataService', 'saveDataService',
    userlistController]);
   
	
});


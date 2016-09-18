'use strict';

define(['app'], function (app) {
    
	 var dashboardController = function ($rootScope, $scope, _,
		 dashboardService, constantService, navigationService, localStorageService, 
		 configurationService,  ngProgress, loadDataService, authorizationService) {
		 
		var promis;
		
		var loadUserInfo = function () {
			$scope.userInfo = authorizationService.getUserInfo();
    		promis = loadDataService.loadData('userProfile/'+$scope.userInfo.userID);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					return;
				}
				$scope.user = data.data[0];
				loadInvoiceInfo();
			});
		};
	    var loadInvoiceInfo = function () {
			$scope.userInfo = authorizationService.getUserInfo();
    		promis = loadDataService.loadData('getInvoiceInfo/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					return;
				}
				$scope.invoice = data.data[0];
				loadOrderInfo();
			});
		};
		var loadOrderInfo = function () {
			$scope.userInfo = authorizationService.getUserInfo();
    		promis = loadDataService.loadData('getOrderDetail/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					return;
				}
				$scope.order = data.data[0];
				loadTicketInfo();
			});
		};
		var loadTicketInfo = function () {
			$scope.userInfo = authorizationService.getUserInfo();
    		promis = loadDataService.loadData('getTicketDetail/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					return;
				}
				$scope.ticket = data.data[0];
			});
		};
		
		$scope.redirect = function(page){
			navigationService.menuNavigation(page); 
		}
	 	var init = function () {
			loadUserInfo();
    	};

	 	init();
	 	
	 };
	 
    app.register.controller('dashboardController', ['$rootScope', '$scope', '_', 'dashboardService', 
    'constantService', 'navigationService', 'localStorageService','configurationService', 'ngProgress', 
    'loadDataService', 'authorizationService',
    dashboardController]);
   
	
});


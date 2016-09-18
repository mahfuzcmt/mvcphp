'use strict';

define(['app'], function (app) {
	
	var orderController = function ($rootScope, $scope, _, constantService, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, $upload, saveDataService) {
		
		var promis;
		$scope.order = {};
		$scope.response = {};
		
		var loadServices = function(){
			promis = loadDataService.loadData('loadServicesCategory/');
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.mainServiceList = data.data;
			});
		}
		$scope.changeForm = function(want){
			if(want === true){
				$scope.customOrder = true;
				return;
			}
			$scope.customOrder = false;
		}
		$scope.makeOrder = function (order) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			order.userID = $scope.userInfo.userID;
			order.updatedBy = $scope.userInfo.userID;
			promis = saveDataService.saveData('makeOrder', order);
			promis.then(function (data) {
				if(data.status != "success"){
					$scope.response.status = data.status;
					$scope.response.message = data.message;
					return;
				}
				insertIntoInvoice(data.data);
			});
		};
		
		$scope.uploadFile = function (files) {
			$scope.filePath = "";
			$scope.message = "";
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$scope.upload = $upload.upload({
					url: 'api/uploadFile.php',
					method: 'POST',               
					file: file
				}).success(function(data, status, headers, config) {
					$scope.message = data; 
					$scope.filePath = 'img/file/'+file.name;
				}).error(function(data, status) {
					$scope.response.status = data.status;
					$scope.response.message = data;
				});
			};
		}
		
		var insertIntoInvoice = function (orderID) {
			var invoiceObj = {};
			$scope.userInfo = authorizationService.getUserInfo();
			invoiceObj.userID = $scope.userInfo.userID;
			invoiceObj.updatedBy = $scope.userInfo.userID;
			invoiceObj.orderID = orderID;
			promis = saveDataService.saveData('insertIntoInvoice', invoiceObj);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.resetForm();
			});
		};
		
		$scope.getsubCat = function (obj) {
			$scope.serviceList = "";
			$scope.order = "";
			promis = loadDataService.loadData('loadServicesbycat/'+obj.oid);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.serviceList = data.data;
			});
		};
		
		$scope.makeCustomOrder = function (service) {
			if(service.price === "" || service.price === null || service.price === undefined){
				service.price = 'negotiable';
			}
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			service.createdBy = $scope.userInfo.userID;
			promis = saveDataService.saveData('addService', service);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.resetForm();
				var order = {};
				order.serviceID = data.data;
				order.filePath = $scope.filePath;
				$scope.makeOrder(order);
			});
		};
		
		$scope.getPrice = function(obj){
	    		$scope.service = {};
	    		var data = _.where($scope.serviceList, {oid: parseInt(obj.serviceID)});
	        	$scope.service.price = data[0].price;
	        	$scope.service.riyalprice = data[0].riyalprice;
	        	$scope.service.usdprice = data[0].usdprice;
			$scope.service.description = data[0].description;
	    	}

		$scope.resetForm = function () {
			init();
		};
		 
	 	var init = function () {
			ngProgress.start();
			$scope.service = {};
			loadServices();
			$scope.order = {};	
			$scope.currencyType = 'USD';	
		    ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('orderController', ['$rootScope', '$scope', '_', 'constantService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', '$upload', 'saveDataService',
    orderController]);
   
	
});


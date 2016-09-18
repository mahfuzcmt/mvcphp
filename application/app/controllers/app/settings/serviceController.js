'use strict';

define(['app'], function (app) {
	
	var serviceController = function ($rootScope, $routeParams, $scope, _, constantService, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, saveDataService, updateDataService) {
		
		var promis;
		$scope.service= {};
		$scope.btnName = "Add Service";
		
		var addNewServiceCat = function (service) {
			
			var obj = {
				name 		: service.serviceCategoryCustom,
				createdBy 	: service.createdBy
			}
			promis = saveDataService.saveData('addServiceCategory', obj);
			promis.then(function (data) {
				var obj = {
					createdBy :  $scope.userInfo.userID,
					serviceCategory : data.data,
					serviceName : service.serviceName,
					description : service.description,
					price : service.price
				}
				addServiceNow (obj );
			});
		}
		var updateService = function (service,oid){
			$scope.response = {};
			promis = updateDataService.updateData('updateService/'+oid,service);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.resetForm();
			});
		}
		$scope.addNewService = function (service) {
			if($routeParams.oid !== undefined && $routeParams.oid !== null && $routeParams.oid !== ""){
				updateService(service, $routeParams.oid);
				return;
			}
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			var obj = {
				createdBy :  $scope.userInfo.userID,
				serviceCategory : service.serviceCategory,
				serviceName : service.serviceName,
				description : service.description,
				price : service.price
			}
			if(obj.serviceCategory === '2' || obj.serviceCategory === '' || obj.serviceCategory === undefined){
				obj.serviceCategoryCustom = service.serviceCategoryCustom ;
				addNewServiceCat(obj);
			}
			else{
				addServiceNow (obj);
			}
		};
		
		
		var addServiceNow = function(service){
			promis = saveDataService.saveData('addService', service);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.resetForm();
			});
		}
		$scope.checkCat = function(obj){
			$scope.newCategory = false;
			if(obj.serviceCategory === '2000' || obj.serviceCategory === '' || obj.serviceCategory === null || obj.serviceCategory === undefined){
				$scope.newCategory = true;
				$scope.service.serviceCategory = "";
			}
			
		}
		
		var loadServicesCategory= function () {
			promis = loadDataService.loadData('loadServicesCategory/');
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.serviceList = data.data;
			});
		};
		var getServiceByOid= function (oid) {
			promis = loadDataService.loadData('getServiceByOid/'+oid);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.service = data.data[0];
				$scope.btnName = "Update Service";
			});
		};
		$scope.resetForm = function () {
			$scope.service = '';
		};
		 
	 	var init = function () {
			ngProgress.start();
			if($routeParams.oid !== undefined && $routeParams.oid !== null && $routeParams.oid !== ""){
				getServiceByOid($routeParams.oid);
				$scope.update = true;
			}
			loadServicesCategory();
			if($scope.service.serviceCategory === '2000' || $scope.service.serviceCategory === '' || $scope.service.serviceCategory === undefined ){
				$scope.newCategory = true;
				$scope.service.serviceCategory = "";
			}
		     	ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('serviceController', ['$rootScope', '$routeParams', '$scope', '_', 'constantService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'saveDataService', 'updateDataService',
    serviceController]);
   
	
});


'use strict';

define(['app'], function (app) {
	
	var ticketController = function ($rootScope, $scope, _, constantService, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, saveDataService) {
		
		var promis;
		$scope.ticket = {};

		$scope.createTicket = function (ticket) {
			$scope.response = {};
			var ticketObj = {};
			$scope.userInfo = authorizationService.getUserInfo();
			ticketObj.updatedBy = $scope.userInfo.userID;
			ticketObj.userID = $scope.userInfo.userID;
			ticketObj.topic = "["+ticket.serviceName+"] "+ticket.topic;
			promis = saveDataService.saveData('createTicket', ticketObj);
			promis.then(function (data) {
				if(data.status != "success"){
					$scope.response.status = data.status;
					$scope.response.message = data.message;
					return;
				}
				addComment (data.data, ticket);
			});
		};
		
		var addComment = function (ticketID, msg){
			var msgObj = {};
			$scope.userInfo = authorizationService.getUserInfo();
			msgObj.updatedBy = $scope.userInfo.userID;
			msgObj.ticketID = ticketID;
			msgObj.text = msg.body;
			promis = saveDataService.saveData('addComment', msgObj);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.response.status = data.status;
				$scope.response.message = "Your support ticket has been created please find the status from your ticket list";
				
				$scope.resetForm()
			});
		}
				
		var loadServices = function () {
			promis = loadDataService.loadData('loadServices/');
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.serviceList = data.data;
			});
		};
		

		$scope.resetForm = function () {
			init();
		};
		 
	 	var init = function () {
			ngProgress.start();
			$scope.service = {};
			loadServices();
			$scope.ticket = {};		
		    ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('ticketController', ['$rootScope', '$scope', '_', 'constantService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'saveDataService',
    ticketController]);
   
	
});


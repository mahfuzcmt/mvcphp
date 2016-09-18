
'use strict';

define(['app'], function (app) {
	
	var changePasswordController = function ($rootScope, $scope, _, constantService, authorizationService, localStorageService,
		configurationService, ngProgress, updateDataService) {
		
		var promis;
		
		$scope.changePassword = function (user) {
			if(user.confPassword != user.newPassword){
				$scope.notMached = true;
				return;
			}
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('changepassword/'+$scope.userInfo.userID+'/'+user.oldPassword+'/'+user.newPassword);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.resetChangePassword();
			});
		};
		 
		$scope.resetChangePassword = function () {
			$scope.user = '';
			$scope.notMached = false;
		};
		 
	 	var init = function () {
			 ngProgress.start();
		     ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('changePasswordController', ['$rootScope', '$scope', '_', 'constantService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'updateDataService',
    changePasswordController]);
   
	
});


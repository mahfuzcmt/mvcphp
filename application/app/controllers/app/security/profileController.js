
'use strict';

define(['app'], function (app) {
	
	var profileController = function ( $scope, loadDataService, navigationService, $upload, localStorageService, 
		configurationService, constantService,authorizationService, updateDataService) {
		
		var promis;
		$scope.user = {};
		
		var loadUserInfo = function () {
			$scope.userInfo = authorizationService.getUserInfo();
    		promis = loadDataService.loadData('userProfile/'+$scope.userInfo.userID);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					return;
				}
				$scope.user = data.data[0];
			});
		};
		
		$scope.uploadPic = function (files) {
			$scope.user.imagePath = "";
			$scope.message = "";
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$scope.upload = $upload.upload({
					url: 'api/upload.php',
					method: 'POST',               
					file: file
				}).success(function(data, status, headers, config) {
					$scope.message = data; 
					$scope.user.imagePath = 'img/photo/'+file.name;
				}).error(function(data, status) {
					$scope.message = data;
				});
			};
		}
		
		$scope.updateUserInfo = function (obj) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('updateUserProfile/'+$scope.userInfo.userID+'/'+obj.password,obj);
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				$scope.isEditableState = false;
				loadUserInfo();
			});
		};
		
	 	var init = function () {
			loadUserInfo();
	 	};

	 	init();
		 
 	};

 	
    app.register.controller('profileController', ['$scope', 'loadDataService', 'navigationService', '$upload',
    'localStorageService', 'configurationService','constantService', 'authorizationService', 'updateDataService',
    profileController]);
   
	
});
















'use strict';

define(['app'], function (app) {
	
	var signinController = function ( $scope, signInService, navigationService, localStorageService, 
		configurationService, constantService, $upload, authorizationService, saveDataService, loadDataService) {
		
		var promis;
		$scope.login = { userID : 'mahfuz', password : '123', msg : 'Df1000' };

		$scope.userID ;
		$scope.success = false;
		$scope.part1 = true;
		$scope.preBtnText = "<<Previous";
		$scope.nextBtnText = "Next>>";
		$scope.obj = {};
		
		$scope.forgetPass = function(obj){	
			promis = loadDataService.loadData('userinfo/'+obj.userID);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
					$scope.success = false;
					$scope.forgetPassPart= false;
					return;
				}
				$scope.user = data.data[0];
				promis = loadDataService.loadData('sendmail/'+$scope.user.email+'/'+$scope.user.fullName+'/'+$scope.user.password);
				promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.success = true;
				$scope.response = data.message;
				$scope.forgetPassPart= false;
				});
			});
		}
		
		$scope.formControl = function(obj){
			if(obj == 'pre'){
				$scope.part1 = true;
				$scope.part2 = false;
				
				return;
			}
			$scope.part1 = false;
			$scope.part2 = true;
		}
		
		
		$scope.signIn = function (login) {
        	if(!validateLoginForm()){
        		return;
        	}
			$scope.userID = login.userID;
        	var user = {};
        	promis = signInService.login('user/'+$scope.userID+'/'+login.password);
			promis.then(function (data) {
				if(data.status == "warning"){
					$scope.response = data.message;
				return;
				}
				
				$scope.userData = data.data[0];
				if($scope.userData != undefined && $scope.userData.length>0){
					//localStorageService.setValue(constantService.userInfoCookieStoreKey, $scope.userData[0]);
					//navigationService.menuNavigation('dashboard');
				}
				
				
			
				var menuJson = $.parseJSON($scope.userData.menuJSON);
				var webMenu;
				if(menuJson.children != undefined){
        			for(var i=0; i< menuJson.children.length; i++){
        				if(menuJson.children[i].id == "webMenu"){
        					webMenu = menuJson.children[i].children;
        				}
        			}
				}
				
				var userInfo = data.data[0];
				if(webMenu.length> 0){
					for(var i=0; i< webMenu.length; i++){
						if( webMenu[i].enable == true){
							userInfo.selectedLeftMenu = webMenu[i].url;
							localStorageService.setValue(constantService.userInfoCookieStoreKey, userInfo);
							navigationService.menuNavigation(userInfo.selectedLeftMenu);
							return;
						}
					}
				} 
			});
			
		saveOperationLog();
		};
		
		
		var saveOperationLog = function () {
			var obj = {};
			obj.operation = 'login';
			obj.userID = $scope.userID;
			promis = saveDataService.saveData('operationlog', obj);
			promis.then(function (data) {
				
			});
        };
		
		$scope.signUp = function (obj, confPassword) {
			if(confPassword != obj.password){
				$scope.notMached = true;
				return;
			}
			
			$scope.signUpPart = false;
			obj.role = 'user';
			obj.imagePath = $scope.imagePath;
			promis = saveDataService.saveData('signup',obj);
			promis.then(function (data) {
				if(data.status != "success"){
					$scope.response = data.message;
					return;
				}
				$scope.success = true;
				$scope.signUpPart = false;
				$scope.response = data.message;
				$scope.obj = {}
				$scope.part1 = true;
				$scope.notMached = false;
			});
        };
		
		$scope.uploadPic = function (files) {
			$scope.imagePath = "";
			$scope.message = "";
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$scope.upload = $upload.upload({
					url: 'api/upload.php',
					method: 'POST',               
					file: file
				}).success(function(data, status, headers, config) {
					$scope.message = data; 
					$scope.imagePath = 'img/photo/'+file.name;
				}).error(function(data, status) {
					$scope.message = data;
				});
			};
		}	
		$scope.$watch("login.userID", function (filterText) {
			validateLoginForm();
        });
		
		$scope.$watch("login.password", function (filterText) {
			validateLoginForm();
        });
			
	 	var validateLoginForm = function () {
	 		var isValid = false;
	 		if($scope.login == undefined || $scope.login == null || 
	 				$scope.login.userID == undefined || $scope.login.userID == null || $scope.login.userID.trim().length == 0){
	 			$scope.login.msg = 'Nl1001';
	 		} else if ($scope.login.password == undefined || $scope.login.password == null || $scope.login.password.trim().length == 0){
	 			$scope.login.msg = 'Nl1002';
	 		} else {
	 			$scope.login.msg = 'Df1000';
	 			isValid = true;
	 		}
	 		return isValid;
	 	};
		
		
	 	var init = function () {
	 		$(".right-side").addClass("strech");
            $('.left-side').addClass("collapse-left");
	 	};

	 	init();
		 
 	};

 	
    app.register.controller('signinController', ['$scope', 'signInService', 'navigationService', 
    'localStorageService', 'configurationService','constantService', '$upload', 'authorizationService', 'saveDataService', 'loadDataService',
    signinController]);
   
	
});















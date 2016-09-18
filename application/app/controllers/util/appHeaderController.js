
'use strict';

define(['app'], function (app) {
	
	var appHeaderController = function ($rootScope, $scope, $window, authorizationService, saveDataService, constantService, 
			signInService, navigationService ) {
		
		var userInfo, promis;
        
        $scope.menuToggle = function () {
        	if ($window.innerWidth <= 992) {
                $('.row-offcanvas').toggleClass('active', 500);
                $('.left-side').removeClass("collapse-left");
                $(".right-side").removeClass("strech");
                $('.row-offcanvas').toggleClass("relative", 500);
            } else {
                $(".right-side").toggleClass("strech", 500);
                $('.left-side').toggleClass("collapse-left", 500);
            }
        };
        
        $scope.userToggle = function () {
        	$("#userToggle").addClass('open', 500);
        	$("#userToggle").toggleClass('open', 500);
        };
        
        $scope.gotoChangePassword = function () {
        	navigationService.menuNavigation('changePassword');
        };
        
        $scope.gotoProfile = function () {
        	navigationService.menuNavigation('profile');
        };
        
		$scope.logout = function () {	
			userInfo = authorizationService.getUserInfo();
			var obj = {};
			obj.operation = 'logout';
			obj.userID = userInfo.userID;
			promis = saveDataService.saveData('operationlog', obj);
			promis.then(function (data) {
				authorizationService.signOut();
			});
		};
        

        var init = function () {
        	$scope.userInfo = authorizationService.getUserInfo();      
	    }; 
	    
	    init();
       
		 
	};
    
	app.controller('appHeaderController', ['$rootScope', '$scope', '$window', 'authorizationService', 'saveDataService', 'constantService', 
    'signInService','navigationService', appHeaderController]);
	
});















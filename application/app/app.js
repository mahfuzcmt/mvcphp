'use strict';

define(['services/utils/routeResolver'], function () {

	var app = angular.module('mbmsApp', ['localization', 'ngRoute', 'ngAnimate', 'ngResource', 
      'ngCookies', 'ui.bootstrap', 'ui', 'ui.select2', 'highcharts-ng', 'ngTable', 'routeResolverServices', 
      'underscore', 'ngProgress', 'ui.bootstrap.transition', 'angularFileUpload', 'ngBootstrap']);

	app.run(['$rootScope', '$route', '$http', '$location', 'constantService', 'localize', 'authorizationService',
	         function ($rootScope, $route, $http, $location, constantService, localize, authorizationService) {
	
		var userInfo;
		$rootScope.messagePageLocation = 'app/partials/message.html';
		localize.setLanguage('en-US');
		
		$rootScope.$on("$routeChangeStart", function (oldPath, newPath) {
			$rootScope.pageTitle = newPath.$$route.title;
			$rootScope.isWeb = true;
			if (newPath.$$route == undefined || newPath.$$route.isWeb) {
	        	$rootScope.layout = constantService.getWebLayout();
	            return;
	        } 
	        userInfo = authorizationService.getUserInfo();
	        if(userInfo === undefined || userInfo === null){
	            $rootScope.layout = constantService.getWebLayout();
	            $location.path('/');
	            return;
	        }
	        $rootScope.isWeb = false;
	        $rootScope.layout = constantService.getAppLayout();
	    });
    
	}]); 

	app.config(['$routeProvider','routeResolverProvider','$controllerProvider', '$compileProvider', 
	            '$filterProvider', '$provide', '$locationProvider', '$httpProvider',  
	         function ($routeProvider,routeResolverProvider, $controllerProvider, $compileProvider, 
	        	$filterProvider, $provide, $locationProvider, $httpProvider) {
    
		app.register = {
	        controller: $controllerProvider.register,
	        //directive: $compileProvider.directive,
	        filter: $filterProvider.register,
	        //factory: $provide.factory,
	        //service: $provide.service
	    };
		
		// Provider-based service.
        app.service = function( name, constructor ) {
            $provide.service( name, constructor );
            return( this );
        };
        
        // Provider-based factory.
        app.factory = function( name, factory ) {
            $provide.factory( name, factory );
            return( this );
        };
        
        // Provider-based directive.
        app.directive = function( name, factory ) {
            $compileProvider.directive( name, factory );
            return( this );
        };
     
		var route = routeResolverProvider.route;
		$routeProvider 																					
		//page and controller name prefix,																	dir path, 				title							isWeb
		.when('/', 											route.resolve('signin', 						'app/security/', 		'lalcode Provisioning',  		true))
        
		.when('/dashboard', 								route.resolve('dashboard', 						'app/dashboard/', 		'Dashboard', 					false))
		.when('/profile', 									route.resolve('profile', 						'app/security/', 		'User Profile', 				false))
		.when('/changePassword', 							route.resolve('changePassword', 				'app/security/', 		'Change Password', 				false))
		.when('/userlist', 									route.resolve('userlist', 						'app/security/', 		'User List',					false))
		.when('/order', 									route.resolve('order', 							'app/order/', 			'Make New Order',		 		false))
		.when('/orderlist', 								route.resolve('orderlist', 						'app/order/', 			'Order List',		 			false))
		.when('/invoicelist', 								route.resolve('invoicelist', 					'app/invoice/', 		'Invoice List',		 			false))
		.when('/ticket', 									route.resolve('ticket', 						'app/ticket/', 			'Support Ticket ',		 		false))				
		.when('/ticketlist', 								route.resolve('ticketlist', 					'app/ticket/', 			'Support Ticket List',		 	false))
		.when('/servicelist', 								route.resolve('servicelist', 					'app/settings/', 		'Service List',		 			false))
		.when('/service', 									route.resolve('service', 						'app/settings/', 		'Service Provisoining',		 	false))
		.when('/service/:oid', 								route.resolve('service', 						'app/settings/', 		'Update Service',		 	false))
		.otherwise({ redirectTo: '/' });
		
	}]);

	return app;

});



    
    
    
    
    
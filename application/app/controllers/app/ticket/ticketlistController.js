'use strict';

define(['app'], function (app) {
	
	var ticketlistController = function ($rootScope, $scope, _, constantService, $filter, navigationService, authorizationService, localStorageService,
		configurationService, ngProgress, loadDataService, saveDataService, updateDataService) {
		
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
		 
		var loadTicketList = function () {
			$scope.userInfo = authorizationService.getUserInfo();
			promis = loadDataService.loadData('loadTicketlist/'+$scope.userInfo.userID+'/'+$scope.userInfo.role);
			promis.then(function (data) {
				if(data.status != "success"){
					return;
				}
				$scope.ticketList = data.data;
				$scope.dataListSize = $scope.ticketList.length;
				$scope.dataList = data.data;
				createWatches($scope.dataList);
			});
		};
		$scope.search = function(filterText){ 
			var filteredResult = $filter("ticketFilter")($scope.dataList, filterText); 
            $scope.dataListSize = filteredResult.length; 
            doPagination(filteredResult); 
            createWatches(filteredResult);
	     };  
			 		                 
	     var doPagination = function(filteredResult){ 
        	 $scope.ticketList = filteredResult;
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
								$scope.pageDataTotal, "Tickets", 'English');
	        };

	    	var createWatches = function (data) {
	        	$scope.$watch("searchText", function (filterText) {
	            	$scope.currentPage = 1;
	            });
	            
	            $scope.$watch('currentPage + itemsPerPage', function() {
	            	var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + ($scope.itemsPerPage - 0);
	            	$scope.ticketList = data.slice(begin, end);
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
							$scope.pageDataTotal, "Tickets", "English");
	            });
	        };
		
			$scope.setEditId =  function(oid) {
	    	   $scope.editId = oid;
	       }
		        
	       $scope.closeEditId=function(){
	    	   $scope.editId = '';
	       };
	            
	        $scope.showComments = function(oid){
	       	 	$scope.cmts = {};
	        	$scope.setEditId (oid)
	        	//var param = { loginBean : $scope.userInfo, operation : constantService.getReviewComments, reviewID: review };
				promis = loadDataService.loadData('loadMessage/'+oid);
				promis.then(function(data) {
					if(data.status != "success"){
						return;
					}
					$scope.cmts = data.data;
					$scope.message = {};
				});
			};
		$scope.addComment = function (ticket, msg){
			var msgObj = {};
			$scope.userInfo = authorizationService.getUserInfo();
			msgObj.updatedBy = $scope.userInfo.userID;
			msgObj.ticketID = ticket.oid;
			msgObj.text = msg.txt;
			promis = saveDataService.saveData('addComment', msgObj);
			promis.then(function (data) {
				if(data.status != "success"){
					$scope.response.status = data.status;
					$scope.response.message = data.message;
					return;
				}
				$scope.showComments(ticket.oid);
			});
		}	
		
		$scope.redirect = function(page){
			navigationService.menuNavigation(page); 
		}
		
		$scope.changeStatus= function (status,oid) {
			$scope.response = {};
			$scope.userInfo = authorizationService.getUserInfo();
			promis = updateDataService.updateData('changestatus/'+oid+'/'+status+'/'+$scope.userInfo.userID+'/'+'ticket');
			promis.then(function (data) {
				$scope.response.status = data.status;
				$scope.response.message = data.message;
				if(data.status != "success"){
					return;
				}
				loadTicketList();
			});
		};
		
	 	var init = function () {
			ngProgress.start();
			loadTicketList();
			ngProgress.complete();
	 	};

	 	init();
	 	
	 };
	 
    app.register.controller('ticketlistController', ['$rootScope', '$scope', '_', 'constantService', '$filter', 'navigationService', 'authorizationService',
	'localStorageService', 'configurationService', 'ngProgress', 'loadDataService', 'saveDataService', 'updateDataService',
    ticketlistController]);
   
	
});


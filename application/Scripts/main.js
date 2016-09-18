
require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'directives/ngEnter',
        'directives/highChart',
		'directives/bootstrapDatepicker',
		'filters/orderFilter',
		'filters/invoiceFilter',
		'filters/ticketFilter',
        'services/utils/routeResolver',
        'services/utils/constantService',
        'services/utils/configurationService',
        'services/utils/localStorageService',
        'services/utils/navigationService',
        'services/utils/authorizationService',
        'services/utils/languageService',
        'services/utils/menuService',
        'services/utils/loadService',
        'services/utils/alertService',
        'services/utils/modalService',
        'services/utils/confirmationService',
        'services/utils/treeMenuService',
		
        'services/app/loadDataService',
        'services/app/saveDataService',
        'services/app/updateDataService',
        'services/app/deleteDataService',
		
		'services/app/security/signInService',
        'services/app/dashboard/dashboardService',
        'controllers/util/appHeaderController',
        'controllers/util/appLeftMenuController',
        'controllers/util/messageController'
    ],
function () {
    angular.bootstrap(document, ['mbmsApp']);
});


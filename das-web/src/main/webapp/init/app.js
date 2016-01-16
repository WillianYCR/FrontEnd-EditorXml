
angular.module('app', ['ui.router','app.controllers','app.directives','app.textos'])

.run(['$rootScope', '$location',
      function ($rootScope, $location){
	$rootScope.location = $location;
	$location.path('/login');
}])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.
	state('login', {
		url : '/login',
		templateUrl : '../page/login.html',
		controller : 'loginController'
	})
	.state('principal', {
		url : '/principal',
		templateUrl : '../page/templates/body.html',
		controller : 'principalController'
	})
	.state('messageFormat', {
		url : '/messageFormat',
		templateUrl : '../page/pageMessageFormat.html',
		controller : 'messageFormatController'
	})
	.state('adminQueue', {
		url : '/adminQueue',
		templateUrl : '../page/pageAdminQueues.html',
		controller : 'adminQueueController'
	})
	.state('driver', {
		url : '/driver',
		templateUrl : '../page/pageDrivers.html',
		controller : 'driverController'
	});
}]);
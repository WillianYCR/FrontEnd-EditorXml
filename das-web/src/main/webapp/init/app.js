
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
		templateUrl : '../page/pageAdminQueue.html',
		controller : 'adminQueueController'
	})
	.state('driver', {
		url : '/driver',
		templateUrl : '../page/pageDriver.html',
		controller : 'driverController'
	})
	.state('balancer', {
		url : '/balancer',
		templateUrl : '../page/pageBalancer.html',
		controller : 'balancerController'
	})
	.state('route', {
		url : '/route',
		templateUrl : '../page/pageRoute.html',
		controller : 'routeController'
	})
	.state('service', {
		url : '/service',
		templateUrl : '../page/pageService.html',
		controller : 'serviceController'
	})
	.state('serviceNode', {
		url : '/serviceNode',
		templateUrl : '../page/pageServiceNode.html',
		controller : 'serviceNodeController'
	})
	.state('profile', {
		url : '/profile',
		templateUrl : '../page/pageProfile.html',
		controller : 'profileController'
	})
	.state('sixadcClient', {
		url : '/sixadcClient',
		templateUrl : '../page/pageSixadcClient.html',
		controller : 'clientController'
	});
}]);
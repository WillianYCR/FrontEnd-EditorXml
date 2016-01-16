angular.module('app.controllers', [])
.controller('loginController',
	['$scope', '$state', 'loginTextos', function($scope, $state, loginTextos){
	// establece el texto en la applicacion
	$scope.loginTextos = loginTextos;

	$scope.ingresar = function(){
		$state.go('principal');
	};
	
}]);
angular.module('app.controllers')
.controller('driverController',
	['$scope', '$state', 'driverTexto', 'botonTexto', function($scope, $state, driverTexto, botonTexto){
	// establece el texto en la applicacion
	$scope.driverTexto = driverTexto;
	$scope.botonTexto = botonTexto;

	$scope.agregar = function(){
		$state.go('login');
	};
	$scope.quitar = function(){
		$state.go('login');
	};
	$scope.cancelar = function(){
		$state.go('messageFormat');
	};
	
}]);
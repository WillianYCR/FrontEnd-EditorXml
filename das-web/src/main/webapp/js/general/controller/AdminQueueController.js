angular.module('app.controllers')
.controller('adminQueueController',
	['$scope', '$state', 'adminQueueTexto', 'botonTexto', function($scope, $state, adminQueueTexto, botonTexto){
	// establece el texto en la applicacion
	$scope.adminQueueTexto = adminQueueTexto;
	$scope.botonTexto = botonTexto;

	$scope.agregar = function(){
		$state.go('login');
	};
	$scope.quitar = function(){
		$state.go('driver');
	};
	$scope.cancelar = function(){
		$state.go('messageFormat');
	};
	
}]);
angular.module('app.controllers')
.controller('serviceController',
	['$scope', '$http', '$state',  'queryRuta', 'serviceTexto',
		function($scope,  $http, $state, $queryRuta, serviceTexto){
	// establece el texto en la applicacion
			$scope.serviceTexto = serviceTexto;
			//variables de inicio
			$scope.serviceGeneral = {}; //almacena toda la data del servicio del objeto "services"
			$scope.selectService = { authorizationBins:{bin:[]},
									routes:{routeId:[]}
								 }; //es parte No dependeiente de la data general(services.services), 
									 //es usado para mostrar la data y ser enviado para guardar
			
			$scope.listRoute = []; //Lista de la data servicio del objeto Routes
			$scope.selectionRoute = [];//Valores seleccionados de route

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de la respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//***********Inicio de proceso por default
			readData();
			readDataRoute();
//***********Fin de proceso por default

//***********Inicio Consulta servicio rest - "Servicio" y "Route"
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlService)
					.success(function(data){
						console.log("N° registros de servicios:", data.services.length);
						$scope.serviceGeneral = data;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataRoute() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlRoute)
					.success(function(data){
						console.log("N° registros routes:", data.routes.length);
						$scope.listRoute = data.routes;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlService, parData)
					.success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}

			function updateData(parData) {
				console.log("Procesando UPDATE...:" , parData);
				$http.put($queryRuta.urlService, parData)
					.success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}

			function deleteData(parId) {
				console.log("Procesando DELETE...", parId);
				$http.delete($queryRuta.urlService + '/' + parId).
					success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}
//***********Inicio Consulta servicio rest - "Servicio" y "Route"

//***********Inicio de metodos Fijos para mantener actualizado la informacion
			function refreshData (){
				console.log("Refrescando la data...");
				readData();	
				readDataRoute();
				limpiarCampos();			
			}

			function responseData(parData){
				if(parData.codigo == "00"){
					console.log("OK...:", parData);
					$scope.responseRestTag = "success";
				}else if(parData.codigo == "99"){
					console.log("ERROR...:", parData);
					$scope.responseRestTag = "danger";
				}
				$scope.responseRest = parData.descripcion;
				showAlert();
			}

			function responseDataWarning(parDescripcion){
				console.log("WARNING...:", parDescripcion);
				$scope.responseRest = parDescripcion;
				$scope.responseRestTag = "warning";
				showAlert();
			}

			function showAlert() {
				$scope.hideAlert = false;
				console.log("¿Se oculta alerta?: ", $scope.hideAlert);
			}

			function closeAlert() {
				$scope.hideAlert = true    
				console.log("¿Se oculta alerta?: ", $scope.hideAlert);
			}

			function limpiarCampos(){
				stateNew = true;
				$scope.selectService.serviceId = "";
				$scope.selectService.serviceDesc = "";
				$scope.selectService.discriminationRules = "";
				//$scope.selectService.messageType.messageTypeDesc = "";
				$scope.selectionRoute = [];
			}
//***********Fin de metodos Fijos para mantener actualizado la informacion
			
//***********Inicio de Botones de proceso, controles
			$scope.nuevo = function(){
				limpiarCampos();
				closeAlert();
			};

			$scope.refrescar = function(){
				stateNew = true;
				readData();
				readDataRoute();
				closeAlert();
			};

			$scope.grabar = function(dataSave){
				console.log("Inicio de evento grabar...:" , dataSave);
				$scope.selectService.routes.routeId = $scope.selectionRoute;
				console.log("Inicio de evento grabar Cargado...:" , dataSave);
				var existId = false;
				angular.forEach($scope.serviceGeneral.services, function(value, key){
				    if(value.serviceId == dataSave.serviceId){
				    	console.log("Validando identificador...:", dataSave.serviceId);
				      	existId = true;
				    }
				});
				if(existId){
					if(!stateNew){
			      		console.log("Enviando edicion para el registro...");
			      		updateData(dataSave);
		      		}else{
		      			responseDataWarning("No se puede guardar por tener identificador duplicado...");
		      		}
				}else{
					if(stateNew){
						console.log("Enviando Insercion de nuevo registro...: ");
						saveData(dataSave);
					}else{
						responseDataWarning("No se puede editar, No existe el identificador...");
					}
				}
			};

			$scope.editar = function(valRow){
				console.log("Inicio de disponibilidad para editar...:", valRow);
				closeAlert();
				stateNew = false;
				$scope.selectService = angular.copy(valRow);

				if(!$scope.selectService.routes.routeId){
					$scope.selectService.routes.routeId = [];
				} 

				$scope.selectionRoute = $scope.selectService.routes.routeId;
			};
			
			$scope.quitar = function(valId){
				console.log("Inicio de proceso eliminar...:" , valId);
				jConfirm('¿Realmente desea eliminar el registro?', 'Control de proceso', function(r) {
				    if(r){
						console.log("Enviando eliminacion de registro...");
						deleteData(valId);
					}else{
						console.log("No se desea eliminar el registro...");
					}
				});
			};

			$scope.getSelectionRoute = function getSelectionRoute(filter) {
			    var idy = $scope.selectionRoute.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionRoute.splice(idy, 1);
			    }else {
			    	$scope.selectionRoute.push(filter);
			    }
			    console.log("lista routes: ", $scope.selectionRoute);
			};
//***********Fin de Botones de proceso, controles
			
		}
	]);
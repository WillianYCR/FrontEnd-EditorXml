angular.module('app.controllers')
.controller('profileController',
	['$scope', '$http', '$state',  'queryRuta', 'profileTexto',
		function($scope,  $http, $state, $queryRuta, profileTexto){
	// establece el texto en la applicacion
			$scope.profileTexto = profileTexto;
			//variables de inicio
			$scope.profileGeneral = {}; //almacena toda la data del servicio del objeto "profiles"
			$scope.selectProfile = { profileDrivers:{driverIds:[]},
									authServices:{serviceIds:[]}
								 }; //es parte No dependeiente de la data general(profiles), 
									 //es usado para mostrar la data y ser enviado para guardar
			
			$scope.listDriver = []; //Lista de la data servicio del objeto Driver
			$scope.selectionDriver = [];//Valores seleccionados de Driver

			$scope.listService = []; //Lista de la data servicio del objeto Service
			$scope.selectionService = [];//Valores seleccionados de Service

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de la respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//***********Inicio de proceso por default
			readData();
			readDataDriver();
			readDataService();
//***********Fin de proceso por default

//***********Inicio Consulta servicio rest
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlProfile)
					.success(function(data){
						console.log("N° registros de Profile:", data.profiles.length);
						$scope.profileGeneral = data.profiles;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataDriver() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlDriver)
					.success(function(data){
						console.log("N° registros drivers:", data.drivers.length);
						$scope.listDriver = data.drivers;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataService() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlService)
					.success(function(data){
						console.log("N° registros service:", data.services.length);
						$scope.listService = data.services;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlProfile, parData)
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
				$http.put($queryRuta.urlProfile, parData)
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
				$http.delete($queryRuta.urlProfile + '/' + parId).
					success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}
//***********Inicio Consulta servicio rest

//***********Inicio de metodos Fijos para mantener actualizado la informacion
			function refreshData (){
				console.log("Refrescando la data...");
				readData();	
				readDataDriver();
				readDataService();
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
				$scope.selectProfile.profileId = "";
				$scope.selectProfile.profileDesc = "";
				$scope.selectionDriver = [];
				$scope.selectionService = [];
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
				readDataDriver();
				readDataService();
				closeAlert();
			};

			$scope.grabar = function(dataSave){
				$scope.selectProfile.profileDrivers.driverIds = $scope.selectionDriver;
				$scope.selectProfile.authServices.serviceIds = $scope.selectionService;
				console.log("Inicio de evento grabar...:" , dataSave);
				var existId = false;
				angular.forEach($scope.profileGeneral, function(value, key){
				    if(value.profileId == dataSave.profileId){
				    	console.log("Validando identificador...:", dataSave.profileId);
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
				$scope.selectProfile = angular.copy(valRow);

				if(!$scope.selectProfile.profileDrivers.driverIds){
					$scope.selectProfile.profileDrivers.driverIds = [];
				}
				if(!$scope.selectProfile.authServices.serviceIds){
					$scope.selectProfile.authServices.serviceIds = [];
				} 

				$scope.selectionDriver = $scope.selectProfile.profileDrivers.driverIds;
				$scope.selectionService = $scope.selectProfile.authServices.serviceIds;
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

			$scope.getSelectionDriver = function getSelectionDriver(filter) {
			    var idy = $scope.selectionDriver.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionDriver.splice(idy, 1);
			    }else {
			    	$scope.selectionDriver.push(filter);
			    }
			    console.log("lista driver: ", $scope.selectionDriver);
			};

			$scope.getSelectionService = function getSelectionService(filter) {
			    var idy = $scope.selectionService.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionService.splice(idy, 1);
			    }else {
			    	$scope.selectionService.push(filter);
			    }
			    console.log("lista service: ", $scope.selectionService);
			};
//***********Fin de Botones de proceso, controles
			
		}
	]);
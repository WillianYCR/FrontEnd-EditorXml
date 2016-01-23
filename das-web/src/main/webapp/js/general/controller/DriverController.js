angular.module('app.controllers')
.controller('driverController',
	['$scope', '$http', '$state',  'queryRuta', 'driverTexto',
		function($scope,  $http, $state, $queryRuta, driverTexto){
//**********Establece el texto en la applicacion
			$scope.driverTexto = driverTexto;
			//variables de inicio
			$scope.driverGeneral = {}; //almacena toda la data del servicio del objeto "AdminQueues"
			$scope.selectDriver = {
									filters: {inFilters: {inFilter:[]},
												outFilters: {outFilter:[]}
												}
									}; //es parte No dependeiente de la data general(AdminQueues.drivers), 
									 //es usado para mostrar la data y ser enviado paraguardar
			
			$scope.listAdminQueue = []; //Lista de la data servicio del objetoMEssageFormat
			$scope.statusType = [{"type":"ASYNCRONOUS"},{"type":"SIXSYNCRONOUS"},{"type":"SYNCRONOUS"}];
			$scope.statusValidarIp = [{"status":"true"},{"status":"false"}];
			$scope.statusPermiso = angular.copy($scope.statusValidarIp);

			//Valores fijos para los filtros de entrada
			$scope.optionInFilter = ['com.novatronic.loadbalancer.driver.filters.FromBinaryFrameFilter',
								   'com.novatronic.loadbalancer.driver.filters.PutBinAdqFilter',
								   'com.novatronic.loadbalancer.driver.filters.PutTokenBinAdqFilter'];
			$scope.selectionInFilter = [];//Valores seleccionados de las entradas

			//Valores fijos para los filtros de salida
			$scope.optionOutFilter = ['com.novatronic.loadbalancer.driver.filters.ToBinaryFrameFilter',
								   'com.novatronic.loadbalancer.driver.filters.RemoveTokenFilter'];
			$scope.selectionOutFilter = [];//Valores seleccionados de las salidas

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de la respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//**********Inicio de proceso por default
			readData();
			readDataQueue();
//**********Fin de proceso por default
			
//**********Inicio Consulta servicio rest - "Driver"
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlDriver)
					.success(function(data){
						console.log("N° registros Drivers:", data.drivers.length);
						$scope.driverGeneral = data;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataQueue() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlAdminQueue)
					.success(function(data){
						console.log("N° registros Colas:", data.adminQueues.length);
						$scope.listAdminQueue = data.adminQueues;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlDriver, parData)
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
				$http.put($queryRuta.urlDriver, parData)
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
				$http.delete($queryRuta.urlDriver + '/' + parId).
					success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}
//**********Inicio Consulta servicio rest - "Driver"

//**********Inicio de metodos Fijos para mantener actualizado la informacion
			function refreshData (){
				console.log("Refrescando la data...");
				readData();	
				readDataQueue();
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

			$scope.seleccionarFormato = function(){
				angular.forEach($scope.listAdminQueue, function(value, key){
				    if(value.messageFormatId == $scope.valueFormatId)
				    	console.log("Formato de mensaje seleccionado ", value.valueFormatId);
				});
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
				$scope.selectDriver.driverId = "";
				$scope.selectDriver.adminQueueId = "";
				$scope.selectDriver.type = "";
				$scope.selectDriver.timeOutConnect = "";
				$scope.selectDriver.timeOutRead = "";
				$scope.selectDriver.retries = "";
				$scope.selectDriver.timeOutQueueRead = "";

				$scope.selectDriver.name = "";
				$scope.selectDriver.port = "";
				$scope.selectDriver.maxConcurrentConnections = "";
				$scope.selectDriver.forwardProcess = "";
				$scope.selectDriver.validaIp = "";
				$scope.selectDriver.concurrentUserSupport = "";
				$scope.selectionInFilter = [];
				$scope.selectionOutFilter = [];
				//$scope.valueFormatId = "";
			}
//**********Fin de metodos Fijos para mantener actualizado la informacion
			
//**********Inicio de Botones de proceso, controles
			$scope.nuevo = function(){
				limpiarCampos();
				closeAlert();
			};

			$scope.refrescar = function(){
				stateNew = true;
				readData();
				readDataQueue();
				closeAlert();
			};

			$scope.grabar = function(dataSave){
				console.log("Inicio de evento grabar...:" , dataSave);
				var existId = false;
				angular.forEach($scope.driverGeneral.drivers, function(value, key){
				    if(value.driverId == dataSave.driverId){
				    	console.log("Validando identificador...:", dataSave.driverId);
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
				limpiarCampos();
				$scope.selectDriver = angular.copy(valRow);
				if(!$scope.selectDriver.filters.inFilters.inFilter){
					$scope.selectDriver.filters.inFilters.inFilter = [];
				}
				if(!$scope.selectDriver.filters.outFilters.outFilter){
					$scope.selectDriver.filters.outFilters.outFilter = [];
				}

				$scope.selectionInFilter = $scope.selectDriver.filters.inFilters.inFilter;
				$scope.selectionOutFilter = $scope.selectDriver.filters.outFilters.outFilter;
				
				stateNew = false;
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

			$scope.getSelectionInFilter = function getSelectionInFilter(filter) {
			    var idx = $scope.selectionInFilter.indexOf(filter);
			    if (idx > -1) {
			    	$scope.selectionInFilter.splice(idx, 1);
			    }else {
			    	$scope.selectionInFilter.push(filter);
			    }
			    console.log("Filter In: ", $scope.selectionInFilter);
			};

			$scope.getSelectionOutFilter = function getSelectionOutFilter(filter) {
			    var idy = $scope.selectionOutFilter.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionOutFilter.splice(idy, 1);
			    }else {
			    	$scope.selectionOutFilter.push(filter);
			    }
			    console.log("Filter Out: ", $scope.selectionOutFilter);
			};
//**********Fin de Botones de proceso, controles

		}
	]);
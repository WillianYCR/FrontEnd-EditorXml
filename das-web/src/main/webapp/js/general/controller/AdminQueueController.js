angular.module('app.controllers')
.controller('adminQueueController',
	['$scope', '$http', '$state',  'queryRuta', 'queueTxt',
		function($scope,  $http, $state, $queryRuta, queueTxt){
	// establece el texto en la applicacion
			$scope.queueTxt = queueTxt;
			//variables de inicio
			$scope.adminQueueGeneral = {}; //almacena toda la data del servicio del objeto "AdminQueues"
			$scope.selectQueue = { messageType:{  
												supportedMessageFormats:
													{messageFormatId:[]}
											}
								 }; //es parte No dependeiente de la data general(AdminQueues.adminQueues), 
									 //es usado para mostrar la data y ser enviado paraguardar
			
			$scope.listMessageFormat = []; //Lista de la data servicio del objetoMEssageFormat
			$scope.selectionMessage = [];//Valores seleccionados de los formatos

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de la respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//***********Inicio de proceso por default
			readData();
			readDataFormat();
//***********Fin de proceso por default

//***********Inicio Consulta servicio rest - "MessageFormat"
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlAdminQueue)
					.success(function(data){
						console.log("N° registros de colas:", data.adminQueues.length);
						$scope.adminQueueGeneral = data;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataFormat() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlMessageFormat)
					.success(function(data){
						console.log("N° registros formateos:", data.messageFormats.length);
						$scope.listMessageFormat = data.messageFormats;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlAdminQueue, parData)
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
				$http.put($queryRuta.urlAdminQueue, parData)
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
				$http.delete($queryRuta.urlAdminQueue + '/' + parId).
					success(function(data){
						responseData(data);
						refreshData();
					})
					.error(function(data, status) {
				 		console.log(status);
						responseData(data);
					});
			}
//***********Inicio Consulta servicio rest - "MessageFormat"

//***********Inicio de metodos Fijos para mantener actualizado la informacion
			function refreshData (){
				console.log("Refrescando la data...");
				readData();	
				readDataFormat();
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
				$scope.selectQueue.adminQueueId = "";
				$scope.selectQueue.workerThreadsCount = "";
				$scope.selectQueue.messageType.messageTypeId = "";
				$scope.selectQueue.messageType.messageTypeDesc = "";
				$scope.selectionMessage = [];
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
				readDataFormat();
				closeAlert();
			};

			$scope.grabar = function(dataSave){
				console.log("Inicio de evento grabar...:" , dataSave);
				var existId = false;
				angular.forEach($scope.adminQueueGeneral.adminQueues, function(value, key){
				    if(value.adminQueueId == dataSave.adminQueueId){
				    	console.log("Validando identificador...:", dataSave.adminQueueId);
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
				$scope.selectQueue = angular.copy(valRow);

				if(!$scope.selectQueue.messageType.supportedMessageFormats.messageFormatId){
					$scope.selectQueue.messageType.supportedMessageFormats.messageFormatId = [];
				} 

				$scope.selectionMessage = $scope.selectQueue.messageType.supportedMessageFormats.messageFormatId;
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

			$scope.getSelectionMessage = function getSelectionMessage(filter) {
			    var idy = $scope.selectionMessage.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionMessage.splice(idy, 1);
			    }else {
			    	$scope.selectionMessage.push(filter);
			    }
			    console.log("lista message: ", $scope.selectionMessage);
			    console.log("lista AdminQueue: ", $scope.selectQueue);
			};
//***********Fin de Botones de proceso, controles
			

		}
	]);
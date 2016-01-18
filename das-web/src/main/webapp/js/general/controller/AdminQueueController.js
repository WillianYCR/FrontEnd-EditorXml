angular.module('app.controllers')
.controller('adminQueueController',
	['$scope', '$http', '$state',  'queryRuta', 'queueTxt',
		function($scope,  $http, $state, $queryRuta, queueTxt){
	// establece el texto en la applicacion
			$scope.queueTxt = queueTxt;
			//variables de inicio
			$scope.listAdminQueue = [];
			$scope.selectQueue = {};
			$scope.selectQueueMessage = {};
			$scope.listFormater = [];
			$scope.responseRest = "";
			$scope.responseRestTag = "";
			$scope.hideAlert = true
			var stateNew = true;

			$scope.listFormater = [{"messageFormatId":"ISOINTST"},{"messageFormatId":"WILL"},{"messageFormatId":"YOPE"}];
			
			//readData();
			//Consulta servicio rest- Daos
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlAdminQueue)
					.success(function(data){
						console.log("N° registros:", data.adminQueue.length);
						$scope.listAdminQueue = data.adminQueue;
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

			function refreshData (){
				console.log("Refrescando la data...");
				readData();				
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
			
			//Botones de proceso
			$scope.nuevo = function(){
				limpiarCampos();
				closeAlert();
			};

			$scope.refrescar = function(){
				stateNew = true;
				readData();
				closeAlert();
			};

			function showAlert() {
				$scope.hideAlert = false;
				console.log("Valor hideAlert: ", $scope.hideAlert);
			}

			function closeAlert() {
				$scope.hideAlert = true    
				console.log("Valor hideAlert: ", $scope.hideAlert);
			}

			//Datos a comfigurar

			$scope.grabar = function(dataSave){
				console.log("Inicio de evento grabar...:" , dataSave);
				var existId = false;
				angular.forEach($scope.listAdminQueue, function(value, key){
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

			function limpiarCampos(){
				stateNew = true;
				$scope.selectQueue.adminQueueId = "";
				$scope.selectQueue.workerThreadsCount = "";
				$scope.selectQueue.identificadorMensaje = "";
				$scope.selectQueue.descripcionMensaje = "";
			}

			//Botones de la tabla
			$scope.editar = function(valRow){
				console.log("Inicio de disponibilidad para editar...:", valRow);
				closeAlert();
				stateNew = false;
				$scope.selectQueue = angular.copy(valRow);
			};
			
			$scope.quitar = function(valId){
				console.log("Inicio de proceso eliminar...:" , valId);
				var estado = true;
				
				if(estado){
					console.log("Enviando eliminacion de registro...");
					deleteData(valId);
					limpiarCampos();
				}
			};
		}
	]);
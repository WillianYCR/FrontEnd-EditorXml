angular.module('app.controllers')
.controller('messageFormatController',
	['$scope', '$http', '$state', 'messageFormatTexto', 'botonTexto',  'tablaTexto', 'queryRuta',
		function($scope,  $http, $state, messageFormatTexto, botonTexto, tablaTexto, $queryRuta){
	// establece el texto en la applicacion
			$scope.messageFormatTexto = messageFormatTexto;
			$scope.botonTexto = botonTexto;
			$scope.tablaTexto = tablaTexto;
			//variables de inicio
			$scope.listMessageFormat = [];
			$scope.selectMessageFormat = {};
			$scope.listTypeFormater = [];
			$scope.responseRest = "";
			$scope.responseRestTag = "";
			$scope.hideAlert = true
			var stateNew = true;

			$scope.listTypeFormater = [{"transformerStruct":"ISO8583"},{"transformerStruct":"PLAIN"}];
			
			readData();
			//Consulta servicio rest- Daos
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlMessageFormat)
					.success(function(data){
						console.log("N° registros:", data.messageFormats.length);
						$scope.listMessageFormat = data.messageFormats;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});

			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlMessageFormat, parData)
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
				$http.put($queryRuta.urlMessageFormat, parData)
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
				$http.delete($queryRuta.urlMessageFormat + '/' + parId).
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
				stateNew = true;
				closeAlert();
			};

			$scope.refrescar = function(){
				stateNew = true;
				readData();
				closeAlert();
			};

			$scope.grabar = function(dataSave){
				console.log("Inicio de evento grabar...:" , dataSave);
				var existId = false;
				angular.forEach($scope.listMessageFormat, function(value, key){
				    if(value.messageFormatId == dataSave.messageFormatId){
				    	console.log("Validando identificador...:", dataSave.messageFormatId);
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


			function showAlert() {
				$scope.hideAlert = false;
				console.log("Valor hideAlert: ", $scope.hideAlert);
			}

			function closeAlert() {
				$scope.hideAlert = true    
				console.log("Valor hideAlert: ", $scope.hideAlert);
			}



			//Botones de la tabla
			$scope.editar = function(valId){
				console.log("Inicio de disponibilidad para editar...:", valId);
				closeAlert();
				stateNew = false;
				angular.forEach($scope.listMessageFormat, function(value, key){
				    if(value.messageFormatId == valId){
				    	console.log("Cargando los datos a editar...:", value);
				      	$scope.selectMessageFormat = value;
				    }
				});
			};
			
			$scope.quitar = function(valId){
				console.log("Inicio de proceso eliminar...:" , valId);
				var estado = true;
				
				if(estado){
					console.log("Enviando eliminacion de registro...");
					deleteData(valId);
				}
			};
		}
	]);




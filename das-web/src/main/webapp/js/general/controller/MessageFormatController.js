angular.module('app.controllers')
.controller('messageFormatController',
	['$scope', '$http', '$state', 'messageFormatTexto', 'botonTexto',  'tablaTexto',
		function($scope,  $http, $state, messageFormatTexto, botonTexto, tablaTexto){
	// establece el texto en la applicacion
			$scope.messageFormatTexto = messageFormatTexto;
			$scope.botonTexto = botonTexto;
			$scope.tablaTexto = tablaTexto;
			$scope.listMessageFormat = [];
			$scope.selectMessageFormat = {};
			$scope.listTypeFormater = [];
			$scope.responseRest = "";

			$scope.listTypeFormater = [{"transformerStruct":"ISO8583"},{"transformerStruct":"PLAIN"}];
			$scope.nuevoRegistro = 	{"messageFormatId":"TUPE","messageFormatDesc":"Tramas DE PRUEBA","transformerConfigFile":"transformer-interno.xml","routerConfigFile":"configRuteo-canal.xml","transformerStruct":"88888888"};
			
			loadData();
			var estadoProceso = true;

			//Consulta servicio rest
			$scope.refresh = function(){
				loadData();				
			}

			function loadData() {
				console.log("Reiniciando la CONSULTA desde el servicio...");
				$http.get('http://localhost:8080/ResDAS/MessageFormat')
					.success(function(data){
						console.log("cantidad de registros : ", data.messageFormats.length);
						$scope.listMessageFormat = data.messageFormats;
					})
					.error(function(data, status) {
				 		console.error('Repos error', status, data);
					});
			}

			function saveData(dataSave) {
				console.log("Procesando SAVE...:" , dataSave);
				$http.post('http://localhost:8080/ResDAS/MessageFormat', dataSave)
					.success(function(data){
						console.log("respuesta del proceso save...: ", data);
						$scope.responseRest = data.descripcion;
						loadData();
					})
					.error(function(data, status) {
				 		console.error('Repos error', status, data);
					});
			}

			function updateData(dataUpdate) {
				console.log("Procesando UPDATE...:" , dataUpdate);
				$http.put('http://localhost:8080/ResDAS/MessageFormat', dataUpdate)
					.success(function(data){
						console.log("respuesta del proceso update...: ", data);
						$scope.responseRest = data.descripcion;
						loadData();
					})
					.error(function(data, status) {
				 		console.error('Repos error', status, data);
					});
			}

			function deleteData(identificador) {
				console.log("Procesando DELETE...", identificador);
				$http.delete('http://localhost:8080/ResDAS/MessageFormat/' + identificador ).
					success(function(data){
						console.log("respuesta del proceso delete...: ", data);
						$scope.responseRest = data.descripcion;
						loadData();
					})
					.error(function(data, status) {
				 		console.error('Repos error', status, data);
					});
			}
			
			//Botones de proceso
			$scope.grabar = function(dataSave){
				console.log("enviando proceso save...: " , dataSave);
				var estado = true;
				angular.forEach($scope.listMessageFormat, function(value, key){
				    if(value.messageFormatId == dataSave.messageFormatId){
				    	console.log("El identificador ya existe...", dataSave.messageFormatId);
				      	$scope.responseRest = "El identificador ya existe...";
				      	if(!estadoProceso){
				      		console.log("valida si se puede editar(false): " , !estadoProceso);
				      		updateData(dataSave);
				      	}
				      	estado = false;
				    }
				});
				console.log("valida si se puede grabar un nuevo(true,true): " , estado , estadoProceso);
				if(estado || estadoProceso){
					saveData(dataSave);
				}
			};

			$scope.nuevo = function(){
				estadoProceso = true;
			};

			//Botones de la tabla
			$scope.editar = function(valMessageFormatId){
				estadoProceso = false;
				console.log("valor del parametro : ", valMessageFormatId);
				angular.forEach($scope.listMessageFormat, function(value, key){
				    if(value.messageFormatId == valMessageFormatId)
				      	$scope.selectMessageFormat = value;
				});
			};
			
			$scope.quitar = function(valueRow){
				console.log("enviando proceso delete...: " , valueRow);
				var estado = true;
				console.log("valida si se puede eliminar: " , estado);
				if(estado){
					deleteData(valueRow.messageFormatId);
				}
			};
		}
	]);
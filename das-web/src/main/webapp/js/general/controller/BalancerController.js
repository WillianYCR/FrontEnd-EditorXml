angular.module('app.controllers')
.controller('balancerController',
	['$scope', '$http', '$state', 'balancerTexto', 'queryRuta',
		function($scope,  $http, $state, balancerTexto, $queryRuta){
	// establece el texto en la applicacion
			$scope.balancerTexto = balancerTexto;
			//variables de inicio
			$scope.listBalancer = []; //almacena toda la data del servicio del objeto "Balancer"
			$scope.selectBalancer = {}; //es parte No dependeiente de la data general, 
									 		//es usado para mostrar la data y ser enviado paraguardar

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//***********Inicio de proceso por default
			readData();
//***********Fin de proceso por default

//***********Inicio Consulta servicio rest
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlBalancer)
					.success(function(data){
						console.log("N° registros de balanceadores:", data.balancers.length);
						$scope.listBalancer = data.balancers;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});

			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlBalancer, parData)
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
				$http.put($queryRuta.urlBalancer, parData)
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
				$http.delete($queryRuta.urlBalancer + '/' + parId).
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
				$scope.selectBalancer.id = "";
				$scope.selectBalancer.algorithm = "";
				$scope.selectBalancer.workerThreadsCount = "";
			}
//***********Inicio de metodos Fijos para mantener actualizado la informacion			
			
//***********Inicio de Botones de proceso, controles
			$scope.nuevo = function(){
				limpiarCampos();
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
				angular.forEach($scope.listBalancer, function(value, key){
				    if(value.id == dataSave.id){
				    	console.log("Validando identificador...:", dataSave.id);
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
				$scope.selectBalancer = angular.copy(valRow);
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
//***********Fin de Botones de proceso, controles

		}
	]);




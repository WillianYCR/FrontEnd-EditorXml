angular.module('app.controllers')
.controller('clientController',
	['$scope', '$http', '$state',  'queryRuta', 'clientTexto',
		function($scope,  $http, $state, $queryRuta, clientTexto){
	// establece el texto en la applicacion
			$scope.clientTexto = clientTexto;
			//variables de inicio
			$scope.clientGeneral = {}; //almacena toda la data del servicio
			$scope.selectClient = { atributos:{atributo:[]},
									ipAddresses:{ipAddresses:[]},
									sixadcClientProfiles:{profileId:[]}
								 }; //es parte No dependeiente de la data general, 
									 //es usado para mostrar la data y ser enviado para guardar
			
			$scope.constantEnabled = [{"enabled":"true"},{"enabled":"false"}];

			$scope.listProfile = []; //Lista de la data servicio del objeto Profile
			$scope.selectionProfile = [];//Valores seleccionados de profile

			$scope.responseRest = ""; //Mensaje de la respuesta generada por las consultas y validaciones
			$scope.responseRestTag = ""; //Estilo de la respuesta generada por las consultas y validaciones
			$scope.hideAlert = true; //Visualización de la alerta de la respuesta(true: se muestra, false: se oculta)
			var stateNew = true; //Definir sie el proceso es un nuevo registo o una actualizacion
								 //(true: registro nuevo, false: registro a editar)

//***********Inicio de proceso por default
			readData();
			readDataProfile();
//***********Fin de proceso por default

//***********Inicio Consulta servicio rest
			function readData() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlSixadcClient)
					.success(function(data){
						console.log("N° registros de clientes:", data.sixadcClients.length);
						$scope.clientGeneral = data.sixadcClients;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}
			function readDataProfile() {
				console.log("Procesando SELECT...");
				$http.get($queryRuta.urlProfile)
					.success(function(data){
						console.log("N° registros profile:", data.profiles.length);
						$scope.listProfile = data.profiles;
					})
					.error(function(data, status) {
						console.log(status);
						responseData(data);
					});
			}

			function saveData(parData) {
				console.log("Procesando SAVE...:" , parData);
				$http.post($queryRuta.urlSixadcClient, parData)
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
				$http.put($queryRuta.urlSixadcClient, parData)
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
				$http.delete($queryRuta.urlSixadcClient + '/' + parId).
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
				readDataProfile();
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
				$scope.selectClient.sixadcClientId = "";
				$scope.selectClient.sixadcClientDesc = "";

				$scope.selectClient.sixHostname = "";
				$scope.selectClient.sixUsername = "";
				$scope.selectClient.sixPassword = "";
				$scope.selectClient.enabled = "";
				$scope.selectionProfile = [];
				$scope.selectClient.ipAddresses.ipAddresses = [];
				$scope.selectClient.atributos.atributos = [];
				$scope.valAddTxt = '';
				$scope.valAddName = '';
		        $scope.valAddValor = '';
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
				readDataProfile();
				closeAlert();
			};

			$scope.demo = function(){
				//Prueba
				console.log("Lista de Ips: ", $scope.selectClient.ipAddresses.ipAddresses);
			};

			$scope.grabar = function(dataSave){
				$scope.selectClient.sixadcClientProfiles.profileId = $scope.selectionProfile;
				console.log("Inicio de evento grabar Cargado...:" , dataSave);
				var existId = false;
				angular.forEach($scope.clientGeneral, function(value, key){
				    if(value.sixadcClientId == dataSave.sixadcClientId){
				    	console.log("Validando identificador...:", dataSave.sixadcClientId);
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
				$scope.selectClient = angular.copy(valRow);

				if(!$scope.selectClient.sixadcClientProfiles.profileId){
					$scope.selectClient.sixadcClientProfiles.profileId = [];
				} 

				$scope.selectionProfile = $scope.selectClient.sixadcClientProfiles.profileId;
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

			$scope.createOptionIp = function() {
				if(!$scope.selectClient.ipAddresses.ipAddresses){
					$scope.selectClient.ipAddresses.ipAddresses = [];
				}
		        $scope.selectClient.ipAddresses.ipAddresses.push($scope.valAddTxt);
		        $scope.valAddTxt = '';
		    };

		    $scope.createOptionAtrib = function() {
				if(!$scope.selectClient.atributos.atributos){
					$scope.selectClient.atributos.atributos = [];
				}
		        $scope.selectClient.atributos.atributos.push({ nombre: $scope.valAddName, valor : $scope.valAddValor});
		        $scope.valAddName = '';
		        $scope.valAddValor = '';
		    };

		    $scope.deleteOptionIp = function(parId) {
		    	console.log("Inicio de quitar Ip...:" , parId);
			    var valores = $scope.selectClient.ipAddresses.ipAddresses;
		        $scope.selectClient.ipAddresses.ipAddresses = [];
		        angular.forEach(valores, function(valIps) {
		            if (valIps != parId){
		               $scope.selectClient.ipAddresses.ipAddresses.push(valIps);
		           }
				});
				console.log("Lista Ips: ", $scope.selectClient.ipAddresses.ipAddresses);
		    };

		    $scope.deleteOptionAtrib = function(parNombre) {
		    	console.log("Inicio de quitar el atributo...:" , parNombre);
			    var valores = $scope.selectClient.atributos.atributos;
		        $scope.selectClient.atributos.atributos = [];
		        angular.forEach(valores, function(valAtributo) {
		            if (valAtributo.nombre != parNombre){
		               $scope.selectClient.atributos.atributos.push(valAtributo);
		           }
				});
				console.log("Lista Atributos: ", $scope.selectClient.atributos.atributos);
		    };

			$scope.getSelectionProfile = function getSelectionProfile(filter) {
			    var idy = $scope.selectionProfile.indexOf(filter);
			    if (idy > -1) {
			    	$scope.selectionProfile.splice(idy, 1);
			    }else {
			    	$scope.selectionProfile.push(filter);
			    }
			    console.log("lista profile: ", $scope.selectionProfile);
			};
//***********Fin de Botones de proceso, controles
			
		}
	]);
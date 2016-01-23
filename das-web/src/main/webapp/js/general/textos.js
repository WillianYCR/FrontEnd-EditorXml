angular.module('app.textos', [])
.constant('loginTextos', {
	titulo: 'CONTROL DE ACCESO',
	usuario: 'Usuario : ',
	contrasenia: 'Contrase\u00f1a :',
	ingresarUsuario: 'Ingrese el usuario',
	ingresarContrasenia: 'Ingrese la contrase\u00f1a',
	olvido: '\u00bfOlvid\u00f3 su contrase\u00f1a?',
	ingresar: 'INGRESAR'
})
.constant('formatTexto', {
	//Descripcion de las controles individuales
	titulo: 'FORMATEADOR DE TRAMA',
	//******Descripcion de los Tag
	messageFormatId: 'Identificador:',
	messageFormatDesc: 'Descripcion:',
	transformerConfigFile: 'Archivo transformador:',
	routerConfigFile: 'Archivo roteador:',
	transformerStruct: 'Tipo estructura:',
	//Para tablas
	messageFormatIdTbl: 'Identificador',
	messageFormatDescTbl: 'Descripcion',
	transformerConfigFileTbl: 'Archivo transformador',
	routerConfigFileTbl: 'Archivo roteador',
	transformerStructTbl: 'Tipo estructura',
	opcionActionTbl: 'Accion'
})
.constant('queueTxt', {
	//Descripcion de las controles individuales
	titulo: 'ADMINISTRADOR DE COLAS',
	//******Descripcion de los atributos
	attribute: 'Atributo general',
	classManager: 'Clase:',
	queueLocation: 'IP-Puerto:',
	sleepTime: 'T. Espera:',
	refreshTime: 'T. Refrescar:',
	//******Descripcion de los Tag
	adminQueueId: 'Identificador:',
	workerThreadsCount: 'N° hilos soportados:',
	messageType: 'TIPO DE MENSAJERIA',
	messageTypeId: 'Id. mensaje:',
	messageTypeDesc: 'Descripcion:',
	supportedMessageFormats: 'Formatos soportados',
	//Tabla de formatos
	messageFormatIdTbl: 'Identificador',
	opcionActionTbl: 'Accion',
	//Descripcion de los titulo de la tabla de colas
	adminQueueIdTbl: 'Identificador',
	workerThreadsCountTbl: 'N° hilos',
	messageTypeIdTbl: 'Formato',
	messageTypeDescTbl: 'Mensaje'
})
.constant('driverTexto', {
	//Descripcion de las controles individuales
	titulo: 'CONFIGURADOR DE DRIVERS',
	driverId: 'Codigo:',
	adminQueueId: 'Cola:',
	type: 'Operacion:',
	timeOutConnect: 'Tiempo conexion:',
	timeOutRead: 'Tiempo lectura:',
	retries: 'N° Reintentos:',
	timeOutQueueRead: 'Tiempo lectura cola:',
	//******Descripcion de los Tag
	name: 'Nombre del driver:',
	port: 'Puerto:',
	maxConcurrentConnections: 'Max. concurrentes:',
	forwardProcess: 'Procesos destino:',
	validaIp: 'Validar IP:',
	concurrentUserSupport: 'Permiso concurrencia:',
	filters: 'FILTROS:',
	inFilters: 'Filtro entradas:',
	outFilters: 'Filtro salidas:',
	//Descripcion de los titulo de la tabla
	driverIdTbl: 'Codigo',
	adminQueueIdTbl: 'Cola',
	typeTbl: 'Operacion:',
	nameTbl: 'Driver',
	portTbl: 'Puerto',
	maxConcurrentConnectionsTbl: 'Conexiones',
	forwardProcessTbl: 'Destino',
	validaIpTbl: 'Validar',
	concurrentUserSupportTbl: 'Permiso'
})
.constant('balancerTexto', {
	//Descripcion de las controles individuales
	titulo: 'CONFIGURADOR DE BALANCEADORES',
	attribute: 'Atributo general',
	classManager: 'Clase:',
	queueLocation: 'IP-Puerto:',
	sleepTime: 'T. Espera:',
	refreshTime: 'T. Refrescar:',
	//******Descripcion de los atributos
	id: 'Codigo:',
	//******Descripcion de los Tag
	algorithm: 'Algoritmo:',
	workerThreadsCount: 'Modo operacion:',
	//Tabla de balanceadores
	idTbl: 'Codigo',
	algorithmTbl: 'Algoritmo',
	workerThreadsCountTbl: 'N° Hilos',
	opcionActionTbl: 'Accion'
})
.constant('routeTexto', {
	//Descripcion de las controles individuales
	titulo: 'CONFIGURADOR DE ROUTERS',
	//******Descripcion de los Tag
	routeId: 'Codigo:',
	routeDesc: 'Descripcion:',
	balancerId: 'Balanceador:',
	status: 'Estado:',
	//Tabla de balanceadores
	routeIdTbl: 'Codigo',
	routeDescTbl: 'Descripcion',
	balancerIdTbl: 'Balanceador',
	statustbl: 'Estado',
	opcionActionTbl: 'Accion'
})
.constant('serviceTexto', {
	//Descripcion de las controles individuales
	titulo: 'CONFIGURADOR DE SERVICIOS',
	//******Descripcion de los Tag
	serviceId: 'Identificado:',
	serviceDesc: 'Descripcion:',
	discriminationRules: 'Reglas:',
	authorizationBins: 'Autorizador:',
	binId: 'Bin Id:',
	binStatus: 'Bin Estado:',
	routes: 'Routes:',
	//Tabla de balanceadores
	serviceIdTbl: 'Codigo',
	serviceDescTbl: 'Descripcion',
	discriminationRulesTbl: 'Reglas',
	authorizationBinsTbl: 'Autorizador',
	opcionActionTbl: 'Accion'
})
.constant('botonTexto', {
	//Indice de menu general
	formateador: 'Formateador',
	cola: 'Cola',
	driver: 'Driver',
	balanceador: 'Balanceador',
	router: 'Router',
	servicio: 'Servicio',
	nodo: 'Nodo',
	perfil: 'Perfil'
})
.constant('queryRuta', {
	//Atributos generales para todos los tag
	classRoutersManager: 'com.novatronic.sixadc.manager.RoutersManager',
	classDriversManager: 'com.novatronic.sixadc.manager.DriversManager',
	classBalancersManager: 'com.novatronic.sixadc.manager.BalancersManager',
	classChannelManager: 'com.novatronic.sixadc.manager.ChannelManager',
	ipPuerto: 'localhost:1099',
	//Ruta de los servicio expuesto, genenal
	urlMessageFormat: 'http://localhost:8080/ResDAS/MessageFormat',
	urlAdminQueue: 'http://localhost:8080/ResDAS/AdminQueue',
	urlBalancer: 'http://localhost:8080/ResDAS/Balancer',
	urlRoute: 'http://localhost:8080/ResDAS/Route',
	urlDriver: 'http://localhost:8080/ResDAS/Driver',
	urlService: 'http://localhost:8080/ResDAS/Service'
});